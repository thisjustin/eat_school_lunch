'use strict';

var gulp = require('gulp');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var config = require('../config/images');

gulp.task('images', function() {
    return gulp.src(config.src)
        .pipe(changed(config.dest), {hasChanged: changed.compareLastModifiedTime})
        .pipe(imagemin(config.settings))
        .pipe(gulp.dest(config.dest));
});