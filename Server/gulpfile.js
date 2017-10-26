var gulp = require('gulp');
var nodemon = require('gulp-nodemon');


gulp.task('server', function () {
    nodemon({
            script: 'server.js',
            ext: 'js',
            env: {
                PORT: 3000
            },
            ignore: ['./node_modules/**']
        })
        .on('restart', function () {
            console.log('Restarting...');
        })
});

gulp.task('default', ['server']);
