// https://github.com/uBlock-user/uBO-Scriptlets/commit/3d1f48573749ac85b20031f78e0d5f7c7bb0f3af#
/// setCookie.js
/// alias sc.js
/// alias cs.js
// example.com##+js(cs, name, value, age, domain, path, SameSite)
// name and value are required, the others are options
(() => {
    'use strict';
    const cs = () => {
        document.cookie = '{{1}}={{2}}; max-age={{3}}; domain={{4}}; path={{5}}; SameSite={{6}}; secure;';
    };
    if ( document.readyState === 'loading' ) {
        window.addEventListener('DOMContentLoaded', cs, true);
    } else
    if ( document.readyState === 'loaded' ||
         document.readyState === 'interactive' ||
         document.readyState === 'complete') {
        cs();
    } else {
        cs();
    }
})();

// https://github.com/uBlock-user/uBO-Scriptlets/blob/master/scriptlets.js
/// setLocalStorageItem.js
/// alias slsi.js
/// alias sli.js
// example.com##+js(sli, key, value)
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

(() => {
    const key = '{{1}}';
        if ( key === '' || key === '{{1}}' ) { return; }
        const keys = key.split(/\s*\|\s*/);
        const value = '{{2}}';
        const behavior = '{{3}}';
        const setItem = () => {
            let timer = undefined;
            try {
                for (const keyName of keys) {
                    if (localStorage.getItem(keyName) === value) { break; }
                    localStorage.setItem(keyName, value);
                 }
            } catch { }
        };
        const mutationHandler = mutations => {
            if ( timer !== undefined ) { return; }
            let skip = true;
            for ( let i = 0; i < mutations.length && skip; i++ ) {
                const { type, addedNodes, removedNodes } = mutations[i];
                if ( type === 'attributes' ) { skip = false; }
                for ( let j = 0; j < addedNodes.length && skip; j++ ) {
                    if ( addedNodes[j].nodeType === 1 ) { skip = false; break; }
                }
                for ( let j = 0; j < removedNodes.length && skip; j++ ) {
                    if ( removedNodes[j].nodeType === 1 ) { skip = false; break; }
                }
            }
			if ( skip ) { return; }
			timer = self.requestIdleCallback(setItem, { timeout: 10 });
		};
        const start = ( ) => {
            setItem();
            if ( /\bloop\b/.test(behavior) === false ) { return; }
            const observer = new MutationObserver(mutationHandler);
            observer.observe(document.documentElement, {
                attributes: true,
                childList: true,
                subtree: true,
            });
        };
        if ( document.readyState !== 'complete' && /\bcomplete\b/.test(behavior) ) {
            self.addEventListener('load', start, { once: true });
        } else if ( document.readyState === 'loading' ) {
            self.addEventListener('DOMContentLoaded', start, { once: true });
        } else {
            start();
    }
})();

// based on https://github.com/NanoAdblocker/NanoFilters/blob/master/NanoFilters/NanoResources.txt#L283
// You can optional set a timeout in milliseconds before it clicks.
// If not set, it will click directly.
// example.com##+js(ce, element)
// example.com##+js(ce, element, timeout)
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

// Taken from AdGuard
/// click-element-observer.js
/// alias ceo.js
// example.com##+js(ceo, element)
// example.com##+js(ceo, element, disconnectTimeout)
(() => {
    let a = '{{1}}';
    if ( a === '' || a === '{{1}}' ) {
        return;
    }
    let b = '{{2}}';
    if ( b === '{{2}}' ) {
        b = '';
    }
    let c = parseInt(b, 10);
    if ( isNaN(c) || isFinite(c) === false ) {
        c = 10000;
    }
    const d = new MutationObserver(function() {
        const e = document.querySelector(a);
        e&&(d.disconnect(),e.click())
    });
    d.observe(document,{ childList:!0, subtree:!0 }),
    setTimeout(function() {
        e.disconnect()
    }, c)
})();
