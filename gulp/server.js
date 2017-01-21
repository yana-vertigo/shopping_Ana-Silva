var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    cfg = require('./_config');


gulp.task('server', function () {
    browserSync.create();
    browserSync.init({
        server: 'html/dist'
    });

    gulp.watch([ cfg.src.patterns + '/**/*.hbs' ], ['index-handlebars','handlebars']);
    gulp.watch([ cfg.src.appCoffeeScript ], ['scripts:coffee']);
    gulp.watch([ cfg.src.appJavascript ], ['scripts:app']);
    gulp.watch([ cfg.src.sass ], ['sass']);

    gulp.watch(cfg.dist.root + '/**/*.html').on('change', browserSync.reload);
    gulp.watch(cfg.dist.root + '/**/*.js').on('change', browserSync.reload);
});