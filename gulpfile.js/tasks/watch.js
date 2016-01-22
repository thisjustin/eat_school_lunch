'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('../config/sass');
//var images = require('../config/images');
//var fonts = require('../config/fonts');

gulp.task('watch', function() {
    watch(sass.src, function() {
        gulp.start('sass:build');
    });

    //watch(images.src, function() {
    //    gulp.start('images');
    //});
    //
    //watch(fonts.src, function() {
    //    gulp.start('fonts');
    //});
});