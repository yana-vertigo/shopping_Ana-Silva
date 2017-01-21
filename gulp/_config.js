module.exports = {
    src: {
        patterns        : './html/_patterns',
        templates       : './html/_patterns/templates',
        appCoffeeScript : './html/_scripts/coffee/**/*.coffee',
        appJavascript   : './html/_scripts/**/*.js',
        libs            : './html/_libs/vendor/',
        plugins         : './html/_libs/custom/',
        sass            : './html/_stylesheets/**/*.scss',
        sassMain        : './html/_stylesheets/main.scss',
        sassUtilities   : './html/_stylesheets/utilities',
        images          : './html/_images/**/*',
        icons           : './html/_images/icons',
        fonts           : './html/_fonts/*'
    },
    dist: {
        root            : './html/dist',
        templates       : './html/dist/pages',
        appJavascript   : './html/dist/scripts',
        libs            : './html/dist/libs',
        css             : './html/dist/css',
        images          : './html/dist/images',
        fonts           : './html/dist/fonts'
    }
};