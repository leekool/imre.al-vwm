function w(){}function I(t,n){for(const e in n)t[e]=n[e];return t}function O(t){return t()}function M(){return Object.create(null)}function g(t){t.forEach(O)}function P(t){return typeof t=="function"}function ut(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let x;function st(t,n){return x||(x=document.createElement("a")),x.href=n,t===x.href}function W(t){return Object.keys(t).length===0}function q(t,...n){if(t==null)return w;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function ot(t){let n;return q(t,e=>n=e)(),n}function at(t,n,e){t.$$.on_destroy.push(q(n,e))}function ft(t,n,e,i){if(t){const r=B(t,n,e,i);return t[0](r)}}function B(t,n,e,i){return t[1]&&i?I(e.ctx.slice(),t[1](i(n))):e.ctx}function _t(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const o=[],c=Math.max(n.dirty.length,r.length);for(let s=0;s<c;s+=1)o[s]=n.dirty[s]|r[s];return o}return n.dirty|r}return n.dirty}function dt(t,n,e,i,r,o){if(r){const c=B(n,e,i,o);t.p(c,r)}}function ht(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function mt(t){return t??""}function pt(t,n,e){return t.set(e),n}const yt=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;let E=!1;function G(){E=!0}function J(){E=!1}function K(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function Q(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<n.length;u++){const f=n[u];f.claim_order!==void 0&&l.push(f)}n=l}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let l=0;l<n.length;l++){const u=n[l].claim_order,f=(r>0&&n[e[r]].claim_order<=u?r+1:K(1,r,b=>n[e[b]].claim_order,u))-1;i[l]=e[f]+1;const a=f+1;e[a]=l,r=Math.max(a,r)}const o=[],c=[];let s=n.length-1;for(let l=e[r]+1;l!=0;l=i[l-1]){for(o.push(n[l-1]);s>=l;s--)c.push(n[s]);s--}for(;s>=0;s--)c.push(n[s]);o.reverse(),c.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<c.length;l++){for(;u<o.length&&c[l].claim_order>=o[u].claim_order;)u++;const f=u<o.length?o[u]:null;t.insertBefore(c[l],f)}}function R(t,n){if(E){for(Q(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function gt(t,n,e){E&&!e?R(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function U(t){t.parentNode&&t.parentNode.removeChild(t)}function bt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function V(t){return document.createElement(t)}function S(t){return document.createTextNode(t)}function xt(){return S(" ")}function $t(){return S("")}function wt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function Et(t){return function(n){return n.stopPropagation(),t.call(this,n)}}function vt(t){return function(n){n.target===this&&t.call(this,n)}}function Nt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function X(t){return Array.from(t.childNodes)}function Y(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function D(t,n,e,i,r=!1){Y(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(n(s)){const l=e(s);return l===void 0?t.splice(c,1):t[c]=l,r||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(n(s)){const l=e(s);return l===void 0?t.splice(c,1):t[c]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function Z(t,n,e,i){return D(t,r=>r.nodeName===n,r=>{const o=[];for(let c=0;c<r.attributes.length;c++){const s=r.attributes[c];e[s.name]||o.push(s.name)}o.forEach(c=>r.removeAttribute(c))},()=>i(n))}function At(t,n,e){return Z(t,n,e,V)}function tt(t,n){return D(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>S(n),!0)}function St(t){return tt(t," ")}function jt(t,n){n=""+n,t.data!==n&&(t.data=n)}function kt(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function Ct(t,n,e){t.classList[e?"add":"remove"](n)}function Mt(t,n){return new t(n)}let y;function p(t){y=t}function j(){if(!y)throw new Error("Function called outside component initialization");return y}function Tt(t){j().$$.on_mount.push(t)}function Lt(t){j().$$.after_update.push(t)}function Ot(t){j().$$.on_destroy.push(t)}function Pt(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(i=>i.call(this,n))}const h=[],T=[];let m=[];const L=[],z=Promise.resolve();let N=!1;function F(){N||(N=!0,z.then(H))}function qt(){return F(),z}function A(t){m.push(t)}const v=new Set;let d=0;function H(){if(d!==0)return;const t=y;do{try{for(;d<h.length;){const n=h[d];d++,p(n),nt(n.$$)}}catch(n){throw h.length=0,d=0,n}for(p(null),h.length=0,d=0;T.length;)T.pop()();for(let n=0;n<m.length;n+=1){const e=m[n];v.has(e)||(v.add(e),e())}m.length=0}while(h.length);for(;L.length;)L.pop()();N=!1,v.clear(),p(t)}function nt(t){if(t.fragment!==null){t.update(),g(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(A)}}function et(t){const n=[],e=[];m.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),m=n}const $=new Set;let _;function Bt(){_={r:0,c:[],p:_}}function Dt(){_.r||g(_.c),_=_.p}function it(t,n){t&&t.i&&($.delete(t),t.i(n))}function zt(t,n,e,i){if(t&&t.o){if($.has(t))return;$.add(t),_.c.push(()=>{$.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function Ft(t){t&&t.c()}function Ht(t,n){t&&t.l(n)}function rt(t,n,e,i){const{fragment:r,after_update:o}=t.$$;r&&r.m(n,e),i||A(()=>{const c=t.$$.on_mount.map(O).filter(P);t.$$.on_destroy?t.$$.on_destroy.push(...c):g(c),t.$$.on_mount=[]}),o.forEach(A)}function ct(t,n){const e=t.$$;e.fragment!==null&&(et(e.after_update),g(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function lt(t,n){t.$$.dirty[0]===-1&&(h.push(t),F(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function It(t,n,e,i,r,o,c,s=[-1]){const l=y;p(t);const u=t.$$={fragment:null,ctx:[],props:o,update:w,not_equal:r,bound:M(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(l?l.$$.context:[])),callbacks:M(),dirty:s,skip_bound:!1,root:n.target||l.$$.root};c&&c(u.root);let f=!1;if(u.ctx=e?e(t,n.props||{},(a,b,...k)=>{const C=k.length?k[0]:b;return u.ctx&&r(u.ctx[a],u.ctx[a]=C)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](C),f&&lt(t,a)),b}):[],u.update(),f=!0,g(u.before_update),u.fragment=i?i(u.ctx):!1,n.target){if(n.hydrate){G();const a=X(n.target);u.fragment&&u.fragment.l(a),a.forEach(U)}else u.fragment&&u.fragment.c();n.intro&&it(t.$$.fragment),rt(t,n.target,n.anchor,n.customElement),J(),H()}p(l)}class Wt{$destroy(){ct(this,1),this.$destroy=w}$on(n,e){if(!P(e))return w;const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!W(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{rt as A,ct as B,ft as C,dt as D,ht as E,_t as F,R as G,w as H,at as I,ot as J,Ct as K,wt as L,vt as M,mt as N,g as O,j as P,Ot as Q,yt as R,Wt as S,bt as T,Et as U,Pt as V,st as W,pt as X,xt as a,gt as b,St as c,zt as d,$t as e,Dt as f,it as g,U as h,It as i,Lt as j,V as k,At as l,X as m,Nt as n,Tt as o,kt as p,S as q,tt as r,ut as s,qt as t,jt as u,Bt as v,T as w,Mt as x,Ft as y,Ht as z};
