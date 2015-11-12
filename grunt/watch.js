var sourceFiles = require('./sourceFiles');

module.exports = {
  files: sourceFiles.concat('src/assets/css/*.css').concat('src/**/*.html'),
  tasks: ['browserify:dev', 'copy', 'replace:dev'],
  options: {
    livereload: true,
  }
};
