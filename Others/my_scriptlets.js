// https://github.com/uBlock-user/uBO-Scriptlets/commit/3d1f48573749ac85b20031f78e0d5f7c7bb0f3af#
/// setCookie.js
/// alias sc.js
/// alias cs.js
// example.com##+js(cs, name, value, age)
(() => {
    'use strict';
    const cs = ev => {
        if (ev) {
            window.removeEventListener(ev.type, cs, true);
        }
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

// https://gist.github.com/AdamWr/b32688adb0393d31525f445ee5ab4302#file-gistfile1-txt
/// setGoogleConstent.js
/// alias gc.js
/// alias sgc.js
// google.com##+js(gc)
(() => {
    try {
        var time = (new Date).getTime();
        // add 365 days
        var cookieDate = new Date(time + 1314E6);
        var hostname = location.host;
        var locSubString = null;
        if (!hostname.startsWith("google.") && !hostname.startsWith("youtube.")) {
            locSubString = hostname.substring(hostname.indexOf('.') + 1);
        }
        var loc = locSubString || hostname;
        // do nothing if consent cookie is already set
        if (document.cookie.indexOf('CONSENT=YES') !== -1) {
            return;
        }
        // set the cookie
        document.cookie = "CONSENT=YES+; domain=" + loc + "; path=/; expires=" + cookieDate.toUTCString();
    } catch (ex) {
        console.error('uBO: failed to set google consent cookie: ' + ex);
    }
})();

// https://github.com/uBlock-user/uBO-Scriptlets/commit/3d1f48573749ac85b20031f78e0d5f7c7bb0f3af#
/// setLocalStorageItem.js
/// alias slsi.js
/// alias si.js
// example.com##+js(si, key, value)
(() => {
    'use strict';
    const key = '{{1}}';
    if ( key === '' || key === '{{1}}' ) { return; }
    const value = '{{2}}';
    if ( value === '' || value === '{{2}}' ) { return; }
    const setItem = ev => {
        if (ev) {
            window.removeEventListener(ev.type, setItem, true);
        }
        try {
		    if (localStorage.getItem(key) !== null) { return; }
            localStorage.setItem(key, value);
        } catch { }
    };
    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', setItem, true); 
    } else {
        setItem();
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

/// click-element-observer.js
/// alias ceo.js
(() => {
  const c=new MutationObserver(function() {
    const a = document.querySelector('{{1}}');
    a&&(c.disconnect(),a.click())
  });
  c.observe(document,{ childList:!0,subtree:!0 }),
  setTimeout(function() {
    c.disconnect()
  },1E4)
})();
