!function(){"use strict";var e=window.wp.blocks,t=window.ReactJSXRuntime,l=window.wp.blockEditor,c=window.wp.element,r=window.wp.i18n,n=window.wp.data,a=window.wp.components,o=window.wp.primitives,i=(0,t.jsx)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,t.jsx)(o.Path,{d:"M21.3 10.8l-5.6-5.6c-.7-.7-1.8-.7-2.5 0l-5.6 5.6c-.7.7-.7 1.8 0 2.5l5.6 5.6c.3.3.8.5 1.2.5s.9-.2 1.2-.5l5.6-5.6c.8-.7.8-1.9.1-2.5zm-1 1.4l-5.6 5.6c-.1.1-.3.1-.4 0l-5.6-5.6c-.1-.1-.1-.3 0-.4l5.6-5.6s.1-.1.2-.1.1 0 .2.1l5.6 5.6c.1.1.1.3 0 .4zm-16.6-.4L10 5.5l-1-1-6.3 6.3c-.7.7-.7 1.8 0 2.5L9 19.5l1.1-1.1-6.3-6.3c-.2 0-.2-.2-.1-.3z"})});function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var l=0,c=Array(t);l<t;l++)c[l]=e[l];return c}var m=[{name:"notice-attention",title:(0,r.__)("Warning","rrze-elements-blocks"),description:(0,r.__)("Warning","rrze-elements-blocks"),iconClass:"fa-solid fa-triangle-exclamation",icon:React.createElement(a.SVG,{width:"1em",height:"1em",fontSize:"2em",viewBox:"0 0 512 512",className:"rrze-elements-icon",alt:"Exclamation mark",xmlns:"http://www.w3.org/2000/svg"},React.createElement("rect",{width:"512",height:"512",fill:"#ffff00"}),React.createElement(a.Path,{fill:"#000",fillRule:"evenodd",clipRule:"evenodd",transform:"translate(128, 128) scale(0.5)",d:"M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"})),innerBlocks:[["core/paragraph"]],scope:["block"]},{name:"notice-hinweis",title:(0,r.__)("Hint","rrze-elements-blocks"),description:(0,r.__)("Notice with hint-icon","rrze-elements-blocks"),iconClass:"fa-solid fa-info",icon:React.createElement(a.SVG,{width:"1em",height:"1em",fontSize:"2em",viewBox:"0 0 512 512",className:"rrze-elements-icon",alt:"Exclamation mark",xmlns:"http://www.w3.org/2000/svg"},React.createElement("rect",{width:"512",height:"512",fill:"var(--color-primary-basis, #04316a)"}),React.createElement(a.Path,{fillRule:"evenodd",clipRule:"evenodd",fill:"var(--color-primary-basis-kontrast, #fff)",transform:"translate(200, 128) scale(0.5)",d:"M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"})),isDefault:!0,innerBlocks:[["core/column"],["core/column"]],scope:["block"]},{name:"notice-baustelle",title:(0,r.__)("Maintenance","rrze-elements-blocks"),description:(0,r.__)("Notice with wrench icon","rrze-elements-blocks"),iconClass:"fa-solid fa-screwdriver-wrench",icon:React.createElement(a.SVG,{width:"1em",height:"1em",fontSize:"2em",viewBox:"0 0 512 512",className:"rrze-elements-icon",alt:"Exclamation mark",xmlns:"http://www.w3.org/2000/svg"},React.createElement("rect",{width:"512",height:"512",fill:"var(--color-primary-basis, #04316a)"}),React.createElement(a.Path,{fill:"var(--color-primary-basis-kontrast, #fff)",fillRule:"evenodd",clipRule:"evenodd",transform:"translate(128, 128) scale(0.5)",d:"M507.6 122.8c-2.904-12.09-18.25-16.13-27.04-7.338l-76.55 76.56l-83.1-.0002l0-83.1l76.55-76.56c8.791-8.789 4.75-24.14-7.336-27.04c-23.69-5.693-49.34-6.111-75.92 .2484c-61.45 14.7-109.4 66.9-119.2 129.3C189.8 160.8 192.3 186.7 200.1 210.1l-178.1 178.1c-28.12 28.12-28.12 73.69 0 101.8C35.16 504.1 53.56 512 71.1 512s36.84-7.031 50.91-21.09l178.1-178.1c23.46 7.736 49.31 10.24 76.17 6.004c62.41-9.84 114.6-57.8 129.3-119.2C513.7 172.1 513.3 146.5 507.6 122.8zM80 456c-13.25 0-24-10.75-24-24c0-13.26 10.75-24 24-24s24 10.74 24 24C104 445.3 93.25 456 80 456z"})),innerBlocks:[["core/paragraph"]],scope:["block"]},{name:"notice-question",title:(0,r.__)("Question","rrze-elements-blocks"),description:(0,r.__)("Questionmark","rrze-elements-blocks"),iconClass:"fa-solid fa-question",icon:React.createElement(a.SVG,{width:"1em",height:"1em",fontSize:"2em",viewBox:"0 0 512 512",className:"rrze-elements-icon",alt:"Exclamation mark",xmlns:"http://www.w3.org/2000/svg"},React.createElement("rect",{width:"512",height:"512",fill:"var(--color-primary-basis, #04316a)"}),React.createElement(a.Path,{fill:"var(--color-primary-basis-kontrast, #fff)",fillRule:"evenodd",clipRule:"evenodd",transform:"translate(170, 128) scale(0.5)",d:"M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"})),innerBlocks:[["core/paragraph"]],scope:["block"]},{name:"notice-minus",title:(0,r.__)("Negative","rrze-elements-blocks"),description:(0,r.__)("Minus icon","rrze-elements-blocks"),iconClass:"fa-solid fa-minus",icon:React.createElement(a.SVG,{width:"1em",height:"1em",fontSize:"2em",viewBox:"0 0 512 512",className:"rrze-elements-icon",alt:"Minus sign",xmlns:"http://www.w3.org/2000/svg"},React.createElement("rect",{width:"512",height:"512",fill:"var(--color-primary-basis, #04316a)"}),React.createElement(a.Path,{fill:"var(--color-primary-basis-kontrast, #fff)",fillRule:"evenodd",clipRule:"evenodd",transform:"translate(140, 128) scale(0.5)",d:"M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"})),innerBlocks:[["core/paragraph"]],scope:["block"]},{name:"notice-plus",title:(0,r.__)("Positive","rrze-elements-blocks"),description:(0,r.__)("Plus-icon","rrze-elements-blocks"),iconClass:"fa-solid fa-plus",icon:React.createElement(a.SVG,{width:"1em",height:"1em",fontSize:"2em",viewBox:"0 0 512 512",className:"rrze-elements-icon",alt:"Exclamation mark",xmlns:"http://www.w3.org/2000/svg"},React.createElement("rect",{width:"512",height:"512",fill:"var(--color-primary-basis, #04316a)"}),React.createElement(a.Path,{fill:"var(--color-primary-basis-kontrast, #fff)",fillRule:"evenodd",clipRule:"evenodd",transform:"translate(140, 128) scale(0.5)",d:"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"})),innerBlocks:[["core/paragraph"]],scope:["block"]},{name:"notice-idea",title:(0,r.__)("Idea","rrze-elements-blocks"),description:(0,r.__)("Lightbulb icon","rrze-elements-blocks"),iconClass:"fa-solid fa-lightbulb",icon:React.createElement(a.SVG,{width:"1em",height:"1em",fontSize:"2em",viewBox:"0 0 512 512",className:"rrze-elements-icon",alt:"Lightbulb",xmlns:"http://www.w3.org/2000/svg"},React.createElement("rect",{width:"512",height:"512",fill:"var(--color-primary-basis, #04316a)"}),React.createElement(a.Path,{fill:"var(--color-primary-basis-kontrast, #fff)",fillRule:"evenodd",clipRule:"evenodd",transform:"translate(160, 128) scale(0.5)",d:"M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"})),innerBlocks:[["core/paragraph"]],scope:["block"]},{name:"notice-download",title:(0,r.__)("Download","rrze-elements-blocks"),description:(0,r.__)("Download-icon","rrze-elements-blocks"),iconClass:"fa-solid fa-download",icon:React.createElement(a.SVG,{width:"1em",height:"1em",fontSize:"2em",viewBox:"0 0 512 512",className:"rrze-elements-icon",alt:"Download icon",xmlns:"http://www.w3.org/2000/svg"},React.createElement("rect",{width:"512",height:"512",fill:"var(--color-primary-basis, #04316a)"}),React.createElement(a.Path,{fillRule:"evenodd",clipRule:"evenodd",fill:"var(--color-primary-basis-kontrast, #fff)",transform:"translate(128, 128) scale(0.5)",d:"M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"})),innerBlocks:[["core/paragraph"]],scope:["block"]},{name:"notice-faubox",title:(0,r.__)("FAUbox","rrze-elements-blocks"),description:(0,r.__)("FAUbox-icon","rrze-elements-blocks"),iconClass:"fa-solid fa-cloud-arrow-down",icon:React.createElement(a.SVG,{width:"1em",height:"1em",fontSize:"2em",viewBox:"0 0 512 512",className:"rrze-elements-icon",alt:"Exclamation mark",xmlns:"http://www.w3.org/2000/svg"},React.createElement("rect",{width:"512",height:"512",fill:"var(--color-primary-basis, #04316a)"}),React.createElement(a.Path,{fillRule:"evenodd",clipRule:"evenodd",fill:"var(--color-primary-basis-kontrast, #fff)",transform:"translate(100, 128) scale(0.5)",d:"M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z"})),innerBlocks:[["core/paragraph"]],scope:["block"]},{name:"notice-audio",title:(0,r.__)("Audio","rrze-elements-blocks"),description:(0,r.__)("Loudspeaker icon","rrze-elements-blocks"),iconClass:"fa-solid fa-headphones",icon:React.createElement(a.SVG,{width:"1em",height:"1em",fontSize:"2em",viewBox:"0 0 512 512",className:"rrze-elements-icon",alt:"Headphone icon",xmlns:"http://www.w3.org/2000/svg"},React.createElement("rect",{width:"512",height:"512",fill:"var(--color-primary-basis, #04316a)"}),React.createElement(a.Path,{fillRule:"evenodd",clipRule:"evenodd",fill:"var(--color-primary-basis-kontrast, #fff)",transform:"translate(128, 128) scale(0.5)",d:"M256 80C149.9 80 62.4 159.4 49.6 262c9.4-3.8 19.6-6 30.4-6c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48c-44.2 0-80-35.8-80-80V384 336 288C0 146.6 114.6 32 256 32s256 114.6 256 256v48 48 16c0 44.2-35.8 80-80 80c-26.5 0-48-21.5-48-48V304c0-26.5 21.5-48 48-48c10.8 0 21 2.1 30.4 6C449.6 159.4 362.1 80 256 80z"})),innerBlocks:[["core/paragraph"]],scope:["block"]},{name:"notice-video",title:(0,r.__)("Video","rrze-elements-blocks"),description:(0,r.__)("Video-icon","rrze-elements-blocks"),iconClass:"fa-solid fa-video",icon:React.createElement(a.SVG,{width:"1em",height:"1em",fontSize:"2em",viewBox:"0 0 512 512",className:"rrze-elements-icon",alt:"Video icon",xmlns:"http://www.w3.org/2000/svg"},React.createElement("rect",{width:"512",height:"512",fill:"var(--color-primary-basis, #04316a)"}),React.createElement(a.Path,{fillRule:"evenodd",clipRule:"evenodd",fill:"var(--color-primary-basis-kontrast, #fff)",transform:"translate(110, 128) scale(0.5)",d:"M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"})),innerBlocks:[["core/paragraph"]],scope:["block"]},{name:"notice-thumbs-up",title:(0,r.__)("Thumbs up","rrze-elements-blocks"),description:(0,r.__)("Thumps up icon","rrze-elements-blocks"),iconClass:"fa-solid fa-thumbs-up",icon:React.createElement(a.SVG,{width:"1em",height:"1em",fontSize:"2em",viewBox:"0 0 512 512",className:"rrze-elements-icon",alt:"Thumbs up icon",xmlns:"http://www.w3.org/2000/svg"},React.createElement("rect",{width:"512",height:"512",fill:"var(--color-primary-basis, #04316a)"}),React.createElement(a.Path,{fillRule:"evenodd",clipRule:"evenodd",fill:"var(--color-primary-basis-kontrast, #fff)",transform:"translate(128, 128) scale(0.5)",d:"M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"})),innerBlocks:[["core/paragraph"]],scope:["block"]},{name:"notice-thumbs-down",title:(0,r.__)("Thumbs down","rrze-elements-blocks"),description:(0,r.__)("Thumbs down icon","rrze-elements-blocks"),iconClass:"fa-solid fa-thumbs-down",icon:React.createElement(a.SVG,{width:"1em",height:"1em",fontSize:"2em",viewBox:"0 0 512 512",className:"rrze-elements-icon",alt:"Headphone icon",xmlns:"http://www.w3.org/2000/svg"},React.createElement("rect",{width:"512",height:"512",fill:"var(--color-primary-basis, #04316a)"}),React.createElement(a.Path,{fillRule:"evenodd",clipRule:"evenodd",fill:"var(--color-primary-basis-kontrast, #fff)",transform:"translate(128, 128) scale(0.5)",d:"M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z"})),innerBlocks:[["core/paragraph"]],scope:["block"]}],d=JSON.parse('{"UU":"rrze-elements/notice"}'),h={from:[{type:"block",isMultiBlock:!0,blocks:["core/paragraph"],isMatch:function(e,t){return!t.some((function(e){return"rrze-elements/notice"===e.name}))},__experimentalConvert:function(t){var l=[];return t.forEach((function(t){l.push((0,e.createBlock)(t.name,t.attributes,t.innerBlocks))})),(0,e.createBlock)("rrze-elements/notice",{},l)}}],to:[{type:"block",blocks:["core/paragraph"],transform:function(e,t){return t}}]};(0,e.registerBlockType)(d.UU,{icon:{src:React.createElement("svg",{id:"Ebene_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},React.createElement("rect",{x:"141.15",y:"231.31",width:"300.46",height:"49.39",rx:"5.73",ry:"5.73",fillRule:"evenodd",strokeWidth:"0"}),React.createElement("rect",{x:"70.38",y:"231.31",width:"50.4",height:"49.39",rx:"24.69",ry:"24.69",fillRule:"evenodd",strokeWidth:"0"}))},variations:m,edit:function(o){var m,d,h=o.attributes,f=o.setAttributes,p=(0,l.useBlockProps)(),u=h.icon,w=(m=(0,c.useState)(!1),d=2,function(e){if(Array.isArray(e))return e}(m)||function(e,t){var l=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var c,r,n,a,o=[],i=!0,s=!1;try{if(n=(l=l.call(e)).next,0===t){if(Object(l)!==l)return;i=!1}else for(;!(i=(c=n.call(l)).done)&&(o.push(c.value),o.length!==t);i=!0);}catch(e){s=!0,r=e}finally{try{if(!i&&null!=l.return&&(a=l.return(),Object(a)!==a))return}finally{if(s)throw r}}return o}}(m,d)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var l={}.toString.call(e).slice(8,-1);return"Object"===l&&e.constructor&&(l=e.constructor.name),"Map"===l||"Set"===l?Array.from(e):"Arguments"===l||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l)?s(e,t):void 0}}(m,d)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),v=w[0],b=w[1],k="rrze-elements/notice",g=(0,n.useSelect)((function(t){return(0,t(e.store).getBlockVariations)(k,"block")}),[k]),z=g.find((function(e){return e.name===h.style})),R=function(){return b(!0)},_=function(){return b(!1)};return(0,t.jsxs)("div",Object.assign({},p,{children:[(0,t.jsx)(l.InspectorControls,{children:(0,t.jsx)(a.PanelBody,{title:(0,r.__)("Style Settings","rrze-elements-blocks"),initialOpen:!0,children:(0,t.jsx)(l.__experimentalBlockVariationPicker,{variations:g,onSelect:function(e){f({style:null==e?void 0:e.name})}})})}),(0,t.jsx)(l.BlockControls,{children:(0,t.jsx)(a.ToolbarGroup,{children:(0,t.jsx)(a.ToolbarItem,{children:function(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.ToolbarButton,{icon:i,label:""===u?(0,r.__)("Select a style","rrze-elements-blocks"):(0,r.__)("Change the style","rrze-elements-blocks"),onClick:R}),v&&(0,t.jsxs)(a.Modal,{title:(0,r.__)("Select an Icon","rrze-elements-blocks"),onRequestClose:_,children:[(0,t.jsx)(l.__experimentalBlockVariationPicker,{variations:g,onSelect:function(e){f({style:null==e?void 0:e.name})}}),(0,t.jsx)(a.Button,{variant:"primary",onClick:_,children:(0,r.__)("Save changes","rrze-elements-blocks")})]})]})}})})}),!h.style&&(0,t.jsx)(a.Placeholder,{icon:"admin-plugins",label:(0,r.__)("Notice","rrze-elements-blocks"),children:(0,t.jsx)(l.__experimentalBlockVariationPicker,{variations:g,onSelect:function(e){f({style:null==e?void 0:e.name})}})}),(0,t.jsxs)("div",{className:"notice no-title ".concat(h.style?"alert-".concat(h.style):""),style:h.style?{}:{backgroundColor:h.color,color:h.textColor,border:"1px solid ".concat(h.borderColor)},children:[(0,t.jsx)("div",{children:(0,t.jsx)("div",{children:(0,t.jsx)("span",{className:"".concat(null==z?void 0:z.iconClass," rrze-elements-icon")})})}),h.style&&(0,t.jsx)("div",{children:(0,t.jsx)(l.InnerBlocks,{template:[["core/heading",{placeholder:(0,r.__)("Add a Headline","rrze-elements-blocks"),level:3}],["core/paragraph",{placeholder:(0,r.__)("Add a description…","rrze-elements-blocks")}]],allowedBlocks:["core/heading","core/paragraph","core/list","core/buttons","core/button"],templateLock:!1})})]})]}))},save:function(e){var t=e.attributes,c=l.useBlockProps.save(),r=m.find((function(e){return e.name===t.style}));return React.createElement("div",c,React.createElement("div",{className:"notice"},React.createElement(React.Fragment,null,React.createElement("div",null,React.createElement("span",{className:"".concat(null==r?void 0:r.iconClass," rrze-elements-icon")})),React.createElement("div",null,React.createElement(l.InnerBlocks.Content,null)))))},transforms:h})}();