(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){if(!e.modeURL)e.modeURL="../mode/%N/%N.js";var r={};function n(e,r){var n=r;return function(){if(--n==0)e()}}function o(r,o){var t=e.modes[r].dependencies;if(!t)return o();var i=[];for(var f=0;f<t.length;++f){if(!e.modes.hasOwnProperty(t[f]))i.push(t[f])}if(!i.length)return o();var a=n(o,i.length);for(var f=0;f<i.length;++f)e.requireMode(i[f],a)}e.requireMode=function(n,t){if(typeof n!="string")n=n.name;if(e.modes.hasOwnProperty(n))return o(n,t);if(r.hasOwnProperty(n))return r[n].push(t);var i=document.createElement("script");i.src=e.modeURL.replace(/%N/g,n);var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(i,f);var a=r[n]=[t];var d=0,u=setInterval(function(){if(++d>100)return clearInterval(u);if(e.modes.hasOwnProperty(n)){clearInterval(u);r[n]=null;o(n,function(){for(var e=0;e<a.length;++e)a[e]()})}},200)};e.autoLoadMode=function(r,n){if(!e.modes.hasOwnProperty(n))e.requireMode(n,function(){r.setOption("mode",r.getOption("mode"))})}});