var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    return gulp
            .src([
                './src/dropdown/index.js',
                './src/dropdown/dropdown/*.js',
                './src/dropdown/dropdown-item/*.js',
                './src/modal/index.js',
                './src/modal/directive.js',
                './src/popup/index.js',
                './src/popup/directive.js',
                './src/checkbox/index.js',
                './src/checkbox/directive.js',
                './src/radio/index.js',
                './src/radio/directive.js',
                './src/progress/index.js',
                './src/progress/directive.js',
                './src/tabs/index.js',
                './src/tabs/tab/*.js',
                './src/tabs/tabset/*.js',
                './src/index.js'
            ])
            .pipe(concat('semanticular.js'))
            .pipe(gulp.dest('./dist/'))
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['scripts']);
