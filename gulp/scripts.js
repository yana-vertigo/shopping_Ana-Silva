var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    runSeq = require('run-sequence').use(gulp),
    cfg = require('./_config');

/* --------------------------------------------------------------------------- */

gulp.task('scripts:dist', function(cb) {
    runSeq(
        'scripts:coffee',
        [
            'scripts:app',
            'scripts:custom',
            'scripts:head-vendor',
            'scripts:vendor'
        ],
        cb
    )
});

gulp.task('scripts:dev', function(cb) {
    runSeq('scripts:coffee', 'scripts:app', cb);
});

/* --------------------------------------------------------------------------- */

gulp.task('scripts:coffee', function() {
    return gulp.src( cfg.src.appCoffeeScript )
        .pipe(plumber(function(error) {
          gutil.log(error.message);
          this.emit('end');
        }))
        .pipe(coffee({ bare: true }))
        .pipe(gulp.dest( './html/_scripts' ));
});

gulp.task('scripts:app', function() {
    var source = [
        cfg.src.appJavascript
    ];
    return gulp.src(source)
        .pipe(plumber(function(error) {
          gutil.log(error.message);
          this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(cfg.dist.appJavascript))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(cfg.dist.appJavascript));
});

gulp.task('scripts:custom', function() {
    var plugins = [
        cfg.src.plugins + 'custom-plugins.js'
    ];
    return gulp.src(plugins)
        .pipe(plumber(function(error) {
          gutil.log(error.message);
          this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('custom-plugins.js'))
        .pipe(gulp.dest( cfg.dist.libs ))
        .pipe(uglify())
        .pipe(rename('custom-plugins.min.js'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest( cfg.dist.libs ));
});

gulp.task('scripts:head-vendor', function() {
    var plugins = [
        cfg.src.libs + 'modernizr/modernizr.js'
    ];
    return gulp.src(plugins)
        .pipe(plumber(function(error) {
          gutil.log(error.message);
          this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('head-vendor.min.js'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest( cfg.dist.libs ));
});

gulp.task('scripts:vendor', function() {
    var plugins = [
        cfg.src.libs + 'jquery/jquery.min.js',
        cfg.src.libs + 'lodash/lodash.min.js',
        cfg.src.libs + 'hammerjs/hammer.min.js'
    ];
    return gulp.src(plugins)
        .pipe(plumber(function(error) {
          gutil.log(error.message);
          this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.min.js'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest( cfg.dist.libs ));
});