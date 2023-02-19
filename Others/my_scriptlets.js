// this is from https://github.com/uBlock-user/uBO-Scriptlets/commit/3d1f48573749ac85b20031f78e0d5f7c7bb0f3af#
/// cookie-set.js
/// alias cs.js
// example.com##+js(cs, name, value, age)
(() => {
    'use strict';
    const cs = ev => {
        if (ev) { window.removeEventListener(ev.type, cs, true); }
        try {
            document.cookie = '{{1}}={{2}}; max-age={{3}}; secure; path=/;';
        } catch { }
    };
    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', cs, true);
    } else {
        cs();
    }
})();	

// based on https://github.com/NanoAdblocker/NanoFilters/blob/master/NanoFilters/NanoResources.txt#L283
// You can optional set a timeout in milliseconds.
// If not set, it will click directly.
// example.com##+js(ce,#badbutton)
// example.com##+js(ce,#badbutton,1000)
/// click-element.js
/// alias ce.js
(() => {
    let selector = '{{1}}';
    if ( selector === '' || selector === '{{1}}' ) {
        return;
    }
    let msecs = '{{2}}';
    if ( msecs === '{{2}}' ) {
        msecs = '';
    }
    let timeout = parseInt(msecs, 10);
    if ( isNaN(timeout) || isFinite(timeout) === false ) {
        timeout = 0;
    }
    var click = function() {
        var elements = document.querySelectorAll(selector);
        for ( var element of elements ) {
            element.click();
        }
    };
    setTimeout(function() {
        if ( document.readyState === 'interactive' ||
             document.readyState === 'complete' ) {
            click();
        } else {
            addEventListener('DOMContentLoaded', click);
        }
    }, timeout);
})();
