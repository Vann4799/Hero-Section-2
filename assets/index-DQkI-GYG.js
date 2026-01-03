(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();/**
* @vue/shared v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ws(e){const t=Object.create(null);for(const s of e.split(","))t[s]=1;return s=>s in t}const W={},Ze=[],we=()=>{},Ro=()=>!1,zt=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Ts=e=>e.startsWith("onUpdate:"),oe=Object.assign,Es=(e,t)=>{const s=e.indexOf(t);s>-1&&e.splice(s,1)},In=Object.prototype.hasOwnProperty,D=(e,t)=>In.call(e,t),O=Array.isArray,at=e=>Wt(e)==="[object Map]",On=e=>Wt(e)==="[object Set]",I=e=>typeof e=="function",J=e=>typeof e=="string",qe=e=>typeof e=="symbol",q=e=>e!==null&&typeof e=="object",No=e=>(q(e)||I(e))&&I(e.then)&&I(e.catch),Mn=Object.prototype.toString,Wt=e=>Mn.call(e),Pn=e=>Wt(e).slice(8,-1),Fn=e=>Wt(e)==="[object Object]",Cs=e=>J(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,dt=ws(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Kt=e=>{const t=Object.create(null);return s=>t[s]||(t[s]=e(s))},Hn=/-\w/g,Ve=Kt(e=>e.replace(Hn,t=>t.slice(1).toUpperCase())),Dn=/\B([A-Z])/g,Xe=Kt(e=>e.replace(Dn,"-$1").toLowerCase()),Lo=Kt(e=>e.charAt(0).toUpperCase()+e.slice(1)),es=Kt(e=>e?`on${Lo(e)}`:""),De=(e,t)=>!Object.is(e,t),ts=(e,...t)=>{for(let s=0;s<e.length;s++)e[s](...t)},Io=(e,t,s,o=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:o,value:s})},Vn=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let Zs;const Yt=()=>Zs||(Zs=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function As(e){if(O(e)){const t={};for(let s=0;s<e.length;s++){const o=e[s],n=J(o)?Gn(o):As(o);if(n)for(const r in n)t[r]=n[r]}return t}else if(J(e)||q(e))return e}const Bn=/;(?![^(]*\))/g,jn=/:([^]+)/,Un=/\/\*[^]*?\*\//g;function Gn(e){const t={};return e.replace(Un,"").split(Bn).forEach(s=>{if(s){const o=s.split(jn);o.length>1&&(t[o[0].trim()]=o[1].trim())}}),t}function Rs(e){let t="";if(J(e))t=e;else if(O(e))for(let s=0;s<e.length;s++){const o=Rs(e[s]);o&&(t+=o+" ")}else if(q(e))for(const s in e)e[s]&&(t+=s+" ");return t.trim()}const $n="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",zn=ws($n);function Oo(e){return!!e||e===""}/**
* @vue/reactivity v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ie;class Wn{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=ie,!t&&ie&&(this.index=(ie.scopes||(ie.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,s;if(this.scopes)for(t=0,s=this.scopes.length;t<s;t++)this.scopes[t].pause();for(t=0,s=this.effects.length;t<s;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,s;if(this.scopes)for(t=0,s=this.scopes.length;t<s;t++)this.scopes[t].resume();for(t=0,s=this.effects.length;t<s;t++)this.effects[t].resume()}}run(t){if(this._active){const s=ie;try{return ie=this,t()}finally{ie=s}}}on(){++this._on===1&&(this.prevScope=ie,ie=this)}off(){this._on>0&&--this._on===0&&(ie=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let s,o;for(s=0,o=this.effects.length;s<o;s++)this.effects[s].stop();for(this.effects.length=0,s=0,o=this.cleanups.length;s<o;s++)this.cleanups[s]();if(this.cleanups.length=0,this.scopes){for(s=0,o=this.scopes.length;s<o;s++)this.scopes[s].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const n=this.parent.scopes.pop();n&&n!==this&&(this.parent.scopes[this.index]=n,n.index=this.index)}this.parent=void 0}}}function Kn(){return ie}let z;const ss=new WeakSet;class Mo{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ie&&ie.active&&ie.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ss.has(this)&&(ss.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Fo(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Qs(this),Ho(this);const t=z,s=pe;z=this,pe=!0;try{return this.fn()}finally{Do(this),z=t,pe=s,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Is(t);this.deps=this.depsTail=void 0,Qs(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ss.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){as(this)&&this.run()}get dirty(){return as(this)}}let Po=0,ht,pt;function Fo(e,t=!1){if(e.flags|=8,t){e.next=pt,pt=e;return}e.next=ht,ht=e}function Ns(){Po++}function Ls(){if(--Po>0)return;if(pt){let t=pt;for(pt=void 0;t;){const s=t.next;t.next=void 0,t.flags&=-9,t=s}}let e;for(;ht;){let t=ht;for(ht=void 0;t;){const s=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(o){e||(e=o)}t=s}}if(e)throw e}function Ho(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Do(e){let t,s=e.depsTail,o=s;for(;o;){const n=o.prevDep;o.version===-1?(o===s&&(s=n),Is(o),Yn(o)):t=o,o.dep.activeLink=o.prevActiveLink,o.prevActiveLink=void 0,o=n}e.deps=t,e.depsTail=s}function as(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Vo(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Vo(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===_t)||(e.globalVersion=_t,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!as(e))))return;e.flags|=2;const t=e.dep,s=z,o=pe;z=e,pe=!0;try{Ho(e);const n=e.fn(e._value);(t.version===0||De(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(n){throw t.version++,n}finally{z=s,pe=o,Do(e),e.flags&=-3}}function Is(e,t=!1){const{dep:s,prevSub:o,nextSub:n}=e;if(o&&(o.nextSub=n,e.prevSub=void 0),n&&(n.prevSub=o,e.nextSub=void 0),s.subs===e&&(s.subs=o,!o&&s.computed)){s.computed.flags&=-5;for(let r=s.computed.deps;r;r=r.nextDep)Is(r,!0)}!t&&!--s.sc&&s.map&&s.map.delete(s.key)}function Yn(e){const{prevDep:t,nextDep:s}=e;t&&(t.nextDep=s,e.prevDep=void 0),s&&(s.prevDep=t,e.nextDep=void 0)}let pe=!0;const Bo=[];function Ne(){Bo.push(pe),pe=!1}function Le(){const e=Bo.pop();pe=e===void 0?!0:e}function Qs(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const s=z;z=void 0;try{t()}finally{z=s}}}let _t=0;class qn{constructor(t,s){this.sub=t,this.dep=s,this.version=s.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Os{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!z||!pe||z===this.computed)return;let s=this.activeLink;if(s===void 0||s.sub!==z)s=this.activeLink=new qn(z,this),z.deps?(s.prevDep=z.depsTail,z.depsTail.nextDep=s,z.depsTail=s):z.deps=z.depsTail=s,jo(s);else if(s.version===-1&&(s.version=this.version,s.nextDep)){const o=s.nextDep;o.prevDep=s.prevDep,s.prevDep&&(s.prevDep.nextDep=o),s.prevDep=z.depsTail,s.nextDep=void 0,z.depsTail.nextDep=s,z.depsTail=s,z.deps===s&&(z.deps=o)}return s}trigger(t){this.version++,_t++,this.notify(t)}notify(t){Ns();try{for(let s=this.subs;s;s=s.prevSub)s.sub.notify()&&s.sub.dep.notify()}finally{Ls()}}}function jo(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let o=t.deps;o;o=o.nextDep)jo(o)}const s=e.dep.subs;s!==e&&(e.prevSub=s,s&&(s.nextSub=e)),e.dep.subs=e}}const ds=new WeakMap,Ke=Symbol(""),hs=Symbol(""),xt=Symbol("");function k(e,t,s){if(pe&&z){let o=ds.get(e);o||ds.set(e,o=new Map);let n=o.get(s);n||(o.set(s,n=new Os),n.map=o,n.key=s),n.track()}}function Ae(e,t,s,o,n,r){const i=ds.get(e);if(!i){_t++;return}const c=f=>{f&&f.trigger()};if(Ns(),t==="clear")i.forEach(c);else{const f=O(e),h=f&&Cs(s);if(f&&s==="length"){const a=Number(o);i.forEach((p,T)=>{(T==="length"||T===xt||!qe(T)&&T>=a)&&c(p)})}else switch((s!==void 0||i.has(void 0))&&c(i.get(s)),h&&c(i.get(xt)),t){case"add":f?h&&c(i.get("length")):(c(i.get(Ke)),at(e)&&c(i.get(hs)));break;case"delete":f||(c(i.get(Ke)),at(e)&&c(i.get(hs)));break;case"set":at(e)&&c(i.get(Ke));break}}Ls()}function Je(e){const t=H(e);return t===e?t:(k(t,"iterate",xt),ge(e)?t:t.map(Ie))}function Ms(e){return k(e=H(e),"iterate",xt),e}function Me(e,t){return Be(e)?Qe(e)?yt(Ie(t)):yt(t):Ie(t)}const Xn={__proto__:null,[Symbol.iterator](){return os(this,Symbol.iterator,e=>Me(this,e))},concat(...e){return Je(this).concat(...e.map(t=>O(t)?Je(t):t))},entries(){return os(this,"entries",e=>(e[1]=Me(this,e[1]),e))},every(e,t){return Ee(this,"every",e,t,void 0,arguments)},filter(e,t){return Ee(this,"filter",e,t,s=>s.map(o=>Me(this,o)),arguments)},find(e,t){return Ee(this,"find",e,t,s=>Me(this,s),arguments)},findIndex(e,t){return Ee(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return Ee(this,"findLast",e,t,s=>Me(this,s),arguments)},findLastIndex(e,t){return Ee(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return Ee(this,"forEach",e,t,void 0,arguments)},includes(...e){return ns(this,"includes",e)},indexOf(...e){return ns(this,"indexOf",e)},join(e){return Je(this).join(e)},lastIndexOf(...e){return ns(this,"lastIndexOf",e)},map(e,t){return Ee(this,"map",e,t,void 0,arguments)},pop(){return ct(this,"pop")},push(...e){return ct(this,"push",e)},reduce(e,...t){return eo(this,"reduce",e,t)},reduceRight(e,...t){return eo(this,"reduceRight",e,t)},shift(){return ct(this,"shift")},some(e,t){return Ee(this,"some",e,t,void 0,arguments)},splice(...e){return ct(this,"splice",e)},toReversed(){return Je(this).toReversed()},toSorted(e){return Je(this).toSorted(e)},toSpliced(...e){return Je(this).toSpliced(...e)},unshift(...e){return ct(this,"unshift",e)},values(){return os(this,"values",e=>Me(this,e))}};function os(e,t,s){const o=Ms(e),n=o[t]();return o!==e&&!ge(e)&&(n._next=n.next,n.next=()=>{const r=n._next();return r.done||(r.value=s(r.value)),r}),n}const Jn=Array.prototype;function Ee(e,t,s,o,n,r){const i=Ms(e),c=i!==e&&!ge(e),f=i[t];if(f!==Jn[t]){const p=f.apply(e,r);return c?Ie(p):p}let h=s;i!==e&&(c?h=function(p,T){return s.call(this,Me(e,p),T,e)}:s.length>2&&(h=function(p,T){return s.call(this,p,T,e)}));const a=f.call(i,h,o);return c&&n?n(a):a}function eo(e,t,s,o){const n=Ms(e);let r=s;return n!==e&&(ge(e)?s.length>3&&(r=function(i,c,f){return s.call(this,i,c,f,e)}):r=function(i,c,f){return s.call(this,i,Me(e,c),f,e)}),n[t](r,...o)}function ns(e,t,s){const o=H(e);k(o,"iterate",xt);const n=o[t](...s);return(n===-1||n===!1)&&Ds(s[0])?(s[0]=H(s[0]),o[t](...s)):n}function ct(e,t,s=[]){Ne(),Ns();const o=H(e)[t].apply(e,s);return Ls(),Le(),o}const kn=ws("__proto__,__v_isRef,__isVue"),Uo=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(qe));function Zn(e){qe(e)||(e=String(e));const t=H(this);return k(t,"has",e),t.hasOwnProperty(e)}class Go{constructor(t=!1,s=!1){this._isReadonly=t,this._isShallow=s}get(t,s,o){if(s==="__v_skip")return t.__v_skip;const n=this._isReadonly,r=this._isShallow;if(s==="__v_isReactive")return!n;if(s==="__v_isReadonly")return n;if(s==="__v_isShallow")return r;if(s==="__v_raw")return o===(n?r?cr:Ko:r?Wo:zo).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(o)?t:void 0;const i=O(t);if(!n){let f;if(i&&(f=Xn[s]))return f;if(s==="hasOwnProperty")return Zn}const c=Reflect.get(t,s,Z(t)?t:o);if((qe(s)?Uo.has(s):kn(s))||(n||k(t,"get",s),r))return c;if(Z(c)){const f=i&&Cs(s)?c:c.value;return n&&q(f)?gs(f):f}return q(c)?n?gs(c):Fs(c):c}}class $o extends Go{constructor(t=!1){super(!1,t)}set(t,s,o,n){let r=t[s];const i=O(t)&&Cs(s);if(!this._isShallow){const h=Be(r);if(!ge(o)&&!Be(o)&&(r=H(r),o=H(o)),!i&&Z(r)&&!Z(o))return h||(r.value=o),!0}const c=i?Number(s)<t.length:D(t,s),f=Reflect.set(t,s,o,Z(t)?t:n);return t===H(n)&&(c?De(o,r)&&Ae(t,"set",s,o):Ae(t,"add",s,o)),f}deleteProperty(t,s){const o=D(t,s);t[s];const n=Reflect.deleteProperty(t,s);return n&&o&&Ae(t,"delete",s,void 0),n}has(t,s){const o=Reflect.has(t,s);return(!qe(s)||!Uo.has(s))&&k(t,"has",s),o}ownKeys(t){return k(t,"iterate",O(t)?"length":Ke),Reflect.ownKeys(t)}}class Qn extends Go{constructor(t=!1){super(!0,t)}set(t,s){return!0}deleteProperty(t,s){return!0}}const er=new $o,tr=new Qn,sr=new $o(!0);const ps=e=>e,It=e=>Reflect.getPrototypeOf(e);function or(e,t,s){return function(...o){const n=this.__v_raw,r=H(n),i=at(r),c=e==="entries"||e===Symbol.iterator&&i,f=e==="keys"&&i,h=n[e](...o),a=s?ps:t?yt:Ie;return!t&&k(r,"iterate",f?hs:Ke),{next(){const{value:p,done:T}=h.next();return T?{value:p,done:T}:{value:c?[a(p[0]),a(p[1])]:a(p),done:T}},[Symbol.iterator](){return this}}}}function Ot(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function nr(e,t){const s={get(n){const r=this.__v_raw,i=H(r),c=H(n);e||(De(n,c)&&k(i,"get",n),k(i,"get",c));const{has:f}=It(i),h=t?ps:e?yt:Ie;if(f.call(i,n))return h(r.get(n));if(f.call(i,c))return h(r.get(c));r!==i&&r.get(n)},get size(){const n=this.__v_raw;return!e&&k(H(n),"iterate",Ke),n.size},has(n){const r=this.__v_raw,i=H(r),c=H(n);return e||(De(n,c)&&k(i,"has",n),k(i,"has",c)),n===c?r.has(n):r.has(n)||r.has(c)},forEach(n,r){const i=this,c=i.__v_raw,f=H(c),h=t?ps:e?yt:Ie;return!e&&k(f,"iterate",Ke),c.forEach((a,p)=>n.call(r,h(a),h(p),i))}};return oe(s,e?{add:Ot("add"),set:Ot("set"),delete:Ot("delete"),clear:Ot("clear")}:{add(n){!t&&!ge(n)&&!Be(n)&&(n=H(n));const r=H(this);return It(r).has.call(r,n)||(r.add(n),Ae(r,"add",n,n)),this},set(n,r){!t&&!ge(r)&&!Be(r)&&(r=H(r));const i=H(this),{has:c,get:f}=It(i);let h=c.call(i,n);h||(n=H(n),h=c.call(i,n));const a=f.call(i,n);return i.set(n,r),h?De(r,a)&&Ae(i,"set",n,r):Ae(i,"add",n,r),this},delete(n){const r=H(this),{has:i,get:c}=It(r);let f=i.call(r,n);f||(n=H(n),f=i.call(r,n)),c&&c.call(r,n);const h=r.delete(n);return f&&Ae(r,"delete",n,void 0),h},clear(){const n=H(this),r=n.size!==0,i=n.clear();return r&&Ae(n,"clear",void 0,void 0),i}}),["keys","values","entries",Symbol.iterator].forEach(n=>{s[n]=or(n,e,t)}),s}function Ps(e,t){const s=nr(e,t);return(o,n,r)=>n==="__v_isReactive"?!e:n==="__v_isReadonly"?e:n==="__v_raw"?o:Reflect.get(D(s,n)&&n in o?s:o,n,r)}const rr={get:Ps(!1,!1)},ir={get:Ps(!1,!0)},lr={get:Ps(!0,!1)};const zo=new WeakMap,Wo=new WeakMap,Ko=new WeakMap,cr=new WeakMap;function fr(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ur(e){return e.__v_skip||!Object.isExtensible(e)?0:fr(Pn(e))}function Fs(e){return Be(e)?e:Hs(e,!1,er,rr,zo)}function ar(e){return Hs(e,!1,sr,ir,Wo)}function gs(e){return Hs(e,!0,tr,lr,Ko)}function Hs(e,t,s,o,n){if(!q(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const r=ur(e);if(r===0)return e;const i=n.get(e);if(i)return i;const c=new Proxy(e,r===2?o:s);return n.set(e,c),c}function Qe(e){return Be(e)?Qe(e.__v_raw):!!(e&&e.__v_isReactive)}function Be(e){return!!(e&&e.__v_isReadonly)}function ge(e){return!!(e&&e.__v_isShallow)}function Ds(e){return e?!!e.__v_raw:!1}function H(e){const t=e&&e.__v_raw;return t?H(t):e}function dr(e){return!D(e,"__v_skip")&&Object.isExtensible(e)&&Io(e,"__v_skip",!0),e}const Ie=e=>q(e)?Fs(e):e,yt=e=>q(e)?gs(e):e;function Z(e){return e?e.__v_isRef===!0:!1}function to(e){return hr(e,!1)}function hr(e,t){return Z(e)?e:new pr(e,t)}class pr{constructor(t,s){this.dep=new Os,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=s?t:H(t),this._value=s?t:Ie(t),this.__v_isShallow=s}get value(){return this.dep.track(),this._value}set value(t){const s=this._rawValue,o=this.__v_isShallow||ge(t)||Be(t);t=o?t:H(t),De(t,s)&&(this._rawValue=t,this._value=o?t:Ie(t),this.dep.trigger())}}function gr(e){return Z(e)?e.value:e}const mr={get:(e,t,s)=>t==="__v_raw"?e:gr(Reflect.get(e,t,s)),set:(e,t,s,o)=>{const n=e[t];return Z(n)&&!Z(s)?(n.value=s,!0):Reflect.set(e,t,s,o)}};function Yo(e){return Qe(e)?e:new Proxy(e,mr)}class vr{constructor(t,s,o){this.fn=t,this.setter=s,this._value=void 0,this.dep=new Os(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=_t-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!s,this.isSSR=o}notify(){if(this.flags|=16,!(this.flags&8)&&z!==this)return Fo(this,!0),!0}get value(){const t=this.dep.track();return Vo(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function _r(e,t,s=!1){let o,n;return I(e)?o=e:(o=e.get,n=e.set),new vr(o,n,s)}const Mt={},Dt=new WeakMap;let We;function xr(e,t=!1,s=We){if(s){let o=Dt.get(s);o||Dt.set(s,o=[]),o.push(e)}}function yr(e,t,s=W){const{immediate:o,deep:n,once:r,scheduler:i,augmentJob:c,call:f}=s,h=b=>n?b:ge(b)||n===!1||n===0?He(b,1):He(b);let a,p,T,E,L=!1,M=!1;if(Z(e)?(p=()=>e.value,L=ge(e)):Qe(e)?(p=()=>h(e),L=!0):O(e)?(M=!0,L=e.some(b=>Qe(b)||ge(b)),p=()=>e.map(b=>{if(Z(b))return b.value;if(Qe(b))return h(b);if(I(b))return f?f(b,2):b()})):I(e)?t?p=f?()=>f(e,2):e:p=()=>{if(T){Ne();try{T()}finally{Le()}}const b=We;We=a;try{return f?f(e,3,[E]):e(E)}finally{We=b}}:p=we,t&&n){const b=p,N=n===!0?1/0:n;p=()=>He(b(),N)}const X=Kn(),P=()=>{a.stop(),X&&X.active&&Es(X.effects,a)};if(r&&t){const b=t;t=(...N)=>{b(...N),P()}}let B=M?new Array(e.length).fill(Mt):Mt;const j=b=>{if(!(!(a.flags&1)||!a.dirty&&!b))if(t){const N=a.run();if(n||L||(M?N.some((Y,U)=>De(Y,B[U])):De(N,B))){T&&T();const Y=We;We=a;try{const U=[N,B===Mt?void 0:M&&B[0]===Mt?[]:B,E];B=N,f?f(t,3,U):t(...U)}finally{We=Y}}}else a.run()};return c&&c(j),a=new Mo(p),a.scheduler=i?()=>i(j,!1):j,E=b=>xr(b,!1,a),T=a.onStop=()=>{const b=Dt.get(a);if(b){if(f)f(b,4);else for(const N of b)N();Dt.delete(a)}},t?o?j(!0):B=a.run():i?i(j.bind(null,!0),!0):a.run(),P.pause=a.pause.bind(a),P.resume=a.resume.bind(a),P.stop=P,P}function He(e,t=1/0,s){if(t<=0||!q(e)||e.__v_skip||(s=s||new Map,(s.get(e)||0)>=t))return e;if(s.set(e,t),t--,Z(e))He(e.value,t,s);else if(O(e))for(let o=0;o<e.length;o++)He(e[o],t,s);else if(On(e)||at(e))e.forEach(o=>{He(o,t,s)});else if(Fn(e)){for(const o in e)He(e[o],t,s);for(const o of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,o)&&He(e[o],t,s)}return e}/**
* @vue/runtime-core v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Tt(e,t,s,o){try{return o?e(...o):e()}catch(n){qt(n,t,s)}}function Te(e,t,s,o){if(I(e)){const n=Tt(e,t,s,o);return n&&No(n)&&n.catch(r=>{qt(r,t,s)}),n}if(O(e)){const n=[];for(let r=0;r<e.length;r++)n.push(Te(e[r],t,s,o));return n}}function qt(e,t,s,o=!0){const n=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:i}=t&&t.appContext.config||W;if(t){let c=t.parent;const f=t.proxy,h=`https://vuejs.org/error-reference/#runtime-${s}`;for(;c;){const a=c.ec;if(a){for(let p=0;p<a.length;p++)if(a[p](e,f,h)===!1)return}c=c.parent}if(r){Ne(),Tt(r,null,10,[e,f,h]),Le();return}}br(e,s,n,o,i)}function br(e,t,s,o=!0,n=!1){if(n)throw e;console.error(e)}const te=[];let be=-1;const et=[];let Pe=null,ke=0;const qo=Promise.resolve();let Vt=null;function Sr(e){const t=Vt||qo;return e?t.then(this?e.bind(this):e):t}function wr(e){let t=be+1,s=te.length;for(;t<s;){const o=t+s>>>1,n=te[o],r=bt(n);r<e||r===e&&n.flags&2?t=o+1:s=o}return t}function Vs(e){if(!(e.flags&1)){const t=bt(e),s=te[te.length-1];!s||!(e.flags&2)&&t>=bt(s)?te.push(e):te.splice(wr(t),0,e),e.flags|=1,Xo()}}function Xo(){Vt||(Vt=qo.then(ko))}function Tr(e){O(e)?et.push(...e):Pe&&e.id===-1?Pe.splice(ke+1,0,e):e.flags&1||(et.push(e),e.flags|=1),Xo()}function so(e,t,s=be+1){for(;s<te.length;s++){const o=te[s];if(o&&o.flags&2){if(e&&o.id!==e.uid)continue;te.splice(s,1),s--,o.flags&4&&(o.flags&=-2),o(),o.flags&4||(o.flags&=-2)}}}function Jo(e){if(et.length){const t=[...new Set(et)].sort((s,o)=>bt(s)-bt(o));if(et.length=0,Pe){Pe.push(...t);return}for(Pe=t,ke=0;ke<Pe.length;ke++){const s=Pe[ke];s.flags&4&&(s.flags&=-2),s.flags&8||s(),s.flags&=-2}Pe=null,ke=0}}const bt=e=>e.id==null?e.flags&2?-1:1/0:e.id;function ko(e){try{for(be=0;be<te.length;be++){const t=te[be];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Tt(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;be<te.length;be++){const t=te[be];t&&(t.flags&=-2)}be=-1,te.length=0,Jo(),Vt=null,(te.length||et.length)&&ko()}}let le=null,Zo=null;function Bt(e){const t=le;return le=e,Zo=e&&e.type.__scopeId||null,t}function Qo(e,t=le,s){if(!t||e._n)return e;const o=(...n)=>{o._d&&ho(-1);const r=Bt(t);let i;try{i=e(...n)}finally{Bt(r),o._d&&ho(1)}return i};return o._n=!0,o._c=!0,o._d=!0,o}function $e(e,t,s,o){const n=e.dirs,r=t&&t.dirs;for(let i=0;i<n.length;i++){const c=n[i];r&&(c.oldValue=r[i].value);let f=c.dir[o];f&&(Ne(),Te(f,s,8,[e.el,c,e,t]),Le())}}function Er(e,t){if(se){let s=se.provides;const o=se.parent&&se.parent.provides;o===s&&(s=se.provides=Object.create(o)),s[e]=t}}function Pt(e,t,s=!1){const o=Ci();if(o||st){let n=st?st._context.provides:o?o.parent==null||o.ce?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides:void 0;if(n&&e in n)return n[e];if(arguments.length>1)return s&&I(t)?t.call(o&&o.proxy):t}}const Cr=Symbol.for("v-scx"),Ar=()=>Pt(Cr);function rs(e,t,s){return en(e,t,s)}function en(e,t,s=W){const{immediate:o,deep:n,flush:r,once:i}=s,c=oe({},s),f=t&&o||!t&&r!=="post";let h;if(wt){if(r==="sync"){const E=Ar();h=E.__watcherHandles||(E.__watcherHandles=[])}else if(!f){const E=()=>{};return E.stop=we,E.resume=we,E.pause=we,E}}const a=se;c.call=(E,L,M)=>Te(E,a,L,M);let p=!1;r==="post"?c.scheduler=E=>{fe(E,a&&a.suspense)}:r!=="sync"&&(p=!0,c.scheduler=(E,L)=>{L?E():Vs(E)}),c.augmentJob=E=>{t&&(E.flags|=4),p&&(E.flags|=2,a&&(E.id=a.uid,E.i=a))};const T=yr(e,t,c);return wt&&(h?h.push(T):f&&T()),T}function Rr(e,t,s){const o=this.proxy,n=J(e)?e.includes(".")?tn(o,e):()=>o[e]:e.bind(o,o);let r;I(t)?r=t:(r=t.handler,s=t);const i=Et(this),c=en(n,r.bind(o),s);return i(),c}function tn(e,t){const s=t.split(".");return()=>{let o=e;for(let n=0;n<s.length&&o;n++)o=o[s[n]];return o}}const Nr=Symbol("_vte"),Lr=e=>e.__isTeleport,Ir=Symbol("_leaveCb");function Bs(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Bs(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function sn(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}const jt=new WeakMap;function gt(e,t,s,o,n=!1){if(O(e)){e.forEach((L,M)=>gt(L,t&&(O(t)?t[M]:t),s,o,n));return}if(tt(o)&&!n){o.shapeFlag&512&&o.type.__asyncResolved&&o.component.subTree.component&&gt(e,t,s,o.component.subTree);return}const r=o.shapeFlag&4?Ws(o.component):o.el,i=n?null:r,{i:c,r:f}=e,h=t&&t.r,a=c.refs===W?c.refs={}:c.refs,p=c.setupState,T=H(p),E=p===W?Ro:L=>D(T,L);if(h!=null&&h!==f){if(oo(t),J(h))a[h]=null,E(h)&&(p[h]=null);else if(Z(h)){h.value=null;const L=t;L.k&&(a[L.k]=null)}}if(I(f))Tt(f,c,12,[i,a]);else{const L=J(f),M=Z(f);if(L||M){const X=()=>{if(e.f){const P=L?E(f)?p[f]:a[f]:f.value;if(n)O(P)&&Es(P,r);else if(O(P))P.includes(r)||P.push(r);else if(L)a[f]=[r],E(f)&&(p[f]=a[f]);else{const B=[r];f.value=B,e.k&&(a[e.k]=B)}}else L?(a[f]=i,E(f)&&(p[f]=i)):M&&(f.value=i,e.k&&(a[e.k]=i))};if(i){const P=()=>{X(),jt.delete(e)};P.id=-1,jt.set(e,P),fe(P,s)}else oo(e),X()}}}function oo(e){const t=jt.get(e);t&&(t.flags|=8,jt.delete(e))}Yt().requestIdleCallback;Yt().cancelIdleCallback;const tt=e=>!!e.type.__asyncLoader,on=e=>e.type.__isKeepAlive;function Or(e,t){nn(e,"a",t)}function Mr(e,t){nn(e,"da",t)}function nn(e,t,s=se){const o=e.__wdc||(e.__wdc=()=>{let n=s;for(;n;){if(n.isDeactivated)return;n=n.parent}return e()});if(Xt(t,o,s),s){let n=s.parent;for(;n&&n.parent;)on(n.parent.vnode)&&Pr(o,t,s,n),n=n.parent}}function Pr(e,t,s,o){const n=Xt(t,e,o,!0);js(()=>{Es(o[t],n)},s)}function Xt(e,t,s=se,o=!1){if(s){const n=s[e]||(s[e]=[]),r=t.__weh||(t.__weh=(...i)=>{Ne();const c=Et(s),f=Te(t,s,e,i);return c(),Le(),f});return o?n.unshift(r):n.push(r),r}}const Oe=e=>(t,s=se)=>{(!wt||e==="sp")&&Xt(e,(...o)=>t(...o),s)},Fr=Oe("bm"),rn=Oe("m"),Hr=Oe("bu"),Dr=Oe("u"),Vr=Oe("bum"),js=Oe("um"),Br=Oe("sp"),jr=Oe("rtg"),Ur=Oe("rtc");function Gr(e,t=se){Xt("ec",e,t)}const $r=Symbol.for("v-ndc");function zr(e,t,s={},o,n){if(le.ce||le.parent&&tt(le.parent)&&le.parent.ce){const h=Object.keys(s).length>0;return Gt(),ys(ue,null,[Re("slot",s,o)],h?-2:64)}let r=e[t];r&&r._c&&(r._d=!1),Gt();const i=r&&ln(r(s)),c=s.key||i&&i.key,f=ys(ue,{key:(c&&!qe(c)?c:`_${t}`)+(!i&&o?"_fb":"")},i||[],i&&e._===1?64:-2);return r&&r._c&&(r._d=!0),f}function ln(e){return e.some(t=>$s(t)?!(t.type===Ye||t.type===ue&&!ln(t.children)):!0)?e:null}const ms=e=>e?Cn(e)?Ws(e):ms(e.parent):null,mt=oe(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>ms(e.parent),$root:e=>ms(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>fn(e),$forceUpdate:e=>e.f||(e.f=()=>{Vs(e.update)}),$nextTick:e=>e.n||(e.n=Sr.bind(e.proxy)),$watch:e=>Rr.bind(e)}),is=(e,t)=>e!==W&&!e.__isScriptSetup&&D(e,t),Wr={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:s,setupState:o,data:n,props:r,accessCache:i,type:c,appContext:f}=e;if(t[0]!=="$"){const T=i[t];if(T!==void 0)switch(T){case 1:return o[t];case 2:return n[t];case 4:return s[t];case 3:return r[t]}else{if(is(o,t))return i[t]=1,o[t];if(n!==W&&D(n,t))return i[t]=2,n[t];if(D(r,t))return i[t]=3,r[t];if(s!==W&&D(s,t))return i[t]=4,s[t];vs&&(i[t]=0)}}const h=mt[t];let a,p;if(h)return t==="$attrs"&&k(e.attrs,"get",""),h(e);if((a=c.__cssModules)&&(a=a[t]))return a;if(s!==W&&D(s,t))return i[t]=4,s[t];if(p=f.config.globalProperties,D(p,t))return p[t]},set({_:e},t,s){const{data:o,setupState:n,ctx:r}=e;return is(n,t)?(n[t]=s,!0):o!==W&&D(o,t)?(o[t]=s,!0):D(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(r[t]=s,!0)},has({_:{data:e,setupState:t,accessCache:s,ctx:o,appContext:n,props:r,type:i}},c){let f;return!!(s[c]||e!==W&&c[0]!=="$"&&D(e,c)||is(t,c)||D(r,c)||D(o,c)||D(mt,c)||D(n.config.globalProperties,c)||(f=i.__cssModules)&&f[c])},defineProperty(e,t,s){return s.get!=null?e._.accessCache[t]=0:D(s,"value")&&this.set(e,t,s.value,null),Reflect.defineProperty(e,t,s)}};function no(e){return O(e)?e.reduce((t,s)=>(t[s]=null,t),{}):e}let vs=!0;function Kr(e){const t=fn(e),s=e.proxy,o=e.ctx;vs=!1,t.beforeCreate&&ro(t.beforeCreate,e,"bc");const{data:n,computed:r,methods:i,watch:c,provide:f,inject:h,created:a,beforeMount:p,mounted:T,beforeUpdate:E,updated:L,activated:M,deactivated:X,beforeDestroy:P,beforeUnmount:B,destroyed:j,unmounted:b,render:N,renderTracked:Y,renderTriggered:U,errorCaptured:he,serverPrefetch:Ct,expose:je,inheritAttrs:nt,components:At,directives:Rt,filters:Zt}=t;if(h&&Yr(h,o,null),i)for(const K in i){const G=i[K];I(G)&&(o[K]=G.bind(s))}if(n){const K=n.call(s,s);q(K)&&(e.data=Fs(K))}if(vs=!0,r)for(const K in r){const G=r[K],Ue=I(G)?G.bind(s,s):I(G.get)?G.get.bind(s,s):we,Nt=!I(G)&&I(G.set)?G.set.bind(s):we,Ge=Oi({get:Ue,set:Nt});Object.defineProperty(o,K,{enumerable:!0,configurable:!0,get:()=>Ge.value,set:me=>Ge.value=me})}if(c)for(const K in c)cn(c[K],o,s,K);if(f){const K=I(f)?f.call(s):f;Reflect.ownKeys(K).forEach(G=>{Er(G,K[G])})}a&&ro(a,e,"c");function Q(K,G){O(G)?G.forEach(Ue=>K(Ue.bind(s))):G&&K(G.bind(s))}if(Q(Fr,p),Q(rn,T),Q(Hr,E),Q(Dr,L),Q(Or,M),Q(Mr,X),Q(Gr,he),Q(Ur,Y),Q(jr,U),Q(Vr,B),Q(js,b),Q(Br,Ct),O(je))if(je.length){const K=e.exposed||(e.exposed={});je.forEach(G=>{Object.defineProperty(K,G,{get:()=>s[G],set:Ue=>s[G]=Ue,enumerable:!0})})}else e.exposed||(e.exposed={});N&&e.render===we&&(e.render=N),nt!=null&&(e.inheritAttrs=nt),At&&(e.components=At),Rt&&(e.directives=Rt),Ct&&sn(e)}function Yr(e,t,s=we){O(e)&&(e=_s(e));for(const o in e){const n=e[o];let r;q(n)?"default"in n?r=Pt(n.from||o,n.default,!0):r=Pt(n.from||o):r=Pt(n),Z(r)?Object.defineProperty(t,o,{enumerable:!0,configurable:!0,get:()=>r.value,set:i=>r.value=i}):t[o]=r}}function ro(e,t,s){Te(O(e)?e.map(o=>o.bind(t.proxy)):e.bind(t.proxy),t,s)}function cn(e,t,s,o){let n=o.includes(".")?tn(s,o):()=>s[o];if(J(e)){const r=t[e];I(r)&&rs(n,r)}else if(I(e))rs(n,e.bind(s));else if(q(e))if(O(e))e.forEach(r=>cn(r,t,s,o));else{const r=I(e.handler)?e.handler.bind(s):t[e.handler];I(r)&&rs(n,r,e)}}function fn(e){const t=e.type,{mixins:s,extends:o}=t,{mixins:n,optionsCache:r,config:{optionMergeStrategies:i}}=e.appContext,c=r.get(t);let f;return c?f=c:!n.length&&!s&&!o?f=t:(f={},n.length&&n.forEach(h=>Ut(f,h,i,!0)),Ut(f,t,i)),q(t)&&r.set(t,f),f}function Ut(e,t,s,o=!1){const{mixins:n,extends:r}=t;r&&Ut(e,r,s,!0),n&&n.forEach(i=>Ut(e,i,s,!0));for(const i in t)if(!(o&&i==="expose")){const c=qr[i]||s&&s[i];e[i]=c?c(e[i],t[i]):t[i]}return e}const qr={data:io,props:lo,emits:lo,methods:ut,computed:ut,beforeCreate:ee,created:ee,beforeMount:ee,mounted:ee,beforeUpdate:ee,updated:ee,beforeDestroy:ee,beforeUnmount:ee,destroyed:ee,unmounted:ee,activated:ee,deactivated:ee,errorCaptured:ee,serverPrefetch:ee,components:ut,directives:ut,watch:Jr,provide:io,inject:Xr};function io(e,t){return t?e?function(){return oe(I(e)?e.call(this,this):e,I(t)?t.call(this,this):t)}:t:e}function Xr(e,t){return ut(_s(e),_s(t))}function _s(e){if(O(e)){const t={};for(let s=0;s<e.length;s++)t[e[s]]=e[s];return t}return e}function ee(e,t){return e?[...new Set([].concat(e,t))]:t}function ut(e,t){return e?oe(Object.create(null),e,t):t}function lo(e,t){return e?O(e)&&O(t)?[...new Set([...e,...t])]:oe(Object.create(null),no(e),no(t??{})):t}function Jr(e,t){if(!e)return t;if(!t)return e;const s=oe(Object.create(null),e);for(const o in t)s[o]=ee(e[o],t[o]);return s}function un(){return{app:null,config:{isNativeTag:Ro,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let kr=0;function Zr(e,t){return function(o,n=null){I(o)||(o=oe({},o)),n!=null&&!q(n)&&(n=null);const r=un(),i=new WeakSet,c=[];let f=!1;const h=r.app={_uid:kr++,_component:o,_props:n,_container:null,_context:r,_instance:null,version:Mi,get config(){return r.config},set config(a){},use(a,...p){return i.has(a)||(a&&I(a.install)?(i.add(a),a.install(h,...p)):I(a)&&(i.add(a),a(h,...p))),h},mixin(a){return r.mixins.includes(a)||r.mixins.push(a),h},component(a,p){return p?(r.components[a]=p,h):r.components[a]},directive(a,p){return p?(r.directives[a]=p,h):r.directives[a]},mount(a,p,T){if(!f){const E=h._ceVNode||Re(o,n);return E.appContext=r,T===!0?T="svg":T===!1&&(T=void 0),e(E,a,T),f=!0,h._container=a,a.__vue_app__=h,Ws(E.component)}},onUnmount(a){c.push(a)},unmount(){f&&(Te(c,h._instance,16),e(null,h._container),delete h._container.__vue_app__)},provide(a,p){return r.provides[a]=p,h},runWithContext(a){const p=st;st=h;try{return a()}finally{st=p}}};return h}}let st=null;const Qr=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Ve(t)}Modifiers`]||e[`${Xe(t)}Modifiers`];function ei(e,t,...s){if(e.isUnmounted)return;const o=e.vnode.props||W;let n=s;const r=t.startsWith("update:"),i=r&&Qr(o,t.slice(7));i&&(i.trim&&(n=s.map(a=>J(a)?a.trim():a)),i.number&&(n=s.map(Vn)));let c,f=o[c=es(t)]||o[c=es(Ve(t))];!f&&r&&(f=o[c=es(Xe(t))]),f&&Te(f,e,6,n);const h=o[c+"Once"];if(h){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,Te(h,e,6,n)}}const ti=new WeakMap;function an(e,t,s=!1){const o=s?ti:t.emitsCache,n=o.get(e);if(n!==void 0)return n;const r=e.emits;let i={},c=!1;if(!I(e)){const f=h=>{const a=an(h,t,!0);a&&(c=!0,oe(i,a))};!s&&t.mixins.length&&t.mixins.forEach(f),e.extends&&f(e.extends),e.mixins&&e.mixins.forEach(f)}return!r&&!c?(q(e)&&o.set(e,null),null):(O(r)?r.forEach(f=>i[f]=null):oe(i,r),q(e)&&o.set(e,i),i)}function Jt(e,t){return!e||!zt(t)?!1:(t=t.slice(2).replace(/Once$/,""),D(e,t[0].toLowerCase()+t.slice(1))||D(e,Xe(t))||D(e,t))}function co(e){const{type:t,vnode:s,proxy:o,withProxy:n,propsOptions:[r],slots:i,attrs:c,emit:f,render:h,renderCache:a,props:p,data:T,setupState:E,ctx:L,inheritAttrs:M}=e,X=Bt(e);let P,B;try{if(s.shapeFlag&4){const b=n||o,N=b;P=Se(h.call(N,b,a,p,E,T,L)),B=c}else{const b=t;P=Se(b.length>1?b(p,{attrs:c,slots:i,emit:f}):b(p,null)),B=t.props?c:si(c)}}catch(b){vt.length=0,qt(b,e,1),P=Re(Ye)}let j=P;if(B&&M!==!1){const b=Object.keys(B),{shapeFlag:N}=j;b.length&&N&7&&(r&&b.some(Ts)&&(B=oi(B,r)),j=ot(j,B,!1,!0))}return s.dirs&&(j=ot(j,null,!1,!0),j.dirs=j.dirs?j.dirs.concat(s.dirs):s.dirs),s.transition&&Bs(j,s.transition),P=j,Bt(X),P}const si=e=>{let t;for(const s in e)(s==="class"||s==="style"||zt(s))&&((t||(t={}))[s]=e[s]);return t},oi=(e,t)=>{const s={};for(const o in e)(!Ts(o)||!(o.slice(9)in t))&&(s[o]=e[o]);return s};function ni(e,t,s){const{props:o,children:n,component:r}=e,{props:i,children:c,patchFlag:f}=t,h=r.emitsOptions;if(t.dirs||t.transition)return!0;if(s&&f>=0){if(f&1024)return!0;if(f&16)return o?fo(o,i,h):!!i;if(f&8){const a=t.dynamicProps;for(let p=0;p<a.length;p++){const T=a[p];if(i[T]!==o[T]&&!Jt(h,T))return!0}}}else return(n||c)&&(!c||!c.$stable)?!0:o===i?!1:o?i?fo(o,i,h):!0:!!i;return!1}function fo(e,t,s){const o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let n=0;n<o.length;n++){const r=o[n];if(t[r]!==e[r]&&!Jt(s,r))return!0}return!1}function ri({vnode:e,parent:t},s){for(;t;){const o=t.subTree;if(o.suspense&&o.suspense.activeBranch===e&&(o.el=e.el),o===e)(e=t.vnode).el=s,t=t.parent;else break}}const dn={},hn=()=>Object.create(dn),pn=e=>Object.getPrototypeOf(e)===dn;function ii(e,t,s,o=!1){const n={},r=hn();e.propsDefaults=Object.create(null),gn(e,t,n,r);for(const i in e.propsOptions[0])i in n||(n[i]=void 0);s?e.props=o?n:ar(n):e.type.props?e.props=n:e.props=r,e.attrs=r}function li(e,t,s,o){const{props:n,attrs:r,vnode:{patchFlag:i}}=e,c=H(n),[f]=e.propsOptions;let h=!1;if((o||i>0)&&!(i&16)){if(i&8){const a=e.vnode.dynamicProps;for(let p=0;p<a.length;p++){let T=a[p];if(Jt(e.emitsOptions,T))continue;const E=t[T];if(f)if(D(r,T))E!==r[T]&&(r[T]=E,h=!0);else{const L=Ve(T);n[L]=xs(f,c,L,E,e,!1)}else E!==r[T]&&(r[T]=E,h=!0)}}}else{gn(e,t,n,r)&&(h=!0);let a;for(const p in c)(!t||!D(t,p)&&((a=Xe(p))===p||!D(t,a)))&&(f?s&&(s[p]!==void 0||s[a]!==void 0)&&(n[p]=xs(f,c,p,void 0,e,!0)):delete n[p]);if(r!==c)for(const p in r)(!t||!D(t,p))&&(delete r[p],h=!0)}h&&Ae(e.attrs,"set","")}function gn(e,t,s,o){const[n,r]=e.propsOptions;let i=!1,c;if(t)for(let f in t){if(dt(f))continue;const h=t[f];let a;n&&D(n,a=Ve(f))?!r||!r.includes(a)?s[a]=h:(c||(c={}))[a]=h:Jt(e.emitsOptions,f)||(!(f in o)||h!==o[f])&&(o[f]=h,i=!0)}if(r){const f=H(s),h=c||W;for(let a=0;a<r.length;a++){const p=r[a];s[p]=xs(n,f,p,h[p],e,!D(h,p))}}return i}function xs(e,t,s,o,n,r){const i=e[s];if(i!=null){const c=D(i,"default");if(c&&o===void 0){const f=i.default;if(i.type!==Function&&!i.skipFactory&&I(f)){const{propsDefaults:h}=n;if(s in h)o=h[s];else{const a=Et(n);o=h[s]=f.call(null,t),a()}}else o=f;n.ce&&n.ce._setProp(s,o)}i[0]&&(r&&!c?o=!1:i[1]&&(o===""||o===Xe(s))&&(o=!0))}return o}const ci=new WeakMap;function mn(e,t,s=!1){const o=s?ci:t.propsCache,n=o.get(e);if(n)return n;const r=e.props,i={},c=[];let f=!1;if(!I(e)){const a=p=>{f=!0;const[T,E]=mn(p,t,!0);oe(i,T),E&&c.push(...E)};!s&&t.mixins.length&&t.mixins.forEach(a),e.extends&&a(e.extends),e.mixins&&e.mixins.forEach(a)}if(!r&&!f)return q(e)&&o.set(e,Ze),Ze;if(O(r))for(let a=0;a<r.length;a++){const p=Ve(r[a]);uo(p)&&(i[p]=W)}else if(r)for(const a in r){const p=Ve(a);if(uo(p)){const T=r[a],E=i[p]=O(T)||I(T)?{type:T}:oe({},T),L=E.type;let M=!1,X=!0;if(O(L))for(let P=0;P<L.length;++P){const B=L[P],j=I(B)&&B.name;if(j==="Boolean"){M=!0;break}else j==="String"&&(X=!1)}else M=I(L)&&L.name==="Boolean";E[0]=M,E[1]=X,(M||D(E,"default"))&&c.push(p)}}const h=[i,c];return q(e)&&o.set(e,h),h}function uo(e){return e[0]!=="$"&&!dt(e)}const Us=e=>e==="_"||e==="_ctx"||e==="$stable",Gs=e=>O(e)?e.map(Se):[Se(e)],fi=(e,t,s)=>{if(t._n)return t;const o=Qo((...n)=>Gs(t(...n)),s);return o._c=!1,o},vn=(e,t,s)=>{const o=e._ctx;for(const n in e){if(Us(n))continue;const r=e[n];if(I(r))t[n]=fi(n,r,o);else if(r!=null){const i=Gs(r);t[n]=()=>i}}},_n=(e,t)=>{const s=Gs(t);e.slots.default=()=>s},xn=(e,t,s)=>{for(const o in t)(s||!Us(o))&&(e[o]=t[o])},ui=(e,t,s)=>{const o=e.slots=hn();if(e.vnode.shapeFlag&32){const n=t._;n?(xn(o,t,s),s&&Io(o,"_",n,!0)):vn(t,o)}else t&&_n(e,t)},ai=(e,t,s)=>{const{vnode:o,slots:n}=e;let r=!0,i=W;if(o.shapeFlag&32){const c=t._;c?s&&c===1?r=!1:xn(n,t,s):(r=!t.$stable,vn(t,n)),i=t}else t&&(_n(e,t),i={default:1});if(r)for(const c in n)!Us(c)&&i[c]==null&&delete n[c]},fe=mi;function di(e){return hi(e)}function hi(e,t){const s=Yt();s.__VUE__=!0;const{insert:o,remove:n,patchProp:r,createElement:i,createText:c,createComment:f,setText:h,setElementText:a,parentNode:p,nextSibling:T,setScopeId:E=we,insertStaticContent:L}=e,M=(l,u,d,_=null,g=null,m=null,S=void 0,y=null,x=!!u.dynamicChildren)=>{if(l===u)return;l&&!ft(l,u)&&(_=Lt(l),me(l,g,m,!0),l=null),u.patchFlag===-2&&(x=!1,u.dynamicChildren=null);const{type:v,ref:A,shapeFlag:w}=u;switch(v){case kt:X(l,u,d,_);break;case Ye:P(l,u,d,_);break;case cs:l==null&&B(u,d,_,S);break;case ue:At(l,u,d,_,g,m,S,y,x);break;default:w&1?N(l,u,d,_,g,m,S,y,x):w&6?Rt(l,u,d,_,g,m,S,y,x):(w&64||w&128)&&v.process(l,u,d,_,g,m,S,y,x,it)}A!=null&&g?gt(A,l&&l.ref,m,u||l,!u):A==null&&l&&l.ref!=null&&gt(l.ref,null,m,l,!0)},X=(l,u,d,_)=>{if(l==null)o(u.el=c(u.children),d,_);else{const g=u.el=l.el;u.children!==l.children&&h(g,u.children)}},P=(l,u,d,_)=>{l==null?o(u.el=f(u.children||""),d,_):u.el=l.el},B=(l,u,d,_)=>{[l.el,l.anchor]=L(l.children,u,d,_,l.el,l.anchor)},j=({el:l,anchor:u},d,_)=>{let g;for(;l&&l!==u;)g=T(l),o(l,d,_),l=g;o(u,d,_)},b=({el:l,anchor:u})=>{let d;for(;l&&l!==u;)d=T(l),n(l),l=d;n(u)},N=(l,u,d,_,g,m,S,y,x)=>{if(u.type==="svg"?S="svg":u.type==="math"&&(S="mathml"),l==null)Y(u,d,_,g,m,S,y,x);else{const v=l.el&&l.el._isVueCE?l.el:null;try{v&&v._beginPatch(),Ct(l,u,g,m,S,y,x)}finally{v&&v._endPatch()}}},Y=(l,u,d,_,g,m,S,y)=>{let x,v;const{props:A,shapeFlag:w,transition:C,dirs:R}=l;if(x=l.el=i(l.type,m,A&&A.is,A),w&8?a(x,l.children):w&16&&he(l.children,x,null,_,g,ls(l,m),S,y),R&&$e(l,null,_,"created"),U(x,l,l.scopeId,S,_),A){for(const $ in A)$!=="value"&&!dt($)&&r(x,$,null,A[$],m,_);"value"in A&&r(x,"value",null,A.value,m),(v=A.onVnodeBeforeMount)&&ye(v,_,l)}R&&$e(l,null,_,"beforeMount");const F=pi(g,C);F&&C.beforeEnter(x),o(x,u,d),((v=A&&A.onVnodeMounted)||F||R)&&fe(()=>{v&&ye(v,_,l),F&&C.enter(x),R&&$e(l,null,_,"mounted")},g)},U=(l,u,d,_,g)=>{if(d&&E(l,d),_)for(let m=0;m<_.length;m++)E(l,_[m]);if(g){let m=g.subTree;if(u===m||wn(m.type)&&(m.ssContent===u||m.ssFallback===u)){const S=g.vnode;U(l,S,S.scopeId,S.slotScopeIds,g.parent)}}},he=(l,u,d,_,g,m,S,y,x=0)=>{for(let v=x;v<l.length;v++){const A=l[v]=y?Fe(l[v]):Se(l[v]);M(null,A,u,d,_,g,m,S,y)}},Ct=(l,u,d,_,g,m,S)=>{const y=u.el=l.el;let{patchFlag:x,dynamicChildren:v,dirs:A}=u;x|=l.patchFlag&16;const w=l.props||W,C=u.props||W;let R;if(d&&ze(d,!1),(R=C.onVnodeBeforeUpdate)&&ye(R,d,u,l),A&&$e(u,l,d,"beforeUpdate"),d&&ze(d,!0),(w.innerHTML&&C.innerHTML==null||w.textContent&&C.textContent==null)&&a(y,""),v?je(l.dynamicChildren,v,y,d,_,ls(u,g),m):S||G(l,u,y,null,d,_,ls(u,g),m,!1),x>0){if(x&16)nt(y,w,C,d,g);else if(x&2&&w.class!==C.class&&r(y,"class",null,C.class,g),x&4&&r(y,"style",w.style,C.style,g),x&8){const F=u.dynamicProps;for(let $=0;$<F.length;$++){const V=F[$],ne=w[V],re=C[V];(re!==ne||V==="value")&&r(y,V,ne,re,g,d)}}x&1&&l.children!==u.children&&a(y,u.children)}else!S&&v==null&&nt(y,w,C,d,g);((R=C.onVnodeUpdated)||A)&&fe(()=>{R&&ye(R,d,u,l),A&&$e(u,l,d,"updated")},_)},je=(l,u,d,_,g,m,S)=>{for(let y=0;y<u.length;y++){const x=l[y],v=u[y],A=x.el&&(x.type===ue||!ft(x,v)||x.shapeFlag&198)?p(x.el):d;M(x,v,A,null,_,g,m,S,!0)}},nt=(l,u,d,_,g)=>{if(u!==d){if(u!==W)for(const m in u)!dt(m)&&!(m in d)&&r(l,m,u[m],null,g,_);for(const m in d){if(dt(m))continue;const S=d[m],y=u[m];S!==y&&m!=="value"&&r(l,m,y,S,g,_)}"value"in d&&r(l,"value",u.value,d.value,g)}},At=(l,u,d,_,g,m,S,y,x)=>{const v=u.el=l?l.el:c(""),A=u.anchor=l?l.anchor:c("");let{patchFlag:w,dynamicChildren:C,slotScopeIds:R}=u;R&&(y=y?y.concat(R):R),l==null?(o(v,d,_),o(A,d,_),he(u.children||[],d,A,g,m,S,y,x)):w>0&&w&64&&C&&l.dynamicChildren&&l.dynamicChildren.length===C.length?(je(l.dynamicChildren,C,d,g,m,S,y),(u.key!=null||g&&u===g.subTree)&&yn(l,u,!0)):G(l,u,d,A,g,m,S,y,x)},Rt=(l,u,d,_,g,m,S,y,x)=>{u.slotScopeIds=y,l==null?u.shapeFlag&512?g.ctx.activate(u,d,_,S,x):Zt(u,d,_,g,m,S,x):Ks(l,u,x)},Zt=(l,u,d,_,g,m,S)=>{const y=l.component=Ei(l,_,g);if(on(l)&&(y.ctx.renderer=it),Ai(y,!1,S),y.asyncDep){if(g&&g.registerDep(y,Q,S),!l.el){const x=y.subTree=Re(Ye);P(null,x,u,d),l.placeholder=x.el}}else Q(y,l,u,d,g,m,S)},Ks=(l,u,d)=>{const _=u.component=l.component;if(ni(l,u,d))if(_.asyncDep&&!_.asyncResolved){K(_,u,d);return}else _.next=u,_.update();else u.el=l.el,_.vnode=u},Q=(l,u,d,_,g,m,S)=>{const y=()=>{if(l.isMounted){let{next:w,bu:C,u:R,parent:F,vnode:$}=l;{const _e=bn(l);if(_e){w&&(w.el=$.el,K(l,w,S)),_e.asyncDep.then(()=>{l.isUnmounted||y()});return}}let V=w,ne;ze(l,!1),w?(w.el=$.el,K(l,w,S)):w=$,C&&ts(C),(ne=w.props&&w.props.onVnodeBeforeUpdate)&&ye(ne,F,w,$),ze(l,!0);const re=co(l),ve=l.subTree;l.subTree=re,M(ve,re,p(ve.el),Lt(ve),l,g,m),w.el=re.el,V===null&&ri(l,re.el),R&&fe(R,g),(ne=w.props&&w.props.onVnodeUpdated)&&fe(()=>ye(ne,F,w,$),g)}else{let w;const{el:C,props:R}=u,{bm:F,m:$,parent:V,root:ne,type:re}=l,ve=tt(u);ze(l,!1),F&&ts(F),!ve&&(w=R&&R.onVnodeBeforeMount)&&ye(w,V,u),ze(l,!0);{ne.ce&&ne.ce._def.shadowRoot!==!1&&ne.ce._injectChildStyle(re);const _e=l.subTree=co(l);M(null,_e,d,_,l,g,m),u.el=_e.el}if($&&fe($,g),!ve&&(w=R&&R.onVnodeMounted)){const _e=u;fe(()=>ye(w,V,_e),g)}(u.shapeFlag&256||V&&tt(V.vnode)&&V.vnode.shapeFlag&256)&&l.a&&fe(l.a,g),l.isMounted=!0,u=d=_=null}};l.scope.on();const x=l.effect=new Mo(y);l.scope.off();const v=l.update=x.run.bind(x),A=l.job=x.runIfDirty.bind(x);A.i=l,A.id=l.uid,x.scheduler=()=>Vs(A),ze(l,!0),v()},K=(l,u,d)=>{u.component=l;const _=l.vnode.props;l.vnode=u,l.next=null,li(l,u.props,_,d),ai(l,u.children,d),Ne(),so(l),Le()},G=(l,u,d,_,g,m,S,y,x=!1)=>{const v=l&&l.children,A=l?l.shapeFlag:0,w=u.children,{patchFlag:C,shapeFlag:R}=u;if(C>0){if(C&128){Nt(v,w,d,_,g,m,S,y,x);return}else if(C&256){Ue(v,w,d,_,g,m,S,y,x);return}}R&8?(A&16&&rt(v,g,m),w!==v&&a(d,w)):A&16?R&16?Nt(v,w,d,_,g,m,S,y,x):rt(v,g,m,!0):(A&8&&a(d,""),R&16&&he(w,d,_,g,m,S,y,x))},Ue=(l,u,d,_,g,m,S,y,x)=>{l=l||Ze,u=u||Ze;const v=l.length,A=u.length,w=Math.min(v,A);let C;for(C=0;C<w;C++){const R=u[C]=x?Fe(u[C]):Se(u[C]);M(l[C],R,d,null,g,m,S,y,x)}v>A?rt(l,g,m,!0,!1,w):he(u,d,_,g,m,S,y,x,w)},Nt=(l,u,d,_,g,m,S,y,x)=>{let v=0;const A=u.length;let w=l.length-1,C=A-1;for(;v<=w&&v<=C;){const R=l[v],F=u[v]=x?Fe(u[v]):Se(u[v]);if(ft(R,F))M(R,F,d,null,g,m,S,y,x);else break;v++}for(;v<=w&&v<=C;){const R=l[w],F=u[C]=x?Fe(u[C]):Se(u[C]);if(ft(R,F))M(R,F,d,null,g,m,S,y,x);else break;w--,C--}if(v>w){if(v<=C){const R=C+1,F=R<A?u[R].el:_;for(;v<=C;)M(null,u[v]=x?Fe(u[v]):Se(u[v]),d,F,g,m,S,y,x),v++}}else if(v>C)for(;v<=w;)me(l[v],g,m,!0),v++;else{const R=v,F=v,$=new Map;for(v=F;v<=C;v++){const ce=u[v]=x?Fe(u[v]):Se(u[v]);ce.key!=null&&$.set(ce.key,v)}let V,ne=0;const re=C-F+1;let ve=!1,_e=0;const lt=new Array(re);for(v=0;v<re;v++)lt[v]=0;for(v=R;v<=w;v++){const ce=l[v];if(ne>=re){me(ce,g,m,!0);continue}let xe;if(ce.key!=null)xe=$.get(ce.key);else for(V=F;V<=C;V++)if(lt[V-F]===0&&ft(ce,u[V])){xe=V;break}xe===void 0?me(ce,g,m,!0):(lt[xe-F]=v+1,xe>=_e?_e=xe:ve=!0,M(ce,u[xe],d,null,g,m,S,y,x),ne++)}const Xs=ve?gi(lt):Ze;for(V=Xs.length-1,v=re-1;v>=0;v--){const ce=F+v,xe=u[ce],Js=u[ce+1],ks=ce+1<A?Js.el||Sn(Js):_;lt[v]===0?M(null,xe,d,ks,g,m,S,y,x):ve&&(V<0||v!==Xs[V]?Ge(xe,d,ks,2):V--)}}},Ge=(l,u,d,_,g=null)=>{const{el:m,type:S,transition:y,children:x,shapeFlag:v}=l;if(v&6){Ge(l.component.subTree,u,d,_);return}if(v&128){l.suspense.move(u,d,_);return}if(v&64){S.move(l,u,d,it);return}if(S===ue){o(m,u,d);for(let w=0;w<x.length;w++)Ge(x[w],u,d,_);o(l.anchor,u,d);return}if(S===cs){j(l,u,d);return}if(_!==2&&v&1&&y)if(_===0)y.beforeEnter(m),o(m,u,d),fe(()=>y.enter(m),g);else{const{leave:w,delayLeave:C,afterLeave:R}=y,F=()=>{l.ctx.isUnmounted?n(m):o(m,u,d)},$=()=>{m._isLeaving&&m[Ir](!0),w(m,()=>{F(),R&&R()})};C?C(m,F,$):$()}else o(m,u,d)},me=(l,u,d,_=!1,g=!1)=>{const{type:m,props:S,ref:y,children:x,dynamicChildren:v,shapeFlag:A,patchFlag:w,dirs:C,cacheIndex:R}=l;if(w===-2&&(g=!1),y!=null&&(Ne(),gt(y,null,d,l,!0),Le()),R!=null&&(u.renderCache[R]=void 0),A&256){u.ctx.deactivate(l);return}const F=A&1&&C,$=!tt(l);let V;if($&&(V=S&&S.onVnodeBeforeUnmount)&&ye(V,u,l),A&6)Ln(l.component,d,_);else{if(A&128){l.suspense.unmount(d,_);return}F&&$e(l,null,u,"beforeUnmount"),A&64?l.type.remove(l,u,d,it,_):v&&!v.hasOnce&&(m!==ue||w>0&&w&64)?rt(v,u,d,!1,!0):(m===ue&&w&384||!g&&A&16)&&rt(x,u,d),_&&Ys(l)}($&&(V=S&&S.onVnodeUnmounted)||F)&&fe(()=>{V&&ye(V,u,l),F&&$e(l,null,u,"unmounted")},d)},Ys=l=>{const{type:u,el:d,anchor:_,transition:g}=l;if(u===ue){Nn(d,_);return}if(u===cs){b(l);return}const m=()=>{n(d),g&&!g.persisted&&g.afterLeave&&g.afterLeave()};if(l.shapeFlag&1&&g&&!g.persisted){const{leave:S,delayLeave:y}=g,x=()=>S(d,m);y?y(l.el,m,x):x()}else m()},Nn=(l,u)=>{let d;for(;l!==u;)d=T(l),n(l),l=d;n(u)},Ln=(l,u,d)=>{const{bum:_,scope:g,job:m,subTree:S,um:y,m:x,a:v}=l;ao(x),ao(v),_&&ts(_),g.stop(),m&&(m.flags|=8,me(S,l,u,d)),y&&fe(y,u),fe(()=>{l.isUnmounted=!0},u)},rt=(l,u,d,_=!1,g=!1,m=0)=>{for(let S=m;S<l.length;S++)me(l[S],u,d,_,g)},Lt=l=>{if(l.shapeFlag&6)return Lt(l.component.subTree);if(l.shapeFlag&128)return l.suspense.next();const u=T(l.anchor||l.el),d=u&&u[Nr];return d?T(d):u};let Qt=!1;const qs=(l,u,d)=>{let _;l==null?u._vnode&&(me(u._vnode,null,null,!0),_=u._vnode.component):M(u._vnode||null,l,u,null,null,null,d),u._vnode=l,Qt||(Qt=!0,so(_),Jo(),Qt=!1)},it={p:M,um:me,m:Ge,r:Ys,mt:Zt,mc:he,pc:G,pbc:je,n:Lt,o:e};return{render:qs,hydrate:void 0,createApp:Zr(qs)}}function ls({type:e,props:t},s){return s==="svg"&&e==="foreignObject"||s==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:s}function ze({effect:e,job:t},s){s?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function pi(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function yn(e,t,s=!1){const o=e.children,n=t.children;if(O(o)&&O(n))for(let r=0;r<o.length;r++){const i=o[r];let c=n[r];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=n[r]=Fe(n[r]),c.el=i.el),!s&&c.patchFlag!==-2&&yn(i,c)),c.type===kt&&(c.patchFlag!==-1?c.el=i.el:c.__elIndex=r+(e.type===ue?1:0)),c.type===Ye&&!c.el&&(c.el=i.el)}}function gi(e){const t=e.slice(),s=[0];let o,n,r,i,c;const f=e.length;for(o=0;o<f;o++){const h=e[o];if(h!==0){if(n=s[s.length-1],e[n]<h){t[o]=n,s.push(o);continue}for(r=0,i=s.length-1;r<i;)c=r+i>>1,e[s[c]]<h?r=c+1:i=c;h<e[s[r]]&&(r>0&&(t[o]=s[r-1]),s[r]=o)}}for(r=s.length,i=s[r-1];r-- >0;)s[r]=i,i=t[i];return s}function bn(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:bn(t)}function ao(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Sn(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?Sn(t.subTree):null}const wn=e=>e.__isSuspense;function mi(e,t){t&&t.pendingBranch?O(e)?t.effects.push(...e):t.effects.push(e):Tr(e)}const ue=Symbol.for("v-fgt"),kt=Symbol.for("v-txt"),Ye=Symbol.for("v-cmt"),cs=Symbol.for("v-stc"),vt=[];let ae=null;function Gt(e=!1){vt.push(ae=e?null:[])}function vi(){vt.pop(),ae=vt[vt.length-1]||null}let St=1;function ho(e,t=!1){St+=e,e<0&&ae&&t&&(ae.hasOnce=!0)}function Tn(e){return e.dynamicChildren=St>0?ae||Ze:null,vi(),St>0&&ae&&ae.push(e),e}function _i(e,t,s,o,n,r){return Tn(de(e,t,s,o,n,r,!0))}function ys(e,t,s,o,n){return Tn(Re(e,t,s,o,n,!0))}function $s(e){return e?e.__v_isVNode===!0:!1}function ft(e,t){return e.type===t.type&&e.key===t.key}const En=({key:e})=>e??null,Ft=({ref:e,ref_key:t,ref_for:s})=>(typeof e=="number"&&(e=""+e),e!=null?J(e)||Z(e)||I(e)?{i:le,r:e,k:t,f:!!s}:e:null);function de(e,t=null,s=null,o=0,n=null,r=e===ue?0:1,i=!1,c=!1){const f={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&En(t),ref:t&&Ft(t),scopeId:Zo,slotScopeIds:null,children:s,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:o,dynamicProps:n,dynamicChildren:null,appContext:null,ctx:le};return c?(zs(f,s),r&128&&e.normalize(f)):s&&(f.shapeFlag|=J(s)?8:16),St>0&&!i&&ae&&(f.patchFlag>0||r&6)&&f.patchFlag!==32&&ae.push(f),f}const Re=xi;function xi(e,t=null,s=null,o=0,n=null,r=!1){if((!e||e===$r)&&(e=Ye),$s(e)){const c=ot(e,t,!0);return s&&zs(c,s),St>0&&!r&&ae&&(c.shapeFlag&6?ae[ae.indexOf(e)]=c:ae.push(c)),c.patchFlag=-2,c}if(Ii(e)&&(e=e.__vccOpts),t){t=yi(t);let{class:c,style:f}=t;c&&!J(c)&&(t.class=Rs(c)),q(f)&&(Ds(f)&&!O(f)&&(f=oe({},f)),t.style=As(f))}const i=J(e)?1:wn(e)?128:Lr(e)?64:q(e)?4:I(e)?2:0;return de(e,t,s,o,n,i,r,!0)}function yi(e){return e?Ds(e)||pn(e)?oe({},e):e:null}function ot(e,t,s=!1,o=!1){const{props:n,ref:r,patchFlag:i,children:c,transition:f}=e,h=t?Si(n||{},t):n,a={__v_isVNode:!0,__v_skip:!0,type:e.type,props:h,key:h&&En(h),ref:t&&t.ref?s&&r?O(r)?r.concat(Ft(t)):[r,Ft(t)]:Ft(t):r,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:c,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==ue?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:f,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&ot(e.ssContent),ssFallback:e.ssFallback&&ot(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return f&&o&&Bs(a,f.clone(a)),a}function bi(e=" ",t=0){return Re(kt,null,e,t)}function Se(e){return e==null||typeof e=="boolean"?Re(Ye):O(e)?Re(ue,null,e.slice()):$s(e)?Fe(e):Re(kt,null,String(e))}function Fe(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:ot(e)}function zs(e,t){let s=0;const{shapeFlag:o}=e;if(t==null)t=null;else if(O(t))s=16;else if(typeof t=="object")if(o&65){const n=t.default;n&&(n._c&&(n._d=!1),zs(e,n()),n._c&&(n._d=!0));return}else{s=32;const n=t._;!n&&!pn(t)?t._ctx=le:n===3&&le&&(le.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else I(t)?(t={default:t,_ctx:le},s=32):(t=String(t),o&64?(s=16,t=[bi(t)]):s=8);e.children=t,e.shapeFlag|=s}function Si(...e){const t={};for(let s=0;s<e.length;s++){const o=e[s];for(const n in o)if(n==="class")t.class!==o.class&&(t.class=Rs([t.class,o.class]));else if(n==="style")t.style=As([t.style,o.style]);else if(zt(n)){const r=t[n],i=o[n];i&&r!==i&&!(O(r)&&r.includes(i))&&(t[n]=r?[].concat(r,i):i)}else n!==""&&(t[n]=o[n])}return t}function ye(e,t,s,o=null){Te(e,t,7,[s,o])}const wi=un();let Ti=0;function Ei(e,t,s){const o=e.type,n=(t?t.appContext:e.appContext)||wi,r={uid:Ti++,vnode:e,type:o,parent:t,appContext:n,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Wn(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(n.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:mn(o,n),emitsOptions:an(o,n),emit:null,emitted:null,propsDefaults:W,inheritAttrs:o.inheritAttrs,ctx:W,data:W,props:W,attrs:W,slots:W,refs:W,setupState:W,setupContext:null,suspense:s,suspenseId:s?s.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=ei.bind(null,r),e.ce&&e.ce(r),r}let se=null;const Ci=()=>se||le;let $t,bs;{const e=Yt(),t=(s,o)=>{let n;return(n=e[s])||(n=e[s]=[]),n.push(o),r=>{n.length>1?n.forEach(i=>i(r)):n[0](r)}};$t=t("__VUE_INSTANCE_SETTERS__",s=>se=s),bs=t("__VUE_SSR_SETTERS__",s=>wt=s)}const Et=e=>{const t=se;return $t(e),e.scope.on(),()=>{e.scope.off(),$t(t)}},po=()=>{se&&se.scope.off(),$t(null)};function Cn(e){return e.vnode.shapeFlag&4}let wt=!1;function Ai(e,t=!1,s=!1){t&&bs(t);const{props:o,children:n}=e.vnode,r=Cn(e);ii(e,o,r,t),ui(e,n,s||t);const i=r?Ri(e,t):void 0;return t&&bs(!1),i}function Ri(e,t){const s=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Wr);const{setup:o}=s;if(o){Ne();const n=e.setupContext=o.length>1?Li(e):null,r=Et(e),i=Tt(o,e,0,[e.props,n]),c=No(i);if(Le(),r(),(c||e.sp)&&!tt(e)&&sn(e),c){if(i.then(po,po),t)return i.then(f=>{go(e,f)}).catch(f=>{qt(f,e,0)});e.asyncDep=i}else go(e,i)}else An(e)}function go(e,t,s){I(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:q(t)&&(e.setupState=Yo(t)),An(e)}function An(e,t,s){const o=e.type;e.render||(e.render=o.render||we);{const n=Et(e);Ne();try{Kr(e)}finally{Le(),n()}}}const Ni={get(e,t){return k(e,"get",""),e[t]}};function Li(e){const t=s=>{e.exposed=s||{}};return{attrs:new Proxy(e.attrs,Ni),slots:e.slots,emit:e.emit,expose:t}}function Ws(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Yo(dr(e.exposed)),{get(t,s){if(s in t)return t[s];if(s in mt)return mt[s](e)},has(t,s){return s in t||s in mt}})):e.proxy}function Ii(e){return I(e)&&"__vccOpts"in e}const Oi=(e,t)=>_r(e,t,wt),Mi="3.5.26";/**
* @vue/runtime-dom v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ss;const mo=typeof window<"u"&&window.trustedTypes;if(mo)try{Ss=mo.createPolicy("vue",{createHTML:e=>e})}catch{}const Rn=Ss?e=>Ss.createHTML(e):e=>e,Pi="http://www.w3.org/2000/svg",Fi="http://www.w3.org/1998/Math/MathML",Ce=typeof document<"u"?document:null,vo=Ce&&Ce.createElement("template"),Hi={insert:(e,t,s)=>{t.insertBefore(e,s||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,s,o)=>{const n=t==="svg"?Ce.createElementNS(Pi,e):t==="mathml"?Ce.createElementNS(Fi,e):s?Ce.createElement(e,{is:s}):Ce.createElement(e);return e==="select"&&o&&o.multiple!=null&&n.setAttribute("multiple",o.multiple),n},createText:e=>Ce.createTextNode(e),createComment:e=>Ce.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Ce.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,s,o,n,r){const i=s?s.previousSibling:t.lastChild;if(n&&(n===r||n.nextSibling))for(;t.insertBefore(n.cloneNode(!0),s),!(n===r||!(n=n.nextSibling)););else{vo.innerHTML=Rn(o==="svg"?`<svg>${e}</svg>`:o==="mathml"?`<math>${e}</math>`:e);const c=vo.content;if(o==="svg"||o==="mathml"){const f=c.firstChild;for(;f.firstChild;)c.appendChild(f.firstChild);c.removeChild(f)}t.insertBefore(c,s)}return[i?i.nextSibling:t.firstChild,s?s.previousSibling:t.lastChild]}},Di=Symbol("_vtc");function Vi(e,t,s){const o=e[Di];o&&(t=(t?[t,...o]:[...o]).join(" ")),t==null?e.removeAttribute("class"):s?e.setAttribute("class",t):e.className=t}const _o=Symbol("_vod"),Bi=Symbol("_vsh"),ji=Symbol(""),Ui=/(?:^|;)\s*display\s*:/;function Gi(e,t,s){const o=e.style,n=J(s);let r=!1;if(s&&!n){if(t)if(J(t))for(const i of t.split(";")){const c=i.slice(0,i.indexOf(":")).trim();s[c]==null&&Ht(o,c,"")}else for(const i in t)s[i]==null&&Ht(o,i,"");for(const i in s)i==="display"&&(r=!0),Ht(o,i,s[i])}else if(n){if(t!==s){const i=o[ji];i&&(s+=";"+i),o.cssText=s,r=Ui.test(s)}}else t&&e.removeAttribute("style");_o in e&&(e[_o]=r?o.display:"",e[Bi]&&(o.display="none"))}const xo=/\s*!important$/;function Ht(e,t,s){if(O(s))s.forEach(o=>Ht(e,t,o));else if(s==null&&(s=""),t.startsWith("--"))e.setProperty(t,s);else{const o=$i(e,t);xo.test(s)?e.setProperty(Xe(o),s.replace(xo,""),"important"):e[o]=s}}const yo=["Webkit","Moz","ms"],fs={};function $i(e,t){const s=fs[t];if(s)return s;let o=Ve(t);if(o!=="filter"&&o in e)return fs[t]=o;o=Lo(o);for(let n=0;n<yo.length;n++){const r=yo[n]+o;if(r in e)return fs[t]=r}return t}const bo="http://www.w3.org/1999/xlink";function So(e,t,s,o,n,r=zn(t)){o&&t.startsWith("xlink:")?s==null?e.removeAttributeNS(bo,t.slice(6,t.length)):e.setAttributeNS(bo,t,s):s==null||r&&!Oo(s)?e.removeAttribute(t):e.setAttribute(t,r?"":qe(s)?String(s):s)}function wo(e,t,s,o,n){if(t==="innerHTML"||t==="textContent"){s!=null&&(e[t]=t==="innerHTML"?Rn(s):s);return}const r=e.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const c=r==="OPTION"?e.getAttribute("value")||"":e.value,f=s==null?e.type==="checkbox"?"on":"":String(s);(c!==f||!("_value"in e))&&(e.value=f),s==null&&e.removeAttribute(t),e._value=s;return}let i=!1;if(s===""||s==null){const c=typeof e[t];c==="boolean"?s=Oo(s):s==null&&c==="string"?(s="",i=!0):c==="number"&&(s=0,i=!0)}try{e[t]=s}catch{}i&&e.removeAttribute(n||t)}function zi(e,t,s,o){e.addEventListener(t,s,o)}function Wi(e,t,s,o){e.removeEventListener(t,s,o)}const To=Symbol("_vei");function Ki(e,t,s,o,n=null){const r=e[To]||(e[To]={}),i=r[t];if(o&&i)i.value=o;else{const[c,f]=Yi(t);if(o){const h=r[t]=Ji(o,n);zi(e,c,h,f)}else i&&(Wi(e,c,i,f),r[t]=void 0)}}const Eo=/(?:Once|Passive|Capture)$/;function Yi(e){let t;if(Eo.test(e)){t={};let o;for(;o=e.match(Eo);)e=e.slice(0,e.length-o[0].length),t[o[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Xe(e.slice(2)),t]}let us=0;const qi=Promise.resolve(),Xi=()=>us||(qi.then(()=>us=0),us=Date.now());function Ji(e,t){const s=o=>{if(!o._vts)o._vts=Date.now();else if(o._vts<=s.attached)return;Te(ki(o,s.value),t,5,[o])};return s.value=e,s.attached=Xi(),s}function ki(e,t){if(O(t)){const s=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{s.call(e),e._stopped=!0},t.map(o=>n=>!n._stopped&&o&&o(n))}else return t}const Co=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Zi=(e,t,s,o,n,r)=>{const i=n==="svg";t==="class"?Vi(e,o,i):t==="style"?Gi(e,s,o):zt(t)?Ts(t)||Ki(e,t,s,o,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Qi(e,t,o,i))?(wo(e,t,o),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&So(e,t,o,i,r,t!=="value")):e._isVueCE&&(/[A-Z]/.test(t)||!J(o))?wo(e,Ve(t),o,r,t):(t==="true-value"?e._trueValue=o:t==="false-value"&&(e._falseValue=o),So(e,t,o,i))};function Qi(e,t,s,o){if(o)return!!(t==="innerHTML"||t==="textContent"||t in e&&Co(t)&&I(s));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const n=e.tagName;if(n==="IMG"||n==="VIDEO"||n==="CANVAS"||n==="SOURCE")return!1}return Co(t)&&J(s)?!1:t in e}const el=oe({patchProp:Zi},Hi);let Ao;function tl(){return Ao||(Ao=di(el))}const sl=(...e)=>{const t=tl().createApp(...e),{mount:s}=t;return t.mount=o=>{const n=nl(o);if(!n)return;const r=t._component;!I(r)&&!r.render&&!r.template&&(r.template=n.innerHTML),n.nodeType===1&&(n.textContent="");const i=s(n,!1,ol(n));return n instanceof Element&&(n.removeAttribute("v-cloak"),n.setAttribute("data-v-app","")),i},t};function ol(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function nl(e){return J(e)?document.querySelector(e):e}const rl=(e,t)=>{const s=e.__vccOpts||e;for(const[o,n]of t)s[o]=n;return s},il={class:"content-overlay"},ll=`
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`,cl=`
  precision highp float;
  
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uMouseActive;
  
  #define PI 3.14159265359
  
  // =============================================
  // NOISE FUNCTIONS
  // =============================================
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  // =============================================
  // LAYER 1: MACRO DISPLACEMENT GEOMETRY
  // Large smooth folded liquid metal shapes
  // =============================================
  float macroGeometry(vec2 uv, float time) {
    // Very slow viscous flow
    float flow = time * 0.025;
    vec3 p = vec3(uv * 1.2, flow);
    
    // Domain warping for organic thick folds
    float w1 = snoise(p * 0.5 + vec3(0.0, flow * 0.3, 0.0));
    float w2 = snoise(p * 0.35 + vec3(50.0, flow * 0.2, 30.0));
    float w3 = snoise(p * 0.7 + vec3(-40.0, flow * 0.25, 70.0));
    
    // Heavy gravity fold warping
    p.xy += vec2(w1 + w2 * 0.4, w2 + w3 * 0.3) * 0.7;
    
    // Low frequency thick folds - 3 octaves only
    float folds = 0.0;
    folds += snoise(p * 0.6) * 1.5;
    folds += snoise(p * 1.1 + vec3(20.0, flow * 0.1, 10.0)) * 0.7;
    folds += snoise(p * 1.8 + vec3(-30.0, flow * 0.15, -20.0)) * 0.35;
    
    return folds;
  }
  
  // Cursor deformation on geometry
  float cursorBend(vec2 uv, vec2 mouse, float active, float time) {
    vec2 d = uv - mouse;
    float dist = length(d);
    
    // Smooth bulge
    float bulge = exp(-dist * 3.5) * active * 1.2;
    
    // Slow ripple
    float ripple = sin(dist * 12.0 - time * 3.0) * exp(-dist * 2.0) * active * 0.35;
    
    return bulge + ripple;
  }
  
  // =============================================
  // LAYER 2: MICRO SURFACE NORMALS
  // High frequency ripple for chrome shimmer
  // =============================================
  vec3 microNormals(vec2 uv, float time) {
    float flow = time * 0.035;
    
    // Higher frequency shimmer - increased intensity
    float n1 = snoise(vec3(uv * 10.0, flow * 0.5));
    float n2 = snoise(vec3(uv * 15.0 + vec2(5.0, 3.0), flow * 0.45));
    float n3 = snoise(vec3(uv * 22.0 + vec2(-4.0, 7.0), flow * 0.6));
    float n4 = snoise(vec3(uv * 30.0 + vec2(8.0, -5.0), flow * 0.55));
    
    float micro = n1 * 0.4 + n2 * 0.3 + n3 * 0.2 + n4 * 0.1;
    
    // Stronger micro normal perturbation
    float eps = 0.0025;
    float mx = snoise(vec3((uv + vec2(eps, 0.0)) * 12.0, flow * 0.5));
    float my = snoise(vec3((uv + vec2(0.0, eps)) * 12.0, flow * 0.5));
    
    // Increased shimmer strength
    return normalize(vec3((micro - mx) * 0.22, (micro - my) * 0.22, 1.0));
  }
  
  // Combined normal calculation
  vec3 calcNormal(vec2 uv, float time, vec2 mouse, float active) {
    float eps = 0.004;
    
    // Macro geometry normals
    float h0 = macroGeometry(uv, time) + cursorBend(uv, mouse, active, time);
    float hx = macroGeometry(uv + vec2(eps, 0.0), time) + cursorBend(uv + vec2(eps, 0.0), mouse, active, time);
    float hy = macroGeometry(uv + vec2(0.0, eps), time) + cursorBend(uv + vec2(0.0, eps), mouse, active, time);
    
    // Strong macro normal
    float strength = 1.0;
    vec3 macroN = normalize(vec3((h0 - hx) * strength / eps, (h0 - hy) * strength / eps, 1.0));
    
    // Blend with micro shimmer normals
    vec3 microN = microNormals(uv, time);
    
    // Combine: macro dominant, micro adds stronger shimmer
    vec3 N = normalize(macroN + microN * 0.18);
    
    return N;
  }
  
  // =============================================
  // LAYER 3: ENVIRONMENT MIRROR REFLECTION
  // Cold icy HDR studio with elongated strip lights
  // =============================================
  vec3 environmentHDRI(vec3 rd) {
    float y = rd.y;
    float x = rd.x;
    
    // Base: dark navy to ice white gradient
    vec3 env = mix(
      vec3(0.008, 0.015, 0.045),   // Bottom: deep navy
      vec3(0.12, 0.16, 0.24),      // Top: cold blue
      smoothstep(-1.0, 0.8, y)
    );
    
    // ========================================
    // ELONGATED HORIZONTAL STRIP LIGHTS
    // ========================================
    
    // Main bright strip - wide horizontal softbox
    float strip1 = exp(-pow((y - 0.35) * 5.0, 2.0)) * smoothstep(-0.95, 0.0, x) * smoothstep(0.95, 0.0, x);
    env += vec3(0.98, 1.0, 1.0) * strip1 * 2.8;
    
    // Secondary strip - upper
    float strip2 = exp(-pow((y - 0.65) * 6.0, 2.0)) * smoothstep(-0.85, 0.1, x) * smoothstep(0.85, -0.1, x);
    env += vec3(0.9, 0.95, 1.0) * strip2 * 1.8;
    
    // Lower accent strip
    float strip3 = exp(-pow((y + 0.1) * 7.0, 2.0)) * smoothstep(-0.7, 0.2, x) * smoothstep(0.8, 0.0, x);
    env += vec3(0.7, 0.85, 1.0) * strip3 * 1.2;
    
    // Narrow bright highlight strip
    float strip4 = exp(-pow((y - 0.5) * 10.0, 2.0)) * smoothstep(-0.6, 0.3, x) * smoothstep(0.7, 0.1, x);
    env += vec3(1.0, 1.0, 1.0) * strip4 * 2.0;
    
    // Cold blue fill strip
    float fillBox = exp(-pow((y + 0.35) * 5.0, 2.0));
    env += vec3(0.35, 0.5, 0.85) * fillBox * 0.6;
    
    // Ice top accent
    float topBox = exp(-pow((y - 0.88) * 6.0, 2.0));
    env += vec3(0.7, 0.8, 1.0) * topBox * 0.5;
    
    // Side gradient strips
    float leftStrip = exp(-pow((x + 0.8) * 4.0, 2.0)) * smoothstep(-0.3, 0.7, y);
    float rightStrip = exp(-pow((x - 0.82) * 4.5, 2.0)) * smoothstep(-0.2, 0.75, y);
    env += vec3(0.5, 0.65, 0.95) * leftStrip * 0.5;
    env += vec3(0.6, 0.78, 1.0) * rightStrip * 0.6;
    
    // Ice white spot highlights
    float spot1 = exp(-pow(length(rd.xy - vec2(0.0, 0.45)) * 6.0, 2.0));
    float spot2 = exp(-pow(length(rd.xy - vec2(-0.3, 0.55)) * 7.0, 2.0));
    env += vec3(1.0, 1.0, 1.0) * spot1 * 1.5;
    env += vec3(0.85, 0.92, 1.0) * spot2 * 1.0;
    
    return env;
  }
  
  // =============================================
  // PBR METALLIC SHADING
  // =============================================
  
  // GGX Distribution
  float D_GGX(float NdotH, float roughness) {
    float a = roughness * roughness;
    float a2 = a * a;
    float denom = NdotH * NdotH * (a2 - 1.0) + 1.0;
    return a2 / (PI * denom * denom);
  }
  
  // Fresnel Schlick
  vec3 F_Schlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
  }
  
  // Smith GGX Geometry
  float G_Smith(float NdotV, float NdotL, float roughness) {
    float r = roughness + 1.0;
    float k = (r * r) / 8.0;
    float gV = NdotV / (NdotV * (1.0 - k) + k);
    float gL = NdotL / (NdotL * (1.0 - k) + k);
    return gV * gL;
  }
  
  // PBR Specular BRDF
  vec3 pbrSpecular(vec3 N, vec3 V, vec3 L, vec3 lightColor, float roughness, vec3 F0) {
    vec3 H = normalize(V + L);
    float NdotL = max(dot(N, L), 0.0);
    float NdotV = max(dot(N, V), 0.001);
    float NdotH = max(dot(N, H), 0.0);
    float VdotH = max(dot(V, H), 0.0);
    
    float D = D_GGX(NdotH, roughness);
    vec3 F = F_Schlick(VdotH, F0);
    float G = G_Smith(NdotV, NdotL, roughness);
    
    vec3 spec = (D * F * G) / (4.0 * NdotV * NdotL + 0.001);
    return spec * lightColor * NdotL;
  }
  
  // Anisotropic GGX for elongated strip highlights
  float D_GGX_Aniso(float NdotH, float TdotH, float BdotH, float roughX, float roughY) {
    float ax = roughX * roughX;
    float ay = roughY * roughY;
    float denom = TdotH * TdotH / (ax * ax) + BdotH * BdotH / (ay * ay) + NdotH * NdotH;
    return 1.0 / (PI * ax * ay * denom * denom);
  }
  
  // Anisotropic specular for strip lights
  vec3 anisoSpecular(vec3 N, vec3 V, vec3 L, vec3 T, vec3 B, vec3 lightColor, float roughX, float roughY, vec3 F0) {
    vec3 H = normalize(V + L);
    float NdotL = max(dot(N, L), 0.0);
    float NdotV = max(dot(N, V), 0.001);
    float NdotH = max(dot(N, H), 0.0);
    float TdotH = dot(T, H);
    float BdotH = dot(B, H);
    float VdotH = max(dot(V, H), 0.0);
    
    float D = D_GGX_Aniso(NdotH, TdotH, BdotH, roughX, roughY);
    vec3 F = F_Schlick(VdotH, F0);
    float G = G_Smith(NdotV, NdotL, (roughX + roughY) * 0.5);
    
    vec3 spec = (D * F * G) / (4.0 * NdotV * NdotL + 0.001);
    return spec * lightColor * NdotL;
  }
  
  // =============================================
  // MAIN RENDER
  // =============================================
  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    
    // Aspect corrected coordinates
    vec2 uvA = vec2((uv.x - 0.5) * aspect, uv.y - 0.5) + 0.5;
    vec2 mouseA = vec2((uMouse.x - 0.5) * aspect, uMouse.y - 0.5) + 0.5;
    
    float time = uTime;
    
    // PBR parameters - tighter roughness for sharper highlights
    float metalness = 1.0;
    float roughness = 0.035;
    
    // Cold chrome F0 (icy blue-silver reflectivity)
    vec3 F0 = vec3(0.92, 0.95, 0.98);
    
    // LAYER 1: Macro geometry height
    float height = macroGeometry(uvA, time);
    height += cursorBend(uvA, mouseA, uMouseActive, time);
    
    // LAYER 2: Surface normal (macro + micro shimmer)
    vec3 N = calcNormal(uvA, time, mouseA, uMouseActive);
    
    // View direction
    vec3 V = normalize(vec3(0.0, 0.0, 1.0));
    
    // LAYER 3: Environment reflection
    vec3 R = reflect(-V, N);
    vec3 envColor = environmentHDRI(R);
    
    // Fresnel-based reflection intensity
    float NdotV = max(dot(N, V), 0.0);
    vec3 fresnel = F_Schlick(NdotV, F0);
    vec3 reflection = envColor * fresnel;
    
    // ========================================
    // ENHANCED STUDIO LIGHTING SYSTEM
    // ========================================
    vec3 specTotal = vec3(0.0);
    
    // Tangent and bitangent for anisotropic highlights
    vec3 T = normalize(cross(N, vec3(0.0, 1.0, 0.0)));
    vec3 B = normalize(cross(N, T));
    
    // ========================================
    // PRIMARY DIRECTIONAL LIGHT - Upper Left (soft but strong)
    // ========================================
    vec3 keyLight = normalize(vec3(-0.6, 0.85, 0.45));
    specTotal += pbrSpecular(N, V, keyLight, vec3(1.0, 1.0, 1.0) * 6.5, roughness * 0.8, F0);
    
    // Key light shadow factor for directional occlusion
    float keyNdotL = max(dot(N, keyLight), 0.0);
    float keyShadow = smoothstep(0.0, 0.5, keyNdotL);
    
    // Secondary key - slightly offset
    vec3 L1 = normalize(vec3(0.3, 0.9, 0.35));
    specTotal += pbrSpecular(N, V, L1, vec3(0.95, 0.98, 1.0) * 3.5, roughness, F0);
    
    // Fill light - cold blue (reduced for contrast)
    vec3 L2 = normalize(vec3(-0.7, 0.4, 0.6));
    specTotal += pbrSpecular(N, V, L2, vec3(0.5, 0.7, 1.0) * 1.5, roughness * 1.2, F0);
    
    // ========================================
    // SECONDARY RIM LIGHT - Lower Right
    // ========================================
    vec3 rimLightLR = normalize(vec3(0.75, -0.5, 0.45));
    specTotal += pbrSpecular(N, V, rimLightLR, vec3(0.85, 0.92, 1.0) * 3.5, roughness * 0.7, F0);
    
    // Primary rim light - cold glow (upper)
    vec3 L3 = normalize(vec3(0.0, -0.3, 0.95));
    specTotal += pbrSpecular(N, V, L3, vec3(0.5, 0.65, 0.95) * 1.5, roughness, F0);
    
    // Accent light - ice
    vec3 L4 = normalize(vec3(-0.2, 0.95, 0.25));
    specTotal += pbrSpecular(N, V, L4, vec3(0.9, 0.95, 1.0) * 2.8, roughness, F0);
    
    // ========================================
    // ANISOTROPIC STRIP LIGHTS - elongated horizontal
    // ========================================
    float anisoRoughX = 0.02;
    float anisoRoughY = 0.15;
    
    vec3 SL1 = normalize(vec3(0.0, 0.85, 0.53));
    specTotal += anisoSpecular(N, V, SL1, T, B, vec3(1.0, 1.0, 1.0) * 5.0, anisoRoughX, anisoRoughY, F0);
    
    vec3 SL2 = normalize(vec3(0.15, 0.7, 0.7));
    specTotal += anisoSpecular(N, V, SL2, T, B, vec3(0.9, 0.95, 1.0) * 3.5, anisoRoughX * 1.2, anisoRoughY * 0.9, F0);
    
    vec3 SL3 = normalize(vec3(-0.1, 0.5, 0.86));
    specTotal += anisoSpecular(N, V, SL3, T, B, vec3(0.85, 0.92, 1.0) * 2.5, anisoRoughX * 1.5, anisoRoughY * 1.1, F0);
    
    // Edge rim strip lights
    vec3 L5 = normalize(vec3(-0.9, 0.1, 0.42));
    specTotal += pbrSpecular(N, V, L5, vec3(0.6, 0.8, 1.0) * 2.0, roughness * 0.8, F0);
    
    vec3 L6 = normalize(vec3(0.92, 0.15, 0.38));
    specTotal += pbrSpecular(N, V, L6, vec3(0.7, 0.85, 1.0) * 1.8, roughness * 0.8, F0);
    
    // ========================================
    // COMBINE WITH REDUCED AMBIENT
    // ========================================
    vec3 color = reflection * 0.65 + specTotal;  // Reduced reflection diffusion
    
    // Apply directional shadow influence
    color *= mix(0.7, 1.0, keyShadow);
    
    // ========================================
    // DEEP CAVITY SHADOWS (concave valleys)
    // ========================================
    float cavity = smoothstep(0.15, -1.2, height);  // Deeper threshold
    vec3 cavityColor = vec3(0.005, 0.01, 0.035);    // Near-black navy
    color = mix(color, cavityColor, cavity * 0.92);  // Stronger mix
    
    // Secondary cavity for mid-depths
    float midCavity = smoothstep(0.4, -0.3, height) * (1.0 - cavity);
    color = mix(color, vec3(0.02, 0.035, 0.08), midCavity * 0.5);
    
    // ========================================
    // BRIGHT CONVEX RIDGES
    // ========================================
    float ridge = smoothstep(0.35, 0.9, height) * smoothstep(1.6, 0.9, height);
    color += vec3(1.0, 1.0, 1.0) * ridge * 0.9;  // Brighter ridges
    
    // Additional ridge sharpness
    float sharpRidge = smoothstep(0.6, 1.0, height);
    color += vec3(0.95, 0.98, 1.0) * sharpRidge * 0.4;
    
    // ========================================
    // ENHANCED FRESNEL EDGE GLOW
    // ========================================
    float rim = pow(1.0 - NdotV, 4.5);
    color += vec3(0.4, 0.6, 0.95) * rim * 0.7;  // Stronger cold blue glow
    
    // Sharp fresnel edge accent
    float sharpRim = pow(1.0 - NdotV, 8.0);
    color += vec3(0.7, 0.85, 1.0) * sharpRim * 0.5;
    
    // ========================================
    // STRIP LIGHT BLOOM
    // ========================================
    vec3 stripBright = max(specTotal - vec3(0.45), vec3(0.0));
    color += stripBright * 0.7;
    
    // ========================================
    // STRONGER VIGNETTE
    // ========================================
    vec2 vUv2 = uv * (1.0 - uv);
    float vig = pow(clamp(vUv2.x * vUv2.y * 20.0, 0.0, 1.0), 0.5);  // Stronger falloff
    color *= vig;
    
    // ========================================
    // HIGH CONTRAST TONE MAPPING
    // ========================================
    color = color / (color + vec3(0.18));  // Tighter compression
    
    // Stronger S-curve contrast
    color = pow(color, vec3(0.72));
    
    // Cold blue-silver color grade
    color.r *= 0.86;
    color.g *= 0.93;
    color.b *= 1.14;
    
    // Gamma correction
    color = pow(color, vec3(1.0 / 2.2));
    
    // Clamp
    color = clamp(color, 0.0, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
  }
`,fl={__name:"LiquidChromeHero",setup(e){const t=to(null),s=to(null);let o=null,n=null,r=null,i=0,c={x:.5,y:.5},f={x:.5,y:.5},h=0,a=0;function p(b,N,Y){const U=b.createShader(N);return b.shaderSource(U,Y),b.compileShader(U),b.getShaderParameter(U,b.COMPILE_STATUS)?U:(console.error("Shader error:",b.getShaderInfoLog(U)),b.deleteShader(U),null)}function T(b,N,Y){const U=b.createProgram();return b.attachShader(U,N),b.attachShader(U,Y),b.linkProgram(U),b.getProgramParameter(U,b.LINK_STATUS)?U:(console.error("Program error:",b.getProgramInfoLog(U)),null)}function E(){if(o=s.value.getContext("webgl",{alpha:!1,antialias:!0}),!o)return!1;const b=p(o,o.VERTEX_SHADER,ll),N=p(o,o.FRAGMENT_SHADER,cl);if(!b||!N||(n=T(o,b,N),!n))return!1;const Y=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),U=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,U),o.bufferData(o.ARRAY_BUFFER,Y,o.STATIC_DRAW);const he=o.getAttribLocation(n,"a_position");return o.enableVertexAttribArray(he),o.vertexAttribPointer(he,2,o.FLOAT,!1,0,0),!0}function L(){if(!s.value||!t.value)return;const b=Math.min(window.devicePixelRatio||1,2),N=t.value.clientWidth,Y=t.value.clientHeight;s.value.width=N*b,s.value.height=Y*b,s.value.style.width=N+"px",s.value.style.height=Y+"px",o&&o.viewport(0,0,s.value.width,s.value.height)}function M(b){const N=s.value.getBoundingClientRect();f.x=(b.clientX-N.left)/N.width,f.y=1-(b.clientY-N.top)/N.height,a=1}function X(){a=0}function P(b){if(b.touches.length>0){const N=b.touches[0],Y=s.value.getBoundingClientRect();f.x=(N.clientX-Y.left)/Y.width,f.y=1-(N.clientY-Y.top)/Y.height,a=1}}function B(){a=0}function j(b){if(!o||!n){r=requestAnimationFrame(j);return}const N=(b-i)/1e3;c.x+=(f.x-c.x)*.04,c.y+=(f.y-c.y)*.04,h+=(a-h)*.025,o.useProgram(n),o.uniform1f(o.getUniformLocation(n,"uTime"),N),o.uniform2f(o.getUniformLocation(n,"uResolution"),s.value.width,s.value.height),o.uniform2f(o.getUniformLocation(n,"uMouse"),c.x,c.y),o.uniform1f(o.getUniformLocation(n,"uMouseActive"),h),o.drawArrays(o.TRIANGLES,0,6),r=requestAnimationFrame(j)}return rn(()=>{E()&&(L(),i=performance.now(),window.addEventListener("resize",L),window.addEventListener("mousemove",M),window.addEventListener("mouseleave",X),window.addEventListener("touchmove",P,{passive:!0}),window.addEventListener("touchend",B),r=requestAnimationFrame(j))}),js(()=>{r&&cancelAnimationFrame(r),window.removeEventListener("resize",L),window.removeEventListener("mousemove",M),window.removeEventListener("mouseleave",X),window.removeEventListener("touchmove",P),window.removeEventListener("touchend",B),o&&n&&o.deleteProgram(n)}),(b,N)=>(Gt(),_i("div",{ref_key:"container",ref:t,class:"liquid-chrome-hero"},[de("canvas",{ref_key:"canvas",ref:s},null,512),de("div",il,[zr(b.$slots,"default",{},void 0)])],512))}},ul=rl(fl,[["__scopeId","data-v-d5960851"]]),al={__name:"App",setup(e){return(t,s)=>(Gt(),ys(ul,null,{default:Qo(()=>[...s[0]||(s[0]=[de("div",{class:"hero-content"},[de("h1",{class:"hero-title"},[de("span",{class:"title-line"},"LIQUID"),de("span",{class:"title-line accent"},"CHROME")]),de("p",{class:"hero-subtitle"}," Interactive WebGL Shader Experience "),de("div",{class:"hero-cta"},[de("button",{class:"btn-primary"},"Explore Now"),de("button",{class:"btn-secondary"},"Learn More")])],-1)])]),_:1}))}};sl(al).mount("#app");
