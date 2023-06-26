// based on https://github.com/NanoAdblocker/NanoFilters/blob/master/NanoFilters/NanoResources.txt#L283
/// click-element.js
/// alias ce.js
// [required] 1: element to click; 
// [optional] 2: url should match given token; 3: timeout, if not set, it will click directly.
// example.com##+js(ce, element)
// example.com##+js(ce, element, href, timeout)
// example.com##+js(ce, element, , timeout)
(() => {
    let selector = '{{1}}';
    if ( selector === '' || selector === '{{1}}' ) {
        return;
    }
    let href = '{{2}}';
    if ( href === ''  || href === '{{2}}' ) {
        href = '';
    }
    let msecs = '{{3}}';
    if ( msecs === '{{3}}' ) {
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
    if (window.location.href.indexOf(href) !== -1 ) {
        setTimeout(function() {
            if ( document.readyState === 'interactive' ||
                 document.readyState === 'complete' ) {
                click();
            } else {
                addEventListener('DOMContentLoaded', click);
            }
        }, timeout);
    }
})();

// Taken from AdGuard
/// click-element-observer.js
/// alias ceo.js
// [required] 1: element to click;
// [optional] 2: url should match given token; 3: disconnectTimeout.
// example.com##+js(ceo, element)
// example.com##+js(ceo, element, href, disconnectTimeout)
// example.com##+js(ceo, element, , disconnectTimeout)
(() => {
    let aelem = '{{1}}';
    if ( aelem === '' || aelem === '{{1}}' ) {
        return;
    }
    let bhref = '{{2}}';
    if ( bhref === ''  || bhref === '{{2}}' ) {
        bhref = '';
    }
    let dmsecs = '{{3}}';
    if ( dmsecs === '{{3}}' ) {
        dmsecs = '';
    }
    let etimeout = parseInt(dmsecs, 10);
    if ( isNaN(etimeout) || isFinite(etimeout) === false ) {
        etimeout = 10000;
    }
    if ( window.location.href.indexOf(bhref) !== -1 ) {
        const o = new MutationObserver(function() {
            const e = document.querySelector(aelem);
            e && (o.disconnect(), e.click())
        });
        o.observe(document,{ childList:!0, subtree:!0 }),
        setTimeout(function() {
            o.disconnect()
        }, etimeout)
    }
})();
