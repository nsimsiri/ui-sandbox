module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        project: {
            dev: 'src',
            dist: 'dist',
            build: '<%= grunt.template.today("yyyymmdd") %>'
        },

        connect: {
            server: {
                options: {
                    host: 'localhost',
                    port: process.env.PORT || '3000',
                    base: '<%= project.dev %>/'
                }
            }
        },

        webpack: {
            build: {
                entry: []
            }
        }
    })
}