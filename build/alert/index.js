!function(){var e={156:function(e){"use strict";e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},854:function(e,t,r){var n=r(156),o=r(872),l=Object.hasOwnProperty,a=Object.create(null);for(var s in n)l.call(n,s)&&(a[n[s]]=s);var i=e.exports={to:{},get:{}};function c(e,t,r){return Math.min(Math.max(t,e),r)}function u(e){var t=Math.round(e).toString(16).toUpperCase();return t.length<2?"0"+t:t}i.get=function(e){var t,r;switch(e.substring(0,3).toLowerCase()){case"hsl":t=i.get.hsl(e),r="hsl";break;case"hwb":t=i.get.hwb(e),r="hwb";break;default:t=i.get.rgb(e),r="rgb"}return t?{model:r,value:t}:null},i.get.rgb=function(e){if(!e)return null;var t,r,o,a=[0,0,0,1];if(t=e.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)){for(o=t[2],t=t[1],r=0;r<3;r++){var s=2*r;a[r]=parseInt(t.slice(s,s+2),16)}o&&(a[3]=parseInt(o,16)/255)}else if(t=e.match(/^#([a-f0-9]{3,4})$/i)){for(o=(t=t[1])[3],r=0;r<3;r++)a[r]=parseInt(t[r]+t[r],16);o&&(a[3]=parseInt(o+o,16)/255)}else if(t=e.match(/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)){for(r=0;r<3;r++)a[r]=parseInt(t[r+1],0);t[4]&&(t[5]?a[3]=.01*parseFloat(t[4]):a[3]=parseFloat(t[4]))}else{if(!(t=e.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)))return(t=e.match(/^(\w+)$/))?"transparent"===t[1]?[0,0,0,0]:l.call(n,t[1])?((a=n[t[1]])[3]=1,a):null:null;for(r=0;r<3;r++)a[r]=Math.round(2.55*parseFloat(t[r+1]));t[4]&&(t[5]?a[3]=.01*parseFloat(t[4]):a[3]=parseFloat(t[4]))}for(r=0;r<3;r++)a[r]=c(a[r],0,255);return a[3]=c(a[3],0,1),a},i.get.hsl=function(e){if(!e)return null;var t=e.match(/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);if(t){var r=parseFloat(t[4]);return[(parseFloat(t[1])%360+360)%360,c(parseFloat(t[2]),0,100),c(parseFloat(t[3]),0,100),c(isNaN(r)?1:r,0,1)]}return null},i.get.hwb=function(e){if(!e)return null;var t=e.match(/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);if(t){var r=parseFloat(t[4]);return[(parseFloat(t[1])%360+360)%360,c(parseFloat(t[2]),0,100),c(parseFloat(t[3]),0,100),c(isNaN(r)?1:r,0,1)]}return null},i.to.hex=function(){var e=o(arguments);return"#"+u(e[0])+u(e[1])+u(e[2])+(e[3]<1?u(Math.round(255*e[3])):"")},i.to.rgb=function(){var e=o(arguments);return e.length<4||1===e[3]?"rgb("+Math.round(e[0])+", "+Math.round(e[1])+", "+Math.round(e[2])+")":"rgba("+Math.round(e[0])+", "+Math.round(e[1])+", "+Math.round(e[2])+", "+e[3]+")"},i.to.rgb.percent=function(){var e=o(arguments),t=Math.round(e[0]/255*100),r=Math.round(e[1]/255*100),n=Math.round(e[2]/255*100);return e.length<4||1===e[3]?"rgb("+t+"%, "+r+"%, "+n+"%)":"rgba("+t+"%, "+r+"%, "+n+"%, "+e[3]+")"},i.to.hsl=function(){var e=o(arguments);return e.length<4||1===e[3]?"hsl("+e[0]+", "+e[1]+"%, "+e[2]+"%)":"hsla("+e[0]+", "+e[1]+"%, "+e[2]+"%, "+e[3]+")"},i.to.hwb=function(){var e=o(arguments),t="";return e.length>=4&&1!==e[3]&&(t=", "+e[3]),"hwb("+e[0]+", "+e[1]+"%, "+e[2]+"%"+t+")"},i.to.keyword=function(e){return a[e.slice(0,3)]}},520:function(e,t,r){const n=r(854),o=r(137),l=["keyword","gray","hex"],a={};for(const e of Object.keys(o))a[[...o[e].labels].sort().join("")]=e;const s={};function i(e,t){if(!(this instanceof i))return new i(e,t);if(t&&t in l&&(t=null),t&&!(t in o))throw new Error("Unknown model: "+t);let r,c;if(null==e)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(e instanceof i)this.model=e.model,this.color=[...e.color],this.valpha=e.valpha;else if("string"==typeof e){const t=n.get(e);if(null===t)throw new Error("Unable to parse color from string: "+e);this.model=t.model,c=o[this.model].channels,this.color=t.value.slice(0,c),this.valpha="number"==typeof t.value[c]?t.value[c]:1}else if(e.length>0){this.model=t||"rgb",c=o[this.model].channels;const r=Array.prototype.slice.call(e,0,c);this.color=d(r,c),this.valpha="number"==typeof e[c]?e[c]:1}else if("number"==typeof e)this.model="rgb",this.color=[e>>16&255,e>>8&255,255&e],this.valpha=1;else{this.valpha=1;const t=Object.keys(e);"alpha"in e&&(t.splice(t.indexOf("alpha"),1),this.valpha="number"==typeof e.alpha?e.alpha:0);const n=t.sort().join("");if(!(n in a))throw new Error("Unable to parse color from object: "+JSON.stringify(e));this.model=a[n];const{labels:l}=o[this.model],s=[];for(r=0;r<l.length;r++)s.push(e[l[r]]);this.color=d(s)}if(s[this.model])for(c=o[this.model].channels,r=0;r<c;r++){const e=s[this.model][r];e&&(this.color[r]=e(this.color[r]))}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}i.prototype={toString(){return this.string()},toJSON(){return this[this.model]()},string(e){let t=this.model in n.to?this:this.rgb();t=t.round("number"==typeof e?e:1);const r=1===t.valpha?t.color:[...t.color,this.valpha];return n.to[t.model](r)},percentString(e){const t=this.rgb().round("number"==typeof e?e:1),r=1===t.valpha?t.color:[...t.color,this.valpha];return n.to.rgb.percent(r)},array(){return 1===this.valpha?[...this.color]:[...this.color,this.valpha]},object(){const e={},{channels:t}=o[this.model],{labels:r}=o[this.model];for(let n=0;n<t;n++)e[r[n]]=this.color[n];return 1!==this.valpha&&(e.alpha=this.valpha),e},unitArray(){const e=this.rgb().color;return e[0]/=255,e[1]/=255,e[2]/=255,1!==this.valpha&&e.push(this.valpha),e},unitObject(){const e=this.rgb().object();return e.r/=255,e.g/=255,e.b/=255,1!==this.valpha&&(e.alpha=this.valpha),e},round(e){return e=Math.max(e||0,0),new i([...this.color.map(c(e)),this.valpha],this.model)},alpha(e){return void 0!==e?new i([...this.color,Math.max(0,Math.min(1,e))],this.model):this.valpha},red:u("rgb",0,h(255)),green:u("rgb",1,h(255)),blue:u("rgb",2,h(255)),hue:u(["hsl","hsv","hsl","hwb","hcg"],0,(e=>(e%360+360)%360)),saturationl:u("hsl",1,h(100)),lightness:u("hsl",2,h(100)),saturationv:u("hsv",1,h(100)),value:u("hsv",2,h(100)),chroma:u("hcg",1,h(100)),gray:u("hcg",2,h(100)),white:u("hwb",1,h(100)),wblack:u("hwb",2,h(100)),cyan:u("cmyk",0,h(100)),magenta:u("cmyk",1,h(100)),yellow:u("cmyk",2,h(100)),black:u("cmyk",3,h(100)),x:u("xyz",0,h(95.047)),y:u("xyz",1,h(100)),z:u("xyz",2,h(108.833)),l:u("lab",0,h(100)),a:u("lab",1),b:u("lab",2),keyword(e){return void 0!==e?new i(e):o[this.model].keyword(this.color)},hex(e){return void 0!==e?new i(e):n.to.hex(this.rgb().round().color)},hexa(e){if(void 0!==e)return new i(e);const t=this.rgb().round().color;let r=Math.round(255*this.valpha).toString(16).toUpperCase();return 1===r.length&&(r="0"+r),n.to.hex(t)+r},rgbNumber(){const e=this.rgb().color;return(255&e[0])<<16|(255&e[1])<<8|255&e[2]},luminosity(){const e=this.rgb().color,t=[];for(const[r,n]of e.entries()){const e=n/255;t[r]=e<=.04045?e/12.92:((e+.055)/1.055)**2.4}return.2126*t[0]+.7152*t[1]+.0722*t[2]},contrast(e){const t=this.luminosity(),r=e.luminosity();return t>r?(t+.05)/(r+.05):(r+.05)/(t+.05)},level(e){const t=this.contrast(e);return t>=7?"AAA":t>=4.5?"AA":""},isDark(){const e=this.rgb().color;return(2126*e[0]+7152*e[1]+722*e[2])/1e4<128},isLight(){return!this.isDark()},negate(){const e=this.rgb();for(let t=0;t<3;t++)e.color[t]=255-e.color[t];return e},lighten(e){const t=this.hsl();return t.color[2]+=t.color[2]*e,t},darken(e){const t=this.hsl();return t.color[2]-=t.color[2]*e,t},saturate(e){const t=this.hsl();return t.color[1]+=t.color[1]*e,t},desaturate(e){const t=this.hsl();return t.color[1]-=t.color[1]*e,t},whiten(e){const t=this.hwb();return t.color[1]+=t.color[1]*e,t},blacken(e){const t=this.hwb();return t.color[2]+=t.color[2]*e,t},grayscale(){const e=this.rgb().color,t=.3*e[0]+.59*e[1]+.11*e[2];return i.rgb(t,t,t)},fade(e){return this.alpha(this.valpha-this.valpha*e)},opaquer(e){return this.alpha(this.valpha+this.valpha*e)},rotate(e){const t=this.hsl();let r=t.color[0];return r=(r+e)%360,r=r<0?360+r:r,t.color[0]=r,t},mix(e,t){if(!e||!e.rgb)throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+typeof e);const r=e.rgb(),n=this.rgb(),o=void 0===t?.5:t,l=2*o-1,a=r.alpha()-n.alpha(),s=((l*a==-1?l:(l+a)/(1+l*a))+1)/2,c=1-s;return i.rgb(s*r.red()+c*n.red(),s*r.green()+c*n.green(),s*r.blue()+c*n.blue(),r.alpha()*o+n.alpha()*(1-o))}};for(const e of Object.keys(o)){if(l.includes(e))continue;const{channels:t}=o[e];i.prototype[e]=function(...t){return this.model===e?new i(this):t.length>0?new i(t,e):new i([...(r=o[this.model][e].raw(this.color),Array.isArray(r)?r:[r]),this.valpha],e);var r},i[e]=function(...r){let n=r[0];return"number"==typeof n&&(n=d(r,t)),new i(n,e)}}function c(e){return function(t){return function(e,t){return Number(e.toFixed(t))}(t,e)}}function u(e,t,r){e=Array.isArray(e)?e:[e];for(const n of e)(s[n]||(s[n]=[]))[t]=r;return e=e[0],function(n){let o;return void 0!==n?(r&&(n=r(n)),o=this[e](),o.color[t]=n,o):(o=this[e]().color[t],r&&(o=r(o)),o)}}function h(e){return function(t){return Math.max(0,Math.min(e,t))}}function d(e,t){for(let r=0;r<t;r++)"number"!=typeof e[r]&&(e[r]=0);return e}e.exports=i},920:function(e,t,r){const n=r(993),o={};for(const e of Object.keys(n))o[n[e]]=e;const l={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};e.exports=l;for(const e of Object.keys(l)){if(!("channels"in l[e]))throw new Error("missing channels property: "+e);if(!("labels"in l[e]))throw new Error("missing channel labels property: "+e);if(l[e].labels.length!==l[e].channels)throw new Error("channel and label counts mismatch: "+e);const{channels:t,labels:r}=l[e];delete l[e].channels,delete l[e].labels,Object.defineProperty(l[e],"channels",{value:t}),Object.defineProperty(l[e],"labels",{value:r})}l.rgb.hsl=function(e){const t=e[0]/255,r=e[1]/255,n=e[2]/255,o=Math.min(t,r,n),l=Math.max(t,r,n),a=l-o;let s,i;l===o?s=0:t===l?s=(r-n)/a:r===l?s=2+(n-t)/a:n===l&&(s=4+(t-r)/a),s=Math.min(60*s,360),s<0&&(s+=360);const c=(o+l)/2;return i=l===o?0:c<=.5?a/(l+o):a/(2-l-o),[s,100*i,100*c]},l.rgb.hsv=function(e){let t,r,n,o,l;const a=e[0]/255,s=e[1]/255,i=e[2]/255,c=Math.max(a,s,i),u=c-Math.min(a,s,i),h=function(e){return(c-e)/6/u+.5};return 0===u?(o=0,l=0):(l=u/c,t=h(a),r=h(s),n=h(i),a===c?o=n-r:s===c?o=1/3+t-n:i===c&&(o=2/3+r-t),o<0?o+=1:o>1&&(o-=1)),[360*o,100*l,100*c]},l.rgb.hwb=function(e){const t=e[0],r=e[1];let n=e[2];const o=l.rgb.hsl(e)[0],a=1/255*Math.min(t,Math.min(r,n));return n=1-1/255*Math.max(t,Math.max(r,n)),[o,100*a,100*n]},l.rgb.cmyk=function(e){const t=e[0]/255,r=e[1]/255,n=e[2]/255,o=Math.min(1-t,1-r,1-n);return[100*((1-t-o)/(1-o)||0),100*((1-r-o)/(1-o)||0),100*((1-n-o)/(1-o)||0),100*o]},l.rgb.keyword=function(e){const t=o[e];if(t)return t;let r,l=1/0;for(const t of Object.keys(n)){const o=(s=n[t],((a=e)[0]-s[0])**2+(a[1]-s[1])**2+(a[2]-s[2])**2);o<l&&(l=o,r=t)}var a,s;return r},l.keyword.rgb=function(e){return n[e]},l.rgb.xyz=function(e){let t=e[0]/255,r=e[1]/255,n=e[2]/255;return t=t>.04045?((t+.055)/1.055)**2.4:t/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,n=n>.04045?((n+.055)/1.055)**2.4:n/12.92,[100*(.4124*t+.3576*r+.1805*n),100*(.2126*t+.7152*r+.0722*n),100*(.0193*t+.1192*r+.9505*n)]},l.rgb.lab=function(e){const t=l.rgb.xyz(e);let r=t[0],n=t[1],o=t[2];return r/=95.047,n/=100,o/=108.883,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,o=o>.008856?o**(1/3):7.787*o+16/116,[116*n-16,500*(r-n),200*(n-o)]},l.hsl.rgb=function(e){const t=e[0]/360,r=e[1]/100,n=e[2]/100;let o,l,a;if(0===r)return a=255*n,[a,a,a];o=n<.5?n*(1+r):n+r-n*r;const s=2*n-o,i=[0,0,0];for(let e=0;e<3;e++)l=t+1/3*-(e-1),l<0&&l++,l>1&&l--,a=6*l<1?s+6*(o-s)*l:2*l<1?o:3*l<2?s+(o-s)*(2/3-l)*6:s,i[e]=255*a;return i},l.hsl.hsv=function(e){const t=e[0];let r=e[1]/100,n=e[2]/100,o=r;const l=Math.max(n,.01);return n*=2,r*=n<=1?n:2-n,o*=l<=1?l:2-l,[t,100*(0===n?2*o/(l+o):2*r/(n+r)),(n+r)/2*100]},l.hsv.rgb=function(e){const t=e[0]/60,r=e[1]/100;let n=e[2]/100;const o=Math.floor(t)%6,l=t-Math.floor(t),a=255*n*(1-r),s=255*n*(1-r*l),i=255*n*(1-r*(1-l));switch(n*=255,o){case 0:return[n,i,a];case 1:return[s,n,a];case 2:return[a,n,i];case 3:return[a,s,n];case 4:return[i,a,n];case 5:return[n,a,s]}},l.hsv.hsl=function(e){const t=e[0],r=e[1]/100,n=e[2]/100,o=Math.max(n,.01);let l,a;a=(2-r)*n;const s=(2-r)*o;return l=r*o,l/=s<=1?s:2-s,l=l||0,a/=2,[t,100*l,100*a]},l.hwb.rgb=function(e){const t=e[0]/360;let r=e[1]/100,n=e[2]/100;const o=r+n;let l;o>1&&(r/=o,n/=o);const a=Math.floor(6*t),s=1-n;l=6*t-a,1&a&&(l=1-l);const i=r+l*(s-r);let c,u,h;switch(a){default:case 6:case 0:c=s,u=i,h=r;break;case 1:c=i,u=s,h=r;break;case 2:c=r,u=s,h=i;break;case 3:c=r,u=i,h=s;break;case 4:c=i,u=r,h=s;break;case 5:c=s,u=r,h=i}return[255*c,255*u,255*h]},l.cmyk.rgb=function(e){const t=e[0]/100,r=e[1]/100,n=e[2]/100,o=e[3]/100;return[255*(1-Math.min(1,t*(1-o)+o)),255*(1-Math.min(1,r*(1-o)+o)),255*(1-Math.min(1,n*(1-o)+o))]},l.xyz.rgb=function(e){const t=e[0]/100,r=e[1]/100,n=e[2]/100;let o,l,a;return o=3.2406*t+-1.5372*r+-.4986*n,l=-.9689*t+1.8758*r+.0415*n,a=.0557*t+-.204*r+1.057*n,o=o>.0031308?1.055*o**(1/2.4)-.055:12.92*o,l=l>.0031308?1.055*l**(1/2.4)-.055:12.92*l,a=a>.0031308?1.055*a**(1/2.4)-.055:12.92*a,o=Math.min(Math.max(0,o),1),l=Math.min(Math.max(0,l),1),a=Math.min(Math.max(0,a),1),[255*o,255*l,255*a]},l.xyz.lab=function(e){let t=e[0],r=e[1],n=e[2];return t/=95.047,r/=100,n/=108.883,t=t>.008856?t**(1/3):7.787*t+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,[116*r-16,500*(t-r),200*(r-n)]},l.lab.xyz=function(e){let t,r,n;r=(e[0]+16)/116,t=e[1]/500+r,n=r-e[2]/200;const o=r**3,l=t**3,a=n**3;return r=o>.008856?o:(r-16/116)/7.787,t=l>.008856?l:(t-16/116)/7.787,n=a>.008856?a:(n-16/116)/7.787,t*=95.047,r*=100,n*=108.883,[t,r,n]},l.lab.lch=function(e){const t=e[0],r=e[1],n=e[2];let o;return o=360*Math.atan2(n,r)/2/Math.PI,o<0&&(o+=360),[t,Math.sqrt(r*r+n*n),o]},l.lch.lab=function(e){const t=e[0],r=e[1],n=e[2]/360*2*Math.PI;return[t,r*Math.cos(n),r*Math.sin(n)]},l.rgb.ansi16=function(e,t=null){const[r,n,o]=e;let a=null===t?l.rgb.hsv(e)[2]:t;if(a=Math.round(a/50),0===a)return 30;let s=30+(Math.round(o/255)<<2|Math.round(n/255)<<1|Math.round(r/255));return 2===a&&(s+=60),s},l.hsv.ansi16=function(e){return l.rgb.ansi16(l.hsv.rgb(e),e[2])},l.rgb.ansi256=function(e){const t=e[0],r=e[1],n=e[2];return t===r&&r===n?t<8?16:t>248?231:Math.round((t-8)/247*24)+232:16+36*Math.round(t/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)},l.ansi16.rgb=function(e){let t=e%10;if(0===t||7===t)return e>50&&(t+=3.5),t=t/10.5*255,[t,t,t];const r=.5*(1+~~(e>50));return[(1&t)*r*255,(t>>1&1)*r*255,(t>>2&1)*r*255]},l.ansi256.rgb=function(e){if(e>=232){const t=10*(e-232)+8;return[t,t,t]}let t;return e-=16,[Math.floor(e/36)/5*255,Math.floor((t=e%36)/6)/5*255,t%6/5*255]},l.rgb.hex=function(e){const t=(((255&Math.round(e[0]))<<16)+((255&Math.round(e[1]))<<8)+(255&Math.round(e[2]))).toString(16).toUpperCase();return"000000".substring(t.length)+t},l.hex.rgb=function(e){const t=e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!t)return[0,0,0];let r=t[0];3===t[0].length&&(r=r.split("").map((e=>e+e)).join(""));const n=parseInt(r,16);return[n>>16&255,n>>8&255,255&n]},l.rgb.hcg=function(e){const t=e[0]/255,r=e[1]/255,n=e[2]/255,o=Math.max(Math.max(t,r),n),l=Math.min(Math.min(t,r),n),a=o-l;let s,i;return s=a<1?l/(1-a):0,i=a<=0?0:o===t?(r-n)/a%6:o===r?2+(n-t)/a:4+(t-r)/a,i/=6,i%=1,[360*i,100*a,100*s]},l.hsl.hcg=function(e){const t=e[1]/100,r=e[2]/100,n=r<.5?2*t*r:2*t*(1-r);let o=0;return n<1&&(o=(r-.5*n)/(1-n)),[e[0],100*n,100*o]},l.hsv.hcg=function(e){const t=e[1]/100,r=e[2]/100,n=t*r;let o=0;return n<1&&(o=(r-n)/(1-n)),[e[0],100*n,100*o]},l.hcg.rgb=function(e){const t=e[0]/360,r=e[1]/100,n=e[2]/100;if(0===r)return[255*n,255*n,255*n];const o=[0,0,0],l=t%1*6,a=l%1,s=1-a;let i=0;switch(Math.floor(l)){case 0:o[0]=1,o[1]=a,o[2]=0;break;case 1:o[0]=s,o[1]=1,o[2]=0;break;case 2:o[0]=0,o[1]=1,o[2]=a;break;case 3:o[0]=0,o[1]=s,o[2]=1;break;case 4:o[0]=a,o[1]=0,o[2]=1;break;default:o[0]=1,o[1]=0,o[2]=s}return i=(1-r)*n,[255*(r*o[0]+i),255*(r*o[1]+i),255*(r*o[2]+i)]},l.hcg.hsv=function(e){const t=e[1]/100,r=t+e[2]/100*(1-t);let n=0;return r>0&&(n=t/r),[e[0],100*n,100*r]},l.hcg.hsl=function(e){const t=e[1]/100,r=e[2]/100*(1-t)+.5*t;let n=0;return r>0&&r<.5?n=t/(2*r):r>=.5&&r<1&&(n=t/(2*(1-r))),[e[0],100*n,100*r]},l.hcg.hwb=function(e){const t=e[1]/100,r=t+e[2]/100*(1-t);return[e[0],100*(r-t),100*(1-r)]},l.hwb.hcg=function(e){const t=e[1]/100,r=1-e[2]/100,n=r-t;let o=0;return n<1&&(o=(r-n)/(1-n)),[e[0],100*n,100*o]},l.apple.rgb=function(e){return[e[0]/65535*255,e[1]/65535*255,e[2]/65535*255]},l.rgb.apple=function(e){return[e[0]/255*65535,e[1]/255*65535,e[2]/255*65535]},l.gray.rgb=function(e){return[e[0]/100*255,e[0]/100*255,e[0]/100*255]},l.gray.hsl=function(e){return[0,0,e[0]]},l.gray.hsv=l.gray.hsl,l.gray.hwb=function(e){return[0,100,e[0]]},l.gray.cmyk=function(e){return[0,0,0,e[0]]},l.gray.lab=function(e){return[e[0],0,0]},l.gray.hex=function(e){const t=255&Math.round(e[0]/100*255),r=((t<<16)+(t<<8)+t).toString(16).toUpperCase();return"000000".substring(r.length)+r},l.rgb.gray=function(e){return[(e[0]+e[1]+e[2])/3/255*100]}},137:function(e,t,r){const n=r(920),o=r(584),l={};Object.keys(n).forEach((e=>{l[e]={},Object.defineProperty(l[e],"channels",{value:n[e].channels}),Object.defineProperty(l[e],"labels",{value:n[e].labels});const t=o(e);Object.keys(t).forEach((r=>{const n=t[r];l[e][r]=function(e){const t=function(...t){const r=t[0];if(null==r)return r;r.length>1&&(t=r);const n=e(t);if("object"==typeof n)for(let e=n.length,t=0;t<e;t++)n[t]=Math.round(n[t]);return n};return"conversion"in e&&(t.conversion=e.conversion),t}(n),l[e][r].raw=function(e){const t=function(...t){const r=t[0];return null==r?r:(r.length>1&&(t=r),e(t))};return"conversion"in e&&(t.conversion=e.conversion),t}(n)}))})),e.exports=l},584:function(e,t,r){const n=r(920);function o(e,t){return function(r){return t(e(r))}}function l(e,t){const r=[t[e].parent,e];let l=n[t[e].parent][e],a=t[e].parent;for(;t[a].parent;)r.unshift(t[a].parent),l=o(n[t[a].parent][a],l),a=t[a].parent;return l.conversion=r,l}e.exports=function(e){const t=function(e){const t=function(){const e={},t=Object.keys(n);for(let r=t.length,n=0;n<r;n++)e[t[n]]={distance:-1,parent:null};return e}(),r=[e];for(t[e].distance=0;r.length;){const e=r.pop(),o=Object.keys(n[e]);for(let n=o.length,l=0;l<n;l++){const n=o[l],a=t[n];-1===a.distance&&(a.distance=t[e].distance+1,a.parent=e,r.unshift(n))}}return t}(e),r={},o=Object.keys(t);for(let e=o.length,n=0;n<e;n++){const e=o[n];null!==t[e].parent&&(r[e]=l(e,t))}return r}},993:function(e){"use strict";e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},872:function(e,t,r){"use strict";var n=r(496),o=Array.prototype.concat,l=Array.prototype.slice,a=e.exports=function(e){for(var t=[],r=0,a=e.length;r<a;r++){var s=e[r];n(s)?t=o.call(t,l.call(s)):t.push(s)}return t};a.wrap=function(e){return function(){return e(a(arguments))}}},496:function(e){e.exports=function(e){return!(!e||"string"==typeof e)&&(e instanceof Array||Array.isArray(e)||e.length>=0&&(e.splice instanceof Function||Object.getOwnPropertyDescriptor(e,e.length-1)&&"String"!==e.constructor.name))}}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var l=t[n]={exports:{}};return e[n](l,l.exports,r),l.exports}r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";var e=window.ReactJSXRuntime,t=window.wp.blocks,n=window.wp.components,o=window.wp.blockEditor,l=window.wp.i18n,a=window.wp.data,s=window.wp.primitives,i=(0,e.jsx)(s.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,e.jsx)(s.Path,{d:"M17.2 10.9c-.5-1-1.2-2.1-2.1-3.2-.6-.9-1.3-1.7-2.1-2.6L12 4l-1 1.1c-.6.9-1.3 1.7-2 2.6-.8 1.2-1.5 2.3-2 3.2-.6 1.2-1 2.2-1 3 0 3.4 2.7 6.1 6.1 6.1s6.1-2.7 6.1-6.1c0-.8-.3-1.8-1-3zm-5.1 7.6c-2.5 0-4.6-2.1-4.6-4.6 0-.3.1-1 .8-2.3.5-.9 1.1-1.9 2-3.1.7-.9 1.3-1.7 1.8-2.3.7.8 1.3 1.6 1.8 2.3.8 1.1 1.5 2.2 2 3.1.7 1.3.8 2 .8 2.3 0 2.5-2.1 4.6-4.6 4.6z"})}),c=r(520),u=r.n(c),h=function(e,t){try{if(e)t({textColor:u()(e).isDark()?"#ffffff":""})}catch(e){console.error("Invalid color string provided to updateColorAttributes:",e)}},d=function(t){var r,a=t.attributes,s=t.setAttributes,i=t.hex,c=t.useStyle,u=t.customColor,d=void 0!==u&&u,g=t.useTextColor,b=void 0!==g&&g,m=t.overwriteThemeColors,p=void 0!==m&&m,y=t.clearButton,v=void 0!==y&&y,k=(p?null:(0,o.useSettings)("color.palette")[0])||f,w=i?a.color:null===(r=k.find((function(e){return e.slug===a.color})))||void 0===r?void 0:r.color;return(0,e.jsx)(n.PanelBody,{title:(0,l.__)("Color Settings","rrze-elements-blocks"),children:(0,e.jsx)(n.ColorPalette,{colors:k,value:w,onChange:function(e){return function(e,t,r){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],l=arguments.length>5&&void 0!==arguments[5]&&arguments[5],a=e.find((function(e){return e.color===t}));a&&n?(r({color:a.color}),h(t,r),o&&(r({style:a.slug}),h(t,r))):a?r({color:a.slug}):o&&(r({color:t,style:""}),l&&h(t,r))}(k,e,s,i,c,b)},disableCustomColors:!d,clearable:v})})},g=function(t){var r=t.attributes,a=t.setAttributes,s=t.colorData,c=void 0===s?f:s,u=t.useStyle,h=void 0!==u&&u,d=t.hex,g=void 0!==d&&d,b=t.overwriteThemeColors,m=(void 0!==b&&b?null:(0,o.useSettings)("color.palette")[0])||c,p="rrzeElementsBFakColorSelector";return r.color&&(p="rrzeElementsBFakColorSelector ".concat(g?r.color.slice(1):r.color)),(0,e.jsx)(n.ToolbarGroup,{children:(0,e.jsx)(n.ToolbarItem,{children:function(){return(0,e.jsx)(n.ToolbarDropdownMenu,{icon:i,className:p,label:(0,l.__)("Select a Color","rrze-elements-blocks"),controls:m.map((function(e){return{key:e.slug,title:e.name,icon:i,onClick:function(){return a({color:g?e.color:e.slug,style:h?e.slug:""})}}}))})}})})},b=function(t){var r=t.attributes,o=t.setAttributes;return r.borderColor,(0,e.jsx)(n.PanelBody,{title:(0,l.__)("Border Settings","rrze-elements-blocks"),initialOpen:!1,children:(0,e.jsx)(n.ColorPicker,{color:r.borderColor,onChange:function(e){o({borderColor:e})}})})},f=[{color:"#04316A",slug:"",name:(0,l.__)("Central institution","rrze-elements-blocks")},{color:"#C50F3C",slug:"rw",name:(0,l.__)("Faculty of Business, Economics, and Law","rrze-elements-blocks")},{color:"#7bb725",slug:"nat",name:(0,l.__)("Faculty of Sciences","rrze-elements-blocks")},{color:"#18B4F1",slug:"med",name:(0,l.__)("Faculty of Medicine","rrze-elements-blocks")},{color:"#FDB735",slug:"phil",name:(0,l.__)("Faculty of Humanities, Social Sciences, and Theology","rrze-elements-blocks")},{color:"#8C9FB1",slug:"tf",name:(0,l.__)("Faculty of Engineering","rrze-elements-blocks")}],m=([{color:"#fff",slug:"inherit",name:(0,l.__)("Inherit color","rrze-elements-blocks")}].concat(f),function(t){return(0,e.jsx)(d,Object.assign({},t))}),p=function(t){return(0,e.jsx)(g,Object.assign({},t))},y=JSON.parse('{"UU":"rrze-elements/alert"}');(0,t.registerBlockType)(y.UU,{icon:{src:(0,e.jsx)("svg",{id:"Ebene_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:(0,e.jsx)("rect",{x:"75.86",y:"231.31",width:"360.28",height:"49.39",rx:"5.73",ry:"5.73",fillRule:"evenodd",strokeWidth:"0"})})},edit:function(t){t.blockProps;var r=t.attributes,s=t.setAttributes,i=(0,o.useBlockProps)(),c=[{color:"#e9edf2",slug:"default",name:(0,l.__)("Default","rrze-elements-blocks")},{color:"#dff0d8",slug:"success",name:(0,l.__)("Success","rrze-elements-blocks")},{color:"#d9edf7",slug:"info",name:(0,l.__)("Info","rrze-elements-blocks")},{color:"#fcf8e3",slug:"warning",name:(0,l.__)("Warning","rrze-elements-blocks")},{color:"#f2dede",slug:"danger",name:(0,l.__)("Danger","rrze-elements-blocks")}],u=r.borderColor?{border:"1px solid ".concat(r.borderColor)}:{};"example"===r.style&&(u={border:"1px dashed var(--color-TextLight, #707070)"});var h=(0,a.useDispatch)(o.store).__unstableMarkNextChangeAsNotPersistent;return(0,e.jsxs)("div",Object.assign({},i,{children:[(0,e.jsxs)(o.InspectorControls,{children:[(0,e.jsx)(m,{attributes:{color:r.color},setAttributes:s,colorData:c,hex:!0,useStyle:!0,customColor:!1,useTextColor:!0}),(0,e.jsx)(o.ContrastChecker,{textColor:r.textColor,backgroundColor:r.color}),r.style?null:(0,e.jsx)(b,{attributes:{color:r.borderColor},setAttributes:s}),(0,e.jsxs)(n.PanelBody,{title:(0,l.__)("Label settings","rrze-elements-blocks"),initialOpen:!0,children:[(0,e.jsx)(n.__experimentalSpacer,{children:(0,e.jsx)(n.__experimentalText,{children:(0,l.__)("Add a Label for your Alert. This changes the style to example","rrze-elements-blocks")})}),(0,e.jsx)(n.TextControl,{value:r.title,onChange:function(e){""===e?(h(),s({title:"",style:"default"})):(h(),s({title:e,style:"example"}))},placeholder:(0,l.__)("Add a Label","rrze-elements-blocks"),className:"elements-blocks-input-following-icon"})]})]}),(0,e.jsx)(o.BlockControls,{children:(0,e.jsx)(p,{attributes:{color:r.color,style:r.style},setAttributes:s,colorData:c,hex:!0,useStyle:!0})}),(0,e.jsx)("div",{className:"alert clearfix clear ".concat(r.style?"alert-".concat(r.style):""),style:Object.assign(Object.assign({},r.style?{}:{backgroundColor:r.color,color:r.textColor}),u),title:r.title,children:(0,e.jsx)(o.InnerBlocks,{template:[["core/paragraph",{placeholder:(0,l.__)("Add a description…","rrze-elements-blocks")}]],allowedBlocks:["core/paragraph","core/heading","core/list"],templateLock:!1})})]}))},save:function(t){var r=t.attributes,n=o.useBlockProps.save();return(0,e.jsx)("div",Object.assign({},n,{children:(0,e.jsx)("div",{className:"alert clearfix clear ".concat(r.style?"alert-".concat(r.style):""),style:function(){if(r.style)return{};var e={backgroundColor:r.color,color:r.textColor};return r.borderColor&&(e.border="1px solid ".concat(r.borderColor)),e}(),title:function(){if(r.title&&"example"===r.style)return r.title.replace(/"/g,"&quot;")}(),children:(0,e.jsx)(o.InnerBlocks.Content,{})})}))},transforms:{from:[{type:"shortcode",tag:"alert",attributes:{style:{type:"string",shortcode:function(e){return["success","danger","default","info","warning"].includes(e.named.style)?e.named.style:"info"}},content:{type:"string",shortcode:function(e,t){return t.content}}},transform:function(e,r){var n,o=null===(n=r.shortcode)||void 0===n?void 0:n.content,l=(0,t.createBlock)("core/freeform",{content:o});return(0,t.createBlock)(y.UU,{style:function(e){switch(e){case"success":return"success";case"danger":return"danger";case"default":return"default";case"info":return"info";case"warning":return"warning";case"example":return"example";default:return""}}(e.named.style),title:e.named.title},[l])}}]}})}()}();