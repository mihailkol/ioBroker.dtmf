var ConfigCustomPingSet;(()=>{"use strict";var D={23009:(a,l,s)=>{var m={"./Components":()=>Promise.all([s.e("webpack_sharing_consume_default_react_react"),s.e("webpack_sharing_consume_default_prop-types_prop-types"),s.e("webpack_sharing_consume_default_mui_icons-material_mui_icons-material-webpack_sharing_consume-6275fc"),s.e("webpack_sharing_consume_default_iobroker_adapter-react-v5_iobroker_adapter-react-v5"),s.e("src_Components_jsx")]).then(()=>()=>s(66393))},f=(u,b)=>(s.R=b,b=s.o(m,u)?m[u]():Promise.resolve().then(()=>{throw new Error('Module "'+u+'" does not exist in container.')}),s.R=void 0,b),p=(u,b)=>{if(s.S){var c="default",g=s.S[c];if(g&&g!==u)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return s.S[c]=u,s.I(c,b)}};s.d(l,{get:()=>f,init:()=>p})}},O={};function e(a){var l=O[a];if(l!==void 0)return l.exports;var s=O[a]={id:a,loaded:!1,exports:{}};return D[a].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}e.m=D,e.c=O,e.amdD=function(){throw new Error("define cannot be used indirect")},e.n=a=>{var l=a&&a.__esModule?()=>a.default:()=>a;return e.d(l,{a:l}),l},e.d=(a,l)=>{for(var s in l)e.o(l,s)&&!e.o(a,s)&&Object.defineProperty(a,s,{enumerable:!0,get:l[s]})},e.f={},e.e=a=>Promise.all(Object.keys(e.f).reduce((l,s)=>(e.f[s](a,l),l),[])),e.u=a=>"static/js/"+a+"."+{"vendors-node_modules_mui_material_styles_styled_js-node_modules_mui_system_DefaultPropsProvid-85c197":"ebb0fae8","vendors-node_modules_react-color_es_index_js-node_modules_react-icons_lib_index_mjs":"588691e8","vendors-node_modules_mui_material_colors_index_js-node_modules_mui_material_styles_index_js":"7b134854","vendors-node_modules_iobroker_adapter-react-v5_index_js-node_modules_mui_material_styles_cssU-e4c4f0":"48f84391",webpack_sharing_consume_default_react_react:"21e17afe","webpack_sharing_consume_default_prop-types_prop-types":"23041369","webpack_sharing_consume_default_react-dropzone_react-dropzone":"ab098f68","webpack_sharing_consume_default_mui_icons-material_mui_icons-material-webpack_sharing_consume-6275fc":"3684edd7","vendors-node_modules_mui_material_FilledInput_FilledInput_js":"676e7063","vendors-node_modules_iobroker_json-config_build_index_js":"8c80facc","webpack_sharing_consume_default_react-dom_react-dom":"b3ae40f1","webpack_sharing_consume_default_mui_x-date-pickers_mui_x-date-pickers-webpack_sharing_consume-9f1a2d":"ab00b1a0","webpack_sharing_consume_default_iobroker_adapter-react-v5_iobroker_adapter-react-v5":"f325f981",_91571:"55fd1740","vendors-node_modules_mui_icons-material_esm_index_js":"74ef4d6f","vendors-node_modules_mui_material_Button_Button_js-node_modules_mui_material_Chip_Chip_js-nod-a86d80":"1e644780","vendors-node_modules_mui_material_index_js":"4385b945","vendors-node_modules_mui_x-date-pickers_index_js":"508a4e2f","node_modules_prop-types_index_js":"14e4449a","vendors-node_modules_react-ace_lib_index_js":"f60ae856","vendors-node_modules_react-dom_index_js":"b52d06ff","vendors-node_modules_react-dropzone_dist_es_index_js":"6fcef6b7",node_modules_react_index_js:"651a4dee",src_Components_jsx:"68a77180","vendors-node_modules_react-qr-code_lib_index_js":"28220186",_91570:"ce48d110"}[a]+".chunk.js",e.miniCssF=a=>{},e.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch(a){if(typeof window=="object")return window}}(),e.o=(a,l)=>Object.prototype.hasOwnProperty.call(a,l),(()=>{var a={},l="iobroker-admin-component-ping:";e.l=(s,m,f,p)=>{if(a[s]){a[s].push(m);return}var u,b;if(f!==void 0)for(var c=document.getElementsByTagName("script"),g=0;g<c.length;g++){var v=c[g];if(v.getAttribute("src")==s||v.getAttribute("data-webpack")==l+f){u=v;break}}u||(b=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,e.nc&&u.setAttribute("nonce",e.nc),u.setAttribute("data-webpack",l+f),u.src=s),a[s]=[m];var j=(P,k)=>{u.onerror=u.onload=null,clearTimeout(w);var y=a[s];if(delete a[s],u.parentNode&&u.parentNode.removeChild(u),y&&y.forEach(h=>h(k)),P)return P(k)},w=setTimeout(j.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=j.bind(null,u.onerror),u.onload=j.bind(null,u.onload),b&&document.head.appendChild(u)}})(),e.r=a=>{typeof Symbol!="undefined"&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})},e.nmd=a=>(a.paths=[],a.children||(a.children=[]),a),(()=>{e.S={};var a={},l={};e.I=(s,m)=>{m||(m=[]);var f=l[s];if(f||(f=l[s]={}),!(m.indexOf(f)>=0)){if(m.push(f),a[s])return a[s];e.o(e.S,s)||(e.S[s]={});var p=e.S[s],u=j=>{typeof console!="undefined"&&console.warn&&console.warn(j)},b="iobroker-admin-component-ping",c=(j,w,P,k)=>{var y=p[j]=p[j]||{},h=y[w];(!h||!h.loaded&&(!k!=!h.eager?k:b>h.from))&&(y[w]={get:P,from:b,eager:!!k})},g=j=>{var w=h=>u("Initialization of sharing external failed: "+h);try{var P=e(j);if(!P)return;var k=h=>h&&h.init&&h.init(e.S[s],m);if(P.then)return v.push(P.then(k,w));var y=k(P);if(y&&y.then)return v.push(y.catch(w))}catch(h){w(h)}},v=[];switch(s){case"default":c("@iobroker/adapter-react-v5","7.1.4",()=>Promise.all([e.e("vendors-node_modules_mui_material_styles_styled_js-node_modules_mui_system_DefaultPropsProvid-85c197"),e.e("vendors-node_modules_react-color_es_index_js-node_modules_react-icons_lib_index_mjs"),e.e("vendors-node_modules_mui_material_colors_index_js-node_modules_mui_material_styles_index_js"),e.e("vendors-node_modules_iobroker_adapter-react-v5_index_js-node_modules_mui_material_styles_cssU-e4c4f0"),e.e("webpack_sharing_consume_default_react_react"),e.e("webpack_sharing_consume_default_prop-types_prop-types"),e.e("webpack_sharing_consume_default_react-dropzone_react-dropzone"),e.e("webpack_sharing_consume_default_mui_icons-material_mui_icons-material-webpack_sharing_consume-6275fc")]).then(()=>()=>e(64620))),c("@iobroker/json-config","7.1.3",()=>Promise.all([e.e("vendors-node_modules_mui_material_styles_styled_js-node_modules_mui_system_DefaultPropsProvid-85c197"),e.e("vendors-node_modules_mui_material_FilledInput_FilledInput_js"),e.e("vendors-node_modules_react-color_es_index_js-node_modules_react-icons_lib_index_mjs"),e.e("vendors-node_modules_iobroker_json-config_build_index_js"),e.e("webpack_sharing_consume_default_react_react"),e.e("webpack_sharing_consume_default_prop-types_prop-types"),e.e("webpack_sharing_consume_default_react-dom_react-dom"),e.e("webpack_sharing_consume_default_react-dropzone_react-dropzone"),e.e("webpack_sharing_consume_default_mui_icons-material_mui_icons-material-webpack_sharing_consume-6275fc"),e.e("webpack_sharing_consume_default_mui_x-date-pickers_mui_x-date-pickers-webpack_sharing_consume-9f1a2d"),e.e("webpack_sharing_consume_default_iobroker_adapter-react-v5_iobroker_adapter-react-v5"),e.e("_91571")]).then(()=>()=>e(93488))),c("@mui/icons-material","6.1.1",()=>Promise.all([e.e("vendors-node_modules_mui_material_styles_styled_js-node_modules_mui_system_DefaultPropsProvid-85c197"),e.e("vendors-node_modules_mui_icons-material_esm_index_js"),e.e("webpack_sharing_consume_default_react_react"),e.e("webpack_sharing_consume_default_prop-types_prop-types")]).then(()=>()=>e(61636))),c("@mui/material","6.1.1",()=>Promise.all([e.e("vendors-node_modules_mui_material_styles_styled_js-node_modules_mui_system_DefaultPropsProvid-85c197"),e.e("vendors-node_modules_mui_material_FilledInput_FilledInput_js"),e.e("vendors-node_modules_mui_material_Button_Button_js-node_modules_mui_material_Chip_Chip_js-nod-a86d80"),e.e("vendors-node_modules_mui_material_colors_index_js-node_modules_mui_material_styles_index_js"),e.e("vendors-node_modules_mui_material_index_js"),e.e("webpack_sharing_consume_default_react_react"),e.e("webpack_sharing_consume_default_prop-types_prop-types"),e.e("webpack_sharing_consume_default_react-dom_react-dom")]).then(()=>()=>e(24224))),c("@mui/x-date-pickers","7.17.0",()=>Promise.all([e.e("vendors-node_modules_mui_material_styles_styled_js-node_modules_mui_system_DefaultPropsProvid-85c197"),e.e("vendors-node_modules_mui_material_FilledInput_FilledInput_js"),e.e("vendors-node_modules_mui_material_Button_Button_js-node_modules_mui_material_Chip_Chip_js-nod-a86d80"),e.e("vendors-node_modules_mui_x-date-pickers_index_js"),e.e("webpack_sharing_consume_default_react_react"),e.e("webpack_sharing_consume_default_prop-types_prop-types"),e.e("webpack_sharing_consume_default_react-dom_react-dom")]).then(()=>()=>e(5262))),c("prop-types","15.8.1",()=>e.e("node_modules_prop-types_index_js").then(()=>()=>e(75826))),c("react-ace","12.0.0",()=>Promise.all([e.e("vendors-node_modules_react-ace_lib_index_js"),e.e("webpack_sharing_consume_default_react_react"),e.e("webpack_sharing_consume_default_prop-types_prop-types")]).then(()=>()=>e(76216))),c("react-dom","18.3.1",()=>Promise.all([e.e("vendors-node_modules_react-dom_index_js"),e.e("webpack_sharing_consume_default_react_react")]).then(()=>()=>e(22483))),c("react-dropzone","14.2.3",()=>Promise.all([e.e("vendors-node_modules_react-dropzone_dist_es_index_js"),e.e("webpack_sharing_consume_default_react_react"),e.e("webpack_sharing_consume_default_prop-types_prop-types")]).then(()=>()=>e(72589))),c("react","18.3.1",()=>e.e("node_modules_react_index_js").then(()=>()=>e(77810)));break}return v.length?a[s]=Promise.all(v).then(()=>a[s]=1):a[s]=1}}})(),(()=>{var a;e.g.importScripts&&(a=e.g.location+"");var l=e.g.document;if(!a&&l&&(l.currentScript&&(a=l.currentScript.src),!a)){var s=l.getElementsByTagName("script");if(s.length)for(var m=s.length-1;m>-1&&(!a||!/^http(s?):/.test(a));)a=s[m--].src}if(!a)throw new Error("Automatic publicPath is not supported in this browser");a=a.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=a})(),(()=>{var a=_=>{var o=n=>n.split(".").map(t=>+t==t?+t:t),r=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(_),i=r[1]?o(r[1]):[];return r[2]&&(i.length++,i.push.apply(i,o(r[2]))),r[3]&&(i.push([]),i.push.apply(i,o(r[3]))),i},l=(_,o)=>{_=a(_),o=a(o);for(var r=0;;){if(r>=_.length)return r<o.length&&(typeof o[r])[0]!="u";var i=_[r],n=(typeof i)[0];if(r>=o.length)return n=="u";var t=o[r],d=(typeof t)[0];if(n!=d)return n=="o"&&d=="n"||d=="s"||n=="u";if(n!="o"&&n!="u"&&i!=t)return i<t;r++}},s=_=>{var o=_[0],r="";if(_.length===1)return"*";if(o+.5){r+=o==0?">=":o==-1?"<":o==1?"^":o==2?"~":o>0?"=":"!=";for(var i=1,n=1;n<_.length;n++)i--,r+=(typeof(d=_[n]))[0]=="u"?"-":(i>0?".":"")+(i=2,d);return r}var t=[];for(n=1;n<_.length;n++){var d=_[n];t.push(d===0?"not("+x()+")":d===1?"("+x()+" || "+x()+")":d===2?t.pop()+" "+t.pop():s(d))}return x();function x(){return t.pop().replace(/^\((.+)\)$/,"$1")}},m=(_,o)=>{if(0 in _){o=a(o);var r=_[0],i=r<0;i&&(r=-r-1);for(var n=0,t=1,d=!0;;t++,n++){var x,F,S=t<_.length?(typeof _[t])[0]:"";if(n>=o.length||(F=(typeof(x=o[n]))[0])=="o")return!d||(S=="u"?t>r&&!i:S==""!=i);if(F=="u"){if(!d||S!="u")return!1}else if(d)if(S==F)if(t<=r){if(x!=_[t])return!1}else{if(i?x>_[t]:x<_[t])return!1;x!=_[t]&&(d=!1)}else if(S!="s"&&S!="n"){if(i||t<=r)return!1;d=!1,t--}else{if(t<=r||F<S!=i)return!1;d=!1}else S!="s"&&S!="n"&&(d=!1,t--)}}var B=[],z=B.pop.bind(B);for(n=1;n<_.length;n++){var M=_[n];B.push(M==1?z()|z():M==2?z()&z():M?m(M,o):!z())}return!!z()},f=(_,o)=>_&&e.o(_,o),p=_=>(_.loaded=1,_.get()),u=_=>Object.keys(_).reduce((o,r)=>(_[r].eager&&(o[r]=_[r]),o),{}),b=(_,n,r)=>{var i=r?u(_[n]):_[n],n=Object.keys(i).reduce((t,d)=>!t||l(t,d)?d:t,0);return n&&i[n]},c=(_,t,r,i)=>{var n=i?u(_[t]):_[t],t=Object.keys(n).reduce((d,x)=>m(r,x)&&(!d||l(d,x))?x:d,0);return t&&n[t]},g=(_,o,r)=>{var i=r?u(_[o]):_[o];return Object.keys(i).reduce((n,t)=>!n||!i[n].loaded&&l(n,t)?t:n,0)},v=(_,o,r,i)=>"Unsatisfied version "+r+" from "+(r&&_[o][r].from)+" of shared singleton module "+o+" (required "+s(i)+")",j=(_,o,r,i,n)=>{var t=_[r];return"No satisfying version ("+s(i)+")"+(n?" for eager consumption":"")+" of shared module "+r+" found in shared scope "+o+`.
Available versions: `+Object.keys(t).map(d=>d+" from "+t[d].from).join(", ")},w=_=>{throw new Error(_)},P=(_,o)=>w("Shared module "+o+" doesn't exist in shared scope "+_),k=_=>{typeof console!="undefined"&&console.warn&&console.warn(_)},y=_=>function(o,r,i,n,t){var d=e.I(o);return d&&d.then&&!i?d.then(_.bind(_,o,e.S[o],r,!1,n,t)):_(o,e.S[o],r,i,n,t)},h=(_,o,r)=>r?r():P(_,o),$=y((_,o,r,i,n)=>f(o,r)?p(b(o,r,i)):h(_,r,n)),U=y((_,o,r,i,n,t)=>{if(!f(o,r))return h(_,r,t);var d=c(o,r,n,i);return d?p(d):(k(j(o,_,r,n,i)),p(b(o,r,i)))}),L=y((_,o,r,i,n,t)=>{if(!f(o,r))return h(_,r,t);var d=c(o,r,n,i);if(d)return p(d);if(t)return t();w(j(o,_,r,n,i))}),G=y((_,o,r,i,n)=>{if(!f(o,r))return h(_,r,n);var t=g(o,r,i);return p(o[r][t])}),C=y((_,o,r,i,n,t)=>{if(!f(o,r))return h(_,r,t);var d=g(o,r,i);return m(n,d)||k(v(o,r,d,n)),p(o[r][d])}),H=y((_,o,r,i,n,t)=>{if(!f(o,r))return h(_,r,t);var d=g(o,r,i);return m(n,d)||w(v(o,r,d,n)),p(o[r][d])}),E={},I={28437:()=>C("default","react",!1,[0],()=>e.e("node_modules_react_index_js").then(()=>()=>e(77810))),95973:()=>C("default","prop-types",!1,[0],()=>e.e("node_modules_prop-types_index_js").then(()=>()=>e(75826))),53683:()=>C("default","react-dropzone",!1,[0],()=>e.e("vendors-node_modules_react-dropzone_dist_es_index_js").then(()=>()=>e(72589))),67085:()=>C("default","@mui/material",!1,[0],()=>Promise.all([e.e("vendors-node_modules_mui_material_styles_styled_js-node_modules_mui_system_DefaultPropsProvid-85c197"),e.e("vendors-node_modules_mui_material_FilledInput_FilledInput_js"),e.e("vendors-node_modules_mui_material_Button_Button_js-node_modules_mui_material_Chip_Chip_js-nod-a86d80"),e.e("vendors-node_modules_mui_material_colors_index_js-node_modules_mui_material_styles_index_js"),e.e("vendors-node_modules_mui_material_index_js"),e.e("webpack_sharing_consume_default_react-dom_react-dom")]).then(()=>()=>e(24224))),21839:()=>C("default","@mui/icons-material",!1,[0],()=>Promise.all([e.e("vendors-node_modules_mui_material_styles_styled_js-node_modules_mui_system_DefaultPropsProvid-85c197"),e.e("vendors-node_modules_mui_icons-material_esm_index_js")]).then(()=>()=>e(61636))),23479:()=>C("default","react-dom",!1,[0],()=>e.e("vendors-node_modules_react-dom_index_js").then(()=>()=>e(22483))),28497:()=>C("default","@mui/x-date-pickers",!1,[0],()=>Promise.all([e.e("vendors-node_modules_mui_material_Button_Button_js-node_modules_mui_material_Chip_Chip_js-nod-a86d80"),e.e("vendors-node_modules_mui_x-date-pickers_index_js")]).then(()=>()=>e(5262))),58093:()=>C("default","react-ace",!1,[0],()=>e.e("vendors-node_modules_react-ace_lib_index_js").then(()=>()=>e(76216))),37449:()=>C("default","@iobroker/adapter-react-v5",!1,[0],()=>Promise.all([e.e("vendors-node_modules_mui_material_styles_styled_js-node_modules_mui_system_DefaultPropsProvid-85c197"),e.e("vendors-node_modules_react-color_es_index_js-node_modules_react-icons_lib_index_mjs"),e.e("vendors-node_modules_mui_material_colors_index_js-node_modules_mui_material_styles_index_js"),e.e("vendors-node_modules_iobroker_adapter-react-v5_index_js-node_modules_mui_material_styles_cssU-e4c4f0"),e.e("webpack_sharing_consume_default_react-dropzone_react-dropzone")]).then(()=>()=>e(64620))),60556:()=>C("default","@iobroker/json-config",!1,[0],()=>Promise.all([e.e("vendors-node_modules_mui_material_styles_styled_js-node_modules_mui_system_DefaultPropsProvid-85c197"),e.e("vendors-node_modules_mui_material_FilledInput_FilledInput_js"),e.e("vendors-node_modules_react-color_es_index_js-node_modules_react-icons_lib_index_mjs"),e.e("vendors-node_modules_iobroker_json-config_build_index_js"),e.e("webpack_sharing_consume_default_react-dom_react-dom"),e.e("webpack_sharing_consume_default_react-dropzone_react-dropzone"),e.e("webpack_sharing_consume_default_mui_x-date-pickers_mui_x-date-pickers-webpack_sharing_consume-9f1a2d"),e.e("_91570")]).then(()=>()=>e(93488)))},T={webpack_sharing_consume_default_react_react:[28437],"webpack_sharing_consume_default_prop-types_prop-types":[95973],"webpack_sharing_consume_default_react-dropzone_react-dropzone":[53683],"webpack_sharing_consume_default_mui_icons-material_mui_icons-material-webpack_sharing_consume-6275fc":[67085,21839],"webpack_sharing_consume_default_react-dom_react-dom":[23479],"webpack_sharing_consume_default_mui_x-date-pickers_mui_x-date-pickers-webpack_sharing_consume-9f1a2d":[28497,58093],"webpack_sharing_consume_default_iobroker_adapter-react-v5_iobroker_adapter-react-v5":[37449],src_Components_jsx:[60556]},V={};e.f.consumes=(_,o)=>{e.o(T,_)&&T[_].forEach(r=>{if(e.o(E,r))return o.push(E[r]);if(!V[r]){var i=d=>{E[r]=0,e.m[r]=x=>{delete e.c[r],x.exports=d()}};V[r]=!0;var n=d=>{delete E[r],e.m[r]=x=>{throw delete e.c[r],d}};try{var t=I[r]();t.then?o.push(E[r]=t.then(i).catch(n)):i(t)}catch(d){n(d)}}})}})(),(()=>{var a={ConfigCustomPingSet:0};e.f.j=(m,f)=>{var p=e.o(a,m)?a[m]:void 0;if(p!==0)if(p)f.push(p[2]);else if(/^webpack_sharing_consume_default_(mui_(icons\-material_mui_icons\-material\-webpack_sharing_consume\-6275fc|x\-date\-pickers_mui_x\-date\-pickers\-webpack_sharing_consume\-9f1a2d)|react(\-d(om_react\-dom|ropzone_react\-dropzone)|_react)|iobroker_adapter\-react\-v5_iobroker_adapter\-react\-v5|prop\-types_prop\-types)$/.test(m))a[m]=0;else{var u=new Promise((v,j)=>p=a[m]=[v,j]);f.push(p[2]=u);var b=e.p+e.u(m),c=new Error,g=v=>{if(e.o(a,m)&&(p=a[m],p!==0&&(a[m]=void 0),p)){var j=v&&(v.type==="load"?"missing":v.type),w=v&&v.target&&v.target.src;c.message="Loading chunk "+m+` failed.
(`+j+": "+w+")",c.name="ChunkLoadError",c.type=j,c.request=w,p[1](c)}};e.l(b,g,"chunk-"+m,m)}};var l=(m,f)=>{var p=f[0],u=f[1],b=f[2],c,g,v=0;if(p.some(w=>a[w]!==0)){for(c in u)e.o(u,c)&&(e.m[c]=u[c]);if(b)var j=b(e)}for(m&&m(f);v<p.length;v++)g=p[v],e.o(a,g)&&a[g]&&a[g][0](),a[g]=0},s=self.webpackChunkiobroker_admin_component_ping=self.webpackChunkiobroker_admin_component_ping||[];s.forEach(l.bind(null,0)),s.push=l.bind(null,s.push.bind(s))})(),e.nc=void 0;var A=e(23009);ConfigCustomPingSet=A})();

//# sourceMappingURL=customComponents.js.map