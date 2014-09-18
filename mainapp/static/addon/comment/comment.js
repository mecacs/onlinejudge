(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";var n={};var t=/[^\s\u00a0]/;var i=e.Pos;function l(e){var n=e.search(t);return n==-1?0:n}e.commands.toggleComment=function(e){var n=Infinity,t=e.listSelections(),l=null;for(var r=t.length-1;r>=0;r--){var a=t[r].from(),o=t[r].to();if(a.line>=n)continue;if(o.line>=n)o=i(n,0);n=a.line;if(l==null){if(e.uncomment(a,o))l="un";else{e.lineComment(a,o);l="line"}}else if(l=="un"){e.uncomment(a,o)}else{e.lineComment(a,o)}}};e.defineExtension("lineComment",function(e,r,a){if(!a)a=n;var o=this,f=o.getModeAt(e);var m=a.lineComment||f.lineComment;if(!m){if(a.blockCommentStart||f.blockCommentStart){a.fullLines=true;o.blockComment(e,r,a)}return}var c=o.getLine(e.line);if(c==null)return;var s=Math.min(r.ch!=0||r.line==e.line?r.line+1:r.line,o.lastLine()+1);var g=a.padding==null?" ":a.padding;var u=a.commentBlankLines||e.line==r.line;o.operation(function(){if(a.indent){var n=c.slice(0,l(c));for(var r=e.line;r<s;++r){var f=o.getLine(r),v=n.length;if(!u&&!t.test(f))continue;if(f.slice(0,v)!=n)v=l(f);o.replaceRange(n+m+g,i(r,0),i(r,v))}}else{for(var r=e.line;r<s;++r){if(u||t.test(o.getLine(r)))o.replaceRange(m+g,i(r,0))}}})});e.defineExtension("blockComment",function(e,l,r){if(!r)r=n;var a=this,o=a.getModeAt(e);var f=r.blockCommentStart||o.blockCommentStart;var m=r.blockCommentEnd||o.blockCommentEnd;if(!f||!m){if((r.lineComment||o.lineComment)&&r.fullLines!=false)a.lineComment(e,l,r);return}var c=Math.min(l.line,a.lastLine());if(c!=e.line&&l.ch==0&&t.test(a.getLine(c)))--c;var s=r.padding==null?" ":r.padding;if(e.line>c)return;a.operation(function(){if(r.fullLines!=false){var n=t.test(a.getLine(c));a.replaceRange(s+m,i(c));a.replaceRange(f+s,i(e.line,0));var g=r.blockCommentLead||o.blockCommentLead;if(g!=null)for(var u=e.line+1;u<=c;++u)if(u!=c||n)a.replaceRange(g+s,i(u,0))}else{a.replaceRange(m,l);a.replaceRange(f,e)}})});e.defineExtension("uncomment",function(e,l,r){if(!r)r=n;var a=this,o=a.getModeAt(e);var f=Math.min(l.line,a.lastLine()),m=Math.min(e.line,f);var c=r.lineComment||o.lineComment,s=[];var g=r.padding==null?" ":r.padding,u;e:{if(!c)break e;for(var v=m;v<=f;++v){var d=a.getLine(v);var h=d.indexOf(c);if(h>-1&&!/comment/.test(a.getTokenTypeAt(i(v,h+1))))h=-1;if(h==-1&&(v!=f||v==m)&&t.test(d))break e;if(h>-1&&t.test(d.slice(0,h)))break e;s.push(d)}a.operation(function(){for(var e=m;e<=f;++e){var n=s[e-m];var t=n.indexOf(c),l=t+c.length;if(t<0)continue;if(n.slice(l,l+g.length)==g)l+=g.length;u=true;a.replaceRange("",i(e,t),i(e,l))}});if(u)return true}var p=r.blockCommentStart||o.blockCommentStart;var C=r.blockCommentEnd||o.blockCommentEnd;if(!p||!C)return false;var b=r.blockCommentLead||o.blockCommentLead;var k=a.getLine(m),L=f==m?k:a.getLine(f);var x=k.indexOf(p),R=L.lastIndexOf(C);if(R==-1&&m!=f){L=a.getLine(--f);R=L.lastIndexOf(C)}if(x==-1||R==-1||!/comment/.test(a.getTokenTypeAt(i(m,x+1)))||!/comment/.test(a.getTokenTypeAt(i(f,R+1))))return false;var O=k.lastIndexOf(p,e.ch);var M=O==-1?-1:k.slice(0,e.ch).indexOf(C,O+p.length);if(O!=-1&&M!=-1&&M+C.length!=e.ch)return false;M=L.indexOf(C,l.ch);var y=L.slice(l.ch).lastIndexOf(p,M-l.ch);O=M==-1||y==-1?-1:l.ch+y;if(M!=-1&&O!=-1&&O!=l.ch)return false;a.operation(function(){a.replaceRange("",i(f,R-(g&&L.slice(R-g.length,R)==g?g.length:0)),i(f,R+C.length));var e=x+p.length;if(g&&k.slice(e,e+g.length)==g)e+=g.length;a.replaceRange("",i(m,x),i(m,e));if(b)for(var n=m+1;n<=f;++n){var l=a.getLine(n),r=l.indexOf(b);if(r==-1||t.test(l.slice(0,r)))continue;var o=r+b.length;if(g&&l.slice(o,o+g.length)==g)o+=g.length;a.replaceRange("",i(n,r),i(n,o))}});return true})});