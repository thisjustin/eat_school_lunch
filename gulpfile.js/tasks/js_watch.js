'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var browserifyinc = require('browserify-incremental');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var bundleLogger = require('../lib/bundleLogger');
var handleErrors = require('../lib/handleErrors');
var config = require('../config/javascript');
var babelify = require('babelify');

/**
 * Run JavaScript through Browserify
 */
gulp.task('js:watch', function(callback) {
// based on http://stefanimhoff.de/2014/gulp-tutorial-5-javascripts-browserify/
    var bundleQueue = config.browserify.bundleConfigs.length;

    var browserifyThis = function(bundleConfig) {
        var devOptions = {
            // enable caches locally for faster incremental builds
            // Required watchify args
            cache: {},
            packageCache: {},
            fullPaths: true,
            cacheFile: 'browserify-cache.json',
            // Specify the entry point of your app
            entries: bundleConfig.entries,
            // Add file extentions to make optional in your requires
            extensions: config.browserify.extensions,
            // Enable source maps!
            debug: true,
            // don't automatically insert some global node vars - if an npm module isn't working try setting this to true
            insertGlobals: false,
            // list of npm global vars we are using
            insertGlobalVars: 'global',
            poll: true
        };

        var prodOptions = {
            // disable caches in stage / prod to prevent stale builds
            fullPaths: true,
            // Specify the entry point of your app
            entries: bundleConfig.entries,
            // Add file extentions to make optional in your requires
            extensions: config.browserify.extensions,
            // Enable source maps!
            debug: true,
            // don't automatically insert some global node vars - if an npm module isn't working try setting this to true
            insertGlobals: false,
            // list of npm global vars we are using
            insertGlobalVars: 'global'
        };

        // only run incremental optimized browserify locally
        var bundler = (config.dev) ? browserifyinc(devOptions) : browserify(prodOptions);

        var bundle = function() {
            // Log when bundling starts
            bundleLogger.start(bundleConfig.outputName);

            return bundler
                .bundle()
                // Report compile errors
                .on('error', handleErrors)
                // Use vinyl-source-stream to make the
                // stream gulp compatible. Specifiy the
                // desired output filename here.
                .pipe(source(bundleConfig.outputName))
                // Specify the output destination
                .pipe(gulp.dest(bundleConfig.dest))
                .on('end', reportFinished);
        };

        if (config.dev) {
            // Wrap with watchify and rebundle on changes only in dev env
            bundler = watchify(bundler)
                .transform(babelify);

            // Rebundle on update
            bundler.on('update', bundle);
        } else {
            // for stage / prod just run browserify and babel, don't watch
            bundler.transform(babelify);
        }

        var reportFinished = function() {
            // Log when bundling completes
            bundleLogger.end(bundleConfig.outputName);

            if(bundleQueue) {
                bundleQueue--;
                if(bundleQueue === 0) {
                    // If queue is empty, tell gulp the task is complete.
                    // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
                    callback();
                }
            }
        };

        return bundle();
    };

    // Start bundling with Browserify for each bundleConfig specified
    config.browserify.bundleConfigs.forEach(browserifyThis);
});