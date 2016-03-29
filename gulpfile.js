var gulp = require('gulp');
var scss = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
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
var htmlify = require('gulp-angular-htmlify');
var htmlhint = require("gulp-htmlhint");
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var gulpDocs = require('gulp-ngdocs');

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
  return runSequence('imagemin', 'scss', 'scripts', 'lint', 'scss-lint', 'html-lint', 'test', 'documentation')
});

gulp.task('watch', ['default'], function(){
	gulp.watch([
		'./devel/scss/*.scss',
		'./devel/scss/*/*.scss'
		], ['scss']);
	gulp.watch([
		'./devel/scripts/*.js',
		'./devel/scripts/*/*.js',
		], ['scripts', 'documentation']);
	});

gulp.task('scss', function () {
  return gulp.src('./devel/scss/style.scss')
  	.pipe(sourcemaps.init())
    .pipe(scss().on('error', 
    	function(e) {
    		gutil.log(e);
    		this.emit('end');
    	})
    )
    //.pipe(cssnano())
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
	/*.pipe(minifyJS({mangle: true}).on('error', 
    	function(e) {
    		gutil.log(e);
    		this.emit('end');
    	}))*/
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./public/js/'))
});


gulp.task('lint', function() {
  return gulp.src('./devel/scripts/*/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scss-lint', function() {
  return gulp.src('./devel/scss/*/*.scss')
    .pipe(scsslint({'config': 'lintscss.yml'}));
});

gulp.task('html-lint',['html-validate','html-validateClear'],function(){
    return true;
});

//Also transforming ui-attributes to data-ui-attributes
gulp.task('html-validate', function() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlify({
            customPrefixes: ['ui-']
        }))
        .pipe(htmlhint('.htmlhintafteruirc'))
        .pipe(htmlhint.reporter());
});

gulp.task('html-validateClear', function() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter());
});

gulp.task('imagemin', function(){
    return gulp.src('./devel/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./public/images'));
});

var ngDocsOptions = {
    html5Mode: false // required for good documentation generation
}

gulp.task('documentation', function(){
    return gulp.src('./devel/scripts/**/*.js')
        .pipe(gulpDocs.process(ngDocsOptions))
        .pipe(gulp.dest('./docs'));
});

gulp.task('view_ngDocs', ['documentation'], function() {
var connect = require('gulp-connect');
  connect.server({
    root: 'docs',
    livereload: false,
    fallback: './docs/index.html',
    port: 8083
  });
});
