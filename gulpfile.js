// https://github.com/unlight/gulp-cssimport
var gulp = require('gulp'),
    cssimport = require("gulp-cssimport"),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    include = require('gulp-include'),
    shell = require('gulp-shell'),

    sass_folder = {src: '_DEV_/SCSS'},
    js_folder = {src: '_DEV_/JS'};

// Process CSS
gulp.task('styles', function () {
    return gulp.src(sass_folder.src + '/**/*.*')
        .pipe(cssimport())
        .pipe(gulp.dest('./assets/'));
});

gulp.task('js', function () {
    gulp.src(js_folder.src + '/*.liquid')
        .pipe(include())
        .pipe(gulp.dest('./assets/'))
});

// Watch files
gulp.task('watch', function () {
    gulp.watch(sass_folder.src + '/**/*.*', ['styles']);
    gulp.watch(js_folder.src + '/**/*.*', ['js']);
});

gulp.task('shopifyThemeWatch', shell.task(['theme watch']));

// Default task
gulp.task('default', ['watch','shopifyThemeWatch']);