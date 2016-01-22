'use strict';

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('sass:build', function(cb) {
    gulpSequence('sass', cb);
});