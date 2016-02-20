/*
 *   Put global methods here that are shared across all pages
 */
'use strict';

let cookies = require('cookie-getter');
//let _ = require('lodash');

/*! Tiny Pub/Sub - v0.7.0 - 2013-01-29
* https://github.com/cowboy/jquery-tiny-pubsub
* Copyright (c) 2013 "Cowboy" Ben Alman; Licensed MIT */
(function($) {

  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };

}(jQuery));


global.ESL = {
    ns: function ns(namespace) {
        // generate namespaces to help us organize our code in the global scope
        let nsparts = namespace.split('.');
        let parent = global.ESL;

        if (nsparts[0] === 'ESL') {
            nsparts = nsparts.slice(1);
        }

        for (let i = 0; i < nsparts.length; i++) {
            let partname = nsparts[i];
            if (typeof parent[partname] === 'undefined') {
                parent[partname] = {};
            }
            parent = parent[partname];
        }

        return parent;
    },
    C: { // global constants
        API_BASE: '/api/v1',
        EMAIL_REGEX: /^[\w\+\-\.]+\@[\w\-]+[\.]+[\w\-]+[\w\-\.]+$/i
    },
    capitalize: function capitalize(str) {
        // capitalize first letter of string
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    qs: function qs(queryString) {
        /*
         Takes in query string and returns a dictionary of any params found

         :qs is optional - will use current URL if not supplied
         */
        let query = (queryString === undefined) ? window.location.search.substring(1) : queryString.split('?')[1];
        let vars = query.split('&');
        let data = {};

        for (let i = 0, len = vars.length; i < len; i++) {
            let pair = vars[i].split('=');
            data[pair[0]] = pair[1];
        }

        return data;
    },
    isInt: function isInt(value) {
        /*
         Is the given value an integer?

         :value - value to test

         Returns boolean
         */
        if (value === '') {
            return false;
        }

        try {
            return !isNaN(value) && parseInt(Number(value), 10) == value;
        } catch(err) {
            return false;
        }
    },
    ellipser: function ellipser(cfg) {
        /*
         Shortens strings to specified length and adds '...'
         */
        cfg = cfg || {};
        let str = (cfg.str === undefined || cfg.str === null) ? '' : cfg.str;
        let max = (cfg.max === undefined) ? 10 : cfg.max;

        if (str.length > max) {
            return `${str.substr(0, max)}...`;
        } else {
            return str;
        }
    },
    isLoading: function isLoading() {
        // is an ajax request in progress?
        return AJAX_COUNT !== 0;
    },
    spinnerPosition: function spinnerPosition(element) {
        /**
         * positions loader within an element
         * @param {Object} element element of node to position spinner within
         */

        let containerPosition = element.offset(),
            containerWidth = element.width(),
            spinner = $('#loadingSpinner');

        // position spinner
        spinner.css({
            "margin-left": `${containerPosition.left}px`,
            "width": `${containerWidth}px`,
            "top": `${containerPosition.top}px`,
            "height": `${$(window).height() - containerPosition.top}px`
        });

    },
    subscribe: function() {
        /*
        *   Loops over all attributes (methods in this case) of an ES6 class
        *   and takes the ones that start with _on_ and parses out an event listener
        *   to subscribe to using tiny pub / sub.
        *
        *   DOES NOT WORK ON REGULAR FUNCTIONS, ONLY ES6 CLASSES see subscribeModule for ES5
        *
        *   Classes must have an name attribute
        *
        *   ex: to subscribe to foo event create a function named _on_foo in your class
        */
        let event;
        let eventPrefix = '_on_';
        // ES6 class methods are not enumerable thus the Object hackery
        let props = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

        if (this.name === undefined) {
            alert('Error in ESL.subscribe() : name must exist on implementing class');
            return;
        }

        for (let i = 0, len = props.length; i < len; i++) {
            let property = props[i];
            if (property.substring(0,4) === eventPrefix) {
                event = property.replace(eventPrefix, '');
                $.subscribe(`${event}.${this.name}`, $.proxy(this[property], this));
            }
        }
    },
    subscribeModule: function() {
        /*
        *   Same as subscribe but for non-ES6 modules
         */
        let event;
        let eventPrefix = '_on_';

        if (this.name === undefined) {
            alert('Error in ESL.subscribeModule() : name must exist on implementing module');
            return;
        }

        for (let prop in this) {
            if (prop.substring(0,4) === eventPrefix) {
                event = prop.replace(eventPrefix, '');
                $.subscribe(`${event}.${this.name}`, $.proxy(this[prop], this));
            }
        }
    }
    //deepDiffObjects: function(oldObj, newObj) {
    //    let changes = {};
    //
    //    for (let prop in newObj) {
    //        if (!oldObj || oldObj[prop] !== newObj[prop]) {
    //            if (newObj[prop] !== null && typeof newObj[prop] == 'object') {
    //                let c = global.ESL.deepDiffObjects(oldObj[prop], newObj[prop]);
    //
    //                if (! _.isEmpty(c) ) {
    //                    changes[prop] = c;
    //                }
    //            } else {
    //                changes[prop] = newObj[prop];
    //            }
    //        }
    //    }
    //    return changes;
    //}
};

/*
    Global AJAX setup
    This must exist outside of document.ready to catch all ajax calls
    Count ajax requests and display loading spinner if any are active and take longer than timeout time to return
 */
global.AJAX_COUNT = 0;
global.AJAX_TIMEOUT = undefined;

$.ajaxSetup({
    // set csrf token globally so we never have to worry about it
    headers: {
        'X-CSRFToken': cookies('csrftoken')
    },
    // do not cache requests
    cache: false,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8'
});

$(document).on('ajaxSend', function() {
    global.AJAX_COUNT += 1;

    // don't show loading until after some time passes to prevent quick flashes of spinner
    if (global.AJAX_TIMEOUT) {
        clearTimeout(global.AJAX_TIMEOUT);
    }

    global.AJAX_TIMEOUT = setTimeout(function() {
        if (global.ESL.isLoading()) {
            $('#loadingSpinner').show();
        }
    }, 500);
});

$(document).on('ajaxComplete', function() {
    global.AJAX_COUNT -= 1;
    if (global.AJAX_COUNT === 0) {
        $('#loadingSpinner').hide();
    }
});