!function(){"use strict";var e,t,n,r,o,i,u,s,l,c,a={251:function(e,t,n){var r=n(196),o=Symbol.for("react.element"),i=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),u=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,n){var r,l={},c=null,a=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(a=t.ref),t)i.call(t,r)&&!s.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===l[r]&&(l[r]=t[r]);return{$$typeof:o,type:e,key:c,ref:a,props:l,_owner:u.current}}t.jsx=l,t.jsxs=l},893:function(e,t,n){e.exports=n(251)},196:function(e){e.exports=window.React}},f={};function d(e){var t=f[e];if(void 0!==t)return t.exports;var n=f[e]={exports:{}};return a[e](n,n.exports,d),n.exports}d.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return d.d(t,{a:t}),t},d.d=function(e,t){for(var n in t)d.o(t,n)&&!d.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},d.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e=d(893),t=window.wp.blocks,n=window.wp.blockEditor,r=window.wp.serverSideRender,o=d.n(r),i=window.wp.components,u=window.wp.i18n,s=window.wp.data,l=function(t){var n=t.attributes,r=t.setAttributes,o=(0,s.useSelect)((function(e){return{categories:(0,e("core").getEntityRecords)("taxonomy","category")}}),[]).categories,u=n.cat||"",l=o?o.reduce((function(e,t){return e[t.slug]=t,e}),{}):{},c=(o&&o.map((function(e){return{id:e.id,name:e.name,parent:e.parent,slug:e.slug}})),u.split(",")),a=o?o.filter((function(e){return c.includes(e.slug)})).map((function(e){return{id:e.id,name:e.name,parent:e.parent}})):[];return(0,e.jsx)(i.QueryControls,{categorySuggestions:l,numberOfItems:n.num,onCategoryChange:function(e){var t=u.toLowerCase().split(",").filter(Boolean),n=(Array.isArray(e)?e:[e]).map((function(e){var t,n="string"==typeof e?e:null===(t=o.find((function(t){return t.id===e.id})))||void 0===t?void 0:t.slug;return o.find((function(e){return e.slug===n}))?n:null})).filter((function(e){return e}));t=t.filter((function(e){return n.includes(e)})),n.forEach((function(e){t.includes(e)||t.push(e)})),r({cat:t.join(",")})},onNumberOfItemsChange:function(e){return r({num:e})},selectedCategories:a,minItems:1,maxItems:15})},c=JSON.parse('{"u2":"rrze-elements/block-blueprint"}'),(0,t.registerBlockType)(c.u2,{icon:{src:(0,e.jsxs)("svg",{id:"Ebene_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:[(0,e.jsx)("rect",{x:"60.05",y:"115.69",width:"112.94",height:"280.62",rx:"5.73",ry:"5.73",fill:"evenodd",strokeWidth:"0"}),(0,e.jsx)("rect",{x:"199.53",y:"115.69",width:"112.94",height:"280.62",rx:"5.73",ry:"5.73",fill:"evenodd",strokeWidth:"0"}),(0,e.jsx)("rect",{x:"339.01",y:"115.69",width:"112.94",height:"280.62",rx:"5.73",ry:"5.73",fill:"evenodd",strokeWidth:"0"})]})},__experimentalLabel:function(e,t){var n=t.context,r=e.title;if("list-view"===n&&r)return r},edit:function(t){t.blockProps;var r=t.attributes,s=t.setAttributes,c=(0,n.useBlockProps)(),a=r.title||"";return(0,e.jsxs)("div",Object.assign({},c,{children:[(0,e.jsx)(n.InspectorControls,{children:(0,e.jsxs)(i.PanelBody,{title:(0,u.__)("Settings","rrze-elements"),initialOpen:!0,children:[(0,e.jsx)(i.TextControl,{label:"Title",value:a,onChange:function(e){return s({title:e})}}),(0,e.jsx)(l,{attributes:{cat:r.cat,num:r.num},setAttributes:s})]})}),(0,e.jsx)(o(),{block:"rrze-elements/block-blueprint",attributes:{title:a,num:r.num,cat:r.cat,columns:3,type:"cols_3-1"}})]}))},save:function(){return null}})}();