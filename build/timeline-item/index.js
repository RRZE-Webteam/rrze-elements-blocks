!function(){"use strict";var e=window.ReactJSXRuntime,t=window.wp.blocks,r=window.wp.blockEditor,s=window.wp.data,l=window.wp.i18n,n=function(t){var r=t.level,s=t.children,l=function(e,t){var r={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(r[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(s=Object.getOwnPropertySymbols(e);l<s.length;l++)t.indexOf(s[l])<0&&Object.prototype.propertyIsEnumerable.call(e,s[l])&&(r[s[l]]=e[s[l]])}return r}(t,["level","children"]);switch(r){case 3:return(0,e.jsx)("h3",Object.assign({},l,{children:s}));case 4:return(0,e.jsx)("h4",Object.assign({},l,{children:s}));case 5:return(0,e.jsx)("h5",Object.assign({},l,{children:s}));case 6:case 7:return(0,e.jsx)("h6",Object.assign({},l,{children:s}));default:return(0,e.jsx)("h2",Object.assign({},l,{children:s}))}},i=window.wp.element,o=JSON.parse('{"UU":"rrze-elements/timeline-item"}');(0,t.registerBlockType)(o.UU,{icon:{src:(0,e.jsxs)("svg",{id:"Ebene_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:[(0,e.jsx)("g",{opacity:".5",children:(0,e.jsx)("rect",{x:"75.86",y:"131.85",width:"360.29",height:"142.31",fillRule:"evenodd",strokeWidth:"0"})}),(0,e.jsx)("path",{d:"m81.59,109.83h348.82c3.16,0,5.73,2.57,5.73,5.73v25.16H75.86v-25.16c0-3.16,2.57-5.73,5.73-5.73Z",fillRule:"evenodd",strokeWidth:"0"}),(0,e.jsx)("rect",{x:"75.86",y:"298.32",width:"360.28",height:"39.9",rx:"5.73",ry:"5.73",fillRule:"evenodd",strokeWidth:"0"}),(0,e.jsx)("rect",{x:"75.86",y:"362.27",width:"360.28",height:"39.9",rx:"5.73",ry:"5.73",fillRule:"evenodd",strokeWidth:"0"})]})},edit:function(t){var o=t.attributes,c=t.setAttributes,a=t.context,d=(function(e,t){var r={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(r[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(s=Object.getOwnPropertySymbols(e);l<s.length;l++)t.indexOf(s[l])<0&&Object.prototype.propertyIsEnumerable.call(e,s[l])&&(r[s[l]]=e[s[l]])}}(t,["attributes","setAttributes","context"]),(0,r.useBlockProps)()),h=((0,s.useDispatch)(r.store).__unstableMarkNextChangeAsNotPersistent,o.title);return(0,i.useEffect)((function(){c({hstart:a["rrze-elements/timeline-hstart"]})})),a["rrze-elements/hstart"],(0,e.jsx)("li",Object.assign({},d,{children:(0,e.jsxs)("div",{className:"tooltip",children:[(0,e.jsx)("div",{className:"tooltip-arrow"}),(0,e.jsx)(n,{level:o.hstart,className:"timeline-label",children:(0,e.jsx)(r.RichText,{tagName:"p",value:h,onChange:function(e){c(""===e?{title:""}:{title:e})},placeholder:(0,l.__)("Enter a Date or Label","rrze-elements-blocks"),allowedFormats:[],className:"elements-blocks-input-following-icon"})}),(0,e.jsx)(r.InnerBlocks,{template:[["core/paragraph",{placeholder:(0,l.__)("Add a description…","rrze-elements-blocks")}]],allowedBlocks:["core/paragraph"],templateLock:!1})]})}))},save:function(t){var s=t.attributes,l=r.useBlockProps.save();return(0,e.jsx)("li",Object.assign({},l,{children:(0,e.jsxs)("div",{className:"tooltip",children:[(0,e.jsx)("div",{className:"tooltip-arrow"}),(0,e.jsx)(n,{level:s.hstart,className:"timeline-label",children:s.title}),(0,e.jsx)(r.InnerBlocks.Content,{})]})}))},__experimentalLabel:function(e,t){var r=t.context,s=e.title,n=e.hstart;return"list-view"===r&&s?s:"accessibility"===r?s&&0!==s.length?(0,l.sprintf)(/* translators: accessibility text. 1: heading level. 2: heading title. */ /* translators: accessibility text. 1: heading level. 2: heading title. */
(0,l.__)("Level %1$s. %2$s","rrze-elements-blocks"),n,s):(0,l.sprintf)(/* translators: accessibility text. %s: heading level. */ /* translators: accessibility text. %s: heading level. */
(0,l.__)("Level %s. Empty.","rrze-elements-blocks"),n):void 0}})}();