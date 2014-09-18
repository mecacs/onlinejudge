(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("javascript",function(r,t){var n=r.indentUnit;var i=t.statementIndent;var a=t.jsonld;var u=t.json||a;var f=t.typescript;var o=t.wordCharacters||/[\w$]/;var l=function(){function e(e){return{type:e,style:"keyword"}}var r=e("keyword a"),t=e("keyword b"),n=e("keyword c");var i=e("operator"),a={type:"atom",style:"atom"};var u={"if":e("if"),"while":r,"with":r,"else":t,"do":t,"try":t,"finally":t,"return":n,"break":n,"continue":n,"new":n,"delete":n,"throw":n,"debugger":n,"var":e("var"),"const":e("var"),let:e("var"),"function":e("function"),"catch":e("catch"),"for":e("for"),"switch":e("switch"),"case":e("case"),"default":e("default"),"in":i,"typeof":i,"instanceof":i,"true":a,"false":a,"null":a,undefined:a,NaN:a,Infinity:a,"this":e("this"),module:e("module"),"class":e("class"),"super":e("atom"),"yield":n,"export":e("export"),"import":e("import"),"extends":n};if(f){var o={type:"variable",style:"variable-3"};var l={"interface":e("interface"),"extends":e("extends"),constructor:e("constructor"),"public":e("public"),"private":e("private"),"protected":e("protected"),"static":e("static"),string:o,number:o,bool:o,any:o};for(var s in l){u[s]=l[s]}}return u}();var s=/[+\-*&%=<>!?|~^]/;var c=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;function p(e){var r=false,t,n=false;while((t=e.next())!=null){if(!r){if(t=="/"&&!n)return;if(t=="[")n=true;else if(n&&t=="]")n=false}r=!r&&t=="\\"}}var d,v;function m(e,r,t){d=e;v=t;return r}function y(e,r){var t=e.next();if(t=='"'||t=="'"){r.tokenize=b(t);return r.tokenize(e,r)}else if(t=="."&&e.match(/^\d+(?:[eE][+\-]?\d+)?/)){return m("number","number")}else if(t=="."&&e.match("..")){return m("spread","meta")}else if(/[\[\]{}\(\),;\:\.]/.test(t)){return m(t)}else if(t=="="&&e.eat(">")){return m("=>","operator")}else if(t=="0"&&e.eat(/x/i)){e.eatWhile(/[\da-f]/i);return m("number","number")}else if(/\d/.test(t)){e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);return m("number","number")}else if(t=="/"){if(e.eat("*")){r.tokenize=k;return k(e,r)}else if(e.eat("/")){e.skipToEnd();return m("comment","comment")}else if(r.lastType=="operator"||r.lastType=="keyword c"||r.lastType=="sof"||/^[\[{}\(,;:]$/.test(r.lastType)){p(e);e.eatWhile(/[gimy]/);return m("regexp","string-2")}else{e.eatWhile(s);return m("operator","operator",e.current())}}else if(t=="`"){r.tokenize=h;return h(e,r)}else if(t=="#"){e.skipToEnd();return m("error","error")}else if(s.test(t)){e.eatWhile(s);return m("operator","operator",e.current())}else if(o.test(t)){e.eatWhile(o);var n=e.current(),i=l.propertyIsEnumerable(n)&&l[n];return i&&r.lastType!="."?m(i.type,i.style,n):m("variable","variable",n)}}function b(e){return function(r,t){var n=false,i;if(a&&r.peek()=="@"&&r.match(c)){t.tokenize=y;return m("jsonld-keyword","meta")}while((i=r.next())!=null){if(i==e&&!n)break;n=!n&&i=="\\"}if(!n)t.tokenize=y;return m("string","string")}}function k(e,r){var t=false,n;while(n=e.next()){if(n=="/"&&t){r.tokenize=y;break}t=n=="*"}return m("comment","comment")}function h(e,r){var t=false,n;while((n=e.next())!=null){if(!t&&(n=="`"||n=="$"&&e.eat("{"))){r.tokenize=y;break}t=!t&&n=="\\"}return m("quasi","string-2",e.current())}var x="([{}])";function g(e,r){if(r.fatArrowAt)r.fatArrowAt=null;var t=e.string.indexOf("=>",e.start);if(t<0)return;var n=0,i=false;for(var a=t-1;a>=0;--a){var u=e.string.charAt(a);var f=x.indexOf(u);if(f>=0&&f<3){if(!n){++a;break}if(--n==0)break}else if(f>=3&&f<6){++n}else if(o.test(u)){i=true}else if(i&&!n){++a;break}}if(i&&!n)r.fatArrowAt=a}var w={atom:true,number:true,variable:true,string:true,regexp:true,"this":true,"jsonld-keyword":true};function j(e,r,t,n,i,a){this.indented=e;this.column=r;this.type=t;this.prev=i;this.info=a;if(n!=null)this.align=n}function M(e,r){for(var t=e.localVars;t;t=t.next)if(t.name==r)return true;for(var n=e.context;n;n=n.prev){for(var t=n.vars;t;t=t.next)if(t.name==r)return true}}function V(e,r,t,n,i){var a=e.cc;E.state=e;E.stream=i;E.marked=null,E.cc=a;E.style=r;if(!e.lexical.hasOwnProperty("align"))e.lexical.align=true;while(true){var f=a.length?a.pop():u?S:P;if(f(t,n)){while(a.length&&a[a.length-1].lex)a.pop()();if(E.marked)return E.marked;if(t=="variable"&&M(e,n))return"variable-2";return r}}}var E={state:null,column:null,marked:null,cc:null};function z(){for(var e=arguments.length-1;e>=0;e--)E.cc.push(arguments[e])}function I(){z.apply(null,arguments);return true}function T(e){function r(r){for(var t=r;t;t=t.next)if(t.name==e)return true;return false}var n=E.state;if(n.context){E.marked="def";if(r(n.localVars))return;n.localVars={name:e,next:n.localVars}}else{if(r(n.globalVars))return;if(t.globalVars)n.globalVars={name:e,next:n.globalVars}}}var A={name:"this",next:{name:"arguments"}};function C(){E.state.context={prev:E.state.context,vars:E.state.localVars};E.state.localVars=A}function q(){E.state.localVars=E.state.context.vars;E.state.context=E.state.context.prev}function O(e,r){var t=function(){var t=E.state,n=t.indented;if(t.lexical.type=="stat")n=t.lexical.indented;else for(var i=t.lexical;i&&i.type==")"&&i.align;i=i.prev)n=i.indented;t.lexical=new j(n,E.stream.column(),e,null,t.lexical,r)};t.lex=true;return t}function W(){var e=E.state;if(e.lexical.prev){if(e.lexical.type==")")e.indented=e.lexical.indented;e.lexical=e.lexical.prev}}W.lex=true;function $(e){function r(t){if(t==e)return I();else if(e==";")return z();else return I(r)}return r}function P(e,r){if(e=="var")return I(O("vardef",r.length),ir,$(";"),W);if(e=="keyword a")return I(O("form"),S,P,W);if(e=="keyword b")return I(O("form"),P,W);if(e=="{")return I(O("}"),rr,W);if(e==";")return I();if(e=="if"){if(E.state.lexical.info=="else"&&E.state.cc[E.state.cc.length-1]==W)E.state.cc.pop()();return I(O("form"),S,P,W,lr)}if(e=="function")return I(mr);if(e=="for")return I(O("form"),sr,P,W);if(e=="variable")return I(O("stat"),Q);if(e=="switch")return I(O("form"),S,O("}","switch"),$("{"),rr,W,W);if(e=="case")return I(S,$(":"));if(e=="default")return I($(":"));if(e=="catch")return I(O("form"),C,$("("),yr,$(")"),P,W,q);if(e=="module")return I(O("form"),C,gr,q,W);if(e=="class")return I(O("form"),br,W);if(e=="export")return I(O("form"),wr,W);if(e=="import")return I(O("form"),jr,W);return z(O("stat"),S,$(";"),W)}function S(e){return H(e,false)}function N(e){return H(e,true)}function H(e,r){if(E.state.fatArrowAt==E.stream.start){var t=r?L:K;if(e=="(")return I(C,O(")"),_(ar,")"),W,$("=>"),t,q);else if(e=="variable")return z(C,ar,$("=>"),t,q)}var n=r?F:D;if(w.hasOwnProperty(e))return I(n);if(e=="function")return I(mr,n);if(e=="keyword c")return I(r?B:U);if(e=="(")return I(O(")"),U,Ir,$(")"),W,n);if(e=="operator"||e=="spread")return I(r?N:S);if(e=="[")return I(O("]"),Er,W,n);if(e=="{")return er(X,"}",null,n);if(e=="quasi"){return z(G,n)}return I()}function U(e){if(e.match(/[;\}\)\],]/))return z();return z(S)}function B(e){if(e.match(/[;\}\)\],]/))return z();return z(N)}function D(e,r){if(e==",")return I(S);return F(e,r,false)}function F(e,r,t){var n=t==false?D:F;var i=t==false?S:N;if(r=="=>")return I(C,t?L:K,q);if(e=="operator"){if(/\+\+|--/.test(r))return I(n);if(r=="?")return I(S,$(":"),i);return I(i)}if(e=="quasi"){return z(G,n)}if(e==";")return;if(e=="(")return er(N,")","call",n);if(e==".")return I(R,n);if(e=="[")return I(O("]"),U,$("]"),W,n)}function G(e,r){if(e!="quasi")return z();if(r.slice(r.length-2)!="${")return I(G);return I(S,J)}function J(e){if(e=="}"){E.marked="string-2";E.state.tokenize=h;return I(G)}}function K(e){g(E.stream,E.state);if(e=="{")return z(P);return z(S)}function L(e){g(E.stream,E.state);if(e=="{")return z(P);return z(N)}function Q(e){if(e==":")return I(W,P);return z(D,$(";"),W)}function R(e){if(e=="variable"){E.marked="property";return I()}}function X(e,r){if(e=="variable"||E.style=="keyword"){E.marked="property";if(r=="get"||r=="set")return I(Y);return I(Z)}else if(e=="number"||e=="string"){E.marked=a?"property":E.style+" property";return I(Z)}else if(e=="jsonld-keyword"){return I(Z)}else if(e=="["){return I(S,$("]"),Z)}}function Y(e){if(e!="variable")return z(Z);E.marked="property";return I(mr)}function Z(e){if(e==":")return I(N);if(e=="(")return z(mr)}function _(e,r){function t(n){if(n==","){var i=E.state.lexical;if(i.info=="call")i.pos=(i.pos||0)+1;return I(e,t)}if(n==r)return I();return I($(r))}return function(n){if(n==r)return I();return z(e,t)}}function er(e,r,t){for(var n=3;n<arguments.length;n++)E.cc.push(arguments[n]);return I(O(r,t),_(e,r),W)}function rr(e){if(e=="}")return I();return z(P,rr)}function tr(e){if(f&&e==":")return I(nr)}function nr(e){if(e=="variable"){E.marked="variable-3";return I()}}function ir(){return z(ar,tr,fr,or)}function ar(e,r){if(e=="variable"){T(r);return I()}if(e=="[")return er(ar,"]");if(e=="{")return er(ur,"}")}function ur(e,r){if(e=="variable"&&!E.stream.match(/^\s*:/,false)){T(r);return I(fr)}if(e=="variable")E.marked="property";return I($(":"),ar,fr)}function fr(e,r){if(r=="=")return I(N)}function or(e){if(e==",")return I(ir)}function lr(e,r){if(e=="keyword b"&&r=="else")return I(O("form","else"),P,W)}function sr(e){if(e=="(")return I(O(")"),cr,$(")"),W)}function cr(e){if(e=="var")return I(ir,$(";"),dr);if(e==";")return I(dr);if(e=="variable")return I(pr);return z(S,$(";"),dr)}function pr(e,r){if(r=="in"||r=="of"){E.marked="keyword";return I(S)}return I(D,dr)}function dr(e,r){if(e==";")return I(vr);if(r=="in"||r=="of"){E.marked="keyword";return I(S)}return z(S,$(";"),vr)}function vr(e){if(e!=")")I(S)}function mr(e,r){if(r=="*"){E.marked="keyword";return I(mr)}if(e=="variable"){T(r);return I(mr)}if(e=="(")return I(C,O(")"),_(yr,")"),W,P,q)}function yr(e){if(e=="spread")return I(yr);return z(ar,tr)}function br(e,r){if(e=="variable"){T(r);return I(kr)}}function kr(e,r){if(r=="extends")return I(S,kr);if(e=="{")return I(O("}"),hr,W)}function hr(e,r){if(e=="variable"||E.style=="keyword"){E.marked="property";if(r=="get"||r=="set")return I(xr,mr,hr);return I(mr,hr)}if(r=="*"){E.marked="keyword";return I(hr)}if(e==";")return I(hr);if(e=="}")return I()}function xr(e){if(e!="variable")return z();E.marked="property";return I()}function gr(e,r){if(e=="string")return I(P);if(e=="variable"){T(r);return I(Vr)}}function wr(e,r){if(r=="*"){E.marked="keyword";return I(Vr,$(";"))}if(r=="default"){E.marked="keyword";return I(S,$(";"))}return z(P)}function jr(e){if(e=="string")return I();return z(Mr,Vr)}function Mr(e,r){if(e=="{")return er(Mr,"}");if(e=="variable")T(r);return I()}function Vr(e,r){if(r=="from"){E.marked="keyword";return I(S)}}function Er(e){if(e=="]")return I();return z(N,zr)}function zr(e){if(e=="for")return z(Ir,$("]"));if(e==",")return I(_(N,"]"));return z(_(N,"]"))}function Ir(e){if(e=="for")return I(sr,Ir);if(e=="if")return I(S,Ir)}return{startState:function(e){var r={tokenize:y,lastType:"sof",cc:[],lexical:new j((e||0)-n,0,"block",false),localVars:t.localVars,context:t.localVars&&{vars:t.localVars},indented:0};if(t.globalVars&&typeof t.globalVars=="object")r.globalVars=t.globalVars;return r},token:function(e,r){if(e.sol()){if(!r.lexical.hasOwnProperty("align"))r.lexical.align=false;r.indented=e.indentation();g(e,r)}if(r.tokenize!=k&&e.eatSpace())return null;var t=r.tokenize(e,r);if(d=="comment")return t;r.lastType=d=="operator"&&(v=="++"||v=="--")?"incdec":d;return V(r,t,d,v,e)},indent:function(r,a){if(r.tokenize==k)return e.Pass;if(r.tokenize!=y)return 0;var u=a&&a.charAt(0),f=r.lexical;if(!/^\s*else\b/.test(a))for(var o=r.cc.length-1;o>=0;--o){var l=r.cc[o];if(l==W)f=f.prev;else if(l!=lr)break}if(f.type=="stat"&&u=="}")f=f.prev;if(i&&f.type==")"&&f.prev.type=="stat")f=f.prev;var s=f.type,c=u==s;if(s=="vardef")return f.indented+(r.lastType=="operator"||r.lastType==","?f.info+1:0);else if(s=="form"&&u=="{")return f.indented;else if(s=="form")return f.indented+n;else if(s=="stat")return f.indented+(r.lastType=="operator"||r.lastType==","?i||n:0);else if(f.info=="switch"&&!c&&t.doubleIndentSwitch!=false)return f.indented+(/^(?:case|default)\b/.test(a)?n:2*n);else if(f.align)return f.column+(c?0:1);else return f.indented+(c?0:n)},electricChars:":{}",blockCommentStart:u?null:"/*",blockCommentEnd:u?null:"*/",lineComment:u?null:"//",fold:"brace",helperType:u?"json":"javascript",jsonldMode:a,jsonMode:u}});e.registerHelper("wordChars","javascript",/[\w$]/);e.defineMIME("text/javascript","javascript");e.defineMIME("text/ecmascript","javascript");e.defineMIME("application/javascript","javascript");e.defineMIME("application/x-javascript","javascript");e.defineMIME("application/ecmascript","javascript");e.defineMIME("application/json",{name:"javascript",json:true});e.defineMIME("application/x-json",{name:"javascript",json:true});e.defineMIME("application/ld+json",{name:"javascript",jsonld:true});e.defineMIME("text/typescript",{name:"javascript",typescript:true});e.defineMIME("application/typescript",{name:"javascript",typescript:true})});