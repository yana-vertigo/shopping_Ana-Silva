var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp'),
    access = require('./_access');

gulp.task('deploy', function() {
    var conn = ftp.create({
        host: access.ftp.host,
        user: access.ftp.user,
        password: access.ftp.password,
        parallel: 10,
        log: gutil.log
    });

    var globs = [
        './html/dist/css/**',
        './html/dist/images/**',
        './html/dist/libs/**',
        './html/dist/pages/**',
        './html/dist/scripts/**',
        './html/dist/index.html'
    ];

    return gulp.src( globs, { base: './html/dist', buffer: false })
        .pipe(plumber(function(error) {
            gutil.log(error.message);
            this.emit('end');
        }))
        .pipe( conn.dest( access.ftp.dest ));
});