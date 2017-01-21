var gulp = require('gulp'),
    cfg = require('./_config'),
    svgSprite = require('gulp-svg-sprite'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    spritesmith = require('gulp.spritesmith'),
    runSeq = require('run-sequence').use(gulp);

gulp.task('sprite:dist', ['sprite:png', 'sprite:svg', 'sprite:json'], function(cb) {
    runSeq('sass', cb);
});

gulp.task('sprite:png', function() {
    var spriteData =
        gulp.src( cfg.src.icons + '/*.png')
            .pipe(spritesmith({
                imgName: 'icons.png',
                imgPath: '../images/icons/icons.png',
                cssName: 'iconspng.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                cssVarMap: function(sprite) {
                    sprite.name = 'png-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest( cfg.dist.images + '/icons' ));
    spriteData.css.pipe(gulp.dest( cfg.src.sassUtilities ));
});

gulp.task('sprite:json', function() {
    var spriteData =
        gulp.src( cfg.src.icons + '/*.png')
            .pipe(spritesmith({
                imgName: 'icons.png',
                imgPath: '../images/icons/icons.png',
                cssName: 'iconspng.json',
            }));

    spriteData.css.pipe(gulp.dest( cfg.src.patterns + '/utilities/data' ));
});

gulp.task('sprite:svg', function() {
    var config = {
        mode: {
            view: { // Activate the «view» mode
                bust: false,
                render: {
                    scss: {
                        dest: '../../_stylesheets/utilities/iconssvg.scss'
                    }
                },
                dest: 'html/dist/temp/', // Temp folder for path reference
                sprite: '../images/icons/' + 'icons.svg',
                dimensions: true,
                example: false
            },
        }
    };

    return gulp.src(cfg.src.icons + '/*.svg', {cwd: ''})
        .pipe(plumber(function(error) {
            gutil.log(error.message);
            this.emit('end');
        }))
        .pipe(svgSprite(config))
        .pipe(gulp.dest('.'));
});