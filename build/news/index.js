!function(){"use strict";var e={251:function(e,t,n){var r=n(196),o=Symbol.for("react.element"),l=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,s=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,l={},c=null,u=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)i.call(t,r)&&!a.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===l[r]&&(l[r]=t[r]);return{$$typeof:o,type:e,key:c,ref:u,props:l,_owner:s.current}}t.Fragment=l,t.jsx=c,t.jsxs=c},893:function(e,t,n){e.exports=n(251)},196:function(e){e.exports=window.React}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var l=t[r]={exports:{}};return e[r](l,l.exports,n),l.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e=n(893),t=window.wp.blocks,r=window.wp.blockEditor,o=window.wp.i18n,l=window.wp.components,i=n(196),s=window.wp.primitives,a=(0,i.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,i.createElement)(s.Path,{d:"M9 11.1H5v-4H3v10h2v-4h4v4h2v-10H9v4zm8 4c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6v1.5h8v-2H17z"})),c=(0,i.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,i.createElement)(s.Path,{d:"M9 11H5V7H3v10h2v-4h4v4h2V7H9v4zm11.3 1.7c-.4-.4-1-.7-1.6-.8v-.1c.6-.2 1.1-.5 1.5-.9.3-.4.5-.8.5-1.3 0-.4-.1-.8-.3-1.1-.2-.3-.5-.6-.8-.8-.4-.2-.8-.4-1.2-.5-.6-.1-1.1-.2-1.6-.2-.6 0-1.3.1-1.8.3s-1.1.5-1.6.9l1.2 1.4c.4-.2.7-.4 1.1-.6.3-.2.7-.3 1.1-.3.4 0 .8.1 1.1.3.3.2.4.5.4.8 0 .4-.2.7-.6.9-.7.3-1.5.5-2.2.4v1.6c.5 0 1 0 1.5.1.3.1.7.2 1 .3.2.1.4.2.5.4s.1.4.1.6c0 .3-.2.7-.5.8-.4.2-.9.3-1.4.3s-1-.1-1.4-.3c-.4-.2-.8-.4-1.2-.7L13 15.6c.5.4 1 .8 1.6 1 .7.3 1.5.4 2.3.4.6 0 1.1-.1 1.6-.2.4-.1.9-.2 1.3-.5.4-.2.7-.5.9-.9.2-.4.3-.8.3-1.2 0-.6-.3-1.1-.7-1.5z"})),u=(0,i.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,i.createElement)(s.Path,{d:"M20 13V7h-3l-4 6v2h5v2h2v-2h1v-2h-1zm-2 0h-2.8L18 9v4zm-9-2H5V7H3v10h2v-4h4v4h2V7H9v4z"})),h=(0,i.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,i.createElement)(s.Path,{d:"M9 11H5V7H3v10h2v-4h4v4h2V7H9v4zm11.7 1.2c-.2-.3-.5-.7-.8-.9-.3-.3-.7-.5-1.1-.6-.5-.1-.9-.2-1.4-.2-.2 0-.5.1-.7.1-.2.1-.5.1-.7.2l.1-1.9h4.3V7H14l-.3 5 1 .6.5-.2.4-.1c.1-.1.3-.1.4-.1h.5c.5 0 1 .1 1.4.4.4.2.6.7.6 1.1 0 .4-.2.8-.6 1.1-.4.3-.9.4-1.4.4-.4 0-.9-.1-1.3-.3-.4-.2-.7-.4-1.1-.7 0 0-1.1 1.4-1 1.5.5.4 1 .8 1.6 1 .7.3 1.5.4 2.3.4.5 0 1-.1 1.5-.3s.9-.4 1.3-.7c.4-.3.7-.7.9-1.1s.3-.9.3-1.4-.1-1-.3-1.4z"})),d=(0,i.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,i.createElement)(s.Path,{d:"M20.7 12.4c-.2-.3-.4-.6-.7-.9s-.6-.5-1-.6c-.4-.2-.8-.2-1.2-.2-.5 0-.9.1-1.3.3s-.8.5-1.2.8c0-.5 0-.9.2-1.4l.6-.9c.2-.2.5-.4.8-.5.6-.2 1.3-.2 1.9 0 .3.1.6.3.8.5 0 0 1.3-1.3 1.3-1.4-.4-.3-.9-.6-1.4-.8-.6-.2-1.3-.3-2-.3-.6 0-1.1.1-1.7.4-.5.2-1 .5-1.4.9-.4.4-.8 1-1 1.6-.3.7-.4 1.5-.4 2.3s.1 1.5.3 2.1c.2.6.6 1.1 1 1.5.4.4.9.7 1.4.9 1 .3 2 .3 3 0 .4-.1.8-.3 1.2-.6.3-.3.6-.6.8-1 .2-.5.3-.9.3-1.4s-.1-.9-.3-1.3zm-2 2.1c-.1.2-.3.4-.4.5-.1.1-.3.2-.5.2-.2.1-.4.1-.6.1-.2.1-.5 0-.7-.1-.2 0-.3-.2-.5-.3-.1-.2-.3-.4-.4-.6-.2-.3-.3-.7-.3-1 .3-.3.6-.5 1-.7.3-.1.7-.2 1-.2.4 0 .8.1 1.1.3.3.3.4.7.4 1.1 0 .2 0 .5-.1.7zM9 11H5V7H3v10h2v-4h4v4h2V7H9v4z"})),f=function(e){switch(e){case 2:default:return a;case 3:return c;case 4:return u;case 5:return h;case 6:return d}},v=function(t){var n=t.attributes,r=t.setAttributes,o=function(e){r({hstart:e})};return(0,e.jsx)(l.ToolbarDropdownMenu,{icon:f(n.hstart),label:"Select heading level",controls:[{title:"H2",isDisabled:2===n.hstart,onClick:function(){return o(2)}},{title:"H3",isDisabled:3===n.hstart,onClick:function(){return o(3)}},{title:"H4",isDisabled:4===n.hstart,onClick:function(){return o(4)}},{title:"H5",isDisabled:5===n.hstart,onClick:function(){return o(5)}},{title:"H6",isDisabled:6===n.hstart,onClick:function(){return o(6)}}]})},m=function(t){var n=t.attributes,r=t.setAttributes;return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(l.__experimentalToggleGroupControl,{label:(0,o.__)("Heading level","rrze-elements-b"),value:n.hstart,onChange:function(e){r({hstart:e})},isBlock:!0,children:[(0,e.jsx)(l.__experimentalToggleGroupControlOption,{value:2,label:"H2"}),(0,e.jsx)(l.__experimentalToggleGroupControlOption,{value:3,label:"H3"}),(0,e.jsx)(l.__experimentalToggleGroupControlOption,{value:4,label:"H4"}),(0,e.jsx)(l.__experimentalToggleGroupControlOption,{value:5,label:"H5"}),(0,e.jsx)(l.__experimentalToggleGroupControlOption,{value:6,label:"H6"})]}),(0,e.jsx)(l.__experimentalText,{children:(0,o.__)("Controls the heading level of the accordion","rrze-elements-b")}),(0,e.jsx)(l.__experimentalDivider,{})]})},p=window.wp.serverSideRender,b=n.n(p),x=window.wp.element,g=window.wp.data,_=function(t){var n=t.attributes,r=t.setAttributes,o=(0,g.useSelect)((function(e){return{categories:(0,e("core").getEntityRecords)("taxonomy","category")}}),[]).categories,i=n.cat||"",s=o?o.reduce((function(e,t){return e[t.slug]=t,e}),{}):{},a=(o&&o.map((function(e){return{id:e.id,name:e.name,parent:e.parent,slug:e.slug}})),i.split(",")),c=o?o.filter((function(e){return a.includes(e.slug)})).map((function(e){return{id:e.id,name:e.name,parent:e.parent}})):[];return(0,e.jsx)(l.QueryControls,{categorySuggestions:s,numberOfItems:n.num,onCategoryChange:function(e){var t=i.toLowerCase().split(",").filter(Boolean),n=(Array.isArray(e)?e:[e]).map((function(e){var t,n="string"==typeof e?e:null===(t=o.find((function(t){return t.id===e.id})))||void 0===t?void 0:t.slug;return o.find((function(e){return e.slug===n}))?n:null})).filter((function(e){return e}));t=t.filter((function(e){return n.includes(e)})),n.forEach((function(e){t.includes(e)||t.push(e)})),r({cat:t.join(",")})},onNumberOfItemsChange:function(e){return r({num:e})},selectedCategories:c,minItems:1,maxItems:15})};function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,l,i,s=[],a=!0,c=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=l.call(n)).done)&&(s.push(r.value),s.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{if(!a&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(c)throw o}}return s}}(e,t)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var C=JSON.parse('{"u2":"rrze-elements/block-blueprint"}');(0,t.registerBlockType)(C.u2,{icon:{src:(0,e.jsxs)("svg",{id:"Ebene_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:[(0,e.jsx)("rect",{x:"60.05",y:"115.69",width:"112.94",height:"280.62",rx:"5.73",ry:"5.73",fill:"evenodd",strokeWidth:"0"}),(0,e.jsx)("rect",{x:"199.53",y:"115.69",width:"112.94",height:"280.62",rx:"5.73",ry:"5.73",fill:"evenodd",strokeWidth:"0"}),(0,e.jsx)("rect",{x:"339.01",y:"115.69",width:"112.94",height:"280.62",rx:"5.73",ry:"5.73",fill:"evenodd",strokeWidth:"0"})]})},__experimentalLabel:function(e,t){var n=t.context,r=e.title;if("list-view"===n&&r)return r},edit:function(t){t.blockProps;var n,i,s,a,c,u,h,d,f=t.attributes,p=t.setAttributes,g=(0,r.useBlockProps)(),y=f.title||"",C=f.tag||"",j=f.divclass||"",k=f.hidemeta||!1;console.log(f);var H=w((0,x.useState)(0),2),z=H[0],O=H[1],S=w((0,x.useState)(0),2),E=S[0],A=S[1],T=function(e){return function(){var t=(f.type||"").split(",");if(t.includes(e)){var n=t.indexOf(e);t.splice(n,1)}else t.push(e);p({type:t.join(",")})}},P=function(e,t){var n,r=(f.type||"").split(",").filter((function(e){return e})),o=/cols_\d+-\d+/;if(0===e||0===t)n=r.filter((function(e){return!o.test(e)}));else{var l=!1;n=r.map((function(n){return o.test(n)?(l=!0,"cols_".concat(e,"-").concat(t)):n})),l||n.push("cols_".concat(e,"-").concat(t))}p({type:n.join(",")})};return(0,e.jsxs)("div",Object.assign({},g,{children:[(0,e.jsx)(r.BlockControls,{controls:!0,children:(0,e.jsx)(v,{attributes:{hstart:f.hstart},setAttributes:p})}),(0,e.jsxs)(r.InspectorControls,{children:[(0,e.jsxs)(l.PanelBody,{title:(0,o.__)("Filter","rrze-elements-b"),initialOpen:!0,children:[(0,e.jsx)(m,{attributes:{hstart:f.hstart},setAttributes:p}),(0,e.jsx)(l.TextControl,{label:"Title",value:y,onChange:function(e){return p({title:e})}}),(0,e.jsx)(_,{attributes:{cat:f.cat,num:f.num},setAttributes:p}),(0,e.jsx)(l.TextControl,{label:(0,o.__)("tags","rrze-elements-b"),help:(0,o.__)("Comma separated list of tags","rrze-elements-b"),value:C,onChange:function(e){return p({tag:e})}}),(0,e.jsx)(l.TextControl,{label:(0,o.__)("Additional classes","rrze-elements-b"),value:j,onChange:function(e){return p({divclass:e})}}),(0,e.jsx)(l.CheckboxControl,{label:(0,o.__)("Hide duplicate posts","rrze-elements-b"),checked:null!==(n=f.hideduplicates)&&void 0!==n&&n,onChange:function(e){return p({hideduplicates:e})}}),(0,e.jsx)(l.CheckboxControl,{label:(0,o.__)("Only show posts with thumbnails","rrze-elements-b"),checked:null!==(i=f.has_thumbnail)&&void 0!==i&&i,onChange:function(e){return p({has_thumbnail:e})}}),(0,e.jsx)(l.CheckboxControl,{label:(0,o.__)("Only show sticky posts","rrze-elements-b"),checked:null!==(s=f.sticky_only)&&void 0!==s&&s,onChange:function(e){return p({sticky_only:e})}})]}),(0,e.jsxs)(l.PanelBody,{title:(0,o.__)("Layout","rrze-elements-b"),initialOpen:!0,children:[(0,e.jsx)(l.CheckboxControl,{label:(0,o.__)("Hide meta","rrze-elements-b"),checked:null!==(a=f.hidemeta)&&void 0!==a&&a,onChange:function(e){return p({hidemeta:e})}}),(0,e.jsx)(l.CheckboxControl,{label:(0,o.__)("Img first","rrze-elements-b"),checked:null!==(u=null===(c=f.type)||void 0===c?void 0:c.includes("img_first"))&&void 0!==u&&u,onChange:T("img_first")}),(0,e.jsx)(l.CheckboxControl,{label:(0,o.__)("Show more articles button","rrze-elements-b"),checked:null!==(d=null===(h=f.type)||void 0===h?void 0:h.includes("show_more"))&&void 0!==d&&d,onChange:T("show_more")}),(0,e.jsx)(l.RangeControl,{label:(0,o.__)("Ratio image","rrze-elements-b"),value:z,onChange:function(e){var t=0;0!==e&&(t=4-e),O(e),A(t),P(e,t)},min:0,max:3}),(0,e.jsx)(l.RangeControl,{label:(0,o.__)("Ratio text & metadata","rrze-elements-b"),value:E,onChange:function(e){var t=0;0!==e&&(t=4-e),A(e),O(t),P(t,e)},min:0,max:3})]})]}),(0,e.jsx)(b(),{block:"rrze-elements/block-blueprint",attributes:{title:y,num:f.num,cat:f.cat,columns:3,tag:C,type:f.type,divclass:j,hidemeta:k,sticky_only:f.sticky_only,hideduplicates:f.hideduplicates,has_thumbnail:f.has_thumbnail}})]}))},save:function(){return null}})}()}();