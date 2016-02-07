// Include gulp
var gulp = require('gulp'),
  util     = require('gulp-util');
 // Define base folders
var src = 'src/';
var dest = 'public/';
 // Include plugins
var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

gulp.task('data', function() {
  return gulp.src(src + 'data/**/*.js')
    .pipe(plugins.concat('data.js'))
    .pipe(gulp.dest(dest + 'js'));
});
 // Compile CSS from less files
gulp.task('less', function() {
    return gulp.src(src + 'less/app.less')
      .pipe(plugins.less().on('error', util.log))
      .pipe(gulp.dest(dest + 'css'));
});

 // Watch for changes in files
gulp.task('watch', function() {
  // Watch .js files
  gulp.watch(src + 'data/**/*.js', ['data']);
  // Watch .scss files
  gulp.watch(src + 'less/**/*.less', ['less']);
 });
 // Default Task
gulp.task('default', ['data', 'less', 'watch']);