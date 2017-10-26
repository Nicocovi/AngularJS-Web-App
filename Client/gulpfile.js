var gulp = require('gulp');
var exec = require('gulp-exec');


gulp.task('build', function () {
    var options = {
        continueOnError: false, // default = false, true means don't emit error event 
        pipeStdout: false, // default = false, true means stdout is written to file.contents 
        customTemplatingThing: "test" // content passed to gutil.template() 
    };
    var reportOptions = {
        err: true, // default = true, false means don't write err 
        stderr: true, // default = true, false means don't write stderr 
        stdout: true // default = true, false means don't write stdout 
    }
    return gulp.src('./**/**')
        .pipe(exec('npm run build', options))
        .pipe(exec.reporter(reportOptions));
});

gulp.task('watch', function () {
    gulp.watch('src/*', ['build'])
});

gulp.task('default', ['build', 'watch']);
