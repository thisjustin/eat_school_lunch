'use strict';

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var config = require('../config');

gulp.task('build:dev', function(cb) {
    if (config.stage) {
        console.log('\n\n running STAGE tasks...\n\n');
    } else if (config.prod) {
        console.log('\n\n running PROD tasks...\n\n');
    }

    gulpSequence(['clean', 'clean:cache'], ['sass:build','js:build', 'js:vendor', 'images'], cb);
});