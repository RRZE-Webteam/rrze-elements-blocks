!function(){"use strict";var e={75251:function(e,t,n){var r=n(99196),o=Symbol.for("react.element"),i=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,l=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function a(e,t,n){var r,i={},a=null,u=null;for(r in void 0!==n&&(a=""+n),void 0!==t.key&&(a=""+t.key),void 0!==t.ref&&(u=t.ref),t)c.call(t,r)&&!s.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===i[r]&&(i[r]=t[r]);return{$$typeof:o,type:e,key:a,ref:u,props:i,_owner:l.current}}t.Fragment=i,t.jsx=a,t.jsxs=a},85893:function(e,t,n){e.exports=n(75251)},99196:function(e){e.exports=window.React}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}!function(){var e=window.wp.blocks,t=n(85893),r=window.wp.blockEditor,o=window.wp.components,i=window.lodash,c=window.wp.element,l=window.wp.data,s=window.wp.i18n,a=function(e){var n=e.attributes,r=e.setAttributes,i=n.xray,c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"none";return(0,t.jsx)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",height:"1em",viewBox:"0 0 512 512",children:(0,t.jsx)(o.Path,{fill:e,d:"M0 64C0 46.3 14.3 32 32 32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32V416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V96C14.3 96 0 81.7 0 64zM256 96c-8.8 0-16 7.2-16 16v32H160c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v48H128c-8.8 0-16 7.2-16 16s7.2 16 16 16H240v70.6L189.1 307c-5.2-2-10.6-3-16.2-3h-2.1c-23.6 0-42.8 19.2-42.8 42.8c0 9.6 3.2 18.9 9.1 26.4l18.2 23.2c9.7 12.4 24.6 19.6 40.3 19.6H316.4c15.7 0 30.6-7.2 40.3-19.6l18.2-23.2c5.9-7.5 9.1-16.8 9.1-26.4c0-23.6-19.2-42.8-42.8-42.8H339c-5.5 0-11 1-16.2 3L272 326.6V256H384c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V176h80c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V112c0-8.8-7.2-16-16-16zM208 352a16 16 0 1 1 0 32 16 16 0 1 1 0-32zm80 16a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"})})},l=c("#D3D3D3"),a=c("#000"),u=function(e){r({xray:e})};return(0,t.jsx)(o.ToolbarGroup,{children:(0,t.jsx)(o.ToolbarItem,{children:function(){return(0,t.jsx)(o.ToolbarDropdownMenu,{icon:i?a:l,label:(0,s.__)("Display options for the Editor","rrze-elements-b"),controls:[{title:(0,s.__)("Reveal all tabs inside the Editor (X-ray)","rrze-elements-b"),icon:a,onClick:function(){return u(!0)}},{title:(0,s.__)("Only show active tabs inside the editor","rrze-elements-b"),icon:l,onClick:function(){return u(!1)}}]})}})})},u=window.wp.primitives,d=(0,c.createElement)(u.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,c.createElement)(u.Path,{d:"M17.2 10.9c-.5-1-1.2-2.1-2.1-3.2-.6-.9-1.3-1.7-2.1-2.6L12 4l-1 1.1c-.6.9-1.3 1.7-2 2.6-.8 1.2-1.5 2.3-2 3.2-.6 1.2-1 2.2-1 3 0 3.4 2.7 6.1 6.1 6.1s6.1-2.7 6.1-6.1c0-.8-.3-1.8-1-3zm-5.1 7.6c-2.5 0-4.6-2.1-4.6-4.6 0-.3.1-1 .8-2.3.5-.9 1.1-1.9 2-3.1.7-.9 1.3-1.7 1.8-2.3.7.8 1.3 1.6 1.8 2.3.8 1.1 1.5 2.2 2 3.1.7 1.3.8 2 .8 2.3 0 2.5-2.1 4.6-4.6 4.6z"})),f=[{color:"#04316A",slug:"fau",name:(0,s.__)("Central institution","rrze-elements-b")},{color:"#C50F3C",slug:"rw",name:(0,s.__)("Faculty of Business, Economics, and Law","rrze-elements-b")},{color:"#7bb725",slug:"nat",name:(0,s.__)("Faculty of Sciences","rrze-elements-b")},{color:"#18B4F1",slug:"med",name:(0,s.__)("Faculty of Medicine","rrze-elements-b")},{color:"#FDB735",slug:"phil",name:(0,s.__)("Faculty of Humanities, Social Sciences, and Theology","rrze-elements-b")},{color:"#8C9FB1",slug:"tf",name:(0,s.__)("Faculty of Engineering","rrze-elements-b")}],b=function(e){var n=e.attributes,r=e.setAttributes;return n.color,(0,t.jsx)(o.ToolbarGroup,{children:(0,t.jsx)(o.ToolbarItem,{children:function(){return(0,t.jsx)(o.ToolbarDropdownMenu,{icon:d,className:"rrzeElementsBFakColorSelector ".concat(n.color),label:(0,s.__)("Select a Color","rrze-elements-b"),controls:f.map((function(e){return{key:e.slug,title:e.name,icon:d,onClick:function(){return t=e.color,n=f.find((function(e){return e.color===t})),void r({color:n.slug});var t,n}}}))})}})})};function m(e){return function(e){if(Array.isArray(e))return v(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var p=function e(t){var n=m(t);return t.forEach((function(t){t.innerBlocks&&t.innerBlocks.length>0&&(n=[].concat(m(n),m(e(t.innerBlocks))))})),n},h=JSON.parse('{"u2":"rrze-elements/tabs"}');(0,e.registerBlockType)(h.u2,{example:{attributes:{message:"Accordion"}},icon:{src:"minus",background:"#00458c"},edit:function(e){e.blockProps;var n=e.attributes,s=e.setAttributes,u=e.clientId,d=(e.context,(0,r.useBlockProps)()),f=d["data-block"],m=(n.tabs,(0,l.useSelect)((function(e){var t=e("core/block-editor"),n=t.getBlock,r=t.getBlocks,o=t.getBlockIndex,i=u,c=r(i).length,l=o(i),s=r(),a=r(i),d=0,f=a.map((function(e){var t;return{clientId:e.clientId,title:null===(t=e.attributes)||void 0===t?void 0:t.title,position:d++}})),b=p(s).filter((function(e){return"rrze-elements/tabs"===e.name})).map((function(e){return e.clientId})),m=b.indexOf(i),v=b.slice(0,m);return{selectedBlock:n(i),numberChildren:c,blockIndex:l,previousBlockClients:v,innerClientIds:f}}),[u])),v=(m.selectedBlock,m.numberChildren,m.blockIndex,m.previousBlockClients),h=m.innerClientIds;(0,c.useEffect)((function(){(0,i.isEqual)(n.previousBlockIds,v)||s({previousBlockIds:v})}),[v,s,n.previousBlockIds]),(0,c.useEffect)((function(){n.blockId!==f&&s({blockId:f.slice(0,10)})}),[n.blockId,f]),(0,c.useEffect)((function(){0!==h.length&&((0,i.isEqual)(n.innerClientIds,h)||s({innerClientIds:h}))}),[h,s]),(0,c.useEffect)((function(){""===n.active&&h&&h.length>0&&s({active:h[0].clientId}),h&&h.find((function(e){return e.clientId===n.active}))||h&&h.length>0&&s({active:h[0].clientId})}),[h,n.active]);var w=function(e){return void 0===h[e]||h[e].clientId===n.active||""===n.active};return(0,t.jsxs)("div",Object.assign({},d,{children:[(0,t.jsxs)(r.BlockControls,{controls:!0,children:[(0,t.jsx)(a,{attributes:{xray:n.xray},setAttributes:s}),(0,t.jsx)(b,{attributes:{color:n.color},setAttributes:s})]}),(0,t.jsxs)("div",{className:"rrze-elements-tabs primary ".concat(n.color),id:"tabs-1",children:[(0,t.jsx)("div",{role:"tablist",className:"manual",children:n.innerClientIds.map((function(e,n){return(0,t.jsx)(o.Button,{onClick:function(){return function(e,t){var n;void 0!==(null===(n=t[e])||void 0===n?void 0:n.clientId)&&s({active:t[e].clientId})}(n,h)},id:e.clientId,type:"button",role:"tab","aria-selected":w(n),"aria-controls":"".concat(e.position),children:(0,t.jsx)("span",{className:"focus",tabIndex:-1,children:e.title})},n)}))}),(0,t.jsx)(r.InnerBlocks,{allowedBlocks:["rrze-elements/tab"],template:[["rrze-elements/tab"],["rrze-elements/tab"]]})]})]}))},save:function(e){var n=e.attributes,o=r.useBlockProps.save(),i=function(e){return void 0===n.innerClientIds[e]||n.innerClientIds[e].clientId===n.active||""===n.active},c=n.blockId;return(0,t.jsxs)("div",Object.assign({},o,{children:[" ",(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("div",{className:"rrze-elements-tabs primary ".concat(n.color),id:"tabs-".concat(c),children:[(0,t.jsx)("div",{role:"tablist",className:"manual",children:n.innerClientIds.map((function(e,n){var r=e.clientId.slice(0,10);return(0,t.jsx)("button",{id:r,type:"button",role:"tab","aria-selected":i(n),"aria-controls":"tab-".concat(c,"_tabpanel_tab-label-").concat(r),children:(0,t.jsx)("span",{className:"focus",tabIndex:-1,children:e.title})},n)}))}),(0,t.jsx)(r.InnerBlocks.Content,{})]})})]}))}})}()}();