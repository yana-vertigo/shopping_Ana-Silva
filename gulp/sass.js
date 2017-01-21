var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    csswring = require('csswring'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');

// ---------------------------------------------------------------------------
gulp.task('sass', function () {
    var processors = [autoprefixer({browsers: ['last 4 version']}), csswring];

    return gulp.src('./html/_stylesheets/main.scss')
        .pipe(plumber(function (error) {
            gutil.log(error.message);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(postcss(processors))
        .pipe(rename('main.min.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./html/dist/css'))
        .pipe(browserSync.stream());
});