'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    banner: '/**\n' +
            ' * <%= pkg.name %>\n' +
            ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * @author <%= pkg.author %>\n' +
            ' * @link <%= pkg.homepage %>\n' +
            ' * @license <%= pkg.license %>\n' +
            '**/\n\n',

    concat: {
      options: {
        stripBanners: true,
        banner: '<%= banner %>'
      },
      dist: {
        src: ['src/angular-pico.js'],
        dest: 'dist/angular-pico.js',
      },
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: {
          'dist/angular-pico.min.js': ['src/angular-pico.js']
        }
      }
    },

    clean: {
      dist: ['dist']
    },

    jscs: {
      src: 'src/**/*.js',
      options: {
        config: '.jscsrc'
      }
    },

    cwebp: {
      dynamic: {
        options: {
          q: 50
        },
        files: [{
          expand: true,
          cwd: 'example/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'example/images/'
        }]
      }
    },
  });

  grunt.registerTask('webp', [
    'cwebp'
  ]);

  grunt.registerTask('test', [

  ]);

  grunt.registerTask('build', [
    'jscs',
    'clean:dist',
    'concat:dist',
    'uglify:dist'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
