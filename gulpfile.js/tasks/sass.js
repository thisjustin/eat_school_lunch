'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config/sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var handleErrors = require('../lib/handleErrors');
var plumber = require('gulp-plumber');

gulp.task('sass', function() {
    return gulp.src(config.src)
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        // TODO sourcemaps is currently throwing errors, revist this
        //.pipe(sourcemaps.init({
        //	debug: true
        //}))
        .pipe(sass(config.settings))
        //.pipe(sourcemaps.write({
        //	debug: true,
        //	sourceRoot: './source/sass'
        //}))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(gulp.dest(config.dest));
});