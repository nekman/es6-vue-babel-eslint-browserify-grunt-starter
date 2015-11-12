module.exports = {
  html: {
    files: [{
      src: ['src/index.html'],
      dest: 'dist/index.html'
    },{
      flatten: true,
      expand: true,
      src: ['src/assets/css/*'],
      dest: 'dist/css'
    },{
      flatten: true,
      expand: true,
      src: ['src/assets/img/*'],
      dest: 'dist/img'
    }]
  }
};
