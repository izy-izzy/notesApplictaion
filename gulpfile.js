var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var minifyJS = require('gulp-minify');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var karmaServer = require('karma').Server;
var cssnano = require('gulp-cssnano');
var jshint = require('gulp-jshint');
var gulpProtractorAngular = require('gulp-angular-protractor');
var runSequence = require('run-sequence');

gulp.task('karma', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('protractor', function(callback) {
    gulp
        .src('app.min.js')
        .pipe(gulpProtractorAngular({
            configFile: 'protractor.conf.js',
            debug: false,
            autoStartStopServer: true
        }))
        .on('error', function(e) {
            console.log(e);
        })
        .on('end', callback);
});

gulp.task('test', function(){
  return runSequence('karma', 'protractor');
});

gulp.task('default', function(){
  return runSequence('less', 'scripts', 'lint', 'test')
});

gulp.task('watch', ['default'], function(){
	gulp.watch([
		'./devel/less/*.less',
		'./devel/less/*/*.less'
		], ['less']);
	gulp.watch([
		'./devel/scripts/*.js',
		'./devel/scripts/*/*.js',
		], ['scripts']);
	});

gulp.task('less', function () {
  return gulp.src('./devel/less/style.less')
  	.pipe(sourcemaps.init())
    .pipe(less().on('error', 
    	function(e) {
    		gutil.log(e);
    		this.emit('end');
    	})
    )
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('scripts', function() {
	return gulp.src([
        './node_modules/js-polyfills/polyfill.min.js',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/html5shiv/dist/html5shiv.min.js',
        './node_modules/sweetalert/dist/sweetalert.min.js',
        './bower_components/firebase/firebase.js',
        './node_modules/sweetalert/bootstrap.min.js',
        './node_modules/angular/angular.min.js',
        './node_modules/angular-aria/angular-aria.min.js',
        './node_modules/angular-resource/angular-resource.js',
        './node_modules/angular-ui-router/release/angular-ui-router.min.js',
        './node_modules/angularfire/dist/angularfire.min.js',
        './node_modules/angular-animate/angular-animate.min.js',
        './node_modules/angular-sweetalert/SweetAlert.min.js',

        './devel/scripts/serviceModules/settingServiceS.js',
        

        './devel/scripts/app.js',
        './devel/scripts/filters/*.js',
        './devel/scripts/animations/*.js',
        './devel/scripts/directives/*.js',
        './devel/scripts/services/*.js',
        './devel/scripts/factories/*.js',
        './devel/scripts/controllers/*.js'
		])
	.pipe(concat('app.min.js'))
	.pipe(sourcemaps.init())
	/*.pipe(minifyJS({mangle: true}).on('error', 
    	function(e) {
    		gutil.log(e);
    		this.emit('end');
    	}))*/
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./public/js/'))
});


gulp.task('lint', function() {
  return gulp.src('./public/js/app.min.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});