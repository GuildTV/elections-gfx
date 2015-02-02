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
  return gulp.src(src + 'js/**/*.js')
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest(dest + 'js'));
});

gulp.task('data', function() {
  return gulp.src(src + 'data/**/*.js')
    .pipe(plugins.concat('data.js'))
    .pipe(gulp.dest(dest + 'js'));
});
 // Compile CSS from less files
gulp.task('less', function() {
    return gulp.src(src + 'less/app.less')
      .pipe(plugins.less())
      .pipe(gulp.dest(dest + 'css'));
});

// Compile handle templates 
gulp.task('templates', function(){
  gulp.src(src + 'js/templates/*.hbs')
    .pipe(plugins.handlebars())
    .pipe(plugins.wrap('Handlebars.template(<%= contents %>)'))
    .pipe(plugins.declare({
      namespace: 'App.templates',
      noRedeclare: true, // Avoid duplicate declarations 
    }))
    .pipe(plugins.concat('templates.js'))
    .pipe(gulp.dest(src +'js/'));
});

 // Watch for changes in files
gulp.task('watch', function() {
  // Watch .hbs files
  gulp.watch(src + 'js/templates/*.hbs', ['templates']);
  // Watch .js files
  gulp.watch(src + 'js/**/*.js', ['scripts']);
  // Watch .js files
  gulp.watch(src + 'data/**/*.js', ['data']);
  // Watch .scss files
  gulp.watch(src + 'less/**/*.less', ['less']);
 });
 // Default Task
gulp.task('default', ['templates', 'data', 'scripts', 'less', 'watch']);