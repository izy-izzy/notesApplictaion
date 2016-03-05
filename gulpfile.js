var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var minifyJS = require('gulp-minify');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var karma = require('gulp-karma');
var cssnano = require('gulp-cssnano');

gulp.task('test', function() {
  return gulp.src('./foobar')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      console.log(err);
      this.emit('end');
    });
});

gulp.task('autotest', function() {
  return gulp.watch([
  	'./devel/assets/js/**/*.js',
  	'./devel/tests/*.js'
  	],['test']);
});

gulp.task('default', ['less', 'scripts', 'test']);

gulp.task('watch', function(){
	gulp.watch([
		'./devel/less/*.less',
		'./devel/less/*/*.less'
		], ['less']);
	gulp.watch([
		'./devel/scripts/*.js',
		'./devel/scripts/*/*.js',
		], ['scripts', 'test']);
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
        './node_modules/angular-ui-router/release/angular-ui-router.min.js',
        './node_modules/angularfire/dist/angularfire.min.js',
        './node_modules/angular-animate/angular-animate.min.js',
        './node_modules/angular-sweetalert/SweetAlert.min.js',

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
	.pipe(minifyJS({mangle: true}).on('error', 
    	function(e) {
    		gutil.log(e);
    		this.emit('end');
    	}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./public/js/'))
});