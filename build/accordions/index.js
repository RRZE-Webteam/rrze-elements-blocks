!function(){"use strict";var e=window.wp.blocks,t=window.ReactJSXRuntime,r=window.wp.blockEditor,n=window.wp.data,s=JSON.parse('{"UU":"rrze-elements/accordions"}'),o=[{attributes:{expandAllLink:{type:"boolean",default:!1},hstart:{type:"integer",default:2},register:{type:"boolean",default:!1},sameBlockCount:{type:"integer",default:0},childrenCount:{type:"integer",default:0},previousBlockIds:{type:"array",default:[]}},save:function(e){var n=e.attributes,s=r.useBlockProps.save(),o=n.sameBlockCount;return(0,t.jsxs)("div",Object.assign({},s,{children:[" ",(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{className:"accordion",id:"accordion-".concat(o),children:(0,t.jsx)(r.InnerBlocks.Content,{})})})]}))},migrate:function(e){return Object.assign({},e)}}];(0,e.registerBlockType)(s.UU,{example:{attributes:{message:"Accordion"}},icon:{src:"align-center",background:"#00458c"},edit:function(e){e.attributes,e.setAttributes,function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(e,n[s])&&(r[n[s]]=e[n[s]])}}(e,["attributes","setAttributes"]);var s=(0,r.useBlockProps)();return(0,n.useDispatch)(r.store).__unstableMarkNextChangeAsNotPersistent,(0,t.jsx)("div",Object.assign({},s,{children:(0,t.jsx)("div",{className:"accordion",id:"accordion-",children:(0,t.jsx)(r.InnerBlocks,{allowedBlocks:["rrze-elements/accordion"],template:[["rrze-elements/accordion",{}],["rrze-elements/accordion",{}]]})})}))},save:function(e){var n=e.attributes,s=r.useBlockProps.save();return n.sameBlockCount,(0,t.jsxs)("div",Object.assign({},s,{children:[" ",(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{className:"accordion",children:(0,t.jsx)(r.InnerBlocks.Content,{})})})]}))},deprecated:o})}();