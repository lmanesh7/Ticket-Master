import{b as Ct}from"/build/_shared/chunk-6XQUNIF7.js";import{a as oe}from"/build/_shared/chunk-PGOH7JLP.js";import{G as st,H as xt,J as kt,a as ht,b as wt,f as bt,g as yt,q as J,t as vt,v as re}from"/build/_shared/chunk-Z6MCQOJL.js";import{a as X,d as Et,h as Mt,i as zt,j as Pt,n as St,p as _t,q as Ot}from"/build/_shared/chunk-6KANJRLS.js";import{b as ae,c as j}from"/build/_shared/chunk-Q3IECNXJ.js";var Vt=ae((da,Xt)=>{Xt.exports={}});var b=j(X());var jt=j(X()),K=(0,jt.createContext)(null);K.displayName="@mantine/modals/ModalsContext";var D=j(X());var Nt=j(X());function It(){let e=(0,Nt.useContext)(K);if(!e)throw new Error("[@mantine/modals] useModals hook was called outside of context, wrap your app with ModalsProvider component");return e}var ne=Object.defineProperty,ie=Object.defineProperties,se=Object.getOwnPropertyDescriptors,Rt=Object.getOwnPropertySymbols,le=Object.prototype.hasOwnProperty,de=Object.prototype.propertyIsEnumerable,Yt=(e,a,t)=>a in e?ne(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t,lt=(e,a)=>{for(var t in a||(a={}))le.call(a,t)&&Yt(e,t,a[t]);if(Rt)for(var t of Rt(a))de.call(a,t)&&Yt(e,t,a[t]);return e},Lt=(e,a)=>ie(e,se(a));function Tt({id:e,cancelProps:a,confirmProps:t,labels:n={cancel:"",confirm:""},closeOnConfirm:i=!0,closeOnCancel:c=!0,groupProps:f,onCancel:v,onConfirm:E,children:h}){let{cancel:S,confirm:_}=n,O=It(),A=C=>{typeof a?.onClick=="function"&&a?.onClick(C),typeof v=="function"&&v(),c&&O.closeModal(e)},z=C=>{typeof t?.onClick=="function"&&t?.onClick(C),typeof E=="function"&&E(),i&&O.closeModal(e)};return D.default.createElement(D.default.Fragment,null,h&&D.default.createElement(vt,{mb:"md"},h),D.default.createElement(xt,lt({position:"right"},f),D.default.createElement(st,Lt(lt({variant:"default"},a),{onClick:A}),a?.children||S),D.default.createElement(st,Lt(lt({},t),{onClick:z}),t?.children||_)))}function At(e,a){switch(a.type){case"OPEN":return{current:a.payload,modals:[...e.modals,a.payload]};case"CLOSE":{let t=e.modals.filter(n=>n.id!==a.payload);return{current:t[t.length-1]||e.current,modals:t}}case"CLOSE_ALL":return{current:e.current,modals:[]};default:return e}}var[Bt,W]=wt("mantine-modals"),Ke=W("openModal"),We=W("closeModal"),qe=W("closeAllModals"),Ge=W("openConfirmModal"),Ze=W("openContextModal");var ce=Object.defineProperty,pe=Object.defineProperties,me=Object.getOwnPropertyDescriptors,tt=Object.getOwnPropertySymbols,Ut=Object.prototype.hasOwnProperty,$t=Object.prototype.propertyIsEnumerable,Dt=(e,a,t)=>a in e?ce(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t,Q=(e,a)=>{for(var t in a||(a={}))Ut.call(a,t)&&Dt(e,t,a[t]);if(tt)for(var t of tt(a))$t.call(a,t)&&Dt(e,t,a[t]);return e},Ft=(e,a)=>pe(e,me(a)),F=(e,a)=>{var t={};for(var n in e)Ut.call(e,n)&&a.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&tt)for(var n of tt(e))a.indexOf(n)<0&&$t.call(e,n)&&(t[n]=e[n]);return t};function ge(e){if(!e)return{confirmProps:{},modalProps:{}};let a=e,{id:t,children:n,onCancel:i,onConfirm:c,closeOnConfirm:f,closeOnCancel:v,cancelProps:E,confirmProps:h,groupProps:S,labels:_}=a,O=F(a,["id","children","onCancel","onConfirm","closeOnConfirm","closeOnCancel","cancelProps","confirmProps","groupProps","labels"]);return{confirmProps:{id:t,children:n,onCancel:i,onConfirm:c,closeOnConfirm:f,closeOnCancel:v,cancelProps:E,confirmProps:h,groupProps:S,labels:_},modalProps:Q({id:t},O)}}function dt({children:e,modalProps:a,labels:t,modals:n}){let[i,c]=(0,b.useReducer)(At,{modals:[],current:null}),f=(0,b.useRef)(i);f.current=i;let v=(0,b.useCallback)(l=>{f.current.modals.forEach(s=>{var d,u,p,M;s.type==="confirm"&&l&&((u=(d=s.props).onCancel)==null||u.call(d)),(M=(p=s.props).onClose)==null||M.call(p)}),c({type:"CLOSE_ALL"})},[f,c]),E=(0,b.useCallback)(l=>{var s=l,{modalId:d}=s,u=F(s,["modalId"]);let p=d||J();return c({type:"OPEN",payload:{id:p,type:"content",props:u}}),p},[c]),h=(0,b.useCallback)(l=>{var s=l,{modalId:d}=s,u=F(s,["modalId"]);let p=d||J();return c({type:"OPEN",payload:{id:p,type:"confirm",props:u}}),p},[c]),S=(0,b.useCallback)((l,s)=>{var d=s,{modalId:u}=d,p=F(d,["modalId"]);let M=u||J();return c({type:"OPEN",payload:{id:M,type:"context",props:p,ctx:l}}),M},[c]),_=(0,b.useCallback)((l,s)=>{var d,u,p,M;let N=f.current.modals.find(U=>U.id===l);N&&(N.type==="confirm"&&s&&((u=(d=N.props).onCancel)==null||u.call(d)),(M=(p=N.props).onClose)==null||M.call(p),c({type:"CLOSE",payload:N.id}))},[f,c]);Bt({openModal:E,openConfirmModal:h,openContextModal:l=>{var s=l,{modal:d}=s,u=F(s,["modal"]);return S(d,u)},closeModal:_,closeAllModals:v});let O={modals:i.modals,openModal:E,openConfirmModal:h,openContextModal:S,closeModal:_,closeAll:v},A=()=>{let l=f.current.current;switch(l?.type){case"context":{let s=l.props,{innerProps:d}=s,u=F(s,["innerProps"]),p=n[l.ctx];return{modalProps:u,content:b.default.createElement(p,{innerProps:d,context:O,id:l.id})}}case"confirm":{let{modalProps:s,confirmProps:d}=ge(l.props);return{modalProps:s,content:b.default.createElement(Tt,Ft(Q({},d),{id:l.id,labels:l.props.labels||t}))}}case"content":{let s=l.props,{children:d}=s;return{modalProps:F(s,["children"]),content:b.default.createElement(b.default.Fragment,null,d)}}default:return{modalProps:{},content:null}}},{modalProps:z,content:C}=A();return b.default.createElement(K.Provider,{value:O},b.default.createElement(kt,Ft(Q(Q({zIndex:yt("modal")+1},a),z),{opened:i.modals.length>0,onClose:()=>_(i.current.id)}),C),e)}var Ie=j(oe());var ue={name:"Ticket Master",logo:"/logo.png",cardsLimit:4},Ht=ue;var Re=j(Vt());var Kt="/build/_assets/font-ZLCJIQE7.css";var Wt="/build/_assets/tailwind-SJQRKHE3.css";var r=j(X(),1),qt=j(re(),1),T=j(X(),1);function we(e,{insertAt:a}={}){if(!e||typeof document>"u")return;let t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",a==="top"&&t.firstChild?t.insertBefore(n,t.firstChild):t.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}we(`[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 6px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999}[data-sonner-toaster][data-x-position=right]{right:max(var(--offset),env(safe-area-inset-right))}[data-sonner-toaster][data-x-position=left]{left:max(var(--offset),env(safe-area-inset-left))}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translate(-50%)}[data-sonner-toaster][data-y-position=top]{top:max(var(--offset),env(safe-area-inset-top))}[data-sonner-toaster][data-y-position=bottom]{bottom:max(var(--offset),env(safe-area-inset-bottom))}[data-sonner-toast]{--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;will-change:transform,opacity,height;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}[data-sonner-toast][data-y-position=top]{top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}[data-sonner-toast] [data-description]{font-weight:400;line-height:1.4;color:inherit}[data-sonner-toast] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:-3px;margin-right:4px}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast] [data-icon]>*{flex-shrink:0}[data-sonner-toast] [data-icon] svg{margin-left:-1px}[data-sonner-toast] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:auto;border:none;cursor:pointer;outline:none;transition:opacity .4s,box-shadow .2s}[data-sonner-toast] [data-button]:focus-visible{box-shadow:0 0 0 2px #0006}[data-sonner-toast] [data-button]:first-of-type{margin-left:auto}[data-sonner-toast] [data-cancel]{color:var(--color);background:var(--border-color)}[data-sonner-toast] [data-close-button]{position:absolute;left:0;top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;background:var(--gray1);color:var(--gray12);border:1px solid var(--gray4);transform:translate(-35%,-35%);border-radius:50%;opacity:0;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast]:hover [data-close-button]{opacity:1}[data-sonner-toast]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]:before{content:"";position:absolute;left:0;right:0;height:100%}[data-sonner-toast][data-y-position=top][data-swiping=true]:before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]:before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]:before{content:"";position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast]:after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y: translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y: translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]:before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount, 0px));transition:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation:swipe-out .2s ease-out forwards}@keyframes swipe-out{0%{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount)));opacity:1}to{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount) + var(--lift) * -100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;--mobile-offset: 16px;right:var(--mobile-offset);left:var(--mobile-offset);width:100%}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - 32px)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset)}[data-sonner-toaster][data-y-position=bottom]{bottom:20px}[data-sonner-toaster][data-y-position=top]{top:20px}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset);right:var(--mobile-offset);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-rich-colors=true] [data-sonner-toast][data-type=success],[data-rich-colors=true] [data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true] [data-sonner-toast][data-type=error],[data-rich-colors=true] [data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}
`);var be=e=>{switch(e){case"success":return xe;case"error":return ke;default:return null}},ye=Array(12).fill(0),ve=({visible:e})=>T.default.createElement("div",{className:"sonner-loading-wrapper","data-visible":e},T.default.createElement("div",{className:"sonner-spinner"},ye.map((a,t)=>T.default.createElement("div",{className:"sonner-loading-bar",key:`spinner-bar-${t}`})))),xe=T.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},T.default.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",clipRule:"evenodd"})),ke=T.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},T.default.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",clipRule:"evenodd"})),ct=0,Ce=class{constructor(){this.subscribe=e=>(this.subscribers.push(e),()=>{let a=this.subscribers.indexOf(e);this.subscribers.splice(a,1)}),this.publish=e=>{this.subscribers.forEach(a=>a(e))},this.addToast=e=>{this.publish(e),this.toasts=[...this.toasts,e]},this.create=e=>{var a;let{message:t,...n}=e,i=typeof e?.id=="number"||((a=e.id)==null?void 0:a.length)>0?e.id:ct++;return this.toasts.find(c=>c.id===i)?this.toasts=this.toasts.map(c=>c.id===i?(this.publish({...c,...e,id:i,title:t}),{...c,...e,id:i,title:t}):c):this.addToast({title:t,...n,id:i}),i},this.dismiss=e=>(e||this.toasts.forEach(a=>{this.subscribers.forEach(t=>t({id:a.id,dismiss:!0}))}),this.subscribers.forEach(a=>a({id:e,dismiss:!0})),e),this.message=(e,a)=>this.create({...a,message:e}),this.error=(e,a)=>this.create({...a,message:e,type:"error"}),this.success=(e,a)=>this.create({...a,type:"success",message:e}),this.promise=(e,a)=>{let t=this.create({...a,promise:e,type:"loading",message:a.loading});return(e instanceof Promise?e:e()).then(n=>{let i=typeof a.success=="function"?a.success(n):a.success;this.create({id:t,type:"success",message:i})}).catch(n=>{let i=typeof a.error=="function"?a.error(n):a.error;this.create({id:t,type:"error",message:i})}),t},this.custom=(e,a)=>{let t=a?.id||ct++;this.publish({jsx:e(t),id:t,...a})},this.subscribers=[],this.toasts=[]}},L=new Ce,Ee=(e,a)=>{let t=a?.id||ct++;return L.addToast({title:e,...a,id:t}),t},Me=Ee,ma=Object.assign(Me,{success:L.success,error:L.error,custom:L.custom,message:L.message,promise:L.promise,dismiss:L.dismiss}),ze=3,Pe="32px",Se=4e3,_e=356,Gt=14,Oe=20,je=200,Ne=e=>{let{invert:a,toast:t,interacting:n,setHeights:i,visibleToasts:c,heights:f,index:v,toasts:E,expanded:h,removeToast:S,closeButton:_,style:O,className:A="",descriptionClassName:z="",duration:C,position:l,expandByDefault:s}=e,[d,u]=r.default.useState(!1),[p,M]=r.default.useState(!1),[N,U]=r.default.useState(!1),[V,et]=r.default.useState(!1),[at,R]=r.default.useState(0),[rt,q]=r.default.useState(0),m=r.default.useRef(null),w=v===0,x=v+1<=c,P=t.type,G=t.className||"",Qt=t.descriptionClassName||"",Z=r.default.useMemo(()=>f.findIndex(o=>o.toastId===t.id)||0,[f,t.id]),pt=r.default.useMemo(()=>t.duration||C||Se,[t.duration,C]),ot=r.default.useRef(0),$=r.default.useRef(0),nt=r.default.useRef(pt),mt=r.default.useRef(0),H=r.default.useRef(null),[gt,te]=l.split("-"),ut=r.default.useMemo(()=>f.reduce((o,g,k)=>k>=Z?o:o+g.height,0),[f,Z]),ee=t.invert||a,it=P==="loading";$.current=r.default.useMemo(()=>Z*Gt+ut,[Z,ut]),r.default.useEffect(()=>{u(!0)},[]),r.default.useLayoutEffect(()=>{if(!d)return;let o=m.current,g=o.style.height;o.style.height="auto";let k=o.getBoundingClientRect().height;o.style.height=g,q(k),i(I=>I.find(B=>B.toastId===t.id)?I.map(B=>B.toastId===t.id?{...B,height:k}:B):[{toastId:t.id,height:k},...I])},[d,t.title,t.description,i,t.id]);let Y=r.default.useCallback(()=>{M(!0),R($.current),i(o=>o.filter(g=>g.toastId!==t.id)),setTimeout(()=>{S(t)},je)},[t,S,i,$]);return r.default.useEffect(()=>{if(t.promise&&P==="loading"||t.duration===1/0)return;let o;return h||n?(()=>{if(mt.current<ot.current){let g=new Date().getTime()-ot.current;nt.current=nt.current-g}mt.current=new Date().getTime()})():(ot.current=new Date().getTime(),o=setTimeout(()=>{var g;(g=t.onAutoClose)==null||g.call(t,t),Y()},nt.current)),()=>clearTimeout(o)},[h,n,s,t,pt,Y,t.promise,P]),r.default.useEffect(()=>{let o=m.current;if(o){let g=o.getBoundingClientRect().height;return q(g),i(k=>[{toastId:t.id,height:g},...k]),()=>i(k=>k.filter(I=>I.toastId!==t.id))}},[i,t.id]),r.default.useEffect(()=>{t.delete&&Y()},[Y,t.delete]),r.default.createElement("li",{"aria-live":t.important?"assertive":"polite","aria-atomic":"true",role:"status",tabIndex:0,ref:m,className:A+" "+G,"data-sonner-toast":"","data-styled":!t.jsx,"data-mounted":d,"data-promise":!!t.promise,"data-removed":p,"data-visible":x,"data-y-position":gt,"data-x-position":te,"data-index":v,"data-front":w,"data-swiping":N,"data-type":P,"data-invert":ee,"data-swipe-out":V,"data-expanded":!!(h||s&&d),style:{"--index":v,"--toasts-before":v,"--z-index":E.length-v,"--offset":`${p?at:$.current}px`,"--initial-height":s?"auto":`${rt}px`,...O,...t.style},onPointerDown:o=>{it||(R($.current),o.target.setPointerCapture(o.pointerId),o.target.tagName!=="BUTTON"&&(U(!0),H.current={x:o.clientX,y:o.clientY}))},onPointerUp:()=>{var o,g,k;if(V)return;H.current=null;let I=Number(((o=m.current)==null?void 0:o.style.getPropertyValue("--swipe-amount").replace("px",""))||0);if(Math.abs(I)>=Oe){R($.current),(g=t.onDismiss)==null||g.call(t,t),Y(),et(!0);return}(k=m.current)==null||k.style.setProperty("--swipe-amount","0px"),U(!1)},onPointerMove:o=>{var g;if(!H.current)return;let k=o.clientY-H.current.y,I=o.clientX-H.current.x,B=(gt==="top"?Math.min:Math.max)(0,k),ft=o.pointerType==="touch"?10:2;Math.abs(B)>ft?(g=m.current)==null||g.style.setProperty("--swipe-amount",`${k}px`):Math.abs(I)>ft&&(H.current=null)}},_&&!t.jsx?r.default.createElement("button",{"aria-label":"Close toast","data-disabled":it,"data-close-button":!0,onClick:it?void 0:()=>{var o;Y(),(o=t.onDismiss)==null||o.call(t,t)}},r.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},r.default.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),r.default.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"}))):null,t.jsx||r.default.isValidElement(t.title)?t.jsx||t.title:r.default.createElement(r.default.Fragment,null,P||t.icon||t.promise?r.default.createElement("div",{"data-icon":""},t.promise?r.default.createElement(ve,{visible:P==="loading"}):null,t.icon||be(P)):null,r.default.createElement("div",{"data-content":""},r.default.createElement("div",{"data-title":""},t.title),t.description?r.default.createElement("div",{"data-description":"",className:z+Qt},t.description):null),t.cancel?r.default.createElement("button",{"data-button":!0,"data-cancel":!0,onClick:()=>{var o;Y(),(o=t.cancel)!=null&&o.onClick&&t.cancel.onClick()}},t.cancel.label):null,t.action?r.default.createElement("button",{"data-button":"",onClick:o=>{var g;(g=t.action)==null||g.onClick(o),!o.defaultPrevented&&Y()}},t.action.label):null))},Zt=e=>{var a;let{invert:t,position:n="bottom-right",hotkey:i=["altKey","KeyT"],expand:c,closeButton:f,className:v,offset:E,theme:h="light",richColors:S,duration:_,style:O,visibleToasts:A=ze,toastOptions:z}=e,[C,l]=r.default.useState([]),[s,d]=r.default.useState([]),[u,p]=r.default.useState(!1),[M,N]=r.default.useState(!1),[U,V]=r.default.useState(h!=="system"?h:typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),[et,at]=n.split("-"),R=r.default.useRef(null),rt=i.join("+").replace(/Key/g,"").replace(/Digit/g,""),q=r.default.useCallback(m=>l(w=>w.filter(({id:x})=>x!==m.id)),[]);return r.default.useEffect(()=>L.subscribe(m=>{if(m.dismiss){l(w=>w.map(x=>x.id===m.id?{...x,delete:!0}:x));return}setTimeout(()=>{qt.default.flushSync(()=>{l(w=>{let x=w.findIndex(P=>P.id===m.id);return x!==-1?[...w.slice(0,x),{...w[x],...m},...w.slice(x+1)]:[m,...w]})})})}),[]),r.default.useEffect(()=>{if(h!=="system"){V(h);return}typeof window<"u"&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",({matches:m})=>{V(m?"dark":"light")})},[h]),r.default.useEffect(()=>{C.length<=1&&p(!1)},[C]),r.default.useEffect(()=>{let m=w=>{var x,P;i.every(G=>w[G]||w.code===G)&&(p(!0),(x=R.current)==null||x.focus()),w.code==="Escape"&&(document.activeElement===R.current||(P=R.current)!=null&&P.contains(document.activeElement))&&p(!1)};return document.addEventListener("keydown",m),()=>document.removeEventListener("keydown",m)},[i]),C.length?r.default.createElement("section",{"aria-label":`Notifications ${rt}`,tabIndex:-1},r.default.createElement("ol",{tabIndex:-1,ref:R,className:v,"data-sonner-toaster":!0,"data-theme":U,"data-rich-colors":S,"data-y-position":et,"data-x-position":at,style:{"--front-toast-height":`${(a=s[0])==null?void 0:a.height}px`,"--offset":typeof E=="number"?`${E}px`:E||Pe,"--width":`${_e}px`,"--gap":`${Gt}px`,...O},onMouseEnter:()=>p(!0),onMouseMove:()=>p(!0),onMouseLeave:()=>{M||p(!1)},onPointerDown:()=>{N(!0)},onPointerUp:()=>N(!1)},C.map((m,w)=>r.default.createElement(Ne,{key:m.id,index:w,toast:m,duration:_,className:z?.className,descriptionClassName:z?.descriptionClassName,invert:t,visibleToasts:A,closeButton:f,interacting:M,position:n,style:z?.style,removeToast:q,toasts:C,heights:s,setHeights:d,expandByDefault:c,expanded:u})))):null};var y=j(Ot()),Ye=ht({key:"mantine",prepend:!1}),Le=()=>[{rel:"stylesheet",href:Kt},{rel:"stylesheet",href:Wt}];var Te=()=>({charset:"utf-8",title:Ht.name,viewport:"width=device-width,initial-scale=1"});function Ae({title:e,children:a}){return(0,y.jsx)(bt,{withNormalizeCSS:!0,emotionCache:Ye,theme:{primaryColor:"dark"},children:(0,y.jsxs)("html",{lang:"en",className:"h-full",children:[(0,y.jsxs)("head",{children:[e?(0,y.jsx)("title",{children:e}):null,(0,y.jsx)(zt,{}),(0,y.jsx)(Mt,{}),(0,y.jsx)(Ct,{})]}),(0,y.jsxs)("body",{className:"h-full",children:[a,(0,y.jsx)(_t,{}),(0,y.jsx)(Pt,{}),(0,y.jsx)(St,{})]})]})})}function Jt(){return(0,y.jsxs)(Ae,{children:[(0,y.jsx)(Zt,{richColors:!0,closeButton:!0,duration:4e3,position:"top-right"}),(0,y.jsx)(dt,{children:(0,y.jsx)(Et,{})})]})}export{Jt as default,Le as links,Te as meta};
