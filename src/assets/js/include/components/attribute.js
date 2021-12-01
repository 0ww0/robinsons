/**
 * Get a data attribute as an array of arguments.
 *
 * Assuming we use $('[data-instance]').dataArgs('instance'), below is what we
 * can expect the function to return:
 *
 *      var argsVariable = { item: '.selector', force: true };
 *
 *      <div data-instance></div> // Returns [''];
 *      <div data-instance=".selector"></div> // Returns ['.selector'];
 *      <div data-instance="false"></div> // Returns [false];
 *      <div data-instance="item: .selector; force: true;"></div> // Returns [{ item: '.selector', force: true }];
 *      <div data-instance="argsVariable"></div> // Returns [{ item: '.selector', force: true }];
 */
(function() {
    var argsListRegex = /([^:;]*):([^:;]*);/g;
    var numberRegex = /^[\d.\-\+]+$/;

    function normaliseKey(str) {
        return str.trim();
    };

    function normaliseVal(str) {
        var normalisedStr = str.trim();

        if(normalisedStr === 'true') {
            return true;
        } else if(normalisedStr === 'false') {
            return false;
        } else if(normalisedStr === 'null') {
            return null;
        } else if(normalisedStr === 'undefined') {
            return undefined;
        } else if(numberRegex.test(normalisedStr)) {
            return parseFloat(normalisedStr, 10);
        } else {
            return normalisedStr;
        }
    };

    $.fn.dataArgs = function(key) {
        var data = this.data(key);

        if(typeof data === 'string' && data) {
            // Check if the string is a reference to a global variable

            var variableReference = window[data];

            if(typeof variableReference === 'object') {
                if(variableReference instanceof Array) {
                    return variableReference;
                }

                return [variableReference];
            }

            // Check if it's an argument list

            var matches = data.match(argsListRegex);

            if(matches !== null) {
                var dataObj = {};

                data.replace(argsListRegex, function(match, key, val) {
                    var normalisedKey = normaliseKey(key);
                    var normalisedVal = normaliseVal(val);
                    dataObj[normalisedKey] = normalisedVal;
                });

                return [dataObj];
            }
        }

        // For everything else, leave the data untouched, but wrap
        // it in an array.
        return [data];
    };
})();

function publicClone(obj) {
    var cloneObj = $.extend({}, obj);

    $.each(cloneObj, function(key) {
        if(key.charAt(0) === '_') {
            delete cloneObj[key];
        }
    });

    return cloneObj;
}

function isExistingJqueryElem(a) {
    return typeof a === 'object'
        && a instanceof jQuery
        && a.length;
}

/**
 * Returns a function that is throttled. Throttled functions run only
 * once every XXX ms, no matter how often the user triggers it.
 *
 * @param {Function / Object} props - The function that you want to throttle, or alternatively
 *                                    an object containing several properties.
 *
 * If passing in an object, the usable properties are as follows:
 *
 * @property {String} runWhen - Determines whether the function should run at the beginning or
 *                              at the end of its throttle.
 * @property {Number} duration - Determines the duration of each throttle.
 * @property {Function} fn - The function that you want to throttle.
 *
 * @return {Function}
 */
function throttle(props) {
    var defaults = {
        fn: undefined,
        duration: 250,
        runWhen: 'end'
    };

    if(typeof props === 'function') {
        props = $.extend(defaults, {
            fn: props
        });
    } else {
        props = $.extend(defaults, props);
    }

    var throttledFn;

    if(typeof props.fn === 'undefined') {
        console.warn('_utilities.js: Throttle function is missing an actual function to throttle.');
        throttledFn = function() {};
    } else {
        var last = new Date(
                (props.runWhen === 'end')
                ? undefined
                : 0
            ),
            timer;

        throttledFn = function() {
            var now = new Date(),
                diff = now - last;

            clearTimeout(timer);

            if(props.runWhen === 'end'
            && diff >= Math.min(props.duration*2, props.duration+1000)) {
                last = now;

                timer = setTimeout(function() {
                    props.fn.apply(this, arguments);
                    last = new Date();
                }, props.duration);
            } else if(diff >= props.duration) {
                props.fn.apply(this, arguments);
                last = now;
            } else {
                timer = setTimeout(function() {
                    props.fn.apply(this, arguments);
                    last = new Date();
                }, props.duration-diff);
            }
        };
    }

    return throttledFn;
};

function queryStr(key) {
    var search = window.location.search;
    var props;

    if(search) {
        props = {};

        if(search.charAt(0) === '?') {
            search = search.substr(1);
        }

        var splitSearch = search.split('&');

        $.each(splitSearch, function(index, val) {
            var splitPair = val.split('=');
            props[splitPair[0]] = splitPair[1];
        });
    }

    if(props && typeof key === 'string' && key) {
        return props[key];
    } else {
        return props;
    }
}

window.queryStr = queryStr;

/* Returns a function that is throttled. Throttled functions
 * run only once every XXX ms, no matter how often the user
 * triggers it. */
var makeThrottledFn = function(fn, duration, start) {
    var last = (typeof start === 'number')
             ? new Date(start)
             : new Date(0),
        timer;

    if(typeof duration !== 'number') {
        duration = 250;
    }

    return function() {
        var now = new Date(),
            diff = now - last;

        clearTimeout(timer);

        if(diff >= duration) {
            fn();
            last = now;
        } else {
            timer = setTimeout(function() {
                fn();
                last = new Date();
            }, diff);
        }
    };
};
