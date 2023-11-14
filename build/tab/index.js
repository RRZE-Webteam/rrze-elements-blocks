!function(){"use strict";var e,t={921:function(e,t,r){var n=window.wp.blocks,i=r(893),o=window.wp.blockEditor,l=r(609),s=r(736),a=r(307),c=r(376),u=r(508);function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,o,l,s=[],a=!0,c=!1;try{if(o=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;a=!1}else for(;!(a=(n=o.call(r)).done)&&(s.push(n.value),s.length!==t);a=!0);}catch(e){c=!0,i=e}finally{try{if(!a&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(c)throw i}}return s}}(e,t)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?d(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var f=(0,i.jsx)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",height:"1em",viewBox:"0 0 512 512",children:(0,i.jsx)(l.Path,{d:"M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"})}),m=function(e){var t,r=e.attributes,n=e.setAttributes,o=b((0,a.useState)(!1),2),c=o[0],d=o[1],m=function(){return d(!1)},h=b((null===(t=r.icon)||void 0===t?void 0:t.split(" "))||[],2),v=h[0],p=h[1];return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l.ToolbarButton,{icon:f,label:""===r.title?(0,s.__)("Add an Label","rrze-elements-b"):(0,s.__)("Change the Label","rrze-elements-b"),onClick:function(){return d(!0)}}),c&&(0,i.jsx)(l.Modal,{title:(0,s.__)("Change the Tab Label","rrze-elements-b"),onRequestClose:m,children:(0,i.jsxs)("div",{children:[r.icon&&(0,i.jsx)(u.e,{type:v,iconName:p,attributes:{directory:r.directory,icon:r.icon,svgString:r.svgString},setAttributes:n}),(0,i.jsx)(l.TextControl,{value:r.title,onChange:function(e){n(""===e?{title:" "}:{title:e})},placeholder:(0,s.__)("Enter your Tab Label","rrze-elements-b"),className:"elements-blocks-input-following-icon"}),(0,i.jsx)(l.Button,{variant:"primary",onClick:m,children:(0,s.__)("Close","rrze-elements-b")})]})})]})},h=function(e){var t,r=e.attributes,n=e.setAttributes,o=b((null===(t=r.icon)||void 0===t?void 0:t.split(" "))||[],2),a=o[0],c=o[1];return(0,i.jsx)(l.Placeholder,{icon:f,instructions:"Enter your Tab title. You can change it later through the block settings inside the Toolbar.",label:(0,s.__)("Tab Label Settings","rrze-elements-b"),children:(0,i.jsxs)("div",{className:"rrze-elements-tabs-modal-container",children:[r.icon&&(0,i.jsx)(u.e,{type:a,iconName:c,attributes:{directory:r.directory,icon:r.icon,svgString:r.svgString},defaultClass:"elements-tabs-icon-modal",setAttributes:n}),(0,i.jsx)(l.TextControl,{value:r.title,onChange:function(e){n(""===e?{title:" "}:{title:e})},placeholder:(0,s.__)("Enter your Tab Label","rrze-elements-b"),className:"elements-tabs-icon-modal-input"}),(0,i.jsx)(l.Button,{variant:"primary",onClick:function(){n({labelSettings:!r.labelSettings})},children:(0,s.__)("Hide Label settings","rrze-elements-b")})]})})},v=function(e){var t=e.attributes,r=e.setAttributes;return(0,i.jsxs)(l.PanelBody,{title:(0,s.__)("Label settings","rrze-elements-b"),initialOpen:!0,children:[(0,i.jsx)(l.__experimentalSpacer,{children:(0,i.jsx)(l.__experimentalText,{children:(0,s.__)("Enter your Tab Label.","rrze-elements-b")})}),(0,i.jsx)(l.TextControl,{value:t.title,onChange:function(e){r(""===e?{title:" "}:{title:e})},placeholder:(0,s.__)("Enter your Tab Label","rrze-elements-b"),className:"elements-blocks-input-following-icon"})]})},p=function(e){var t=e.attributes,r=e.setAttributes;return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)(o.InspectorControls,{children:[(0,i.jsx)(v,{attributes:{title:t.title},setAttributes:r}),(0,i.jsx)(l.PanelBody,{title:(0,s.__)("Icon Settings","rrze-elements-b"),children:(0,i.jsx)(u.$,{attributes:{directory:t.directory,icon:t.icon,svgString:t.svgString},setAttributes:r})})]})})};function g(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,o,l,s=[],a=!0,c=!1;try{if(o=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;a=!1}else for(;!(a=(n=o.call(r)).done)&&(s.push(n.value),s.length!==t);a=!0);}catch(e){c=!0,i=e}finally{try{if(!a&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(c)throw i}}return s}}(e,t)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?y(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var x=JSON.parse('{"u2":"rrze-elements/tab"}');(0,n.registerBlockType)(x.u2,{example:{attributes:{message:"Accordion"}},icon:{src:"minus",background:"#00458c"},__experimentalLabel:function(e,t){var r=t.context,n=e.title;if("list-view"===r&&n)return n},edit:function(e){e.blockProps;var t=e.attributes,r=e.setAttributes,n=(e.clientId,e.context),b=(0,o.useBlockProps)(),d=b["data-block"],f=t.icon,v=t.active||t.xray?"":"is-hidden",y=g((0,a.useState)(!1),2),x=y[0],j=y[1],_=g((0,a.useState)(""),2),w=(_[0],_[1]);(0,a.useEffect)((function(){t.tabsUid!==n["rrze-elements/tabs-uid"]&&r({tabsUid:n["rrze-elements/tabs-uid"]})}),[t.tabsUid,n["rrze-elements/tabs-uid"]]),(0,a.useEffect)((function(){t.blockId!==d&&r({blockId:d})}),[t.blockId,d]),(0,a.useEffect)((function(){""===n["rrze-elements/tabs-active"]?r({active:!0}):n["rrze-elements/tabs-active"]!==d?r({active:!1}):r({active:!0})}),[t.active,n["rrze-elements/tabs-active"]]),(0,a.useEffect)((function(){r({xray:n["rrze-elements/tabs-xray"]})}),[t.active,n["rrze-elements/tabs-xray"]]),(0,a.useEffect)((function(){fetch("/wp-json/rrze-elements-blocks/v1/plugin-directory").then((function(e){if(!e.ok)throw new Error("Network response was not ok");return e.json()})).then((function(e){w(e.directory),r({directory:e.directory})})).catch((function(e){console.error("There was a problem fetching the directory:",e)}))}),[]);var S=function(){return j(!0)},k=function(){return j(!1)};return(0,i.jsxs)("div",Object.assign({},b,{children:[(0,i.jsx)(p,{attributes:{title:t.title,icon:t.icon,directory:t.directory,svgString:t.svgString},setAttributes:r}),(0,i.jsxs)(o.BlockControls,{children:[(0,i.jsx)(m,{attributes:{labelSettings:t.labelSettings,title:t.title},setAttributes:r}),(0,i.jsx)(l.ToolbarGroup,{children:(0,i.jsx)(l.ToolbarItem,{children:function(){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l.ToolbarButton,{icon:c.Z,label:""===f?(0,s.__)("Add an icon","rrze-elements-b"):(0,s.__)("Change the icon","rrze-elements-b"),onClick:S}),x&&(0,i.jsxs)(l.Modal,{title:(0,s.__)("Select an Icon","rrze-elements-b"),onRequestClose:k,children:[(0,i.jsx)(u.$,{attributes:{directory:t.directory,icon:t.icon,svgString:t.svgString},setAttributes:r}),(0,i.jsx)(l.Button,{variant:"primary",onClick:k,children:(0,s.__)("Close","rrze-elements-b")})]})]})}})})]}),(0,i.jsxs)("div",{id:d,role:"tabpanel","aria-labelledby":d,className:v,children:[(0,i.jsx)("h2",{className:"print-only",children:t.title}),t.labelSettings&&(0,i.jsx)(h,{attributes:{title:t.title,labelSettings:t.labelSettings,directory:t.directory,svgString:t.svgString,icon:t.icon},setAttributes:r}),(0,i.jsx)(o.InnerBlocks,{template:[["core/paragraph",{placeholder:(0,s.__)("Click here and press / to enter content inside your Tab","rrze-blocks-b")}]]})]})]}))},save:function(e){var t=e.attributes,r=o.useBlockProps.save(),n=t.tabsUid,l=t.blockId.slice(0,10);return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",Object.assign({id:"tab-".concat(n,"_tabpanel_tab-label-").concat(l),role:"tabpanel","aria-labelledby":"".concat(l),className:""},r,{children:[(0,i.jsx)("h2",{className:"print-only",children:t.title}),(0,i.jsx)(o.InnerBlocks.Content,{})]}))})}})},196:function(e){e.exports=window.React},609:function(e){e.exports=window.wp.components},307:function(e){e.exports=window.wp.element},736:function(e){e.exports=window.wp.i18n},444:function(e){e.exports=window.wp.primitives}},r={};function n(e){var i=r[e];if(void 0!==i)return i.exports;var o=r[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=function(t,r,i,o){if(!r){var l=1/0;for(u=0;u<e.length;u++){r=e[u][0],i=e[u][1],o=e[u][2];for(var s=!0,a=0;a<r.length;a++)(!1&o||l>=o)&&Object.keys(n.O).every((function(e){return n.O[e](r[a])}))?r.splice(a--,1):(s=!1,o<l&&(l=o));if(s){e.splice(u--,1);var c=i();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,i,o]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={767:0,59:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var i,o,l=r[0],s=r[1],a=r[2],c=0;if(l.some((function(t){return 0!==e[t]}))){for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(a)var u=a(n)}for(t&&t(r);c<l.length;c++)o=l[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},r=self.webpackChunkrrze_elements=self.webpackChunkrrze_elements||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var i=n.O(void 0,[59,479],(function(){return n(921)}));i=n.O(i)}();