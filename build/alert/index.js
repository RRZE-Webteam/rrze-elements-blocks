!function(){var e={874:function(e){"use strict";e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},818:function(e,r,t){var n=t(874),o=t(851),l=Object.hasOwnProperty,a=Object.create(null);for(var s in n)l.call(n,s)&&(a[n[s]]=s);var i=e.exports={to:{},get:{}};function c(e,r,t){return Math.min(Math.max(r,e),t)}function u(e){var r=Math.round(e).toString(16).toUpperCase();return r.length<2?"0"+r:r}i.get=function(e){var r,t;switch(e.substring(0,3).toLowerCase()){case"hsl":r=i.get.hsl(e),t="hsl";break;case"hwb":r=i.get.hwb(e),t="hwb";break;default:r=i.get.rgb(e),t="rgb"}return r?{model:t,value:r}:null},i.get.rgb=function(e){if(!e)return null;var r,t,o,a=[0,0,0,1];if(r=e.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)){for(o=r[2],r=r[1],t=0;t<3;t++){var s=2*t;a[t]=parseInt(r.slice(s,s+2),16)}o&&(a[3]=parseInt(o,16)/255)}else if(r=e.match(/^#([a-f0-9]{3,4})$/i)){for(o=(r=r[1])[3],t=0;t<3;t++)a[t]=parseInt(r[t]+r[t],16);o&&(a[3]=parseInt(o+o,16)/255)}else if(r=e.match(/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)){for(t=0;t<3;t++)a[t]=parseInt(r[t+1],0);r[4]&&(r[5]?a[3]=.01*parseFloat(r[4]):a[3]=parseFloat(r[4]))}else{if(!(r=e.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)))return(r=e.match(/^(\w+)$/))?"transparent"===r[1]?[0,0,0,0]:l.call(n,r[1])?((a=n[r[1]])[3]=1,a):null:null;for(t=0;t<3;t++)a[t]=Math.round(2.55*parseFloat(r[t+1]));r[4]&&(r[5]?a[3]=.01*parseFloat(r[4]):a[3]=parseFloat(r[4]))}for(t=0;t<3;t++)a[t]=c(a[t],0,255);return a[3]=c(a[3],0,1),a},i.get.hsl=function(e){if(!e)return null;var r=e.match(/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);if(r){var t=parseFloat(r[4]);return[(parseFloat(r[1])%360+360)%360,c(parseFloat(r[2]),0,100),c(parseFloat(r[3]),0,100),c(isNaN(t)?1:t,0,1)]}return null},i.get.hwb=function(e){if(!e)return null;var r=e.match(/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);if(r){var t=parseFloat(r[4]);return[(parseFloat(r[1])%360+360)%360,c(parseFloat(r[2]),0,100),c(parseFloat(r[3]),0,100),c(isNaN(t)?1:t,0,1)]}return null},i.to.hex=function(){var e=o(arguments);return"#"+u(e[0])+u(e[1])+u(e[2])+(e[3]<1?u(Math.round(255*e[3])):"")},i.to.rgb=function(){var e=o(arguments);return e.length<4||1===e[3]?"rgb("+Math.round(e[0])+", "+Math.round(e[1])+", "+Math.round(e[2])+")":"rgba("+Math.round(e[0])+", "+Math.round(e[1])+", "+Math.round(e[2])+", "+e[3]+")"},i.to.rgb.percent=function(){var e=o(arguments),r=Math.round(e[0]/255*100),t=Math.round(e[1]/255*100),n=Math.round(e[2]/255*100);return e.length<4||1===e[3]?"rgb("+r+"%, "+t+"%, "+n+"%)":"rgba("+r+"%, "+t+"%, "+n+"%, "+e[3]+")"},i.to.hsl=function(){var e=o(arguments);return e.length<4||1===e[3]?"hsl("+e[0]+", "+e[1]+"%, "+e[2]+"%)":"hsla("+e[0]+", "+e[1]+"%, "+e[2]+"%, "+e[3]+")"},i.to.hwb=function(){var e=o(arguments),r="";return e.length>=4&&1!==e[3]&&(r=", "+e[3]),"hwb("+e[0]+", "+e[1]+"%, "+e[2]+"%"+r+")"},i.to.keyword=function(e){return a[e.slice(0,3)]}},767:function(e,r,t){const n=t(818),o=t(978),l=["keyword","gray","hex"],a={};for(const e of Object.keys(o))a[[...o[e].labels].sort().join("")]=e;const s={};function i(e,r){if(!(this instanceof i))return new i(e,r);if(r&&r in l&&(r=null),r&&!(r in o))throw new Error("Unknown model: "+r);let t,c;if(null==e)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(e instanceof i)this.model=e.model,this.color=[...e.color],this.valpha=e.valpha;else if("string"==typeof e){const r=n.get(e);if(null===r)throw new Error("Unable to parse color from string: "+e);this.model=r.model,c=o[this.model].channels,this.color=r.value.slice(0,c),this.valpha="number"==typeof r.value[c]?r.value[c]:1}else if(e.length>0){this.model=r||"rgb",c=o[this.model].channels;const t=Array.prototype.slice.call(e,0,c);this.color=d(t,c),this.valpha="number"==typeof e[c]?e[c]:1}else if("number"==typeof e)this.model="rgb",this.color=[e>>16&255,e>>8&255,255&e],this.valpha=1;else{this.valpha=1;const r=Object.keys(e);"alpha"in e&&(r.splice(r.indexOf("alpha"),1),this.valpha="number"==typeof e.alpha?e.alpha:0);const n=r.sort().join("");if(!(n in a))throw new Error("Unable to parse color from object: "+JSON.stringify(e));this.model=a[n];const{labels:l}=o[this.model],s=[];for(t=0;t<l.length;t++)s.push(e[l[t]]);this.color=d(s)}if(s[this.model])for(c=o[this.model].channels,t=0;t<c;t++){const e=s[this.model][t];e&&(this.color[t]=e(this.color[t]))}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}i.prototype={toString(){return this.string()},toJSON(){return this[this.model]()},string(e){let r=this.model in n.to?this:this.rgb();r=r.round("number"==typeof e?e:1);const t=1===r.valpha?r.color:[...r.color,this.valpha];return n.to[r.model](t)},percentString(e){const r=this.rgb().round("number"==typeof e?e:1),t=1===r.valpha?r.color:[...r.color,this.valpha];return n.to.rgb.percent(t)},array(){return 1===this.valpha?[...this.color]:[...this.color,this.valpha]},object(){const e={},{channels:r}=o[this.model],{labels:t}=o[this.model];for(let n=0;n<r;n++)e[t[n]]=this.color[n];return 1!==this.valpha&&(e.alpha=this.valpha),e},unitArray(){const e=this.rgb().color;return e[0]/=255,e[1]/=255,e[2]/=255,1!==this.valpha&&e.push(this.valpha),e},unitObject(){const e=this.rgb().object();return e.r/=255,e.g/=255,e.b/=255,1!==this.valpha&&(e.alpha=this.valpha),e},round(e){return e=Math.max(e||0,0),new i([...this.color.map(c(e)),this.valpha],this.model)},alpha(e){return void 0!==e?new i([...this.color,Math.max(0,Math.min(1,e))],this.model):this.valpha},red:u("rgb",0,h(255)),green:u("rgb",1,h(255)),blue:u("rgb",2,h(255)),hue:u(["hsl","hsv","hsl","hwb","hcg"],0,(e=>(e%360+360)%360)),saturationl:u("hsl",1,h(100)),lightness:u("hsl",2,h(100)),saturationv:u("hsv",1,h(100)),value:u("hsv",2,h(100)),chroma:u("hcg",1,h(100)),gray:u("hcg",2,h(100)),white:u("hwb",1,h(100)),wblack:u("hwb",2,h(100)),cyan:u("cmyk",0,h(100)),magenta:u("cmyk",1,h(100)),yellow:u("cmyk",2,h(100)),black:u("cmyk",3,h(100)),x:u("xyz",0,h(95.047)),y:u("xyz",1,h(100)),z:u("xyz",2,h(108.833)),l:u("lab",0,h(100)),a:u("lab",1),b:u("lab",2),keyword(e){return void 0!==e?new i(e):o[this.model].keyword(this.color)},hex(e){return void 0!==e?new i(e):n.to.hex(this.rgb().round().color)},hexa(e){if(void 0!==e)return new i(e);const r=this.rgb().round().color;let t=Math.round(255*this.valpha).toString(16).toUpperCase();return 1===t.length&&(t="0"+t),n.to.hex(r)+t},rgbNumber(){const e=this.rgb().color;return(255&e[0])<<16|(255&e[1])<<8|255&e[2]},luminosity(){const e=this.rgb().color,r=[];for(const[t,n]of e.entries()){const e=n/255;r[t]=e<=.04045?e/12.92:((e+.055)/1.055)**2.4}return.2126*r[0]+.7152*r[1]+.0722*r[2]},contrast(e){const r=this.luminosity(),t=e.luminosity();return r>t?(r+.05)/(t+.05):(t+.05)/(r+.05)},level(e){const r=this.contrast(e);return r>=7?"AAA":r>=4.5?"AA":""},isDark(){const e=this.rgb().color;return(2126*e[0]+7152*e[1]+722*e[2])/1e4<128},isLight(){return!this.isDark()},negate(){const e=this.rgb();for(let r=0;r<3;r++)e.color[r]=255-e.color[r];return e},lighten(e){const r=this.hsl();return r.color[2]+=r.color[2]*e,r},darken(e){const r=this.hsl();return r.color[2]-=r.color[2]*e,r},saturate(e){const r=this.hsl();return r.color[1]+=r.color[1]*e,r},desaturate(e){const r=this.hsl();return r.color[1]-=r.color[1]*e,r},whiten(e){const r=this.hwb();return r.color[1]+=r.color[1]*e,r},blacken(e){const r=this.hwb();return r.color[2]+=r.color[2]*e,r},grayscale(){const e=this.rgb().color,r=.3*e[0]+.59*e[1]+.11*e[2];return i.rgb(r,r,r)},fade(e){return this.alpha(this.valpha-this.valpha*e)},opaquer(e){return this.alpha(this.valpha+this.valpha*e)},rotate(e){const r=this.hsl();let t=r.color[0];return t=(t+e)%360,t=t<0?360+t:t,r.color[0]=t,r},mix(e,r){if(!e||!e.rgb)throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+typeof e);const t=e.rgb(),n=this.rgb(),o=void 0===r?.5:r,l=2*o-1,a=t.alpha()-n.alpha(),s=((l*a==-1?l:(l+a)/(1+l*a))+1)/2,c=1-s;return i.rgb(s*t.red()+c*n.red(),s*t.green()+c*n.green(),s*t.blue()+c*n.blue(),t.alpha()*o+n.alpha()*(1-o))}};for(const e of Object.keys(o)){if(l.includes(e))continue;const{channels:r}=o[e];i.prototype[e]=function(...r){return this.model===e?new i(this):r.length>0?new i(r,e):new i([...(t=o[this.model][e].raw(this.color),Array.isArray(t)?t:[t]),this.valpha],e);var t},i[e]=function(...t){let n=t[0];return"number"==typeof n&&(n=d(t,r)),new i(n,e)}}function c(e){return function(r){return function(e,r){return Number(e.toFixed(r))}(r,e)}}function u(e,r,t){e=Array.isArray(e)?e:[e];for(const n of e)(s[n]||(s[n]=[]))[r]=t;return e=e[0],function(n){let o;return void 0!==n?(t&&(n=t(n)),o=this[e](),o.color[r]=n,o):(o=this[e]().color[r],t&&(o=t(o)),o)}}function h(e){return function(r){return Math.max(0,Math.min(e,r))}}function d(e,r){for(let t=0;t<r;t++)"number"!=typeof e[t]&&(e[t]=0);return e}e.exports=i},956:function(e,r,t){const n=t(900),o={};for(const e of Object.keys(n))o[n[e]]=e;const l={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};e.exports=l;for(const e of Object.keys(l)){if(!("channels"in l[e]))throw new Error("missing channels property: "+e);if(!("labels"in l[e]))throw new Error("missing channel labels property: "+e);if(l[e].labels.length!==l[e].channels)throw new Error("channel and label counts mismatch: "+e);const{channels:r,labels:t}=l[e];delete l[e].channels,delete l[e].labels,Object.defineProperty(l[e],"channels",{value:r}),Object.defineProperty(l[e],"labels",{value:t})}l.rgb.hsl=function(e){const r=e[0]/255,t=e[1]/255,n=e[2]/255,o=Math.min(r,t,n),l=Math.max(r,t,n),a=l-o;let s,i;l===o?s=0:r===l?s=(t-n)/a:t===l?s=2+(n-r)/a:n===l&&(s=4+(r-t)/a),s=Math.min(60*s,360),s<0&&(s+=360);const c=(o+l)/2;return i=l===o?0:c<=.5?a/(l+o):a/(2-l-o),[s,100*i,100*c]},l.rgb.hsv=function(e){let r,t,n,o,l;const a=e[0]/255,s=e[1]/255,i=e[2]/255,c=Math.max(a,s,i),u=c-Math.min(a,s,i),h=function(e){return(c-e)/6/u+.5};return 0===u?(o=0,l=0):(l=u/c,r=h(a),t=h(s),n=h(i),a===c?o=n-t:s===c?o=1/3+r-n:i===c&&(o=2/3+t-r),o<0?o+=1:o>1&&(o-=1)),[360*o,100*l,100*c]},l.rgb.hwb=function(e){const r=e[0],t=e[1];let n=e[2];const o=l.rgb.hsl(e)[0],a=1/255*Math.min(r,Math.min(t,n));return n=1-1/255*Math.max(r,Math.max(t,n)),[o,100*a,100*n]},l.rgb.cmyk=function(e){const r=e[0]/255,t=e[1]/255,n=e[2]/255,o=Math.min(1-r,1-t,1-n);return[100*((1-r-o)/(1-o)||0),100*((1-t-o)/(1-o)||0),100*((1-n-o)/(1-o)||0),100*o]},l.rgb.keyword=function(e){const r=o[e];if(r)return r;let t,l=1/0;for(const r of Object.keys(n)){const o=(s=n[r],((a=e)[0]-s[0])**2+(a[1]-s[1])**2+(a[2]-s[2])**2);o<l&&(l=o,t=r)}var a,s;return t},l.keyword.rgb=function(e){return n[e]},l.rgb.xyz=function(e){let r=e[0]/255,t=e[1]/255,n=e[2]/255;return r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,t=t>.04045?((t+.055)/1.055)**2.4:t/12.92,n=n>.04045?((n+.055)/1.055)**2.4:n/12.92,[100*(.4124*r+.3576*t+.1805*n),100*(.2126*r+.7152*t+.0722*n),100*(.0193*r+.1192*t+.9505*n)]},l.rgb.lab=function(e){const r=l.rgb.xyz(e);let t=r[0],n=r[1],o=r[2];return t/=95.047,n/=100,o/=108.883,t=t>.008856?t**(1/3):7.787*t+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,o=o>.008856?o**(1/3):7.787*o+16/116,[116*n-16,500*(t-n),200*(n-o)]},l.hsl.rgb=function(e){const r=e[0]/360,t=e[1]/100,n=e[2]/100;let o,l,a;if(0===t)return a=255*n,[a,a,a];o=n<.5?n*(1+t):n+t-n*t;const s=2*n-o,i=[0,0,0];for(let e=0;e<3;e++)l=r+1/3*-(e-1),l<0&&l++,l>1&&l--,a=6*l<1?s+6*(o-s)*l:2*l<1?o:3*l<2?s+(o-s)*(2/3-l)*6:s,i[e]=255*a;return i},l.hsl.hsv=function(e){const r=e[0];let t=e[1]/100,n=e[2]/100,o=t;const l=Math.max(n,.01);return n*=2,t*=n<=1?n:2-n,o*=l<=1?l:2-l,[r,100*(0===n?2*o/(l+o):2*t/(n+t)),(n+t)/2*100]},l.hsv.rgb=function(e){const r=e[0]/60,t=e[1]/100;let n=e[2]/100;const o=Math.floor(r)%6,l=r-Math.floor(r),a=255*n*(1-t),s=255*n*(1-t*l),i=255*n*(1-t*(1-l));switch(n*=255,o){case 0:return[n,i,a];case 1:return[s,n,a];case 2:return[a,n,i];case 3:return[a,s,n];case 4:return[i,a,n];case 5:return[n,a,s]}},l.hsv.hsl=function(e){const r=e[0],t=e[1]/100,n=e[2]/100,o=Math.max(n,.01);let l,a;a=(2-t)*n;const s=(2-t)*o;return l=t*o,l/=s<=1?s:2-s,l=l||0,a/=2,[r,100*l,100*a]},l.hwb.rgb=function(e){const r=e[0]/360;let t=e[1]/100,n=e[2]/100;const o=t+n;let l;o>1&&(t/=o,n/=o);const a=Math.floor(6*r),s=1-n;l=6*r-a,0!=(1&a)&&(l=1-l);const i=t+l*(s-t);let c,u,h;switch(a){default:case 6:case 0:c=s,u=i,h=t;break;case 1:c=i,u=s,h=t;break;case 2:c=t,u=s,h=i;break;case 3:c=t,u=i,h=s;break;case 4:c=i,u=t,h=s;break;case 5:c=s,u=t,h=i}return[255*c,255*u,255*h]},l.cmyk.rgb=function(e){const r=e[0]/100,t=e[1]/100,n=e[2]/100,o=e[3]/100;return[255*(1-Math.min(1,r*(1-o)+o)),255*(1-Math.min(1,t*(1-o)+o)),255*(1-Math.min(1,n*(1-o)+o))]},l.xyz.rgb=function(e){const r=e[0]/100,t=e[1]/100,n=e[2]/100;let o,l,a;return o=3.2406*r+-1.5372*t+-.4986*n,l=-.9689*r+1.8758*t+.0415*n,a=.0557*r+-.204*t+1.057*n,o=o>.0031308?1.055*o**(1/2.4)-.055:12.92*o,l=l>.0031308?1.055*l**(1/2.4)-.055:12.92*l,a=a>.0031308?1.055*a**(1/2.4)-.055:12.92*a,o=Math.min(Math.max(0,o),1),l=Math.min(Math.max(0,l),1),a=Math.min(Math.max(0,a),1),[255*o,255*l,255*a]},l.xyz.lab=function(e){let r=e[0],t=e[1],n=e[2];return r/=95.047,t/=100,n/=108.883,r=r>.008856?r**(1/3):7.787*r+16/116,t=t>.008856?t**(1/3):7.787*t+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,[116*t-16,500*(r-t),200*(t-n)]},l.lab.xyz=function(e){let r,t,n;t=(e[0]+16)/116,r=e[1]/500+t,n=t-e[2]/200;const o=t**3,l=r**3,a=n**3;return t=o>.008856?o:(t-16/116)/7.787,r=l>.008856?l:(r-16/116)/7.787,n=a>.008856?a:(n-16/116)/7.787,r*=95.047,t*=100,n*=108.883,[r,t,n]},l.lab.lch=function(e){const r=e[0],t=e[1],n=e[2];let o;return o=360*Math.atan2(n,t)/2/Math.PI,o<0&&(o+=360),[r,Math.sqrt(t*t+n*n),o]},l.lch.lab=function(e){const r=e[0],t=e[1],n=e[2]/360*2*Math.PI;return[r,t*Math.cos(n),t*Math.sin(n)]},l.rgb.ansi16=function(e,r=null){const[t,n,o]=e;let a=null===r?l.rgb.hsv(e)[2]:r;if(a=Math.round(a/50),0===a)return 30;let s=30+(Math.round(o/255)<<2|Math.round(n/255)<<1|Math.round(t/255));return 2===a&&(s+=60),s},l.hsv.ansi16=function(e){return l.rgb.ansi16(l.hsv.rgb(e),e[2])},l.rgb.ansi256=function(e){const r=e[0],t=e[1],n=e[2];return r===t&&t===n?r<8?16:r>248?231:Math.round((r-8)/247*24)+232:16+36*Math.round(r/255*5)+6*Math.round(t/255*5)+Math.round(n/255*5)},l.ansi16.rgb=function(e){let r=e%10;if(0===r||7===r)return e>50&&(r+=3.5),r=r/10.5*255,[r,r,r];const t=.5*(1+~~(e>50));return[(1&r)*t*255,(r>>1&1)*t*255,(r>>2&1)*t*255]},l.ansi256.rgb=function(e){if(e>=232){const r=10*(e-232)+8;return[r,r,r]}let r;return e-=16,[Math.floor(e/36)/5*255,Math.floor((r=e%36)/6)/5*255,r%6/5*255]},l.rgb.hex=function(e){const r=(((255&Math.round(e[0]))<<16)+((255&Math.round(e[1]))<<8)+(255&Math.round(e[2]))).toString(16).toUpperCase();return"000000".substring(r.length)+r},l.hex.rgb=function(e){const r=e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!r)return[0,0,0];let t=r[0];3===r[0].length&&(t=t.split("").map((e=>e+e)).join(""));const n=parseInt(t,16);return[n>>16&255,n>>8&255,255&n]},l.rgb.hcg=function(e){const r=e[0]/255,t=e[1]/255,n=e[2]/255,o=Math.max(Math.max(r,t),n),l=Math.min(Math.min(r,t),n),a=o-l;let s,i;return s=a<1?l/(1-a):0,i=a<=0?0:o===r?(t-n)/a%6:o===t?2+(n-r)/a:4+(r-t)/a,i/=6,i%=1,[360*i,100*a,100*s]},l.hsl.hcg=function(e){const r=e[1]/100,t=e[2]/100,n=t<.5?2*r*t:2*r*(1-t);let o=0;return n<1&&(o=(t-.5*n)/(1-n)),[e[0],100*n,100*o]},l.hsv.hcg=function(e){const r=e[1]/100,t=e[2]/100,n=r*t;let o=0;return n<1&&(o=(t-n)/(1-n)),[e[0],100*n,100*o]},l.hcg.rgb=function(e){const r=e[0]/360,t=e[1]/100,n=e[2]/100;if(0===t)return[255*n,255*n,255*n];const o=[0,0,0],l=r%1*6,a=l%1,s=1-a;let i=0;switch(Math.floor(l)){case 0:o[0]=1,o[1]=a,o[2]=0;break;case 1:o[0]=s,o[1]=1,o[2]=0;break;case 2:o[0]=0,o[1]=1,o[2]=a;break;case 3:o[0]=0,o[1]=s,o[2]=1;break;case 4:o[0]=a,o[1]=0,o[2]=1;break;default:o[0]=1,o[1]=0,o[2]=s}return i=(1-t)*n,[255*(t*o[0]+i),255*(t*o[1]+i),255*(t*o[2]+i)]},l.hcg.hsv=function(e){const r=e[1]/100,t=r+e[2]/100*(1-r);let n=0;return t>0&&(n=r/t),[e[0],100*n,100*t]},l.hcg.hsl=function(e){const r=e[1]/100,t=e[2]/100*(1-r)+.5*r;let n=0;return t>0&&t<.5?n=r/(2*t):t>=.5&&t<1&&(n=r/(2*(1-t))),[e[0],100*n,100*t]},l.hcg.hwb=function(e){const r=e[1]/100,t=r+e[2]/100*(1-r);return[e[0],100*(t-r),100*(1-t)]},l.hwb.hcg=function(e){const r=e[1]/100,t=1-e[2]/100,n=t-r;let o=0;return n<1&&(o=(t-n)/(1-n)),[e[0],100*n,100*o]},l.apple.rgb=function(e){return[e[0]/65535*255,e[1]/65535*255,e[2]/65535*255]},l.rgb.apple=function(e){return[e[0]/255*65535,e[1]/255*65535,e[2]/255*65535]},l.gray.rgb=function(e){return[e[0]/100*255,e[0]/100*255,e[0]/100*255]},l.gray.hsl=function(e){return[0,0,e[0]]},l.gray.hsv=l.gray.hsl,l.gray.hwb=function(e){return[0,100,e[0]]},l.gray.cmyk=function(e){return[0,0,0,e[0]]},l.gray.lab=function(e){return[e[0],0,0]},l.gray.hex=function(e){const r=255&Math.round(e[0]/100*255),t=((r<<16)+(r<<8)+r).toString(16).toUpperCase();return"000000".substring(t.length)+t},l.rgb.gray=function(e){return[(e[0]+e[1]+e[2])/3/255*100]}},978:function(e,r,t){const n=t(956),o=t(774),l={};Object.keys(n).forEach((e=>{l[e]={},Object.defineProperty(l[e],"channels",{value:n[e].channels}),Object.defineProperty(l[e],"labels",{value:n[e].labels});const r=o(e);Object.keys(r).forEach((t=>{const n=r[t];l[e][t]=function(e){const r=function(...r){const t=r[0];if(null==t)return t;t.length>1&&(r=t);const n=e(r);if("object"==typeof n)for(let e=n.length,r=0;r<e;r++)n[r]=Math.round(n[r]);return n};return"conversion"in e&&(r.conversion=e.conversion),r}(n),l[e][t].raw=function(e){const r=function(...r){const t=r[0];return null==t?t:(t.length>1&&(r=t),e(r))};return"conversion"in e&&(r.conversion=e.conversion),r}(n)}))})),e.exports=l},774:function(e,r,t){const n=t(956);function o(e,r){return function(t){return r(e(t))}}function l(e,r){const t=[r[e].parent,e];let l=n[r[e].parent][e],a=r[e].parent;for(;r[a].parent;)t.unshift(r[a].parent),l=o(n[r[a].parent][a],l),a=r[a].parent;return l.conversion=t,l}e.exports=function(e){const r=function(e){const r=function(){const e={},r=Object.keys(n);for(let t=r.length,n=0;n<t;n++)e[r[n]]={distance:-1,parent:null};return e}(),t=[e];for(r[e].distance=0;t.length;){const e=t.pop(),o=Object.keys(n[e]);for(let n=o.length,l=0;l<n;l++){const n=o[l],a=r[n];-1===a.distance&&(a.distance=r[e].distance+1,a.parent=e,t.unshift(n))}}return r}(e),t={},o=Object.keys(r);for(let e=o.length,n=0;n<e;n++){const e=o[n];null!==r[e].parent&&(t[e]=l(e,r))}return t}},900:function(e){"use strict";e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},251:function(e,r,t){"use strict";var n=t(196),o=Symbol.for("react.element"),l=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),a=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function i(e,r,t){var n,i={},c=null,u=null;for(n in void 0!==t&&(c=""+t),void 0!==r.key&&(c=""+r.key),void 0!==r.ref&&(u=r.ref),r)l.call(r,n)&&!s.hasOwnProperty(n)&&(i[n]=r[n]);if(e&&e.defaultProps)for(n in r=e.defaultProps)void 0===i[n]&&(i[n]=r[n]);return{$$typeof:o,type:e,key:c,ref:u,props:i,_owner:a.current}}r.jsx=i,r.jsxs=i},893:function(e,r,t){"use strict";e.exports=t(251)},851:function(e,r,t){"use strict";var n=t(594),o=Array.prototype.concat,l=Array.prototype.slice,a=e.exports=function(e){for(var r=[],t=0,a=e.length;t<a;t++){var s=e[t];n(s)?r=o.call(r,l.call(s)):r.push(s)}return r};a.wrap=function(e){return function(){return e(a(arguments))}}},594:function(e){e.exports=function(e){return!(!e||"string"==typeof e)&&(e instanceof Array||Array.isArray(e)||e.length>=0&&(e.splice instanceof Function||Object.getOwnPropertyDescriptor(e,e.length-1)&&"String"!==e.constructor.name))}},196:function(e){"use strict";e.exports=window.React}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var l=r[n]={exports:{}};return e[n](l,l.exports,t),l.exports}t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,{a:r}),r},t.d=function(e,r){for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},function(){"use strict";var e=window.wp.blocks,r=t(893),n=window.wp.blockEditor,o=window.wp.i18n,l=window.wp.components,a=t(767),s=t.n(a),i=t(196),c=window.wp.primitives,u=(0,i.createElement)(c.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,i.createElement)(c.Path,{d:"M17.2 10.9c-.5-1-1.2-2.1-2.1-3.2-.6-.9-1.3-1.7-2.1-2.6L12 4l-1 1.1c-.6.9-1.3 1.7-2 2.6-.8 1.2-1.5 2.3-2 3.2-.6 1.2-1 2.2-1 3 0 3.4 2.7 6.1 6.1 6.1s6.1-2.7 6.1-6.1c0-.8-.3-1.8-1-3zm-5.1 7.6c-2.5 0-4.6-2.1-4.6-4.6 0-.3.1-1 .8-2.3.5-.9 1.1-1.9 2-3.1.7-.9 1.3-1.7 1.8-2.3.7.8 1.3 1.6 1.8 2.3.8 1.1 1.5 2.2 2 3.1.7 1.3.8 2 .8 2.3 0 2.5-2.1 4.6-4.6 4.6z"})),h=function(e,r){try{if(console.log(e),e){var t=s()(e).isDark();console.log(t),r({textColor:t?"#ffffff":""})}}catch(e){console.error("Invalid color string provided to updateColorAttributes:",e)}},d=[{color:"#e9edf2",slug:"default",name:(0,o.__)("Default","rrze-elements-b")},{color:"#dff0d8",slug:"success",name:(0,o.__)("Success","rrze-elements-b")},{color:"#d9edf7",slug:"info",name:(0,o.__)("Info","rrze-elements-b")},{color:"#fcf8e3",slug:"warning",name:(0,o.__)("Warning","rrze-elements-b")},{color:"#f2dede",slug:"danger",name:(0,o.__)("Danger","rrze-elements-b")}],g=function(e){var t=e.attributes,n=e.setAttributes;return t.color,(0,r.jsx)(l.PanelBody,{title:(0,o.__)("Color Settings","rrze-elements-b"),children:(0,r.jsx)(l.ColorPalette,{colors:d,value:t.color,onChange:function(e){var r=d.find((function(r){return r.color===e}));r?(n({color:e,style:r.slug}),h(e,n)):(n({color:e,style:""}),h(e,n))},disableCustomColors:!1,clearable:!1})})},b=function(e){var t=e.attributes,n=e.setAttributes;return t.color,(0,r.jsx)(l.ToolbarGroup,{children:(0,r.jsx)(l.ToolbarItem,{children:function(){return(0,r.jsx)(l.ToolbarDropdownMenu,{icon:u,className:"rrzeElementsBFakColorSelector ".concat(t.color.slice(1)),label:(0,o.__)("Select a Color","rrze-elements-b"),controls:d.map((function(e){return{key:e.slug,title:e.name,icon:u,onClick:function(){return r=e.color,t=d.find((function(e){return e.color===r})),void n(t?{color:r,style:t.slug}:{color:r,style:""});var r,t}}}))})}})})},f=function(e){var t=e.attributes,n=e.setAttributes;return t.borderColor,(0,r.jsx)(l.PanelBody,{title:(0,o.__)("Border Settings","rrze-elements-b"),children:(0,r.jsx)(l.ColorPicker,{color:t.borderColor,onChange:function(e){d.find((function(r){return r.color===e})),n({borderColor:e})}})})},p=JSON.parse('{"u2":"rrze-elements/alert"}');(0,e.registerBlockType)(p.u2,{icon:{src:"minus",background:"#00458c"},edit:function(e){e.blockProps;var t=e.attributes,l=e.setAttributes,a=(0,n.useBlockProps)();return(0,r.jsxs)("div",Object.assign({},a,{children:[(0,r.jsxs)(n.InspectorControls,{children:[(0,r.jsx)(g,{attributes:{color:t.color,style:t.style},setAttributes:l}),t.style?null:(0,r.jsx)(f,{attributes:{color:t.color,style:t.style},setAttributes:l})]}),(0,r.jsx)(n.BlockControls,{controls:!0,children:(0,r.jsx)(b,{attributes:{color:t.color,style:t.style},setAttributes:l})}),(0,r.jsx)("div",{className:"alert clearfix clear ".concat(t.style?"alert-".concat(t.style):""),style:t.style?{}:{backgroundColor:t.color,color:t.textColor,border:"1px solid ".concat(t.borderColor)},children:(0,r.jsx)(n.InnerBlocks,{template:[["core/paragraph",{placeholder:(0,o.__)("Add a description…")}]],allowedBlocks:["core/paragraph"],templateLock:!1})})]}))},save:function(e){var r=e.attributes,t=n.useBlockProps.save();return r.sameBlockCount,r.style,React.createElement("div",t," ",React.createElement(React.Fragment,null,React.createElement("div",{className:"alert clearfix clear ".concat(r.style?"alert-".concat(r.style):""),style:r.style?{}:{backgroundColor:r.color,color:r.textColor,border:"1px solid ".concat(r.borderColor)}},React.createElement(n.InnerBlocks.Content,null))))}})}()}();