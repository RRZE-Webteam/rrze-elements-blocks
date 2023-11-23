!function(){"use strict";var e={251:function(e,t,r){var n=r(196),a=Symbol.for("react.element"),l=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),s=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function o(e,t,r){var n,o={},c=null,u=null;for(n in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)l.call(t,n)&&!i.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===o[n]&&(o[n]=t[n]);return{$$typeof:a,type:e,key:c,ref:u,props:o,_owner:s.current}}t.jsx=o,t.jsxs=o},893:function(e,t,r){e.exports=r(251)},196:function(e){e.exports=window.React}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var l=t[n]={exports:{}};return e[n](l,l.exports,r),l.exports}!function(){var e=window.wp.blocks,t=r(893),n=window.wp.components,a=window.wp.blockEditor,l=window.wp.element,s=window.wp.i18n,i=window.wp.blob,o=window.wp.keycodes,c=r(196),u=window.wp.primitives,d=(0,c.createElement)(u.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,c.createElement)(u.Path,{d:"M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"})),h=(0,c.createElement)(u.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,c.createElement)(u.Path,{d:"M17.031 4.703 15.576 4l-1.56 3H14v.03l-2.324 4.47H9.5V13h1.396l-1.502 2.889h-.95a3.694 3.694 0 0 1 0-7.389H10V7H8.444a5.194 5.194 0 1 0 0 10.389h.17L7.5 19.53l1.416.719L15.049 8.5h.507a3.694 3.694 0 0 1 0 7.39H14v1.5h1.556a5.194 5.194 0 0 0 .273-10.383l1.202-2.304Z"})),m=window.wp.notices,f=window.wp.data,p=(0,c.createElement)(u.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,c.createElement)(u.Path,{d:"M20 5h-5.7c0-1.3-1-2.3-2.3-2.3S9.7 3.7 9.7 5H4v2h1.5v.3l1.7 11.1c.1 1 1 1.7 2 1.7h5.7c1 0 1.8-.7 2-1.7l1.7-11.1V7H20V5zm-3.2 2l-1.7 11.1c0 .1-.1.2-.3.2H9.1c-.1 0-.3-.1-.3-.2L7.2 7h9.6z"}));function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var x=function(e){var r,o,c=e.attributes,u=e.setAttributes,d=c.id,h=(c.alt,c.url),x=(0,f.useDispatch)(m.store).createErrorNotice,v=(r=(0,l.useState)(),o=2,function(e){if(Array.isArray(e))return e}(r)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,l,s,i=[],o=!0,c=!1;try{if(l=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;o=!1}else for(;!(o=(n=l.call(r)).done)&&(i.push(n.value),i.length!==t);o=!0);}catch(e){c=!0,a=e}finally{try{if(!o&&null!=r.return&&(s=r.return(),Object(s)!==s))return}finally{if(c)throw a}}return i}}(r,o)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?b(e,t):void 0}}(r,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),w=v[0],g=v[1];(0,l.useEffect)((function(){!d&&(0,i.isBlobURL)(h)&&u({url:void 0,id:void 0,alt:"",srcset:void 0})}),[]),(0,l.useEffect)((function(){(0,i.isBlobURL)(h)?g(h):((0,i.revokeBlobURL)(w),g(void 0))}),[h]);var y=function(){u({url:void 0,id:void 0,alt:void 0,srcset:void 0})};return(0,t.jsx)(a.BlockControls,{controls:!0,children:(0,t.jsxs)(n.ToolbarGroup,{children:[(0,t.jsx)(a.MediaReplaceFlow,{mediaId:d,mediaURL:h,allowedTypes:["image"],accept:"image/*,video/*",onError:function(e){x(e,{type:"snackbar"})},onSelect:function(e){e&&e.url?u({url:e.url,id:e.id,alt:e.alt}):u({url:void 0,id:void 0,alt:""})},useFeaturedImage:!1,name:h?(0,s.__)("Replace Image","rrze-elements-b"):(0,s.__)("Add Image","rrze-elements-b")}),h&&(0,t.jsx)(n.ToolbarItem,{children:function(){return(0,t.jsx)(n.ToolbarButton,{icon:p,label:(0,s.__)("Remove image","rrze-elements-b"),onClick:y})}})]})})};function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,l,s,i=[],o=!0,c=!1;try{if(l=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;o=!1}else for(;!(o=(n=l.call(r)).done)&&(i.push(n.value),i.length!==t);o=!0);}catch(e){c=!0,a=e}finally{try{if(!o&&null!=r.return&&(s=r.return(),Object(s)!==s))return}finally{if(c)throw a}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return w(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?w(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var g=JSON.parse('{"u2":"rrze-elements/cta"}');(0,e.registerBlockType)(g.u2,{example:{attributes:{message:"Accordion"}},icon:{src:React.createElement("svg",{id:"Ebene_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},React.createElement("rect",{x:"75.86",y:"175.02",width:"360.28",height:"160.43",rx:"5.73",ry:"5.73",fill:"#evenodd",strokeWidth:"0"}),React.createElement("rect",{x:"90.94",y:"189.82",width:"162.03",height:"29.53",rx:"5.73",ry:"5.73",fill:"#fff",strokeWidth:"0"}),React.createElement("rect",{x:"90.94",y:"229.35",width:"162.03",height:"12.53",rx:"5.73",ry:"5.73",fill:"#fff",strokeWidth:"0"}),React.createElement("rect",{x:"264.87",y:"295.98",width:"162.03",height:"27.41",rx:"5.73",ry:"5.73",fill:"#fff",strokeWidth:"0"}))},edit:function(e){e.blockProps;var r=e.attributes,c=e.setAttributes,u=e.isSelected,m=(0,a.useBlockProps)(),f=r.id,p=r.url,b=r.alt,w=r.srcset,g=r.title,y=r.subtitle,j=r.buttonText,_=r.buttonUrl,S=(r.target,r.background),N=r.isSearch,k=v((0,l.useState)(null),2),z=k[0],C=k[1],A=v((0,l.useState)(!1),2),E=A[0],T=A[1],B=!!_,R=p?"has-image":"no-image",O=function(){c({buttonUrl:void 0}),T(!1)};return(0,l.useEffect)((function(){if(m.className){var e=function(e){return-1!==m.className.indexOf(e)};e("is-style-no-background")?c({background:""}):e("is-style-small")?c({background:"bg-1 style-small"}):c({background:"bg-1"})}}),[m.className]),(0,l.useEffect)((function(){u||T(!1)}),[u]),(0,t.jsxs)("div",Object.assign({},m,{children:[(0,t.jsxs)(a.BlockControls,{controls:!0,children:[(0,t.jsx)(x,{attributes:{id:f,url:p,alt:b,srcset:w},setAttributes:c}),(0,t.jsxs)(n.ToolbarGroup,{children:[!B&&(0,t.jsx)(n.ToolbarButton,{label:"link",icon:d,title:(0,s.__)("Link"),shortcut:o.displayShortcut.primary("k"),onClick:function(){T(!0)}}),B&&(0,t.jsx)(n.ToolbarButton,{label:"link",icon:h,title:(0,s.__)("Unlink"),shortcut:o.displayShortcut.primaryShift("k"),onClick:O,isActive:!0})]})]}),(0,t.jsx)(a.InspectorControls,{children:(0,t.jsx)(n.PanelBody,{title:(0,s.__)("Advanced Options","rrze-elements-b"),initialOpen:!0,children:(0,t.jsx)(n.CheckboxControl,{label:(0,s.__)("Display Search box instead of CTA","rrze-elements-b"),checked:r.isSearch,onChange:function(){c({isSearch:!r.isSearch})}})})}),u&&(E||B)&&(0,t.jsx)(n.Popover,{placement:"bottom",onClose:function(){},anchor:z,focusOnMount:!!E&&"firstElement",__unstableSlotName:"__unstable-block-tools-after",shift:!0,children:(0,t.jsx)(a.__experimentalLinkControl,{value:{url:_},onChange:function(e){(null==e?void 0:e.opensInNewTab)&&c({target:"_blank"}),c({buttonUrl:null==e?void 0:e.url})},onRemove:O})}),(0,t.jsxs)("div",{className:"rrze-elements-cta ".concat(R," ").concat(S),children:[(0,t.jsxs)("div",{className:"cta-content",children:[(0,t.jsx)(a.RichText,{tagName:"span",value:g,onChange:function(e){c({title:e})},placeholder:(0,s.__)("CTA Title","rrze-elements-b"),allowedFormats:[],className:"cta-title"}),(0,t.jsx)(a.RichText,{tagName:"span",value:y,onChange:function(e){c({subtitle:e})},placeholder:(0,s.__)("CTA Subtitle","rrze-elements-b"),allowedFormats:[],className:"cta-subtitle"})]}),p&&(0,t.jsxs)("div",{className:"cta-image ".concat((0,i.isBlobURL)(p)?" is-loading":""),children:[(0,t.jsx)("img",{src:p,className:"attachment-large size-large",alt:b}),(0,i.isBlobURL)(p)&&(0,t.jsx)(n.Spinner,{})]}),!N&&(0,t.jsx)("div",{className:"cta-button-container",children:(0,t.jsxs)("a",{ref:C,href:"#",className:"btn cta-button",children:[(0,t.jsx)(a.RichText,{tagName:"span",value:j,onChange:function(e){c({buttonText:e})},placeholder:(0,s.__)("CTA Button Text","rrze-elements-b"),allowedFormats:[],className:"cta-button-text"})," ",(0,t.jsx)(n.SVG,{height:"1em",width:"1em",className:"rrze-elements-icon","aria-hidden":"true",focusable:"false",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",style:{fill:"currentcolor",fontSize:"2em",marginLeft:"1em"},children:(0,t.jsx)(n.Path,{d:"M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"})})]})}),N&&(0,t.jsx)("div",{className:"cta-search-container",children:(0,t.jsxs)("form",{itemProp:"potentialAction",itemType:"https://schema.org/SearchAction",role:"search","aria-label":"Search on /",method:"get",className:"cta-search searchform",action:"/",children:[(0,t.jsx)("label",{htmlFor:"cta_search_442333",children:(0,s.__)("Please enter the search term for searching on /:","rrze-elements-b")}),(0,t.jsx)("meta",{itemProp:"target",content:"/?s={s}"}),(0,t.jsx)("input",{itemProp:"query-input",id:"442333",type:"text",value:"",name:"s",placeholder:(0,s.__)("Search for...","rrze-elements-b"),required:!0}),(0,t.jsxs)("button",{ref:C,type:"submit",value:"",children:[(0,t.jsx)("svg",{height:"1em",width:"1em",className:"rrze-elements-icon",style:{fill:"currentcolor",fontSize:"2em",marginLeft:"1em"},"aria-hidden":"true",focusable:"false",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:(0,t.jsx)("path",{d:"M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"})}),(0,t.jsx)("span",{className:"sr-only",children:(0,s.__)("Find","rrze-elements-b")})]})]})})]})]}))},save:function(e){var r=e.attributes,n=a.useBlockProps.save(),l=r.id,i=r.alt,o=r.url,c=r.title,u=r.subtitle,d=r.buttonText,h=r.buttonUrl,m=r.background,f=r.isSearch,p="has-image";return o||(p="no-image"),(0,t.jsxs)("div",Object.assign({},n,{children:[!f&&(0,t.jsxs)("div",{className:"rrze-elements-cta ".concat(p," ").concat(m),children:[(0,t.jsxs)("div",{className:"cta-content",children:[(0,t.jsx)("span",{className:"cta-title",children:c}),(0,t.jsx)("span",{className:"cta-subtitle",children:u})]}),o&&(0,t.jsx)("div",{className:"cta-image",children:(0,t.jsx)("img",{src:o,className:l?"wp-image-".concat(l):null,alt:i,decoding:"async"})}),(0,t.jsx)("div",{className:"cta-button-container",children:(0,t.jsxs)("a",{href:function(e){return(null==e?void 0:e.startsWith("www."))?"https://"+e:(null==e?void 0:e.startsWith("http://"))?e.replace("http://","https://"):e}(h),className:"btn cta-button",children:[d,(0,t.jsx)("svg",{height:"1em",width:"1em",className:"rrze-elements-icon","aria-hidden":"true",focusable:"false",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",style:{fill:"currentcolor",fontSize:"2em",marginLeft:"1em"},children:(0,t.jsx)("path",{d:"M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"})})]})})]}),f&&(0,t.jsxs)("div",{className:"rrze-elements-cta  ".concat(p," ").concat(m),children:[(0,t.jsxs)("div",{className:"cta-content",children:[(0,t.jsx)("span",{className:"cta-title",children:c}),(0,t.jsx)("span",{className:"cta-subtitle",children:u})]}),o&&(0,t.jsx)("div",{className:"cta-image",children:(0,t.jsx)("img",{src:o,className:l?"wp-image-".concat(l):null,alt:i,decoding:"async"})}),(0,t.jsx)("div",{className:"cta-search-container",children:(0,t.jsxs)("form",{itemProp:"potentialAction",itemType:"https://schema.org/SearchAction",role:"search","aria-label":(0,s.__)("Search on ","rrze-elements-b"),method:"get",className:"cta-search searchform",action:"/",children:[(0,t.jsx)("label",{htmlFor:"cta_search_442333",children:(0,s.__)("Please enter the search term for searching on /: ","rrze-elements-b")}),(0,t.jsx)("meta",{itemProp:"target",content:"/?s={s}"}),(0,t.jsx)("input",{itemProp:"query-input",id:"442333",type:"text",value:"",name:"s",placeholder:(0,s.__)("Search for…","rrze-elements-b"),required:!0}),(0,t.jsxs)("button",{type:"submit",enterkeyhint:"search",value:"",children:[(0,t.jsx)("svg",{height:"1em",width:"1em",className:"rrze-elements-icon",style:{fill:"currentcolor",fontSize:"2em",marginLeft:"1em"},"aria-hidden":"true",focusable:"false",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:(0,t.jsx)("path",{d:"M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"})}),(0,t.jsx)("span",{className:"sr-only",children:"Find"})]})]})})]})]}))}})}()}();