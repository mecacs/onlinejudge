(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineOption("fullScreen",false,function(l,o,i){if(i==e.Init)i=false;if(!i==!o)return;if(o)t(l);else r(l)});function t(e){var t=e.getWrapperElement();e.state.fullScreenRestore={scrollTop:window.pageYOffset,scrollLeft:window.pageXOffset,width:t.style.width,height:t.style.height};t.style.width="";t.style.height="auto";t.className+=" CodeMirror-fullscreen";document.documentElement.style.overflow="hidden";e.refresh()}function r(e){var t=e.getWrapperElement();t.className=t.className.replace(/\s*CodeMirror-fullscreen\b/,"");document.documentElement.style.overflow="";var r=e.state.fullScreenRestore;t.style.width=r.width;t.style.height=r.height;window.scrollTo(r.scrollLeft,r.scrollTop);e.refresh()}});