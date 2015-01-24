// Include gulp
var gulp = require('gulp');
 // Define base folders
var src = 'src/';
var dest = 'public/';
 // Include plugins
var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});
 // Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src(src + 'js/*.js')
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest(dest + 'js'));
});
 // Compile CSS from less files
gulp.task('less', function() {
    return gulp.src(src + 'less/app.less')
      .pipe(plugins.less())
      .pipe(gulp.dest(dest + 'css'));
});

 // Watch for changes in files
gulp.task('watch', function() {
   // Watch .js files
  gulp.watch(src + 'js/*.js', ['scripts']);
   // Watch .scss files
  gulp.watch(src + 'less/*.less', ['less']);
 });
 // Default Task
gulp.task('default', ['scripts', 'less', 'watch']);