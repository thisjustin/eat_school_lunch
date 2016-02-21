'use strict';

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('default', function(cb) {
    global.watch = true;
    gulpSequence('build:dev', ['watch'], cb);
});

gulp.task('stage', function(cb) {
    global.watch = false;
    gulpSequence('build:dev', cb);
});

gulp.task('prod', function(cb) {
    global.watch = false;
    gulpSequence('build:dev', cb);
});