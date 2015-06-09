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




// convert scss to css in the same folder
gulp.task('sass', function () {
  gulp.src('./assets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/**/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['watch', 'sass:watch']);