var gulp = require('gulp'),
    runSeq = require('run-sequence').use(gulp),
    requireDir = require('require-dir');

requireDir('./gulp');


gulp.task('dist', function(cb) {
    runSeq(
        'clean',
        [
            'html:dist',
            'sass',
            'scripts:dist',
            'images:dist',
            'sprite:dist',
            'fonts'
        ],
        cb
    );
});


gulp.task('serve', function(cb) {
    runSeq(
        'dist',
        'server',
        cb
    );
});