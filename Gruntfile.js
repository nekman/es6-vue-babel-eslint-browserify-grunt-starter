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
      'dist/app.js': sourceFiles,

      options: {
        debug: true,
        bundleDelay: 1000,
        transform: [
          ['partialify'],
          ['babelify']
        ]
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
      tasks: ['browserify', 'cssmin', 'copy', 'uglify']
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

  grunt.registerTask('build-dev', [
    'eslint',
    'karma',
    'browserify',
    'copy',
    'cssmin'
  ]);

  grunt.registerTask('test', [
    'eslint',
    'karma'
  ]);

  grunt.registerTask('default', [
    'eslint',
    'karma',
    'browserify',
    'copy',
    'uglify',
    'cssmin'
  ]);
};
