!function(){"use strict";var e=window.wp.blocks,t=window.wp.blockEditor,r=window.wp.i18n,l=(window.wp.data,window.wp.components),c=(window.wp.element,{"#e9edf2":"","#dff0d8":"success","#d9edf7":"info","#fcf8e3":"warning","#f2dede":"danger"}),o=function(e){var t=e.attributes,o=e.setAttributes;return t.color,t.style,React.createElement(l.PanelBody,{title:(0,r.__)("Color Settings","rrze-elements-b")},React.createElement(l.ColorPalette,{colors:[{name:(0,r.__)("Default","rrze-elements-b"),color:"#e9edf2",slug:""},{name:(0,r.__)("Success","rrze-elements-b"),color:"#dff0d8"},{name:(0,r.__)("Info","rrze-elements-b"),color:"#d9edf7"},{name:(0,r.__)("Warning","rrze-elements-b"),color:"#fcf8e3"},{name:(0,r.__)("Danger","rrze-elements-b"),color:"#f2dede"}],value:t.color,onChange:function(e){console.log("color",e),console.log("slug",c[e]),o({color:e}),o({style:c[e]})}}))},a=JSON.parse('{"u2":"rrze-elements/alert"}');(0,e.registerBlockType)(a.u2,{example:{attributes:{message:"Accordion"}},icon:{src:"minus",background:"#00458c"},edit:function(e){e.blockProps;var l=e.attributes,c=(e.selectedBlock,e.setAttributes);return e.blockParents,(0,t.useBlockProps)(),React.createElement(React.Fragment,null,React.createElement(t.InspectorControls,{allowedBlocks:["core/paragraph"]},React.createElement(o,{attributes:l,setAttributes:c})),React.createElement("div",{className:"alert clearfix clear ".concat(l.style?"alert-".concat(l.style):""),style:l.style?{}:{backgroundColor:l.color}},React.createElement(t.InnerBlocks,{template:[["core/paragraph",{placeholder:(0,r.__)("Add a description…")}]],templateLock:!1})))},save:function(e){var r=e.attributes,l=t.useBlockProps.save();return r.sameBlockCount,r.style,React.createElement("div",l," ",React.createElement(React.Fragment,null,React.createElement("div",{className:"alert clearfix clear ".concat(r.style?"alert-".concat(r.style):""),style:r.style?{}:{backgroundColor:r.color}},React.createElement(t.InnerBlocks.Content,null))))}})}();