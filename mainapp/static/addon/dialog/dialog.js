(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){function o(e,o,n){var t=e.getWrapperElement();var i;i=t.appendChild(document.createElement("div"));if(n)i.className="CodeMirror-dialog CodeMirror-dialog-bottom";else i.className="CodeMirror-dialog CodeMirror-dialog-top";if(typeof o=="string"){i.innerHTML=o}else{i.appendChild(o)}return i}function n(e,o){if(e.state.currentNotificationClose)e.state.currentNotificationClose();e.state.currentNotificationClose=o}e.defineExtension("openDialog",function(t,i,r){if(!r)r={};n(this,null);var f=o(this,t,r.bottom);var u=false,l=this;function a(e){if(typeof e=="string"){s.value=e}else{if(u)return;u=true;f.parentNode.removeChild(f);l.focus();if(r.onClose)r.onClose(f)}}var s=f.getElementsByTagName("input")[0],c;if(s){if(r.value)s.value=r.value;if(r.onInput)e.on(s,"input",function(e){r.onInput(e,s.value,a)});if(r.onKeyUp)e.on(s,"keyup",function(e){r.onKeyUp(e,s.value,a)});e.on(s,"keydown",function(o){if(r&&r.onKeyDown&&r.onKeyDown(o,s.value,a)){return}if(o.keyCode==27||r.closeOnEnter!==false&&o.keyCode==13){s.blur();e.e_stop(o);a()}if(o.keyCode==13)i(s.value)});if(r.closeOnBlur!==false)e.on(s,"blur",a);s.focus()}else if(c=f.getElementsByTagName("button")[0]){e.on(c,"click",function(){a();l.focus()});if(r.closeOnBlur!==false)e.on(c,"blur",a);c.focus()}return a});e.defineExtension("openConfirm",function(t,i,r){n(this,null);var f=o(this,t,r&&r.bottom);var u=f.getElementsByTagName("button");var l=false,a=this,s=1;function c(){if(l)return;l=true;f.parentNode.removeChild(f);a.focus()}u[0].focus();for(var d=0;d<u.length;++d){var p=u[d];(function(o){e.on(p,"click",function(n){e.e_preventDefault(n);c();if(o)o(a)})})(i[d]);e.on(p,"blur",function(){--s;setTimeout(function(){if(s<=0)c()},200)});e.on(p,"focus",function(){++s})}});e.defineExtension("openNotification",function(t,i){n(this,a);var r=o(this,t,i&&i.bottom);var f=i&&(i.duration===undefined?5e3:i.duration);var u=false,l;function a(){if(u)return;u=true;clearTimeout(l);r.parentNode.removeChild(r)}e.on(r,"click",function(o){e.e_preventDefault(o);a()});if(f)l=setTimeout(a,i.duration)})});