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

var react = require('gulp-react')

 // Concatenate & Minify JS
gulp.task('scripts', ['jsx'], function() {
  return gulp.src(src + 'js/**/*.js')
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest(dest + 'js'));
});

gulp.task('jsx', function() {
  return gulp.src(src + 'jsx/**/*.js')
    .pipe(react({harmony: true}))
    .pipe(gulp.dest(src + 'js/build'));
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
  gulp.watch(src + '*/**/*.js', ['scripts']);
  // Watch .js files
  gulp.watch(src + 'data/**/*.js', ['data']);
  // Watch .scss files
  gulp.watch(src + 'less/**/*.less', ['less']);
 });
 // Default Task
gulp.task('default', ['data', 'scripts', 'less', 'watch']);