'use strict';

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('js:build', function(cb) {
    gulpSequence('js:watch', cb);
});