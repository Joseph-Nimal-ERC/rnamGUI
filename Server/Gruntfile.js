module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        watch: {
            scripts: {
                files: ['**/*.js','!node_modules/**','!src/public/javascripts/**'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        },

        nodemon: {
            dev: {
                script: 'src/bin/www',
                ignore:  ['node_modules/**','src/public/**']
            }
        },

        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        jshint: {
            all: ['Gruntfile.js','src/app.js', 'src/models/*.js', 'src/routes/*.js']

        }
        
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    
    // Default task(s).
    grunt.registerTask('default', ['dev']);
    grunt.registerTask('build', ['jshint']);
    grunt.registerTask('dev', ['concurrent']);
    
};