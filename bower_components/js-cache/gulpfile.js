var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    stylus = require('gulp-stylus'),
    es = require('event-stream'),
	livereload = require('gulp-livereload');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('inject', function() {
	return gulp.src('./web/index.html')
	.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
	.pipe(inject(gulp.src([
			'web/app/app.js',
			'web/app/routes/routes.js',
			'web/app/modules/**/*.js',
			'build/*.js'
		],{read: false})))
	.pipe(gulp.dest('./web'));
});	

gulp.task('watch', function() {
	livereload.listen();
	//gulp.watch("./web/**/*.js", ['build']);
	gulp.watch("./web/**/*.html", browserSync.reload);
});

gulp.task("build", function () {
	gulp.src("./web/lib/js-cache/js-cache.js")
		.pipe(uglify())
		.pipe(rename("js-cache-min.js"))
		.pipe(gulp.dest('./build/'));
});

// Static server
gulp.task('serve', ['build', 'inject', 'watch'] , function() {
    browserSync.init({
        server: {
            baseDir: "./web",
			routes: {
				"/bower_components": "bower_components",
				"/static": "static",
				"/web": "web",
				"/build": "build"
			}
        },
		port : 3003,
		ghostMode: false
    });
});