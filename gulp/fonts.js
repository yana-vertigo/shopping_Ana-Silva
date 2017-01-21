var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    cfg = require('./_config');

gulp.task('fonts', function() {
    var source = [
        cfg.src.fonts
    ];

    return gulp.src(source)
        .pipe(gulp.dest(cfg.dist.fonts))
});
