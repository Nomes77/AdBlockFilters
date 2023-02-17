## Specific-General Hide
You can use this filter if you have enabled `Ignore general cosmetic filters` in uBlock Origin but still want some general hiding elements to be used. <br>
For this list I have used the default uBlock Filters and [EasyList (Optimized)](https://filters.adtidy.org/extension/ublock/filters/101_optimized.txt). <br>
My goal is to update this list once a month, maybe twice or even maybe every week. It depends on how much time I have.

### What I have done
1. Changed `##` from those lists to `*##`
2. I deleted every unblocking general hiding element from the results I got after I applied the first step

### Why
This list and enabling `Ignore general cosmetic filters` will save you around 11,000 cosmetic filters.
This can be handy especially if you are low on resources or want a little bit faster page loading.

***

## My Scriptlets.js
You can use this file in uBlock Origin, see [documentation](https://github.com/gorhill/uBlock/wiki/Advanced-settings#userresourceslocation). <br>

> #### `userResourcesLocation`
> Default: `unset`.
> 
> One or more space-separated URLs which content will be parsed as token-identified resources to be used for [`redirect`](https://github.com/gorhill/uBlock/wiki/Static-filter-syntax#redirect) or <br>
> [scriptlet-injection](https://github.com/gorhill/uBlock/wiki/Static-filter-syntax#scriptlet-injection) `(+js(...))` purpose.
> 
> uBO expects valid content such as can be seen in [scriptlets.js](https://github.com/gorhill/uBlock/blob/master/assets/resources/scriptlets.js), anything else will lead to undefined results.
> 
> Any duplicate as per token will result in the previous resource being replaced by the latter one. The resource files are loaded in <br>
> order of URL appearance, and uBO stock resource file is always loaded first.
> 
> Additional resources will be updated at the same time the built-in resource file is updated. Purging the cache of 'uBlock filters' <br>
> will also purge the cache of the built-in resource file -- and hence force a reload of user-specified resources if any.
> 
> The setting was introduced in [1.12.0](https://github.com/gorhill/uBlock/releases/tag/1.12.0). Support for multiple URLs was introduced in [1.19.0](https://github.com/gorhill/uBlock/releases/tag/1.19.0).
