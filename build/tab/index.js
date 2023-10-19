!function(){"use strict";var e,t,r,n,s,i,l,a,c,o,b={75251:function(e,t,r){var n=r(99196),s=Symbol.for("react.element"),i=Symbol.for("react.fragment"),l=Object.prototype.hasOwnProperty,a=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function o(e,t,r){var n,i={},o=null,b=null;for(n in void 0!==r&&(o=""+r),void 0!==t.key&&(o=""+t.key),void 0!==t.ref&&(b=t.ref),t)l.call(t,n)&&!c.hasOwnProperty(n)&&(i[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===i[n]&&(i[n]=t[n]);return{$$typeof:s,type:e,key:o,ref:b,props:i,_owner:a.current}}t.Fragment=i,t.jsx=o,t.jsxs=o},85893:function(e,t,r){e.exports=r(75251)},99196:function(e){e.exports=window.React}},u={};e=window.wp.blocks,t=function e(t){var r=u[t];if(void 0!==r)return r.exports;var n=u[t]={exports:{}};return b[t](n,n.exports,e),n.exports}(85893),r=window.wp.blockEditor,n=window.wp.i18n,s=window.wp.element,i=window.wp.components,l=(0,t.jsx)(i.SVG,{xmlns:"http://www.w3.org/2000/svg",height:"1em",viewBox:"0 0 512 512",children:(0,t.jsx)(i.Path,{d:"M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"})}),a=function(e){var r=e.attributes,s=e.setAttributes,a=(r.labelSettings,function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"none";return(0,t.jsx)(i.SVG,{xmlns:"http://www.w3.org/2000/svg",height:"1em",viewBox:"0 0 512 512",children:(0,t.jsx)(i.Path,{fill:e,d:"M0 64C0 46.3 14.3 32 32 32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32V416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V96C14.3 96 0 81.7 0 64zM256 96c-8.8 0-16 7.2-16 16v32H160c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v48H128c-8.8 0-16 7.2-16 16s7.2 16 16 16H240v70.6L189.1 307c-5.2-2-10.6-3-16.2-3h-2.1c-23.6 0-42.8 19.2-42.8 42.8c0 9.6 3.2 18.9 9.1 26.4l18.2 23.2c9.7 12.4 24.6 19.6 40.3 19.6H316.4c15.7 0 30.6-7.2 40.3-19.6l18.2-23.2c5.9-7.5 9.1-16.8 9.1-26.4c0-23.6-19.2-42.8-42.8-42.8H339c-5.5 0-11 1-16.2 3L272 326.6V256H384c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V176h80c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V112c0-8.8-7.2-16-16-16zM208 352a16 16 0 1 1 0 32 16 16 0 1 1 0-32zm80 16a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"})})});return a("#D3D3D3"),a("#000"),(0,t.jsx)(i.ToolbarGroup,{children:(0,t.jsx)(i.ToolbarButton,{label:(0,n.__)("Show / Hide Label Settings","rrze-elements-b"),onClick:function(){s({labelSettings:!r.labelSettings})},icon:l})})},c=function(e){var r=e.attributes,s=e.setAttributes;return(0,t.jsx)(i.Placeholder,{icon:l,instructions:"Enter your Tab title. You can change it later through the block settings inside the Toolbar.",label:(0,n.__)("Tab Label Settings","rrze-elements-b"),children:(0,t.jsxs)("div",{children:[(0,t.jsx)(i.TextControl,{value:r.title,onChange:function(e){s(""===e?{title:" "}:{title:e})},placeholder:(0,n.__)("Enter your Tab Label","rrze-elements-b")}),(0,t.jsx)(i.Button,{variant:"primary",onClick:function(){s({labelSettings:!r.labelSettings})},children:(0,n.__)("Hide Label settings","rrze-elements-b")})]})})},o=JSON.parse('{"u2":"rrze-elements/tab"}'),(0,e.registerBlockType)(o.u2,{example:{attributes:{message:"Accordion"}},icon:{src:"minus",background:"#00458c"},__experimentalLabel:function(e,t){var r=t.context,n=e.title;if("list-view"===r&&n)return n},edit:function(e){e.blockProps;var i=e.attributes,l=e.setAttributes,o=(e.clientId,e.context),b=(0,r.useBlockProps)(),u=b["data-block"];i.title,(0,s.useEffect)((function(){""===o["rrze-elements/tabs-active"]?l({active:!0}):o["rrze-elements/tabs-active"]!==u?l({active:!1}):l({active:!0})}),[i.active,o["rrze-elements/tabs-active"]]),(0,s.useEffect)((function(){l({xray:o["rrze-elements/tabs-xray"]})}),[i.active,o["rrze-elements/tabs-xray"]]),i.color,i.icon;var d=i.active||i.xray?"":"is-hidden";return console.log(i),(0,t.jsxs)("div",Object.assign({},b,{children:[(0,t.jsx)(r.BlockControls,{children:(0,t.jsx)(a,{attributes:{labelSettings:i.labelSettings},setAttributes:l})}),(0,t.jsxs)("div",{id:u,role:"tabpanel","aria-labelledby":u,className:d,children:[(0,t.jsx)("h2",{className:"print-only",children:i.title}),i.labelSettings&&(0,t.jsx)(c,{attributes:{title:i.title,labelSettings:i.labelSettings},setAttributes:l}),(0,t.jsx)(r.InnerBlocks,{template:[["core/paragraph",{placeholder:(0,n.__)("Click here and press / to enter content inside your Tab","rrze-blocks-b")}]]})]})]}))},save:function(e){e.attributes;var n=r.useBlockProps.save();return(0,t.jsxs)("div",Object.assign({},n,{children:[" ",(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("div",{id:"tab-1_tabpanel_reiter-1",role:"tabpanel","aria-labelledby":"tab-1_reiter-1",className:"",children:[(0,t.jsx)("h2",{className:"print-only",children:"Reiter 1"}),(0,t.jsx)(r.InnerBlocks.Content,{})]})})]}))}})}();