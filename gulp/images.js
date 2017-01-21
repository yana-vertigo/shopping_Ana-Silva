var gulp = require('gulp'),
    cfg = require('./_config'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');


gulp.task('images:dist', function() {
    var source = [
        cfg.src.images,
        '!./html/_images/icons/**'
    ];

    return gulp.src( source )
        .pipe(plumber(function(error) {
          gutil.log(error.message);
          this.emit('end');
        }))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest( cfg.dist.images ));
});