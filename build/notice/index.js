!function(){"use strict";var e=window.wp.blocks,t=window.wp.element,r=window.wp.blockEditor;function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function o(e){var t=function(e,t){if("object"!==n(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===n(t)?t:String(t)}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}window.wp.i18n,window.wp.data;var c=JSON.parse('{"u2":"rrze-elements/notice"}');(0,e.registerBlockType)(c.u2,{example:{attributes:{message:"Accordion"}},edit:function(e){return e.blockProps,e.attributes,e.selectedBlock,e.setAttributes,e.blockParents,(0,r.useBlockProps)(),(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",null))},save:function(e){var n=e.attributes,c=r.useBlockProps.save();return n.sameBlockCount,(0,t.createElement)("div",function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){var n,i,c;n=e,i=t,c=r[t],(i=o(i))in n?Object.defineProperty(n,i,{value:c,enumerable:!0,configurable:!0,writable:!0}):n[i]=c})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},c)," ",(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{className:"notice notice-download no-title"},(0,t.createElement)(r.InnerBlocks.Content,null),(0,t.createElement)("div",null,(0,t.createElement)("p",null,"Beispiel")))))}})}();