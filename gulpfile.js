var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var wrapper = require('gulp-wrapper');

gulp.task('scripts', function () {
	gulp.src(['src/eventemitter.js'])
	.pipe(wrapper({
		header: `(function () {`,
		footer: `}).call(this);`
	}))
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
})
