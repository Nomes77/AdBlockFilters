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
/// click-element.js
/// alias ce.js
// example.com##+js(ce,#badbutton)
(() => {
    var selector = '{{1}}';
    if ( selector === '' || selector === '{{1}}' ) {
        return;
    }
    var click = function() {
        var elements = document.querySelectorAll(selector);
        for ( var element of elements ) {
            element.click();
        }
    };
    if ( document.readyState === 'interactive' ||
         document.readyState === 'complete' ) {
        click();
    } else {
        addEventListener('DOMContentLoaded', click);
    }
})();

/// click-element-timout.js
/// alias cet.js
// example.com##+js(cet,#badbutton,1000)
(() => {
    let selector = '{{1}}';
    let timeout = {{2}};
    if ( selector === '' || selector === '{{1}}' ) {
        return;
    }
    if ( timeout == null || timeout == undefined ) {
        let timeout = 0;
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
