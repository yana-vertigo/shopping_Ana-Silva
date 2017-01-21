var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    print = require('gulp-print'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    cdnizer = require('gulp-cdnizer'),
    access = require('./_access');

var s3 = require('gulp-s3-upload')({
    accessKeyId: access.aws.key,
    secretAccessKey: access.aws.secret
});

gulp.task('upload', function() {
    var source = [
        './html/dist/**'
    ];

    return gulp.src(source)
        .pipe(plumber(function(error) {
            gutil.log(error.message);
            this.emit('end');
        }))
        .pipe(rename(function(path) {
            if (path.dirname !== '.') {
                path.dirname = access.aws.destinationFolder + path.dirname;
            }
        }))
        .pipe(s3({
            Bucket: access.aws.bucket,
            ACL: 'public-read'
        }));
});

gulp.task('cdnify', function() {
    var source = [
        './html/dist/css/app.min.css'
    ];

    return gulp.src(source)
        .pipe(plumber(function(error) {
            gutil.log(error.message);
            this.emit('end');
        }))
        .pipe(cdnizer({
            defaultCDNBase: access.cdn.base,
            relativeRoot: 'images',
            files: ['**/*.{gif,png,jpg,jpeg,svg}']
        }))
        .pipe(rename('app-cdn.min.css'))
        .pipe(gulp.dest('./html/dist/css'))
});