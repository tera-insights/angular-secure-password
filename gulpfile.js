var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  // place code for your default task here
});
 
gulp.task('compress', function() {
  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});