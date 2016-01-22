'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean:cache', function() {
    // this cache can get out of sync causing build issues
    return gulp.src('browserify-cache.json', {read: false})
        .pipe(clean());
});