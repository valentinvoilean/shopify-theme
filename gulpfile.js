// https://github.com/unlight/gulp-cssimport
var gulp = require('gulp'),
    cssimport = require("gulp-cssimport"),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    include = require('gulp-include'),

    sass_folder = {src: '_DEV_/SCSS'},
    coffee_folder = {src: '_DEV_/JS'};

// Process CSS
gulp.task('styles', function () {
    return gulp.src(sass_folder.src + '/**/*.*')
        .pipe(cssimport())
        .pipe(gulp.dest('./assets/'));
});

gulp.task('coffee', function () {
    gulp.src(coffee_folder.src + '/*.coffee')
        .pipe(include())
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./assets/'))
});

// Watch files
gulp.task('watch', function () {
    gulp.watch(sass_folder.src + '/**/*.*', ['styles']);
    gulp.watch(coffee_folder.src + '/*.coffee', ['coffee']);
});

// Default task
gulp.task('default', ['watch']);