module.exports = function(grunt) {

    //Plugins para grunt
grunt.loadNpmTasks('grunt-run');

grunt.initConfig({

    run: {
        install: {
            //No se necesita puesto que docker ya lo preinstala
            //cmd: 'npm',
            //args: [
            //  'install'
            //]  
        },

        build: {
        
        },

        test: {
            cmd: 'npm',
            args: [
                'run',
                'test'
            ]
        },

        transpile: {
            cmd: 'tsc'
        },

        launch: {
            cmd: 'node',
            args: ['src/server.js']
        },

        start: {
            exec: 'docker build -t microservicio_animeflv -f src/Dockerfile . && docker run microservicio_animeflv'
        }
    }
                
               

});

//tarea default
grunt.registerTask('default', ['run:install']);
//Tareas
grunt.registerTask('build',   ['run:build']);
grunt.registerTask('install', ['run:install']);
grunt.registerTask('test',    ['run:test']);

//Lanza el microservicio en un docker
grunt.registerTask('start', ['run:start']);

//Despliegua el microservicio en local 
grunt.registerTask('launch', ['run:transpile', 'run:launch'])

}