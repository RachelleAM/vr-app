!function(t){var e={};function r(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(n,s,function(e){return t[e]}.bind(null,s));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=18)}({18:function(t,e,r){"use strict";r.r(e);var n="INUMBER",s="IVAR",i="IEXPR";function o(t,e){this.type=t,this.value=null!=e?e:0}function a(t){return new o("IOP1",t)}function p(t){return new o("IOP2",t)}function u(t){return new o("IOP3",t)}function h(t,e,r){var o,a,p,u,v,y,d=[];if(l(t))return f(t,r);for(var x=t.length,E=0;E<x;E++){var A=t[E],g=A.type;if(g===n||"IVARNAME"===g)d.push(A.value);else if("IOP2"===g)a=d.pop(),o=d.pop(),"and"===A.value?d.push(!!o&&!!h(a,e,r)):"or"===A.value?d.push(!!o||!!h(a,e,r)):"="===A.value?(u=e.binaryOps[A.value],d.push(u(o,h(a,e,r),r))):(u=e.binaryOps[A.value],d.push(u(f(o,r),f(a,r))));else if("IOP3"===g)p=d.pop(),a=d.pop(),o=d.pop(),"?"===A.value?d.push(h(o?a:p,e,r)):(u=e.ternaryOps[A.value],d.push(u(f(o,r),f(a,r),f(p,r))));else if(g===s)if(A.value in e.functions)d.push(e.functions[A.value]);else if(A.value in e.unaryOps&&e.parser.isOperatorEnabled(A.value))d.push(e.unaryOps[A.value]);else{var w=r[A.value];if(void 0===w)throw new Error("undefined variable: "+A.value);d.push(w)}else if("IOP1"===g)o=d.pop(),u=e.unaryOps[A.value],d.push(u(f(o,r)));else if("IFUNCALL"===g){for(y=A.value,v=[];y-- >0;)v.unshift(f(d.pop(),r));if(!(u=d.pop()).apply||!u.call)throw new Error(u+" is not a function");d.push(u.apply(void 0,v))}else if("IFUNDEF"===g)d.push(function(){for(var t=d.pop(),n=[],s=A.value;s-- >0;)n.unshift(d.pop());var i=d.pop(),o=function(){for(var s=Object.assign({},r),i=0,o=n.length;i<o;i++)s[n[i]]=arguments[i];return h(t,e,s)};return Object.defineProperty(o,"name",{value:i,writable:!1}),r[i]=o,o}());else if(g===i)d.push(c(A,e));else if("IEXPREVAL"===g)d.push(A);else if("IMEMBER"===g)o=d.pop(),d.push(o[A.value]);else if("IENDSTATEMENT"===g)d.pop();else{if("IARRAY"!==g)throw new Error("invalid Expression");for(y=A.value,v=[];y-- >0;)v.unshift(d.pop());d.push(v)}}if(d.length>1)throw new Error("invalid Expression (parity)");return 0===d[0]?0:f(d[0],r)}function c(t,e,r){return l(t)?t:{type:"IEXPREVAL",value:function(r){return h(t.value,e,r)}}}function l(t){return t&&"IEXPREVAL"===t.type}function f(t,e){return l(t)?t.value(e):t}function v(t,e){for(var r,o,a,p,u,h,c=[],l=0;l<t.length;l++){var f=t[l],d=f.type;if(d===n)"number"==typeof f.value&&f.value<0?c.push("("+f.value+")"):Array.isArray(f.value)?c.push("["+f.value.map(y).join(", ")+"]"):c.push(y(f.value));else if("IOP2"===d)o=c.pop(),r=c.pop(),p=f.value,e?"^"===p?c.push("Math.pow("+r+", "+o+")"):"and"===p?c.push("(!!"+r+" && !!"+o+")"):"or"===p?c.push("(!!"+r+" || !!"+o+")"):"||"===p?c.push("(function(a,b){ return Array.isArray(a) && Array.isArray(b) ? a.concat(b) : String(a) + String(b); }(("+r+"),("+o+")))"):"=="===p?c.push("("+r+" === "+o+")"):"!="===p?c.push("("+r+" !== "+o+")"):"["===p?c.push(r+"[("+o+") | 0]"):c.push("("+r+" "+p+" "+o+")"):"["===p?c.push(r+"["+o+"]"):c.push("("+r+" "+p+" "+o+")");else if("IOP3"===d){if(a=c.pop(),o=c.pop(),r=c.pop(),"?"!==(p=f.value))throw new Error("invalid Expression");c.push("("+r+" ? "+o+" : "+a+")")}else if(d===s||"IVARNAME"===d)c.push(f.value);else if("IOP1"===d)r=c.pop(),"-"===(p=f.value)||"+"===p?c.push("("+p+r+")"):e?"not"===p?c.push("(!"+r+")"):"!"===p?c.push("fac("+r+")"):c.push(p+"("+r+")"):"!"===p?c.push("("+r+"!)"):c.push("("+p+" "+r+")");else if("IFUNCALL"===d){for(h=f.value,u=[];h-- >0;)u.unshift(c.pop());p=c.pop(),c.push(p+"("+u.join(", ")+")")}else if("IFUNDEF"===d){for(o=c.pop(),h=f.value,u=[];h-- >0;)u.unshift(c.pop());r=c.pop(),e?c.push("("+r+" = function("+u.join(", ")+") { return "+o+" })"):c.push("("+r+"("+u.join(", ")+") = "+o+")")}else if("IMEMBER"===d)r=c.pop(),c.push(r+"."+f.value);else if("IARRAY"===d){for(h=f.value,u=[];h-- >0;)u.unshift(c.pop());c.push("["+u.join(", ")+"]")}else if(d===i)c.push("("+v(f.value,e)+")");else if("IENDSTATEMENT"!==d)throw new Error("invalid Expression")}return c.length>1&&(c=e?[c.join(",")]:[c.join(";")]),String(c[0])}function y(t){return"string"==typeof t?JSON.stringify(t).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029"):t}function d(t,e){for(var r=0;r<t.length;r++)if(t[r]===e)return!0;return!1}function x(t,e,r){for(var n=!!(r=r||{}).withMembers,o=null,a=0;a<t.length;a++){var p=t[a];p.type===s||"IVARNAME"===p.type?n||d(e,p.value)?null!==o?(d(e,o)||e.push(o),o=p.value):o=p.value:e.push(p.value):"IMEMBER"===p.type&&n&&null!==o?o+="."+p.value:p.type===i?x(p.value,e,r):null!==o&&(d(e,o)||e.push(o),o=null)}null===o||d(e,o)||e.push(o)}function E(t,e){this.tokens=t,this.parser=e,this.unaryOps=e.unaryOps,this.binaryOps=e.binaryOps,this.ternaryOps=e.ternaryOps,this.functions=e.functions}o.prototype.toString=function(){switch(this.type){case n:case"IOP1":case"IOP2":case"IOP3":case s:case"IVARNAME":case"IENDSTATEMENT":return this.value;case"IFUNCALL":return"CALL "+this.value;case"IFUNDEF":return"DEF "+this.value;case"IARRAY":return"ARRAY "+this.value;case"IMEMBER":return"."+this.value;default:return"Invalid Instruction"}},E.prototype.simplify=function(t){return t=t||{},new E(function t(e,r,a,p,u){for(var h,c,l,f,v=[],y=[],d=0;d<e.length;d++){var x=e[d],E=x.type;if(E===n||"IVARNAME"===E)Array.isArray(x.value)?v.push.apply(v,t(x.value.map((function(t){return new o(n,t)})).concat(new o("IARRAY",x.value.length)),r,a,p,u)):v.push(x);else if(E===s&&u.hasOwnProperty(x.value))x=new o(n,u[x.value]),v.push(x);else if("IOP2"===E&&v.length>1)c=v.pop(),h=v.pop(),f=a[x.value],x=new o(n,f(h.value,c.value)),v.push(x);else if("IOP3"===E&&v.length>2)l=v.pop(),c=v.pop(),h=v.pop(),"?"===x.value?v.push(h.value?c.value:l.value):(f=p[x.value],x=new o(n,f(h.value,c.value,l.value)),v.push(x));else if("IOP1"===E&&v.length>0)h=v.pop(),f=r[x.value],x=new o(n,f(h.value)),v.push(x);else if(E===i){for(;v.length>0;)y.push(v.shift());y.push(new o(i,t(x.value,r,a,p,u)))}else if("IMEMBER"===E&&v.length>0)h=v.pop(),v.push(new o(n,h.value[x.value]));else{for(;v.length>0;)y.push(v.shift());y.push(x)}}for(;v.length>0;)y.push(v.shift());return y}(this.tokens,this.unaryOps,this.binaryOps,this.ternaryOps,t),this.parser)},E.prototype.substitute=function(t,e){return e instanceof E||(e=this.parser.parse(String(e))),new E(function t(e,r,n){for(var h=[],c=0;c<e.length;c++){var l=e[c],f=l.type;if(f===s&&l.value===r)for(var v=0;v<n.tokens.length;v++){var y,d=n.tokens[v];y="IOP1"===d.type?a(d.value):"IOP2"===d.type?p(d.value):"IOP3"===d.type?u(d.value):new o(d.type,d.value),h.push(y)}else f===i?h.push(new o(i,t(l.value,r,n))):h.push(l)}return h}(this.tokens,t,e),this.parser)},E.prototype.evaluate=function(t){return t=t||{},h(this.tokens,this,t)},E.prototype.toString=function(){return v(this.tokens,!1)},E.prototype.symbols=function(t){t=t||{};var e=[];return x(this.tokens,e,t),e},E.prototype.variables=function(t){t=t||{};var e=[];x(this.tokens,e,t);var r=this.functions;return e.filter((function(t){return!(t in r)}))},E.prototype.toJSFunction=function(t,e){var r=this,n=new Function(t,"with(this.functions) with (this.ternaryOps) with (this.binaryOps) with (this.unaryOps) { return "+v(this.simplify(e).tokens,!0)+"; }");return function(){return n.apply(r,arguments)}};var A="TOP",g="TPAREN";function w(t,e,r){this.type=t,this.value=e,this.index=r}function M(t,e){this.pos=0,this.current=null,this.unaryOps=t.unaryOps,this.binaryOps=t.binaryOps,this.ternaryOps=t.ternaryOps,this.consts=t.consts,this.expression=e,this.savedPosition=0,this.savedCurrent=null,this.options=t.options,this.parser=t}w.prototype.toString=function(){return this.type+": "+this.value},M.prototype.newToken=function(t,e,r){return new w(t,e,null!=r?r:this.pos)},M.prototype.save=function(){this.savedPosition=this.pos,this.savedCurrent=this.current},M.prototype.restore=function(){this.pos=this.savedPosition,this.current=this.savedCurrent},M.prototype.next=function(){return this.pos>=this.expression.length?this.newToken("TEOF","EOF"):this.isWhitespace()||this.isComment()?this.next():this.isRadixInteger()||this.isNumber()||this.isOperator()||this.isString()||this.isParen()||this.isBracket()||this.isComma()||this.isSemicolon()||this.isNamedOp()||this.isConst()||this.isName()?this.current:void this.parseError('Unknown character "'+this.expression.charAt(this.pos)+'"')},M.prototype.isString=function(){var t=!1,e=this.pos,r=this.expression.charAt(e);if("'"===r||'"'===r)for(var n=this.expression.indexOf(r,e+1);n>=0&&this.pos<this.expression.length;){if(this.pos=n+1,"\\"!==this.expression.charAt(n-1)){var s=this.expression.substring(e+1,n);this.current=this.newToken("TSTRING",this.unescape(s),e),t=!0;break}n=this.expression.indexOf(r,n+1)}return t},M.prototype.isParen=function(){var t=this.expression.charAt(this.pos);return("("===t||")"===t)&&(this.current=this.newToken(g,t),this.pos++,!0)},M.prototype.isBracket=function(){var t=this.expression.charAt(this.pos);return!("["!==t&&"]"!==t||!this.isOperatorEnabled("["))&&(this.current=this.newToken("TBRACKET",t),this.pos++,!0)},M.prototype.isComma=function(){return","===this.expression.charAt(this.pos)&&(this.current=this.newToken("TCOMMA",","),this.pos++,!0)},M.prototype.isSemicolon=function(){return";"===this.expression.charAt(this.pos)&&(this.current=this.newToken("TSEMICOLON",";"),this.pos++,!0)},M.prototype.isConst=function(){for(var t=this.pos,e=t;e<this.expression.length;e++){var r=this.expression.charAt(e);if(r.toUpperCase()===r.toLowerCase()&&(e===this.pos||"_"!==r&&"."!==r&&(r<"0"||r>"9")))break}if(e>t){var n=this.expression.substring(t,e);if(n in this.consts)return this.current=this.newToken("TNUMBER",this.consts[n]),this.pos+=n.length,!0}return!1},M.prototype.isNamedOp=function(){for(var t=this.pos,e=t;e<this.expression.length;e++){var r=this.expression.charAt(e);if(r.toUpperCase()===r.toLowerCase()&&(e===this.pos||"_"!==r&&(r<"0"||r>"9")))break}if(e>t){var n=this.expression.substring(t,e);if(this.isOperatorEnabled(n)&&(n in this.binaryOps||n in this.unaryOps||n in this.ternaryOps))return this.current=this.newToken(A,n),this.pos+=n.length,!0}return!1},M.prototype.isName=function(){for(var t=this.pos,e=t,r=!1;e<this.expression.length;e++){var n=this.expression.charAt(e);if(n.toUpperCase()===n.toLowerCase()){if(e===this.pos&&("$"===n||"_"===n)){"_"===n&&(r=!0);continue}if(e===this.pos||!r||"_"!==n&&(n<"0"||n>"9"))break}else r=!0}if(r){var s=this.expression.substring(t,e);return this.current=this.newToken("TNAME",s),this.pos+=s.length,!0}return!1},M.prototype.isWhitespace=function(){for(var t=!1,e=this.expression.charAt(this.pos);!(" "!==e&&"\t"!==e&&"\n"!==e&&"\r"!==e||(t=!0,this.pos++,this.pos>=this.expression.length));)e=this.expression.charAt(this.pos);return t};var m=/^[0-9a-f]{4}$/i;function b(t,e,r){this.parser=t,this.tokens=e,this.current=null,this.nextToken=null,this.next(),this.savedCurrent=null,this.savedNextToken=null,this.allowMemberAccess=!1!==r.allowMemberAccess}M.prototype.unescape=function(t){var e=t.indexOf("\\");if(e<0)return t;for(var r=t.substring(0,e);e>=0;){var n=t.charAt(++e);switch(n){case"'":r+="'";break;case'"':r+='"';break;case"\\":r+="\\";break;case"/":r+="/";break;case"b":r+="\b";break;case"f":r+="\f";break;case"n":r+="\n";break;case"r":r+="\r";break;case"t":r+="\t";break;case"u":var s=t.substring(e+1,e+5);m.test(s)||this.parseError("Illegal escape sequence: \\u"+s),r+=String.fromCharCode(parseInt(s,16)),e+=4;break;default:throw this.parseError('Illegal escape sequence: "\\'+n+'"')}++e;var i=t.indexOf("\\",e);r+=t.substring(e,i<0?t.length:i),e=i}return r},M.prototype.isComment=function(){return"/"===this.expression.charAt(this.pos)&&"*"===this.expression.charAt(this.pos+1)&&(this.pos=this.expression.indexOf("*/",this.pos)+2,1===this.pos&&(this.pos=this.expression.length),!0)},M.prototype.isRadixInteger=function(){var t,e,r=this.pos;if(r>=this.expression.length-2||"0"!==this.expression.charAt(r))return!1;if(++r,"x"===this.expression.charAt(r))t=16,e=/^[0-9a-f]$/i,++r;else{if("b"!==this.expression.charAt(r))return!1;t=2,e=/^[01]$/i,++r}for(var n=!1,s=r;r<this.expression.length;){var i=this.expression.charAt(r);if(!e.test(i))break;r++,n=!0}return n&&(this.current=this.newToken("TNUMBER",parseInt(this.expression.substring(s,r),t)),this.pos=r),n},M.prototype.isNumber=function(){for(var t,e=!1,r=this.pos,n=r,s=r,i=!1,o=!1;r<this.expression.length&&((t=this.expression.charAt(r))>="0"&&t<="9"||!i&&"."===t);)"."===t?i=!0:o=!0,r++,e=o;if(e&&(s=r),"e"===t||"E"===t){r++;for(var a=!0,p=!1;r<this.expression.length;){if(t=this.expression.charAt(r),!a||"+"!==t&&"-"!==t){if(!(t>="0"&&t<="9"))break;p=!0,a=!1}else a=!1;r++}p||(r=s)}return e?(this.current=this.newToken("TNUMBER",parseFloat(this.expression.substring(n,r))),this.pos=r):this.pos=s,e},M.prototype.isOperator=function(){var t=this.pos,e=this.expression.charAt(this.pos);if("+"===e||"-"===e||"*"===e||"/"===e||"%"===e||"^"===e||"?"===e||":"===e||"."===e)this.current=this.newToken(A,e);else if("∙"===e||"•"===e)this.current=this.newToken(A,"*");else if(">"===e)"="===this.expression.charAt(this.pos+1)?(this.current=this.newToken(A,">="),this.pos++):this.current=this.newToken(A,">");else if("<"===e)"="===this.expression.charAt(this.pos+1)?(this.current=this.newToken(A,"<="),this.pos++):this.current=this.newToken(A,"<");else if("|"===e){if("|"!==this.expression.charAt(this.pos+1))return!1;this.current=this.newToken(A,"||"),this.pos++}else if("="===e)"="===this.expression.charAt(this.pos+1)?(this.current=this.newToken(A,"=="),this.pos++):this.current=this.newToken(A,e);else{if("!"!==e)return!1;"="===this.expression.charAt(this.pos+1)?(this.current=this.newToken(A,"!="),this.pos++):this.current=this.newToken(A,e)}return this.pos++,!!this.isOperatorEnabled(this.current.value)||(this.pos=t,!1)},M.prototype.isOperatorEnabled=function(t){return this.parser.isOperatorEnabled(t)},M.prototype.getCoordinates=function(){var t,e=0,r=-1;do{e++,t=this.pos-r,r=this.expression.indexOf("\n",r+1)}while(r>=0&&r<this.pos);return{line:e,column:t}},M.prototype.parseError=function(t){var e=this.getCoordinates();throw new Error("parse error ["+e.line+":"+e.column+"]: "+t)},b.prototype.next=function(){return this.current=this.nextToken,this.nextToken=this.tokens.next()},b.prototype.tokenMatches=function(t,e){return void 0===e||(Array.isArray(e)?d(e,t.value):"function"==typeof e?e(t):t.value===e)},b.prototype.save=function(){this.savedCurrent=this.current,this.savedNextToken=this.nextToken,this.tokens.save()},b.prototype.restore=function(){this.tokens.restore(),this.current=this.savedCurrent,this.nextToken=this.savedNextToken},b.prototype.accept=function(t,e){return!(this.nextToken.type!==t||!this.tokenMatches(this.nextToken,e))&&(this.next(),!0)},b.prototype.expect=function(t,e){if(!this.accept(t,e)){var r=this.tokens.getCoordinates();throw new Error("parse error ["+r.line+":"+r.column+"]: Expected "+(e||t))}},b.prototype.parseAtom=function(t){var e=this.tokens.unaryOps;if(this.accept("TNAME")||this.accept(A,(function(t){return t.value in e})))t.push(new o(s,this.current.value));else if(this.accept("TNUMBER"))t.push(new o(n,this.current.value));else if(this.accept("TSTRING"))t.push(new o(n,this.current.value));else if(this.accept(g,"("))this.parseExpression(t),this.expect(g,")");else{if(!this.accept("TBRACKET","["))throw new Error("unexpected "+this.nextToken);if(this.accept("TBRACKET","]"))t.push(new o("IARRAY",0));else{var r=this.parseArrayList(t);t.push(new o("IARRAY",r))}}},b.prototype.parseExpression=function(t){var e=[];this.parseUntilEndStatement(t,e)||(this.parseVariableAssignmentExpression(e),this.parseUntilEndStatement(t,e)||this.pushExpression(t,e))},b.prototype.pushExpression=function(t,e){for(var r=0,n=e.length;r<n;r++)t.push(e[r])},b.prototype.parseUntilEndStatement=function(t,e){return!!this.accept("TSEMICOLON")&&(!this.nextToken||"TEOF"===this.nextToken.type||this.nextToken.type===g&&")"===this.nextToken.value||e.push(new o("IENDSTATEMENT")),"TEOF"!==this.nextToken.type&&this.parseExpression(e),t.push(new o(i,e)),!0)},b.prototype.parseArrayList=function(t){for(var e=0;!this.accept("TBRACKET","]");)for(this.parseExpression(t),++e;this.accept("TCOMMA");)this.parseExpression(t),++e;return e},b.prototype.parseVariableAssignmentExpression=function(t){for(this.parseConditionalExpression(t);this.accept(A,"=");){var e=t.pop(),r=[],n=t.length-1;if("IFUNCALL"!==e.type){if(e.type!==s&&"IMEMBER"!==e.type)throw new Error("expected variable for assignment");this.parseVariableAssignmentExpression(r),t.push(new o("IVARNAME",e.value)),t.push(new o(i,r)),t.push(p("="))}else{if(!this.tokens.isOperatorEnabled("()="))throw new Error("function definition is not permitted");for(var a=0,u=e.value+1;a<u;a++){var h=n-a;t[h].type===s&&(t[h]=new o("IVARNAME",t[h].value))}this.parseVariableAssignmentExpression(r),t.push(new o(i,r)),t.push(new o("IFUNDEF",e.value))}}},b.prototype.parseConditionalExpression=function(t){for(this.parseOrExpression(t);this.accept(A,"?");){var e=[],r=[];this.parseConditionalExpression(e),this.expect(A,":"),this.parseConditionalExpression(r),t.push(new o(i,e)),t.push(new o(i,r)),t.push(u("?"))}},b.prototype.parseOrExpression=function(t){for(this.parseAndExpression(t);this.accept(A,"or");){var e=[];this.parseAndExpression(e),t.push(new o(i,e)),t.push(p("or"))}},b.prototype.parseAndExpression=function(t){for(this.parseComparison(t);this.accept(A,"and");){var e=[];this.parseComparison(e),t.push(new o(i,e)),t.push(p("and"))}};var O=["==","!=","<","<=",">=",">","in"];b.prototype.parseComparison=function(t){for(this.parseAddSub(t);this.accept(A,O);){var e=this.current;this.parseAddSub(t),t.push(p(e.value))}};var T=["+","-","||"];b.prototype.parseAddSub=function(t){for(this.parseTerm(t);this.accept(A,T);){var e=this.current;this.parseTerm(t),t.push(p(e.value))}};var I=["*","/","%"];function k(t,e){return Number(t)+Number(e)}function N(t,e){return t-e}function S(t,e){return t*e}function R(t,e){return t/e}function P(t,e){return t%e}function C(t,e){return Array.isArray(t)&&Array.isArray(e)?t.concat(e):""+t+e}function F(t,e){return t===e}function L(t,e){return t!==e}function U(t,e){return t>e}function j(t,e){return t<e}function B(t,e){return t>=e}function V(t,e){return t<=e}function q(t,e){return Boolean(t&&e)}function _(t,e){return Boolean(t||e)}function D(t,e){return d(e,t)}function z(t){return(Math.exp(t)-Math.exp(-t))/2}function Y(t){return(Math.exp(t)+Math.exp(-t))/2}function J(t){return t===1/0?1:t===-1/0?-1:(Math.exp(t)-Math.exp(-t))/(Math.exp(t)+Math.exp(-t))}function K(t){return t===-1/0?t:Math.log(t+Math.sqrt(t*t+1))}function X(t){return Math.log(t+Math.sqrt(t*t-1))}function G(t){return Math.log((1+t)/(1-t))/2}function $(t){return Math.log(t)*Math.LOG10E}function H(t){return-t}function W(t){return!t}function Q(t){return t<0?Math.ceil(t):Math.floor(t)}function Z(t){return Math.random()*(t||1)}function tt(t){return rt(t+1)}b.prototype.parseTerm=function(t){for(this.parseFactor(t);this.accept(A,I);){var e=this.current;this.parseFactor(t),t.push(p(e.value))}},b.prototype.parseFactor=function(t){var e=this.tokens.unaryOps;if(this.save(),this.accept(A,(function(t){return t.value in e}))){if("-"!==this.current.value&&"+"!==this.current.value){if(this.nextToken.type===g&&"("===this.nextToken.value)return this.restore(),void this.parseExponential(t);if("TSEMICOLON"===this.nextToken.type||"TCOMMA"===this.nextToken.type||"TEOF"===this.nextToken.type||this.nextToken.type===g&&")"===this.nextToken.value)return this.restore(),void this.parseAtom(t)}var r=this.current;this.parseFactor(t),t.push(a(r.value))}else this.parseExponential(t)},b.prototype.parseExponential=function(t){for(this.parsePostfixExpression(t);this.accept(A,"^");)this.parseFactor(t),t.push(p("^"))},b.prototype.parsePostfixExpression=function(t){for(this.parseFunctionCall(t);this.accept(A,"!");)t.push(a("!"))},b.prototype.parseFunctionCall=function(t){var e=this.tokens.unaryOps;if(this.accept(A,(function(t){return t.value in e}))){var r=this.current;this.parseAtom(t),t.push(a(r.value))}else for(this.parseMemberExpression(t);this.accept(g,"(");)if(this.accept(g,")"))t.push(new o("IFUNCALL",0));else{var n=this.parseArgumentList(t);t.push(new o("IFUNCALL",n))}},b.prototype.parseArgumentList=function(t){for(var e=0;!this.accept(g,")");)for(this.parseExpression(t),++e;this.accept("TCOMMA");)this.parseExpression(t),++e;return e},b.prototype.parseMemberExpression=function(t){for(this.parseAtom(t);this.accept(A,".")||this.accept("TBRACKET","[");){var e=this.current;if("."===e.value){if(!this.allowMemberAccess)throw new Error('unexpected ".", member access is not permitted');this.expect("TNAME"),t.push(new o("IMEMBER",this.current.value))}else{if("["!==e.value)throw new Error("unexpected symbol: "+e.value);if(!this.tokens.isOperatorEnabled("["))throw new Error('unexpected "[]", arrays are disabled');this.parseExpression(t),this.expect("TBRACKET","]"),t.push(p("["))}}};var et=[.9999999999999971,57.15623566586292,-59.59796035547549,14.136097974741746,-.4919138160976202,3399464998481189e-20,4652362892704858e-20,-9837447530487956e-20,.0001580887032249125,-.00021026444172410488,.00021743961811521265,-.0001643181065367639,8441822398385275e-20,-26190838401581408e-21,36899182659531625e-22];function rt(t){var e,r;if(function(t){return isFinite(t)&&t===Math.round(t)}(t)){if(t<=0)return isFinite(t)?1/0:NaN;if(t>171)return 1/0;for(var n=t-2,s=t-1;n>1;)s*=n,n--;return 0===s&&(s=1),s}if(t<.5)return Math.PI/(Math.sin(Math.PI*t)*rt(1-t));if(t>=171.35)return 1/0;if(t>85){var i=t*t,o=i*t,a=o*t,p=a*t;return Math.sqrt(2*Math.PI/t)*Math.pow(t/Math.E,t)*(1+1/(12*t)+1/(288*i)-139/(51840*o)-571/(2488320*a)+163879/(209018880*p)+5246819/(75246796800*p*t))}--t,r=et[0];for(var u=1;u<et.length;++u)r+=et[u]/(t+u);return e=t+4.7421875+.5,Math.sqrt(2*Math.PI)*Math.pow(e,t+.5)*Math.exp(-e)*r}function nt(t){return Array.isArray(t)?t.length:String(t).length}function st(){for(var t=0,e=0,r=0;r<arguments.length;r++){var n,s=Math.abs(arguments[r]);e<s?(t=t*(n=e/s)*n+1,e=s):t+=s>0?(n=s/e)*n:s}return e===1/0?1/0:e*Math.sqrt(t)}function it(t,e,r){return t?e:r}function ot(t,e){return void 0===e||0==+e?Math.round(t):(t=+t,e=-+e,isNaN(t)||"number"!=typeof e||e%1!=0?NaN:(t=t.toString().split("e"),+((t=(t=Math.round(+(t[0]+"e"+(t[1]?+t[1]-e:-e)))).toString().split("e"))[0]+"e"+(t[1]?+t[1]+e:e))))}function at(t,e,r){return r&&(r[t]=e),e}function pt(t,e){return t[0|e]}function ut(t){return 1===arguments.length&&Array.isArray(t)?Math.max.apply(Math,t):Math.max.apply(Math,arguments)}function ht(t){return 1===arguments.length&&Array.isArray(t)?Math.min.apply(Math,t):Math.min.apply(Math,arguments)}function ct(t,e){if("function"!=typeof t)throw new Error("First argument to map is not a function");if(!Array.isArray(e))throw new Error("Second argument to map is not an array");return e.map((function(e,r){return t(e,r)}))}function lt(t,e,r){if("function"!=typeof t)throw new Error("First argument to fold is not a function");if(!Array.isArray(r))throw new Error("Second argument to fold is not an array");return r.reduce((function(e,r,n){return t(e,r,n)}),e)}function ft(t,e){if("function"!=typeof t)throw new Error("First argument to filter is not a function");if(!Array.isArray(e))throw new Error("Second argument to filter is not an array");return e.filter((function(e,r){return t(e,r)}))}function vt(t,e){if(!Array.isArray(e)&&"string"!=typeof e)throw new Error("Second argument to indexOf is not a string or array");return e.indexOf(t)}function yt(t,e){if(!Array.isArray(e))throw new Error("Second argument to join is not an array");return e.join(t)}function dt(t){return(t>0)-(t<0)||+t}function xt(t){return t<0?-Math.pow(-t,1/3):Math.pow(t,1/3)}function Et(t){return Math.exp(t)-1}function At(t){return Math.log(1+t)}function gt(t){return Math.log(t)/Math.LN2}function wt(t){this.options=t||{},this.unaryOps={sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,sinh:Math.sinh||z,cosh:Math.cosh||Y,tanh:Math.tanh||J,asinh:Math.asinh||K,acosh:Math.acosh||X,atanh:Math.atanh||G,sqrt:Math.sqrt,cbrt:Math.cbrt||xt,log:Math.log,log2:Math.log2||gt,ln:Math.log,lg:Math.log10||$,log10:Math.log10||$,expm1:Math.expm1||Et,log1p:Math.log1p||At,abs:Math.abs,ceil:Math.ceil,floor:Math.floor,round:Math.round,trunc:Math.trunc||Q,"-":H,"+":Number,exp:Math.exp,not:W,length:nt,"!":tt,sign:Math.sign||dt},this.binaryOps={"+":k,"-":N,"*":S,"/":R,"%":P,"^":Math.pow,"||":C,"==":F,"!=":L,">":U,"<":j,">=":B,"<=":V,and:q,or:_,in:D,"=":at,"[":pt},this.ternaryOps={"?":it},this.functions={random:Z,fac:tt,min:ht,max:ut,hypot:Math.hypot||st,pyt:Math.hypot||st,pow:Math.pow,atan2:Math.atan2,if:it,gamma:rt,roundTo:ot,map:ct,fold:lt,filter:ft,indexOf:vt,join:yt},this.consts={E:Math.E,PI:Math.PI,true:!0,false:!1}}wt.prototype.parse=function(t){var e=[],r=new b(this,new M(this,t),{allowMemberAccess:this.options.allowMemberAccess});return r.parseExpression(e),r.expect("TEOF","EOF"),new E(e,this)},wt.prototype.evaluate=function(t,e){return this.parse(t).evaluate(e)};var Mt=new wt;wt.parse=function(t){return Mt.parse(t)},wt.evaluate=function(t,e){return Mt.parse(t).evaluate(e)};var mt={"+":"add","-":"subtract","*":"multiply","/":"divide","%":"remainder","^":"power","!":"factorial","<":"comparison",">":"comparison","<=":"comparison",">=":"comparison","==":"comparison","!=":"comparison","||":"concatenate",and:"logical",or:"logical",not:"logical","?":"conditional",":":"conditional","=":"assignment","[":"array","()=":"fndef"};wt.prototype.isOperatorEnabled=function(t){var e=function(t){return mt.hasOwnProperty(t)?mt[t]:t}(t),r=this.options.operators||{};return!(e in r&&!r[e])};function bt(t){return"string"==typeof t?JSON.stringify(t).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029"):t}r.d(e,"MathExpression",(function(){return Ot}));class Ot{constructor(t,e=["u","v","x","y","t"]){let r,n;if(this.Parser=new wt,this.Parser.consts.e=this.Parser.consts.E,t.includes("=")){const e=t.split("=");if(e.length>2)throw new Error("Multiple '=' are not allowed");r=e[0],n=e[1],this.parameters=this.getFunctionParameters(r)}else n=t,this.parameters=this.getAllVariables(n),null!=e&&(this.parameters=this.parameters.filter(t=>e.includes(t)));let s=this.getAllVariables(n);this.variables=s.filter(t=>!this.parameters.includes(t)),this.expression=this.Parser.parse(n),this.inputSize=this.parameters.length;const i=new Array(this.inputSize).fill(0);let o={};this.variables.forEach(t=>{o[t]=1});const a=this.getJSFunction(o)(...i);var p,u;this.outputSize=1,Array.isArray(a)&&(this.outputSize=a.length),this.glslFunction=(p=this.expression,u=s.join(","),function t(e){for(var r,n,s,i,o,a,p=[],u=0;u<e.length;u++){var h=e[u],c=h.type;if("INUMBER"===c)if("number"==typeof h.value&&h.value<0){let t=h.value;t.toString().includes(".")||(t=parseFloat(t).toFixed(2)),p.push("("+t+")")}else if(Array.isArray(h.value))p.push("["+h.value.map(bt).join(", ")+"]");else{let t=h.value;t.toString().includes(".")||(t=parseFloat(h.value).toFixed(2)),p.push(t)}else if("IOP2"===c)n=p.pop(),r=p.pop(),"^"===(i=h.value)?2.718281828459045==r?p.push("exp("+n+")"):isNaN(parseInt(n))?p.push("pow("+r+", "+n+")"):p.push(Array.apply(null,Array(parseInt(n))).map(()=>r).join("*")):"and"===i?p.push("(!!"+r+" && !!"+n+")"):"or"===i?p.push("(!!"+r+" || !!"+n+")"):"||"===i?p.push("(function(a,b){ return Array.isArray(a) && Array.isArray(b) ? a.concat(b) : String(a) + String(b); }(("+r+"),("+n+")))"):"=="===i?p.push("("+r+" === "+n+")"):"!="===i?p.push("("+r+" !== "+n+")"):"["===i?p.push(r+"[("+n+") | 0]"):p.push("("+r+" "+i+" "+n+")");else if("IOP3"===c){if(s=p.pop(),n=p.pop(),r=p.pop(),"?"!==(i=h.value))throw new Error("invalid Expression");p.push("("+r+" ? "+n+" : "+s+")")}else if("IVAR"===c||"IVARNAME"===c)p.push(h.value);else if("IOP1"===c)r=p.pop(),"-"===(i=h.value)||"+"===i?p.push("("+i+r+")"):"not"===i?p.push("(!"+r+")"):"!"===i?p.push("fac("+r+")"):p.push(i+"("+r+")");else if("IFUNCALL"===c){for(a=h.value,o=[];a-- >0;)o.unshift(p.pop());i=p.pop(),p.push(i+"("+o.join(", ")+")")}else if("IFUNDEF"===c){for(n=p.pop(),a=h.value,o=[];a-- >0;)o.unshift(p.pop());r=p.pop(),p.push("("+r+" = function("+o.join(", ")+") { return "+n+" })")}else if("IMEMBER"===c)r=p.pop(),p.push(r+"."+h.value);else if("IARRAY"===c){for(a=h.value,o=[];a-- >0;)o.unshift(p.pop());var l="vec"+o.length;p.push(l+"("+o.join(", ")+")")}else if("IEXPR"===c)p.push("("+t(h.value)+")");else if("IENDSTATEMENT"!==c)throw new Error("invalid Expression")}return p.length>1&&(p=[p.join(",")]),String(p[0])}(p.simplify(u).tokens))}getJSFunction(t){return this.expression.toJSFunction(this.parameters.join(","),t)}getInputSize(){return this.inputSize}getOutputSize(){return this.outputSize}getGLSLFunctionString(){return this.glslFunction}getParameters(){return this.parameters}getVariables(){return this.variables}getAllVariables(t){return this.Parser.parse(t).variables()}getFunctionParameters(t){const e=this.Parser.parse(t).tokens;let r=[];for(var n=0;n<e.length;n++){var s=e[n],i=s.type;if("IFUNCALL"===i){let t=s.value,e=[];for(;t-- >0;)e.unshift(r.pop());return e}"IVAR"!==i&&"IVARNAME"!==i||r.push(s.value)}}stripFunctionDeclaration(t){const e=t.split("=");return e[e.length-1]}}window.addEventListener("load",()=>{try{document.getElementById("visualize-button").addEventListener("click",()=>{let t=document.getElementById("function2-checkbox"),e=document.getElementById("function-error-message");try{if(new Ot(document.querySelector("#function-input").value),e.classList.contains("d-block")&&(e.classList.remove("d-block"),e.classList.add("d-none")),t.checked)try{new Ot(document.querySelector("#function2-input").value),window.location.href="calculus_scene.html?function="+encodeURIComponent(document.querySelector("#function-input").value)+"&function2="+encodeURIComponent(document.querySelector("#function2-input").value)}catch(t){e.innerHTML="Function 2 is invalid.",e.classList.remove("d-none"),e.classList.add("d-block")}else window.location.href="calculus_scene.html?function="+encodeURIComponent(document.querySelector("#function-input").value)}catch(t){e.innerHTML="Function 1 is invalid.",e.classList.remove("d-none"),e.classList.add("d-block")}})}catch(t){}})}});