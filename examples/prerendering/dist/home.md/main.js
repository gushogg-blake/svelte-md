var RootSvelteComponent=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let i,l=!1;function a(t,e,n,o){for(;t<e;){const r=t+(e-t>>1);n(r)<=o?t=r+1:e=r}return t}function u(t,e,n){const o=function(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;if(e&&e.host)return e;return t.ownerDocument}(t);if(!o.getElementById(e)){const t=h("style");t.id=e,t.textContent=n,function(t,e){!function(t,e){t.appendChild(e)}(t.head||t,e)}(o,t)}}function s(t,e){if(l){for(!function(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if("HEAD"===t.nodeName){const t=[];for(let n=0;n<e.length;n++){const o=e[n];void 0!==o.claim_order&&t.push(o)}e=t}const n=new Int32Array(e.length+1),o=new Int32Array(e.length);n[0]=-1;let r=0;for(let t=0;t<e.length;t++){const c=e[t].claim_order,i=(r>0&&e[n[r]].claim_order<=c?r+1:a(1,r,(t=>e[n[t]].claim_order),c))-1;o[t]=n[i]+1;const l=i+1;n[l]=t,r=Math.max(l,r)}const c=[],i=[];let l=e.length-1;for(let t=n[r]+1;0!=t;t=o[t-1]){for(c.push(e[t-1]);l>=t;l--)i.push(e[l]);l--}for(;l>=0;l--)i.push(e[l]);c.reverse(),i.sort(((t,e)=>t.claim_order-e.claim_order));for(let e=0,n=0;e<i.length;e++){for(;n<c.length&&i[e].claim_order>=c[n].claim_order;)n++;const o=n<c.length?c[n]:null;t.insertBefore(i[e],o)}}(t),(void 0===t.actual_end_child||null!==t.actual_end_child&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);null!==t.actual_end_child&&void 0===t.actual_end_child.claim_order;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?void 0===e.claim_order&&e.parentNode===t||t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else e.parentNode===t&&null===e.nextSibling||t.appendChild(e)}function f(t,e,n){l&&!n?s(t,e):e.parentNode===t&&e.nextSibling==n||t.insertBefore(e,n||null)}function d(t){t.parentNode.removeChild(t)}function h(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function _(){return m(" ")}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function p(t){return Array.from(t.childNodes)}function $(t,e,n,o,r=!1){!function(t){void 0===t.claim_info&&(t.claim_info={last_index:0,total_claimed:0})}(t);const c=(()=>{for(let o=t.claim_info.last_index;o<t.length;o++){const c=t[o];if(e(c)){const e=n(c);return void 0===e?t.splice(o,1):t[o]=e,r||(t.claim_info.last_index=o),c}}for(let o=t.claim_info.last_index-1;o>=0;o--){const c=t[o];if(e(c)){const e=n(c);return void 0===e?t.splice(o,1):t[o]=e,r?void 0===e&&t.claim_info.last_index--:t.claim_info.last_index=o,c}}return o()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function v(t,e,n){return function(t,e,n,o){return $(t,(t=>t.nodeName===e),(t=>{const e=[];for(let o=0;o<t.attributes.length;o++){const r=t.attributes[o];n[r.name]||e.push(r.name)}e.forEach((e=>t.removeAttribute(e)))}),(()=>o(e)))}(t,e,n,h)}function x(t,e){return $(t,(t=>3===t.nodeType),(t=>{const n=""+e;if(t.data.startsWith(n)){if(t.data.length!==n.length)return t.splitText(n.length)}else t.data=n}),(()=>m(e)),!0)}function b(t){return x(t," ")}function y(t){i=t}const E=[],w=[],A=[],N=[],k=Promise.resolve();let S=!1;function C(t){A.push(t)}let H=!1;const D=new Set;function I(){if(!H){H=!0;do{for(let t=0;t<E.length;t+=1){const e=E[t];y(e),B(e.$$)}for(y(null),E.length=0;w.length;)w.pop()();for(let t=0;t<A.length;t+=1){const e=A[t];D.has(e)||(D.add(e),e())}A.length=0}while(E.length);for(;N.length;)N.pop()();S=!1,H=!1,D.clear()}}function B(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const M=new Set;function V(t,e){t&&t.i&&(M.delete(t),t.i(e))}function j(t,n,c,i){const{fragment:l,on_mount:a,on_destroy:u,after_update:s}=t.$$;l&&l.m(n,c),i||C((()=>{const n=a.map(e).filter(r);u?u.push(...n):o(n),t.$$.on_mount=[]})),s.forEach(C)}function O(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function R(t,e){-1===t.$$.dirty[0]&&(E.push(t),S||(S=!0,k.then(I)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function T(e,r,c,a,u,s,f,h=[-1]){const m=i;y(e);const _=e.$$={fragment:null,ctx:null,props:s,update:t,not_equal:u,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(m?m.$$.context:[])),callbacks:n(),dirty:h,skip_bound:!1,root:r.target||m.$$.root};f&&f(_.root);let g=!1;if(_.ctx=c?c(e,r.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return _.ctx&&u(_.ctx[t],_.ctx[t]=r)&&(!_.skip_bound&&_.bound[t]&&_.bound[t](r),g&&R(e,t)),n})):[],_.update(),g=!0,o(_.before_update),_.fragment=!!a&&a(_.ctx),r.target){if(r.hydrate){l=!0;const t=p(r.target);_.fragment&&_.fragment.l(t),t.forEach(d)}else _.fragment&&_.fragment.c();r.intro&&V(e.$$.fragment),j(e,r.target,r.anchor,r.customElement),l=!1,I()}y(m)}class W{$destroy(){O(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function P(t){u(t,"svelte-1nhgwu",".spacer.svelte-1nhgwu{height:50px}.container.svelte-1nhgwu{background:rgba(225, 0, 0, 0.1);position:fixed;top:0;right:0;left:0;box-shadow:0 3px 10px 10px rgba(0, 0, 0, 0.2);padding:16px}.left.svelte-1nhgwu{float:left}.right.svelte-1nhgwu{float:right}")}function q(e){let n,o,r,c,i,l,a,u,$,y,E,w,A,N,k;return{c(){n=h("div"),o=_(),r=h("div"),c=h("div"),i=m("Svelte Md Example"),l=_(),a=h("div"),u=h("a"),$=m("Home"),y=_(),E=h("a"),w=m("About"),A=_(),N=h("a"),k=m("Contact"),this.h()},l(t){n=v(t,"DIV",{class:!0}),p(n).forEach(d),o=b(t),r=v(t,"DIV",{class:!0});var e=p(r);c=v(e,"DIV",{class:!0});var s=p(c);i=x(s,"Svelte Md Example"),s.forEach(d),l=b(e),a=v(e,"DIV",{class:!0});var f=p(a);u=v(f,"A",{href:!0});var h=p(u);$=x(h,"Home"),h.forEach(d),y=b(f),E=v(f,"A",{href:!0});var m=p(E);w=x(m,"About"),m.forEach(d),A=b(f),N=v(f,"A",{href:!0});var _=p(N);k=x(_,"Contact"),_.forEach(d),f.forEach(d),e.forEach(d),this.h()},h(){g(n,"class","spacer svelte-1nhgwu"),g(c,"class","left svelte-1nhgwu"),g(u,"href","/home.md"),g(E,"href","/about.md"),g(N,"href","/contact.md"),g(a,"class","right svelte-1nhgwu"),g(r,"class","container svelte-1nhgwu")},m(t,e){f(t,n,e),f(t,o,e),f(t,r,e),s(r,c),s(c,i),s(r,l),s(r,a),s(a,u),s(u,$),s(a,y),s(a,E),s(E,w),s(a,A),s(a,N),s(N,k)},p:t,i:t,o:t,d(t){t&&d(n),t&&d(o),t&&d(r)}}}class z extends W{constructor(t){super(),T(this,t,null,q,c,{},P)}}function F(e){let n,o,r,c,i,l,a,u;return n=new z({}),{c(){var t;(t=n.$$.fragment)&&t.c(),o=_(),r=h("h1"),c=m("Home"),i=_(),l=h("p"),a=m("Hello, World!"),this.h()},l(t){var e,u;e=n.$$.fragment,u=t,e&&e.l(u),o=b(t),r=v(t,"H1",{id:!0});var s=p(r);c=x(s,"Home"),s.forEach(d),i=b(t),l=v(t,"P",{});var f=p(l);a=x(f,"Hello, World!"),f.forEach(d),this.h()},h(){g(r,"id","home")},m(t,e){j(n,t,e),f(t,o,e),f(t,r,e),s(r,c),f(t,i,e),f(t,l,e),s(l,a),u=!0},p:t,i(t){u||(V(n.$$.fragment,t),u=!0)},o(t){!function(t,e,n,o){if(t&&t.o){if(M.has(t))return;M.add(t),(void 0).c.push((()=>{M.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}(n.$$.fragment,t),u=!1},d(t){O(n,t),t&&d(o),t&&d(r),t&&d(i),t&&d(l)}}}return class extends W{constructor(t){super(),T(this,t,null,F,c,{})}}}();
