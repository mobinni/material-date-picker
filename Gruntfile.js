module.exports = function (grunt) {

  // configure the tasks
  grunt.initConfig({
    coffee: {
      app:{
        expand: true,
        cwd: 'app/scripts/',
        src: ['*.coffee', '**/*.coffee'],
        dest: 'build',
        ext: '.js'
      }
    },
    copy: {
      build: {
        cwd: 'app',
        src: [
          'styles/**',
          'views/**'
        ],
        dest: 'build',
        expand: true
      }
    }
  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-coffee');


  // define the tasks
  grunt.registerTask('build', [
    'coffee:app',
    'copy:build'
  ]);
};
