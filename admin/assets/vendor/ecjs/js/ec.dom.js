/*! EC.js - v0.1.0 - 2013-05-15
* Copyright (c) 2013 Emilio Cobos Álvarez; Licensed MIT */
(function(e,t){"use strict";EC.DOM=EC.DOM||{};var n=function(e){for(var t=[],n=e.length;n--;t.unshift(e[n]));return t},r=function(){var e={};return function(t){return e.hasOwnProperty(t)||(e[t]=RegExp("\\b("+t+")\\b","g")),e[t]}}();EC.core.extend(EC.DOM,{select:function(e,t){return new EC.DOMInstance(e,t)},create:function(e,t){var n,r=document.createElement(e);for(n in t)t.hasOwnProperty(n)&&"style"!==n&&"attributes"!==n&&(r[n]=t[n]);if(t.style&&EC.core.extend(r.style,t.style),t.attributes)for(n in t.attributes)t.attributes.hasOwnProperty(n)&&r.setAttribute(n,t.attributes[n]);return EC.DOM.select(r)},supportsProp:function(){var t=document.createElement("_"),n={},r=["Webkit","Moz","Ms","O","webkit","moz","ms","o"],s=r.length;return function(i,o){var c,a=0;if(n[i])return n[i];if(c=o?"boolean"==typeof o?t:o:e,i in c)return n[i]=i,i;for(i=i.charAt(0).toUpperCase()+i.substring(1);s>a;a++)if(r[a]+i in c)return n[i]=r[a]+i,n[i];return!1}}(),matchesSelector:function(e,t){var n;if(n=EC.DOM.supportsProp("matchesSelector",e))return e[n](t);switch(t.substring(0,1)){case".":return r(t.substring(1)).test(e.className);case"#":return e.id===t.substring(1);default:return e.nodeName.toLowerCase()===t.toLowerCase()}},event:{add:function(n,r,s,i){var o=function(r){return r=r||e.event,r.preventDefault||(r.preventDefault=function(){r.returnValue=!1}),r.stopPropagation||(r.stopPropagation=function(){r.cancelBubble=!0}),r.target||(r.target=r.srcElement),!r.keyCode&&r.which&&(r.keyCode=r.which),s?(EC.DOM.matchesSelector(r.target,s)&&i.call(r.target,r),t):(i.call(n,r),t)};return i||(i=s,s=null),n.addEventListener?n.addEventListener(r,o,!1):n.attachEvent("on"+r,o),!0}}}),EC.DOMInstance=function(e,t){if(t&&(("string"==typeof t||t.nodeType)&&(t=new EC.DOMInstance(t)),t instanceof EC.DOMInstance))return t.find(e);if(e)if(e.nodeType)this.els=[e];else if("string"==typeof e)switch(e){case"body":this.els=[document.body];break;case"html":this.els=[document.documentElement];break;default:this.els=/^#([0-9A-Z-_])$/i.test(e)?[document.getElementById(RegExp.$1)]:n(document.querySelectorAll(e))}else e.length&&(this.els=n(e));else this.els=[];return this},EC.core.extend(EC.DOMInstance.prototype,{els:[],forEach:function(e){return EC.core.forEach(this.els,e),this},attr:function(e,n){var r;return n===t?(r=this.els[0])?r.getAttribute(e):null:this.forEach(function(t){t.setAttribute(e,n)})},addClass:function(e){var t=r(e);return this.forEach(function(n){t.test(n.className)||(n.className+=" "+e)})},removeClass:function(e){var t=r(e.split(" ").join("|"));return this.forEach(function(e){e.className=e.className.replace(t,"")})},hasClass:function(e){var t,n=r(e);return(t=this.els[0])?n.test(t.className):!1},get:function(e){return e!==t?this.els[e]:this.els},first:function(e){var n=this.els[0];return e===t?new EC.DOMInstance(n):new EC.DOMInstance(n.querySelector(e))},append:function(e){var t=this.els[0];return t?("string"==typeof e?t.insertAdjacentHTML("beforeend",e):e instanceof EC.DOMInstance?e.forEach(function(e){t.appendChild(e)}):t.appendChild(e),this):this},appendTo:function(e){return("string"==typeof e||e.nodeType)&&(e=EC.DOM.select(e)),this.forEach(function(t){e.append(t)})},prepend:function(e){var t,n=this.els[0];return n?("string"==typeof e?n.insertAdjacentHTML("afterbegin",e):(t=n.firstChild)?e instanceof EC.DOMInstance?e.forEach(function(e){n.insertBefore(e,t)}):n.insertBefore(e,t):e instanceof EC.DOMInstance?e.forEach(function(e){n.appendChild(e)}):n.appendChild(e),this):this},prependTo:function(e){return("string"==typeof e||e.nodeType)&&(e=EC.DOM.select(e)),this.forEach(function(t){e.prepend(t)})},before:function(e){var t,n=this.els[0];return n?("string"==typeof e?n.insertAdjacentHTML("beforebegin",e):(t=n.parentNode,e instanceof EC.DOMInstance?e.forEach(function(e){t.insertBefore(e,n)}):t.insertBefore(e,n)),this):this},after:function(e){var t,n,r=this.els[0];return r?("string"==typeof e?r.insertAdjacentHTML("afterend",e):(t=r.parentNode,n=r.nextSibling,e instanceof EC.DOMInstance?e.forEach(function(e){t.insertBefore(e,n)}):t.insertBefore(e,n)),this):this},on:function(e,t,n){return this.forEach(function(r){EC.DOM.event.add(r,e,t,n)})},find:function(e){var t=[],r=new EC.DOMInstance;return this.forEach(function(r){t=t.concat(n(r.querySelectorAll(e)))}),r.els=t,r},css:function(e,n){return n!==t?this.forEach(function(t){t.style[e]=n}):this.forEach(function(t){var n;for(n in e)e.hasOwnProperty(n)&&(t.style[n]=e[n])})},remove:function(){return this.forEach(function(e){e.parentNode&&e.parentNode.removeChild(e)})},animate:function(){var e,t=EC.DOM.supportsProp("transition",document.documentElement.style),n={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};return t===!1?function(e,t,n,r){return this.css(e),r&&"function"==typeof r?this.forEach(function(e){r.call(e)}):this}:(e=n[t],function(n,r,s,i){var o,c=[];if(!this.els[0])return this;r||(r=600),s||(s="ease"),r/=1e3;for(o in n)n.hasOwnProperty(o)&&c.push(o+" "+r+"s "+s);return c=c.join(","),i&&"function"==typeof i&&this.forEach(function(t){t.addEventListener(e,function n(r){i.call(t,r),t.removeEventListener(e,n)},!1)}),this.forEach(function(e){e.style[t]=c}),this.els[0].offsetWidth,this.css(n)})}()}),"function"!=typeof e.$&&(e.$=EC.DOM.select),document.querySelectorAll||function(){var t=document.documentElement.firstChild,n=document.createElement("style");t.appendChild(n),document.querySelectorAll=function(t){return document.__qsaels=[],n.styleSheet.cssText=t+"{x:expression(document.__qsaels.push(this))}",e.scrollBy(0,0),document.__qsaels}}(),document.querySelector||(document.querySelector=function(e){return document.querySelectorAll(e)[0]||null})})(window);