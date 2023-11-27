!function(){"use strict";var e,t,r,n,o,i,s,c,l,a,u,d={251:function(e,t,r){var n=r(196),o=Symbol.for("react.element"),i=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function a(e,t,r){var n,i={},a=null,u=null;for(n in void 0!==r&&(a=""+r),void 0!==t.key&&(a=""+t.key),void 0!==t.ref&&(u=t.ref),t)s.call(t,n)&&!l.hasOwnProperty(n)&&(i[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===i[n]&&(i[n]=t[n]);return{$$typeof:o,type:e,key:a,ref:u,props:i,_owner:c.current}}t.Fragment=i,t.jsx=a,t.jsxs=a},893:function(e,t,r){e.exports=r(251)},196:function(e){e.exports=window.React}},p={};function v(e){var t=p[e];if(void 0!==t)return t.exports;var r=p[e]={exports:{}};return d[e](r,r.exports,v),r.exports}e=v(893),t=window.wp.blocks,r=window.wp.blockEditor,n=window.wp.i18n,o=window.wp.components,i=v(196),s=window.wp.primitives,c=(0,i.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,i.createElement)(s.Path,{d:"M13 5.5H4V4h9v1.5Zm7 7H4V11h16v1.5Zm-7 7H4V18h9v1.5Z"})),l=(0,i.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,i.createElement)(s.Path,{d:"M11.111 5.5H20V4h-8.889v1.5ZM4 12.5h16V11H4v1.5Zm7.111 7H20V18h-8.889v1.5Z"})),a=function(t){var r=t.attributes,i=t.setAttributes,s=r.alignment,a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"none";return(0,e.jsx)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",height:"1em",viewBox:"0 0 512 512",children:(0,e.jsx)(o.Path,{fill:t,d:"M0 64C0 46.3 14.3 32 32 32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32V416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V96C14.3 96 0 81.7 0 64zM256 96c-8.8 0-16 7.2-16 16v32H160c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v48H128c-8.8 0-16 7.2-16 16s7.2 16 16 16H240v70.6L189.1 307c-5.2-2-10.6-3-16.2-3h-2.1c-23.6 0-42.8 19.2-42.8 42.8c0 9.6 3.2 18.9 9.1 26.4l18.2 23.2c9.7 12.4 24.6 19.6 40.3 19.6H316.4c15.7 0 30.6-7.2 40.3-19.6l18.2-23.2c5.9-7.5 9.1-16.8 9.1-26.4c0-23.6-19.2-42.8-42.8-42.8H339c-5.5 0-11 1-16.2 3L272 326.6V256H384c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V176h80c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V112c0-8.8-7.2-16-16-16zM208 352a16 16 0 1 1 0 32 16 16 0 1 1 0-32zm80 16a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"})})},u=(a("#D3D3D3"),a("#000"),function(e){i({alignment:e})});return(0,e.jsx)(o.ToolbarGroup,{children:(0,e.jsx)(o.ToolbarItem,{children:function(){return(0,e.jsx)(o.ToolbarDropdownMenu,{icon:"left"===s?c:l,label:(0,n.__)("Display options for the Editor","rrze-elements-b"),controls:[{title:(0,n.__)("Align left","rrze-elements-b"),icon:c,onClick:function(){return u("left")}},{title:(0,n.__)("Align right","rrze-elements-b"),icon:l,onClick:function(){return u("right")}}]})}})})},u=JSON.parse('{"u2":"rrze-elements/insertion"}'),(0,t.registerBlockType)(u.u2,{icon:{src:(0,e.jsxs)("svg",{id:"Ebene_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:[(0,e.jsx)("path",{d:"m443.28,267.16v86.6c0,3.17-2.56,5.73-5.73,5.73H74.45c-3.16,0-5.73-2.56-5.73-5.73v-195.51c0-3.16,2.57-5.73,5.73-5.73h193.33v108.92c0,3.16,2.56,5.72,5.73,5.72h169.77Z",fillRule:"evenodd",strokeWidth:"0"}),(0,e.jsx)("rect",{x:"280.49",y:"153.81",width:"161",height:"100.64",rx:"5.73",ry:"5.73",fillRule:"evenodd",opacity:".2",strokeWidth:"0"})]})},__experimentalLabel:function(e,t){var r=t.context,n=e.title;if("list-view"===r&&n)return n},edit:function(t){t.blockProps;var o=t.attributes,i=t.setAttributes,s=(0,r.useBlockProps)(),c=o.alignment;return(0,e.jsxs)("div",Object.assign({},s,{children:[(0,e.jsx)(r.BlockControls,{controls:!0,children:(0,e.jsx)(a,{attributes:{alignment:c},setAttributes:i})}),(0,e.jsx)("aside",{className:"pull-".concat(c," ").concat(null==s?void 0:s.className),children:(0,e.jsx)(r.InnerBlocks,{allowedBlocks:["core/paragraph","core/heading","core/list","core/image"],template:[["core/paragraph",{placeholder:(0,n.__)("Insertion")}]]})})]}))},save:function(t){var n=t.attributes,o=r.useBlockProps.save(),i=n.alignment;return(0,e.jsx)(e.Fragment,{children:(0,e.jsx)("aside",{className:"pull-".concat(i," ").concat(null==o?void 0:o.className),children:(0,e.jsx)(r.InnerBlocks.Content,{})})})}})}();