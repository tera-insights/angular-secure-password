var gulp = require('gulp');
var uglify = require('gulp-uglify');
var serve = require('gulp-serve');

gulp.task('default', function() {
    // place code for your default task here
});

gulp.task('compress', function() {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', serve({
    root: './',
    port: 8888
}));