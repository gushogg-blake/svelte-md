var RootSvelteComponent=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let l,a=!1;function c(t,e,n,o){for(;t<e;){const r=t+(e-t>>1);n(r)<=o?t=r+1:e=r}return t}function s(t,e,n){const o=function(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;if(e&&e.host)return e;return t.ownerDocument}(t);if(!o.getElementById(e)){const t=h("style");t.id=e,t.textContent=n,function(t,e){!function(t,e){t.appendChild(e)}(t.head||t,e)}(o,t)}}function u(t,e){if(a){for(!function(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if("HEAD"===t.nodeName){const t=[];for(let n=0;n<e.length;n++){const o=e[n];void 0!==o.claim_order&&t.push(o)}e=t}const n=new Int32Array(e.length+1),o=new Int32Array(e.length);n[0]=-1;let r=0;for(let t=0;t<e.length;t++){const i=e[t].claim_order,l=(r>0&&e[n[r]].claim_order<=i?r+1:c(1,r,(t=>e[n[t]].claim_order),i))-1;o[t]=n[l]+1;const a=l+1;n[a]=t,r=Math.max(a,r)}const i=[],l=[];let a=e.length-1;for(let t=n[r]+1;0!=t;t=o[t-1]){for(i.push(e[t-1]);a>=t;a--)l.push(e[a]);a--}for(;a>=0;a--)l.push(e[a]);i.reverse(),l.sort(((t,e)=>t.claim_order-e.claim_order));for(let e=0,n=0;e<l.length;e++){for(;n<i.length&&l[e].claim_order>=i[n].claim_order;)n++;const o=n<i.length?i[n]:null;t.insertBefore(l[e],o)}}(t),(void 0===t.actual_end_child||null!==t.actual_end_child&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);null!==t.actual_end_child&&void 0===t.actual_end_child.claim_order;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?void 0===e.claim_order&&e.parentNode===t||t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else e.parentNode===t&&null===e.nextSibling||t.appendChild(e)}function d(t,e,n){a&&!n?u(t,e):e.parentNode===t&&e.nextSibling==n||t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function h(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function _(){return m(" ")}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function p(t){return Array.from(t.childNodes)}function v(t,e,n,o,r=!1){!function(t){void 0===t.claim_info&&(t.claim_info={last_index:0,total_claimed:0})}(t);const i=(()=>{for(let o=t.claim_info.last_index;o<t.length;o++){const i=t[o];if(e(i)){const e=n(i);return void 0===e?t.splice(o,1):t[o]=e,r||(t.claim_info.last_index=o),i}}for(let o=t.claim_info.last_index-1;o>=0;o--){const i=t[o];if(e(i)){const e=n(i);return void 0===e?t.splice(o,1):t[o]=e,r?void 0===e&&t.claim_info.last_index--:t.claim_info.last_index=o,i}}return o()})();return i.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,i}function $(t,e,n){return function(t,e,n,o){return v(t,(t=>t.nodeName===e),(t=>{const e=[];for(let o=0;o<t.attributes.length;o++){const r=t.attributes[o];n[r.name]||e.push(r.name)}e.forEach((e=>t.removeAttribute(e)))}),(()=>o(e)))}(t,e,n,h)}function x(t,e){return v(t,(t=>3===t.nodeType),(t=>{const n=""+e;if(t.data.startsWith(n)){if(t.data.length!==n.length)return t.splitText(n.length)}else t.data=n}),(()=>m(e)),!0)}function b(t){return x(t," ")}function w(t){l=t}const y=[],E=[],A=[],k=[],N=Promise.resolve();let S=!1;function C(t){A.push(t)}let D=!1;const I=new Set;function T(){if(!D){D=!0;do{for(let t=0;t<y.length;t+=1){const e=y[t];w(e),B(e.$$)}for(w(null),y.length=0;E.length;)E.pop()();for(let t=0;t<A.length;t+=1){const e=A[t];I.has(e)||(I.add(e),e())}A.length=0}while(y.length);for(;k.length;)k.pop()();S=!1,D=!1,I.clear()}}function B(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const H=new Set;function M(t,e){t&&t.i&&(H.delete(t),t.i(e))}function V(t,n,i,l){const{fragment:a,on_mount:c,on_destroy:s,after_update:u}=t.$$;a&&a.m(n,i),l||C((()=>{const n=c.map(e).filter(r);s?s.push(...n):o(n),t.$$.on_mount=[]})),u.forEach(C)}function j(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function O(t,e){-1===t.$$.dirty[0]&&(y.push(t),S||(S=!0,N.then(T)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function R(e,r,i,c,s,u,d,h=[-1]){const m=l;w(e);const _=e.$$={fragment:null,ctx:null,props:u,update:t,not_equal:s,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(m?m.$$.context:[])),callbacks:n(),dirty:h,skip_bound:!1,root:r.target||m.$$.root};d&&d(_.root);let g=!1;if(_.ctx=i?i(e,r.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return _.ctx&&s(_.ctx[t],_.ctx[t]=r)&&(!_.skip_bound&&_.bound[t]&&_.bound[t](r),g&&O(e,t)),n})):[],_.update(),g=!0,o(_.before_update),_.fragment=!!c&&c(_.ctx),r.target){if(r.hydrate){a=!0;const t=p(r.target);_.fragment&&_.fragment.l(t),t.forEach(f)}else _.fragment&&_.fragment.c();r.intro&&M(e.$$.fragment),V(e,r.target,r.anchor,r.customElement),a=!1,T()}w(m)}class P{$destroy(){j(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function q(t){s(t,"svelte-1nhgwu",".spacer.svelte-1nhgwu{height:50px}.container.svelte-1nhgwu{background:rgba(225, 0, 0, 0.1);position:fixed;top:0;right:0;left:0;box-shadow:0 3px 10px 10px rgba(0, 0, 0, 0.2);padding:16px}.left.svelte-1nhgwu{float:left}.right.svelte-1nhgwu{float:right}")}function W(e){let n,o,r,i,l,a,c,s,v,w,y,E,A,k,N;return{c(){n=h("div"),o=_(),r=h("div"),i=h("div"),l=m("Svelte Md Example"),a=_(),c=h("div"),s=h("a"),v=m("Home"),w=_(),y=h("a"),E=m("About"),A=_(),k=h("a"),N=m("Contact"),this.h()},l(t){n=$(t,"DIV",{class:!0}),p(n).forEach(f),o=b(t),r=$(t,"DIV",{class:!0});var e=p(r);i=$(e,"DIV",{class:!0});var u=p(i);l=x(u,"Svelte Md Example"),u.forEach(f),a=b(e),c=$(e,"DIV",{class:!0});var d=p(c);s=$(d,"A",{href:!0});var h=p(s);v=x(h,"Home"),h.forEach(f),w=b(d),y=$(d,"A",{href:!0});var m=p(y);E=x(m,"About"),m.forEach(f),A=b(d),k=$(d,"A",{href:!0});var _=p(k);N=x(_,"Contact"),_.forEach(f),d.forEach(f),e.forEach(f),this.h()},h(){g(n,"class","spacer svelte-1nhgwu"),g(i,"class","left svelte-1nhgwu"),g(s,"href","/home.md"),g(y,"href","/about.md"),g(k,"href","/contact.md"),g(c,"class","right svelte-1nhgwu"),g(r,"class","container svelte-1nhgwu")},m(t,e){d(t,n,e),d(t,o,e),d(t,r,e),u(r,i),u(i,l),u(r,a),u(r,c),u(c,s),u(s,v),u(c,w),u(c,y),u(y,E),u(c,A),u(c,k),u(k,N)},p:t,i:t,o:t,d(t){t&&f(n),t&&f(o),t&&f(r)}}}class z extends P{constructor(t){super(),R(this,t,null,W,i,{},q)}}function F(e){let n,o,r,i,l,a,c,s;return n=new z({}),{c(){var t;(t=n.$$.fragment)&&t.c(),o=_(),r=h("h1"),i=m("About"),l=_(),a=h("p"),c=m("This example is build with markdown-flavored Svelte!  (or is it svelte-flavored markdown? 🤷‍♂️)"),this.h()},l(t){var e,s;e=n.$$.fragment,s=t,e&&e.l(s),o=b(t),r=$(t,"H1",{id:!0});var u=p(r);i=x(u,"About"),u.forEach(f),l=b(t),a=$(t,"P",{});var d=p(a);c=x(d,"This example is build with markdown-flavored Svelte!  (or is it svelte-flavored markdown? 🤷‍♂️)"),d.forEach(f),this.h()},h(){g(r,"id","about")},m(t,e){V(n,t,e),d(t,o,e),d(t,r,e),u(r,i),d(t,l,e),d(t,a,e),u(a,c),s=!0},p:t,i(t){s||(M(n.$$.fragment,t),s=!0)},o(t){!function(t,e,n,o){if(t&&t.o){if(H.has(t))return;H.add(t),(void 0).c.push((()=>{H.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}(n.$$.fragment,t),s=!1},d(t){j(n,t),t&&f(o),t&&f(r),t&&f(l),t&&f(a)}}}return class extends P{constructor(t){super(),R(this,t,null,F,i,{})}}}();
