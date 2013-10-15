/*! EC.js - v0.1.0 - 2013-05-15
* Copyright (c) 2013 Emilio Cobos Álvarez; Licensed MIT */
(function(e,t){"use strict";var n=e.document,r=e.EC=e.EC||{baseScriptPath:function(){var e=n.getElementsByTagName("script"),t=e[e.length-1],r=t.getAttribute("data-ec-base-script-path");return null!==r?r:t.src?t.src.replace(/[a-z\.A-Z0-9]+\.js$/,""):null}(),plugins:{register:function(e,n){n===t&&(n=!0),r.plugins[e]=n}}},o=n.getElementsByTagName("script")[0],i={};r.core=r.core||{},r.core.extend=function(e,t){var n;for(n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},r.core.extend(r.core,{load:function(){var e={},n=function(e){var t=r.baseScriptPath;return 0===e.indexOf("plugins.")&&(e=e.substring(8),t+="plugins/"),t+"ec."+e.replace(/\//g,"_").toLowerCase()+".js"};return function(o,i){var s=n(o);e[o]===t?(e[o]=[i],r.core.loadJS(s,function(){r.core.forEach(e[o],function(e){e()})})):e[o].unshift(i)}}(),loaded:function(e){var n=r;return 0===e.indexOf("plugins.")&&(n=r.plugins,e=e.substring(8)),n[e]===t?!1:!0},require:function(e,n){var o;"string"==typeof e&&(e=[e]),o=function(){for(var t=e.length,o=0;t>o;o++)if(!r.core.loaded(e[o]))return;n&&"function"==typeof n&&n()},r.core.forEach(e,function(e){return r.core.loaded(e)?o():(r.core.load(e,o),t)})},loadJS:function(e,t){var r,i=n.createElement("script");i.async=!0,i.onload=i.onreadystatechange=function(){r||i.readyState&&"complete"!==i.readyState&&"loaded"!==i.readyState||(r=!0,t&&"function"==typeof t&&t.call(null,i))},i.src=e,o.parentNode.insertBefore(i,o)},loadCSS:function(e,r,s){var c=n.createElement("link");return s!==t?c.id=s:s=e,s in i?i[s]:(c.href=e,c.rel="stylesheet",c.type="text/css",i[s]=c,o.parentNode.insertBefore(c,o),r&&"function"==typeof r&&setTimeout(r,0),t)},forEach:function(e,t){for(var n=0,r=e.length;r>n;n++)t.call(e[n],e[n],n);return!0},parseJSON:function(t){return e.JSON&&e.JSON.parse?e.JSON.parse(t):Function("return "+t)()},htmlEscape:function(e){return e.replace(/&|<|>/g,function(e){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[e]})},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}}),r.require=r.core.require})(window);