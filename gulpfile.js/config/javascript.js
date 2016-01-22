'use strict';

var config = require('./');
var _ = require('lodash');

module.exports = _.assign({
    src: config.sourceDirectory + '/js/**/*.js',
    baseSrc: config.sourceDirectory.replace(/(\.|\/)/g, '') + '/js/',
    vendorSrc: config.sourceDirectory + '/js/vendor/**/*.js',
    vendorDest: config.publicDirectory + '/js/vendor',
    dest: config.publicDirectory + '/js',
    browserify: {
        debug: config.dev,
        extensions: [],
        bundleConfigs: [
            // add every JS file we want compiled here (basically everything in source/js/pages)
            {
                entries: config.sourceDirectory + '/js/pages/test.js',
                dest: config.publicDirectory + '/js/pages',
                outputName: 'test.js'
            }
        ]
    }
}, config);