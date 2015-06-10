// https://github.com/unlight/gulp-cssimport
var gulp = require('gulp'),
    cssimport = require("gulp-cssimport"),
    sass = require('gulp-sass');

var globalConfig = {
  src: 'SCSS' // your dev stylesheet directory. No trailing slash
};

// Process CSS
gulp.task('styles', function(){
  return gulp.src(globalConfig.src + '/**/*.*')
    .pipe(cssimport())
    .pipe(gulp.dest('assets/'));
});

// Watch files
gulp.task('watch', function () {
  gulp.watch(globalConfig.src + '/**/*.*', ['styles']);
});

// Default task
gulp.task('default', ['watch']);