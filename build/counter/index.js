!function(){"use strict";var e=window.ReactJSXRuntime,t=window.wp.blocks,n=window.wp.blockEditor,r=window.wp.components,o=window.wp.primitives,l=(0,e.jsx)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,e.jsx)(o.Path,{d:"M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"})}),i=(0,e.jsx)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,e.jsx)(o.Path,{d:"M17.031 4.703 15.576 4l-1.56 3H14v.03l-2.324 4.47H9.5V13h1.396l-1.502 2.889h-.95a3.694 3.694 0 0 1 0-7.389H10V7H8.444a5.194 5.194 0 1 0 0 10.389h.17L7.5 19.53l1.416.719L15.049 8.5h.507a3.694 3.694 0 0 1 0 7.39H14v1.5h1.556a5.194 5.194 0 0 0 .273-10.383l1.202-2.304Z"})}),s=window.wp.keycodes,a=window.wp.i18n,c=window.wp.element;function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,l,i,s=[],a=!0,c=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=l.call(n)).done)&&(s.push(r.value),s.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{if(!a&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(c)throw o}}return s}}(e,t)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var h=JSON.parse('{"UU":"rrze-elements/rrze-counter"}');(0,t.registerBlockType)(h.UU,{icon:{src:(0,e.jsxs)("svg",{id:"a",xmlns:"http://www.w3.org/2000/svg",width:"512",height:"512",viewBox:"0 0 512 512",children:[(0,e.jsx)("rect",{x:"104.12",y:"265.52",width:"228.59",height:"11.8",rx:"5.73",ry:"5.73",fill:"evenodd"}),(0,e.jsx)("rect",{x:"104.12",y:"227.37",width:"201.21",height:"22.11",rx:"5.73",ry:"5.73",fill:"evenodd"}),(0,e.jsx)("g",{opacity:".2",children:(0,e.jsx)("rect",{x:"59.99",y:"210.12",width:"383.11",height:"91.77",rx:"5.73",ry:"5.73",fill:"evenodd"})})]})},__experimentalLabel:function(e,t){var n=t.context,r=e.title;if("list-view"===n&&r)return r},edit:function(t){t.blockProps;var o=t.attributes,d=t.setAttributes,h=t.isSelected,m=(0,n.useBlockProps)(),x=o.buttonUrl,f=u((0,c.useState)(null),2),b=f[0],p=f[1],w=u((0,c.useState)(!1),2),v=w[0],g=w[1],j=!!x,y=function(){d({buttonUrl:void 0}),g(!1)};return(0,c.useEffect)((function(){h||g(!1)}),[h]),(0,e.jsxs)("div",Object.assign({},m,{children:[(0,e.jsx)(n.BlockControls,{children:(0,e.jsxs)(r.ToolbarGroup,{children:[!j&&(0,e.jsx)(r.ToolbarButton,{label:"link",icon:l,title:(0,a.__)("Link","rrze-elements-blocks"),shortcut:s.displayShortcut.primary("k"),onClick:function(){g(!0)}}),j&&(0,e.jsx)(r.ToolbarButton,{label:"link",icon:i,title:(0,a.__)("Unlink","rrze-elements-blocks"),shortcut:s.displayShortcut.primaryShift("k"),onClick:y,isActive:!0})]})}),(0,e.jsx)(n.InspectorControls,{children:(0,e.jsx)(r.PanelBody,{title:(0,a.__)("Font Size","rrze-elements-blocks"),children:(0,e.jsx)(r.FontSizePicker,{disableCustomFontSizes:!0,fontSizes:[{name:"".concat((0,a.__)("Small","rrze-elements-blocks")),size:"normal",slug:"small"},{name:"".concat((0,a.__)("Normal","rrze-elements-blocks")),size:"medium",slug:"normal"},{name:"".concat((0,a.__)("Big","rrze-elements-blocks")),size:"large",slug:"big"}],onChange:function(e){return d({fontSize:e})},units:["px","em","rem"],value:16})})}),h&&(v||j)&&(0,e.jsx)(r.Popover,{placement:"bottom",onClose:function(){},anchor:b,focusOnMount:!!v&&"firstElement",__unstableSlotName:"__unstable-block-tools-after",shift:!0,children:(0,e.jsx)(n.__experimentalLinkControl,{value:{url:x},onChange:function(e){(null==e?void 0:e.opensInNewTab)&&d({target:"_blank"}),d({buttonUrl:null==e?void 0:e.url})},onRemove:y})}),(0,e.jsx)("div",{className:"rrze--counter-element-container",children:(0,e.jsxs)("dl",{className:"rrze-elements-counter",children:[(0,e.jsxs)("dt",{children:[h&&(0,e.jsx)(n.RichText,{tagName:"span",value:o.title.toString(),onChange:function(e){isNaN(parseInt(e))||d({title:parseInt(e)})},allowedFormats:[],className:"fau-counter-editor-data rrze-counter-".concat(o.fontSize||"large"," ")}),!h&&(0,e.jsx)("span",{className:"fau-counter-data rrze-counter-".concat(o.fontSize||"large"," "),children:o.title.toString()})]}),(0,e.jsxs)("dd",{children:[(0,e.jsx)(n.RichText,{tagName:"span",value:o.description,onChange:function(e){return d({description:e})},placeholder:(0,a.__)("Description","rrze-elements-blocks"),allowedFormats:[]}),(0,e.jsx)("br",{}),j&&(0,e.jsx)("a",{className:"standard-btn ghost-btn",children:(0,e.jsx)(n.RichText,{tagName:"span",value:o.buttonText,onChange:function(e){return d({buttonText:e})},allowedFormats:[],ref:p,placeholder:(0,a.__)("Button Text","rrze-elements-blocks")})})]})]})})]}))},save:function(t){var r=t.attributes,o=n.useBlockProps.save();return(0,e.jsx)("div",Object.assign({},o,{children:(0,e.jsx)("div",{className:"rrze--counter-element-container",children:(0,e.jsxs)("dl",{className:"rrze-elements-counter",children:[(0,e.jsx)("dt",{children:(0,e.jsx)("span",{className:"fau-counter-data rrze-counter-".concat(r.fontSize||"large"," "),"data-duration":r.duration,"data-stagger":r.stagger,children:r.title})}),(0,e.jsxs)("dd",{children:[r.description,(0,e.jsx)("br",{}),r.buttonUrl&&(0,e.jsx)("a",{className:"standard-btn ghost-btn",href:r.buttonUrl,"data-wpel-link":"internal",children:r.buttonText})]})]})})}))}})}();