var fs = require('fs'),
    crypto = require('crypto'),
    UglifyCSS = require('uglifycss'),
    UglifyJS = require('uglify-js');


var IncludeConfig = {
  js: {
    files: [
      'dist/**/*.js',
    ]
  },
  css: {
    files: [
      'dist/css/*.css',
    ]
  }
};

function hash(contents) {
  return crypto
        .createHash('md5')
        .update(contents, 'utf8')
        .digest('hex');
}

function minifyJS(files) {
  return UglifyJS.minify(files).code;
}

function minifyCSS(files) {
  return UglifyCSS.processFiles(files);
}

function Includer(grunt) {
  return function(destFolder, extension) {
    return function() {
      var include = IncludeConfig[extension],
         files = grunt.file.expand(include.files),
         minify = extension === 'js' ? minifyJS : minifyCSS;

      var contents  = minify(files);
      var hashedFileName = ['app.', hash(contents), '.', extension].join('');

      fs.writeFileSync(destFolder + hashedFileName, contents);

      return hashedFileName;
    };
  };
}

module.exports = function(grunt) {
  var includer = Includer(grunt);
  return {
    prod: {
      src: ['dist/index.html'],
      overwrite: true,
      replacements: [
        {
          from: '@@APP_JS',
          to: includer('dist/', 'js')
        },
        {
          from: '@@APP_CSS',
          to: includer('dist/css/', 'css')
        },
      ]
    },
    dev: {
      src: ['dist/index.html'],
      overwrite: true,
      replacements: [
        {
          from: '@@APP_JS',
          to: 'app.js'
        },
        {
          from: '@@APP_CSS',
          to: 'app.css'
        },
      ]
    }
  };
}
