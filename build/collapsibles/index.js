!function(){"use strict";var e={251:function(e,t,n){var r=n(196),l=Symbol.for("react.element"),o=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,i=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,o={},c=null,u=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)s.call(t,r)&&!a.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===o[r]&&(o[r]=t[r]);return{$$typeof:l,type:e,key:c,ref:u,props:o,_owner:i.current}}t.Fragment=o,t.jsx=c,t.jsxs=c},893:function(e,t,n){e.exports=n(251)},196:function(e){e.exports=window.React}},t={};function n(r){var l=t[r];if(void 0!==l)return l.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}!function(){var e=n(893),t=window.wp.blocks,r=window.wp.element,l=window.wp.blockEditor,o=window.wp.components,s=window.lodash,i=window.wp.data,a=window.wp.i18n,c=function(t){var n=t.attributes,r=t.setAttributes;return(0,e.jsx)(o.CheckboxControl,{label:(0,a.__)("Show Expand-All-Link","rrze-elements-b"),checked:n.expandAllLink,onChange:function(){r({expandAllLink:!n.expandAllLink})}})},u=n(196),d=window.wp.primitives,h=(0,u.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,u.createElement)(d.Path,{d:"M9 11.1H5v-4H3v10h2v-4h4v4h2v-10H9v4zm8 4c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6v1.5h8v-2H17z"})),p=(0,u.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,u.createElement)(d.Path,{d:"M9 11H5V7H3v10h2v-4h4v4h2V7H9v4zm11.3 1.7c-.4-.4-1-.7-1.6-.8v-.1c.6-.2 1.1-.5 1.5-.9.3-.4.5-.8.5-1.3 0-.4-.1-.8-.3-1.1-.2-.3-.5-.6-.8-.8-.4-.2-.8-.4-1.2-.5-.6-.1-1.1-.2-1.6-.2-.6 0-1.3.1-1.8.3s-1.1.5-1.6.9l1.2 1.4c.4-.2.7-.4 1.1-.6.3-.2.7-.3 1.1-.3.4 0 .8.1 1.1.3.3.2.4.5.4.8 0 .4-.2.7-.6.9-.7.3-1.5.5-2.2.4v1.6c.5 0 1 0 1.5.1.3.1.7.2 1 .3.2.1.4.2.5.4s.1.4.1.6c0 .3-.2.7-.5.8-.4.2-.9.3-1.4.3s-1-.1-1.4-.3c-.4-.2-.8-.4-1.2-.7L13 15.6c.5.4 1 .8 1.6 1 .7.3 1.5.4 2.3.4.6 0 1.1-.1 1.6-.2.4-.1.9-.2 1.3-.5.4-.2.7-.5.9-.9.2-.4.3-.8.3-1.2 0-.6-.3-1.1-.7-1.5z"})),m=(0,u.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,u.createElement)(d.Path,{d:"M20 13V7h-3l-4 6v2h5v2h2v-2h1v-2h-1zm-2 0h-2.8L18 9v4zm-9-2H5V7H3v10h2v-4h4v4h2V7H9v4z"})),v=(0,u.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,u.createElement)(d.Path,{d:"M9 11H5V7H3v10h2v-4h4v4h2V7H9v4zm11.7 1.2c-.2-.3-.5-.7-.8-.9-.3-.3-.7-.5-1.1-.6-.5-.1-.9-.2-1.4-.2-.2 0-.5.1-.7.1-.2.1-.5.1-.7.2l.1-1.9h4.3V7H14l-.3 5 1 .6.5-.2.4-.1c.1-.1.3-.1.4-.1h.5c.5 0 1 .1 1.4.4.4.2.6.7.6 1.1 0 .4-.2.8-.6 1.1-.4.3-.9.4-1.4.4-.4 0-.9-.1-1.3-.3-.4-.2-.7-.4-1.1-.7 0 0-1.1 1.4-1 1.5.5.4 1 .8 1.6 1 .7.3 1.5.4 2.3.4.5 0 1-.1 1.5-.3s.9-.4 1.3-.7c.4-.3.7-.7.9-1.1s.3-.9.3-1.4-.1-1-.3-1.4z"})),x=(0,u.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,u.createElement)(d.Path,{d:"M20.7 12.4c-.2-.3-.4-.6-.7-.9s-.6-.5-1-.6c-.4-.2-.8-.2-1.2-.2-.5 0-.9.1-1.3.3s-.8.5-1.2.8c0-.5 0-.9.2-1.4l.6-.9c.2-.2.5-.4.8-.5.6-.2 1.3-.2 1.9 0 .3.1.6.3.8.5 0 0 1.3-1.3 1.3-1.4-.4-.3-.9-.6-1.4-.8-.6-.2-1.3-.3-2-.3-.6 0-1.1.1-1.7.4-.5.2-1 .5-1.4.9-.4.4-.8 1-1 1.6-.3.7-.4 1.5-.4 2.3s.1 1.5.3 2.1c.2.6.6 1.1 1 1.5.4.4.9.7 1.4.9 1 .3 2 .3 3 0 .4-.1.8-.3 1.2-.6.3-.3.6-.6.8-1 .2-.5.3-.9.3-1.4s-.1-.9-.3-1.3zm-2 2.1c-.1.2-.3.4-.4.5-.1.1-.3.2-.5.2-.2.1-.4.1-.6.1-.2.1-.5 0-.7-.1-.2 0-.3-.2-.5-.3-.1-.2-.3-.4-.4-.6-.2-.3-.3-.7-.3-1 .3-.3.6-.5 1-.7.3-.1.7-.2 1-.2.4 0 .8.1 1.1.3.3.3.4.7.4 1.1 0 .2 0 .5-.1.7zM9 11H5V7H3v10h2v-4h4v4h2V7H9v4z"})),b=function(e){switch(e){case 2:default:return h;case 3:return p;case 4:return m;case 5:return v;case 6:return x}},f=function(t){var n=t.attributes,r=t.setAttributes,l=function(e){r({hstart:e})};return(0,e.jsx)(o.ToolbarDropdownMenu,{icon:b(n.hstart),label:"Select heading level",controls:[{title:"H2",isDisabled:2===n.hstart,onClick:function(){return l(2)}},{title:"H3",isDisabled:3===n.hstart,onClick:function(){return l(3)}},{title:"H4",isDisabled:4===n.hstart,onClick:function(){return l(4)}},{title:"H5",isDisabled:5===n.hstart,onClick:function(){return l(5)}},{title:"H6",isDisabled:6===n.hstart,onClick:function(){return l(6)}}]})},w=function(t){var n=t.attributes,r=t.setAttributes;return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(o.__experimentalToggleGroupControl,{label:(0,a.__)("Heading level","rrze-elements-b"),value:n.hstart,onChange:function(e){r({hstart:e})},isBlock:!0,children:[(0,e.jsx)(o.__experimentalToggleGroupControlOption,{value:2,label:"H2"}),(0,e.jsx)(o.__experimentalToggleGroupControlOption,{value:3,label:"H3"}),(0,e.jsx)(o.__experimentalToggleGroupControlOption,{value:4,label:"H4"}),(0,e.jsx)(o.__experimentalToggleGroupControlOption,{value:5,label:"H5"}),(0,e.jsx)(o.__experimentalToggleGroupControlOption,{value:6,label:"H6"})]}),(0,e.jsx)(o.__experimentalText,{children:(0,a.__)("Controls the heading level of the accordion","rrze-elements-b")}),(0,e.jsx)(o.__experimentalDivider,{})]})},g=function(t){var n=t.warning,r=t.min,l=t.max,s=t.count,i=t.status,c=t.className;return(null===l?s>=r:s>=r&&s<l)?(0,e.jsx)(o.Notice,{status:i,isDismissible:!1,className:c,children:(0,a.__)(n,"rrze-elements-b")}):null};function _(e){return function(e){if(Array.isArray(e))return j(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?j(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var k=function e(t){var n=_(t);return t.forEach((function(t){t.innerBlocks&&t.innerBlocks.length>0&&(n=[].concat(_(n),_(e(t.innerBlocks))))})),n},y=JSON.parse('{"u2":"rrze-elements/collapsibles"}');(0,t.registerBlockType)(y.u2,{icon:{src:(0,e.jsxs)("svg",{id:"Ebene_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:[(0,e.jsx)("g",{opacity:".5",children:(0,e.jsx)("rect",{x:"75.86",y:"131.85",width:"360.29",height:"142.31",fillRule:"evenodd",strokeWidth:"0"})}),(0,e.jsx)("path",{d:"m81.59,109.83h348.82c3.16,0,5.73,2.57,5.73,5.73v25.16H75.86v-25.16c0-3.16,2.57-5.73,5.73-5.73Z",fillRule:"evenodd",strokeWidth:"0"}),(0,e.jsx)("rect",{x:"75.86",y:"298.32",width:"360.28",height:"39.9",rx:"5.73",ry:"5.73",fillRule:"evenodd",strokeWidth:"0"}),(0,e.jsx)("rect",{x:"75.86",y:"362.27",width:"360.28",height:"39.9",rx:"5.73",ry:"5.73",fillRule:"evenodd",strokeWidth:"0"})]})},edit:function(t){var n=t.attributes,u=t.setAttributes,d=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(r=Object.getOwnPropertySymbols(e);l<r.length;l++)t.indexOf(r[l])<0&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(n[r[l]]=e[r[l]])}return n}(t,["attributes","setAttributes"]),h=(0,l.useBlockProps)(),p=(n.sameBlockCount,n.previousBlockIds,n.hstart,(0,i.useSelect)((function(e){var t=e("core/block-editor"),n=t.getBlock,r=t.getBlocks,l=t.getBlockIndex,o=d.clientId,s=r(o).length;r(o).forEach((function(e){0!==(null==e?void 0:e.innerBlocks.length)&&(null==e||e.innerBlocks.forEach((function(e){"rrze-elements/accordions"===(null==e?void 0:e.name)&&(s+=e.attributes.childrenCount)})))}));var i=l(o),a=r(),c=k(a).filter((function(e){return"rrze-elements/collapsibles"===e.name})).map((function(e){return e.clientId})),u=c.indexOf(o),h=c.slice(0,u);return{selectedBlock:n(o),numberChildren:s,blockIndex:i,previousBlockClients:h}}),[d.clientId])),m=(p.selectedBlock,p.numberChildren),v=(p.blockIndex,p.previousBlockClients);return(0,r.useEffect)((function(){n.childrenCount!==m&&u({childrenCount:m})}),[m,u,n.childrenCount]),(0,r.useEffect)((function(){(0,s.isEqual)(n.previousBlockIds,v)||u({previousBlockIds:v})}),[v,u,n.previousBlockClients]),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(g,{warning:(0,a.__)("For performance and User Experience reasons, we do not recommend using too many items in a collapsible.","rrze-elements-b"),min:10,max:20,count:n.childrenCount,status:"info",className:"accordion-notice"}),(0,e.jsx)(g,{warning:(0,a.__)("You have more than 20 items inside a collapsible. This can cause performance and User Experience issues.","rrze-elements-b"),min:20,max:50,count:n.childrenCount,status:"warning",className:"accordion-notice"}),(0,e.jsx)(g,{warning:(0,a.__)("Apparently you really love accordions. Great! But please don't use more than 20 items inside a collapsible. This can cause performance and User Experience issues.","rrze-elements-b"),min:30,max:null,count:n.childrenCount,status:"error",className:"accordion-notice"}),(0,e.jsxs)("div",Object.assign({},h,{children:[(0,e.jsx)(l.BlockControls,{controls:!0,children:(0,e.jsx)(f,{attributes:n,setAttributes:u})}),(0,e.jsxs)(l.InspectorControls,{children:[(0,e.jsx)(o.PanelBody,{title:(0,a.__)("Heading Settings","rrze-elements-b"),initialOpen:!0,children:(0,e.jsx)(w,{attributes:n,setAttributes:u})}),(0,e.jsx)(o.PanelBody,{title:(0,a.__)("Collapsibles Settings","rrze-elements-b"),initialOpen:!0,children:(0,e.jsx)(c,{attributes:n,setAttributes:u})})]}),(0,e.jsxs)("div",{className:"accordion",id:"accordion-",children:[n.expandAllLink&&(0,e.jsx)("div",{className:"button-container-right",children:(0,e.jsx)("button",{className:"expand-all standard-btn primary-btn xsmall-btn","data-status":"closed",children:(0,a.__)("Expand All","rrze-elements-b")})}),(0,e.jsx)(l.InnerBlocks,{allowedBlocks:["rrze-elements/collapse"],template:[["rrze-elements/collapse",{}],["rrze-elements/collapse",{}]]})]})]}))]})},save:function(t){var n=t.attributes,r=l.useBlockProps.save(),o=n.sameBlockCount,s=n.expandAllLink;return(0,e.jsxs)("div",Object.assign({},r,{children:[" ",(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)("div",{className:"accordion",id:"accordion-".concat(o),children:[s&&(0,e.jsx)("div",{className:"button-container-right",children:(0,e.jsx)("button",{className:"expand-all standard-btn primary-btn xsmall-btn","data-status":"closed",children:(0,a.__)("Expand All","rrze-elements-b")})}),(0,e.jsx)(l.InnerBlocks.Content,{})]})})]}))}})}()}();