var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var livereload = require('gulp-livereload');

gulp.task('overlay', function () {
  return gulp
    .src('./assets/less/overlay/overlay.less')
    .pipe(require('gulp-debug')()) // This was the line that needed fixing
    .pipe(less({
      paths: ['assets/overlay','assets/less/overlay/partials']
    }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(livereload());
});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.watch('overlay');

  // Watch files and run tasks if they change
  gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./assets/less/overlay/**/*.less', ['overlay']);
  });
});