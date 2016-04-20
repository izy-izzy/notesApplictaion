module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
        './node_modules/js-polyfills/polyfill.min.js',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/html5shiv/dist/html5shiv.min.js',
        './node_modules/sweetalert/dist/sweetalert.min.js',
        './bower_components/firebase/firebase.js',
        './node_modules/sweetalert/dist/sweetalert.min.js',
        './node_modules/angular/angular.min.js',
        './node_modules/angular-aria/angular-aria.min.js',
        './node_modules/angular-ui-router/release/angular-ui-router.min.js',
        './node_modules/angularfire/dist/angularfire.min.js',
        './node_modules/angular-animate/angular-animate.min.js',
        './node_modules/angular-sweetalert/SweetAlert.min.js',

        './node_modules/angular-mocks/angular-mocks.js',

        './devel/scripts/app.js',
        './devel/scripts/filters/*.js',
        './devel/scripts/animations/*.js',
        './devel/scripts/directives/*.js',
        './devel/scripts/services/*.js',
        './devel/scripts/factories/*.js',
        './devel/scripts/controllers/*.js',
        './devel/scripts/tests/karma/**/*.js'
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    //browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
