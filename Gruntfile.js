'use strict';

var Config = {
  dev:  './src/js/config/config-dev.json',
  prod: './src/js/config/config-prod.json'
};

function aliasify(environment) {
    var configFile = Config[environment];
    if (!configFile) {
      throw new Error('No config for ' + environment);
    }

    // To see if the file exist...
    require(configFile);

    return require('aliasify').configure({
      aliases: {
        config: configFile
      },
      verbose: true
    });
}

module.exports = function(grunt) {

  var sourceFiles = [
    'src/js/**/*.html', //Templates
    'src/**/*.js', // JS-files
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      target: [
        'src/**/*.js'
      ]
    },

    browserify: {
      dev: {
        files: {
          'dist/app.js': sourceFiles
        },

        options: {
          debug: true,
          bundleDelay: 1000,
          transform: ['partialify', 'babelify', aliasify('dev')]
        }
      },
      prod: {
        files: {
          'dist/app.js': sourceFiles
        },

        options: {
          debug: true,
          bundleDelay: 1000,
          transform: ['partialify', 'babelify', aliasify('prod')]
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    uglify: {
      'dist/app.min.js': 'dist/app.js'
    },

    watch: {
      files: sourceFiles.concat('src/assets/css/*.css').concat('src/**/*.html'),
      tasks: ['browserify', 'cssmin', 'copy', 'uglify'],
      options: {
        livereload: true,
      }
    },

    copy: {
      html: {
        files: [{
          src: ['src/index.html'],
          dest: 'dist/index.html'
        }]
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/app.css': [
            // TODO: Add more css files
            'src/assets/css/app.css'
          ]
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'eslint',
    'karma',
    'browserify:dev',
    'copy',
    'cssmin',
    'watch'
  ]);

  grunt.registerTask('test', [
    'eslint',
    'karma'
  ]);

  grunt.registerTask('build-prod', [
    'eslint',
    'karma',
    'browserify:prod',
    'copy',
    'uglify',
    'cssmin'
  ]);
};
