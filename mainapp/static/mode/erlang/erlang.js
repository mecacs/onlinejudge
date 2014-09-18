(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMIME("text/x-erlang","erlang");e.defineMode("erlang",function(t){"use strict";var r=["-type","-spec","-export_type","-opaque"];var n=["after","begin","catch","case","cond","end","fun","if","let","of","query","receive","try","when"];var i=/[\->,;]/;var a=["->",";",","];var o=["and","andalso","band","bnot","bor","bsl","bsr","bxor","div","not","or","orelse","rem","xor"];var s=/[\+\-\*\/<>=\|:!]/;var u=["=","+","-","*","/",">",">=","<","=<","=:=","==","=/=","/=","||","<-","!"];var c=/[<\(\[\{]/;var l=["<<","(","[","{"];var f=/[>\)\]\}]/;var _=["}","]",")",">>"];var p=["is_atom","is_binary","is_bitstring","is_boolean","is_float","is_function","is_integer","is_list","is_number","is_pid","is_port","is_record","is_reference","is_tuple","atom","binary","bitstring","boolean","function","integer","list","number","pid","port","record","reference","tuple"];var m=["abs","adler32","adler32_combine","alive","apply","atom_to_binary","atom_to_list","binary_to_atom","binary_to_existing_atom","binary_to_list","binary_to_term","bit_size","bitstring_to_list","byte_size","check_process_code","contact_binary","crc32","crc32_combine","date","decode_packet","delete_module","disconnect_node","element","erase","exit","float","float_to_list","garbage_collect","get","get_keys","group_leader","halt","hd","integer_to_list","internal_bif","iolist_size","iolist_to_binary","is_alive","is_atom","is_binary","is_bitstring","is_boolean","is_float","is_function","is_integer","is_list","is_number","is_pid","is_port","is_process_alive","is_record","is_reference","is_tuple","length","link","list_to_atom","list_to_binary","list_to_bitstring","list_to_existing_atom","list_to_float","list_to_integer","list_to_pid","list_to_tuple","load_module","make_ref","module_loaded","monitor_node","node","node_link","node_unlink","nodes","notalive","now","open_port","pid_to_list","port_close","port_command","port_connect","port_control","pre_loaded","process_flag","process_info","processes","purge_module","put","register","registered","round","self","setelement","size","spawn","spawn_link","spawn_monitor","spawn_opt","split_binary","statistics","term_to_binary","time","throw","tl","trunc","tuple_size","tuple_to_list","unlink","unregister","whereis"];var d=/[\w@Ø-ÞÀ-Öß-öø-ÿ]/;var b=/[0-7]{1,3}|[bdefnrstv\\"']|\^[a-zA-Z]|x[0-9a-zA-Z]{2}|x{[0-9a-zA-Z]+}/;function v(e,t){if(t.in_string){t.in_string=!h(e);return z(t,e,"string")}if(t.in_atom){t.in_atom=!y(e);return z(t,e,"atom")}if(e.eatSpace()){return z(t,e,"whitespace")}if(!A(t)&&e.match(/-\s*[a-zß-öø-ÿ][\wØ-ÞÀ-Öß-öø-ÿ]*/)){if(S(e.current(),r)){return z(t,e,"type")}else{return z(t,e,"attribute")}}var v=e.next();if(v=="%"){e.skipToEnd();return z(t,e,"comment")}if(v==":"){return z(t,e,"colon")}if(v=="?"){e.eatSpace();e.eatWhile(d);return z(t,e,"macro")}if(v=="#"){e.eatSpace();e.eatWhile(d);return z(t,e,"record")}if(v=="$"){if(e.next()=="\\"&&!e.match(b)){return z(t,e,"error")}return z(t,e,"number")}if(v=="."){return z(t,e,"dot")}if(v=="'"){if(!(t.in_atom=!y(e))){if(e.match(/\s*\/\s*[0-9]/,false)){e.match(/\s*\/\s*[0-9]/,true);return z(t,e,"fun")}if(e.match(/\s*\(/,false)||e.match(/\s*:/,false)){return z(t,e,"function")}}return z(t,e,"atom")}if(v=='"'){t.in_string=!h(e);return z(t,e,"string")}if(/[A-Z_Ø-ÞÀ-Ö]/.test(v)){e.eatWhile(d);return z(t,e,"variable")}if(/[a-z_ß-öø-ÿ]/.test(v)){e.eatWhile(d);if(e.match(/\s*\/\s*[0-9]/,false)){e.match(/\s*\/\s*[0-9]/,true);return z(t,e,"fun")}var w=e.current();if(S(w,n)){return z(t,e,"keyword")}else if(S(w,o)){return z(t,e,"operator")}else if(e.match(/\s*\(/,false)){if(S(w,m)&&(A(t).token!=":"||A(t,2).token=="erlang")){return z(t,e,"builtin")}else if(S(w,p)){return z(t,e,"guard")}else{return z(t,e,"function")}}else if(S(w,o)){return z(t,e,"operator")}else if(x(e)==":"){if(w=="erlang"){return z(t,e,"builtin")}else{return z(t,e,"function")}}else if(S(w,["true","false"])){return z(t,e,"boolean")}else if(S(w,["true","false"])){return z(t,e,"boolean")}else{return z(t,e,"atom")}}var W=/[0-9]/;var U=/[0-9a-zA-Z]/;if(W.test(v)){e.eatWhile(W);if(e.eat("#")){if(!e.eatWhile(U)){e.backUp(1)}}else if(e.eat(".")){if(!e.eatWhile(W)){e.backUp(1)}else{if(e.eat(/[eE]/)){if(e.eat(/[-+]/)){if(!e.eatWhile(W)){e.backUp(2)}}else{if(!e.eatWhile(W)){e.backUp(1)}}}}}return z(t,e,"number")}if(g(e,c,l)){return z(t,e,"open_paren")}if(g(e,f,_)){return z(t,e,"close_paren")}if(k(e,i,a)){return z(t,e,"separator")}if(k(e,s,u)){return z(t,e,"operator")}return z(t,e,null)}function g(e,t,r){if(e.current().length==1&&t.test(e.current())){e.backUp(1);while(t.test(e.peek())){e.next();if(S(e.current(),r)){return true}}e.backUp(e.current().length-1)}return false}function k(e,t,r){if(e.current().length==1&&t.test(e.current())){while(t.test(e.peek())){e.next()}while(0<e.current().length){if(S(e.current(),r)){return true}else{e.backUp(1)}}e.next()}return false}function h(e){return w(e,'"',"\\")}function y(e){return w(e,"'","\\")}function w(e,t,r){while(!e.eol()){var n=e.next();if(n==t){return true}else if(n==r){e.next()}}return false}function x(e){var t=e.match(/([\n\s]+|%[^\n]*\n)*(.)/,false);return t?t.pop():""}function S(e,t){return-1<t.indexOf(e)}function z(e,t,r){Z(e,U(r,t));switch(r){case"atom":return"atom";case"attribute":return"attribute";case"boolean":return"atom";case"builtin":return"builtin";case"close_paren":return null;case"colon":return null;case"comment":return"comment";case"dot":return null;case"error":return"error";case"fun":return"meta";case"function":return"tag";case"guard":return"property";case"keyword":return"keyword";case"macro":return"variable-2";case"number":return"number";case"open_paren":return null;case"operator":return"operator";case"record":return"bracket";case"separator":return null;case"string":return"string";case"type":return"def";case"variable":return"variable";default:return null}}function W(e,t,r,n){return{token:e,column:t,indent:r,type:n}}function U(e,t){return W(t.current(),t.column(),t.indentation(),e)}function E(e){return W(e,0,0,e)}function A(e,t){var r=e.tokenStack.length;var n=t?t:1;if(r<n){return false}else{return e.tokenStack[r-n]}}function Z(e,t){if(!(t.type=="comment"||t.type=="whitespace")){e.tokenStack=M(e.tokenStack,t);e.tokenStack=q(e.tokenStack)}}function M(e,t){var r=e.length-1;if(0<r&&e[r].type==="record"&&t.type==="dot"){e.pop()}else if(0<r&&e[r].type==="group"){e.pop();e.push(t)}else{e.push(t)}return e}function q(e){var t=e.length-1;if(e[t].type==="dot"){return[]}if(e[t].type==="fun"&&e[t-1].token==="fun"){return e.slice(0,t-1)}switch(e[e.length-1].token){case"}":return P(e,{g:["{"]});case"]":return P(e,{i:["["]});case")":return P(e,{i:["("]});case">>":return P(e,{i:["<<"]});case"end":return P(e,{i:["begin","case","fun","if","receive","try"]});case",":return P(e,{e:["begin","try","when","->",",","(","[","{","<<"]});case"->":return P(e,{r:["when"],m:["try","if","case","receive"]});case";":return P(e,{E:["case","fun","if","receive","try","when"]});case"catch":return P(e,{e:["try"]});case"of":return P(e,{e:["case"]});case"after":return P(e,{e:["receive","try"]});default:return e}}function P(e,t){for(var r in t){var n=e.length-1;var i=t[r];for(var a=n-1;-1<a;a--){if(S(e[a].token,i)){var o=e.slice(0,a);switch(r){case"m":return o.concat(e[a]).concat(e[n]);case"r":return o.concat(e[n]);case"i":return o;case"g":return o.concat(E("group"));case"E":return o.concat(e[a]);case"e":return o.concat(e[a])}}}}return r=="E"?[]:e}function j(r,n){var i;var a=t.indentUnit;var o=C(n);var s=A(r,1);var u=A(r,2);if(r.in_string||r.in_atom){return e.Pass}else if(!u){return 0}else if(s.token=="when"){return s.column+a}else if(o==="when"&&u.type==="function"){return u.indent+a}else if(o==="("&&s.token==="fun"){return s.column+3}else if(o==="catch"&&(i=T(r,["try"]))){return i.column}else if(S(o,["end","after","of"])){i=T(r,["begin","case","fun","if","receive","try"]);return i?i.column:e.Pass}else if(S(o,_)){i=T(r,l);return i?i.column:e.Pass}else if(S(s.token,[",","|","||"])||S(o,[",","|","||"])){i=I(r);return i?i.column+i.token.length:a}else if(s.token=="->"){if(S(u.token,["receive","case","if","try"])){return u.column+a+a}else{return u.column+a}}else if(S(s.token,l)){return s.column+s.token.length}else{i=O(r);return B(i)?i.column+a:0}}function C(e){var t=e.match(/,|[a-z]+|\}|\]|\)|>>|\|+|\(/);return B(t)&&t.index===0?t[0]:""}function I(e){var t=e.tokenStack.slice(0,-1);var r=$(t,"type",["open_paren"]);return B(t[r])?t[r]:false}function O(e){var t=e.tokenStack;var r=$(t,"type",["open_paren","separator","keyword"]);var n=$(t,"type",["operator"]);if(B(r)&&B(n)&&r<n){return t[r+1]}else if(B(r)){return t[r]}else{return false}}function T(e,t){var r=e.tokenStack;var n=$(r,"token",t);return B(r[n])?r[n]:false}function $(e,t,r){for(var n=e.length-1;-1<n;n--){if(S(e[n][t],r)){return n}}return false}function B(e){return e!==false&&e!=null}return{startState:function(){return{tokenStack:[],in_string:false,in_atom:false}},token:function(e,t){return v(e,t)},indent:function(e,t){return j(e,t)},lineComment:"%"}})});