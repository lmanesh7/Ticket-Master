import{a}from"/build/_shared/chunk-OLVAEH7O.js";import{a as re}from"/build/_shared/chunk-KYBFV6QH.js";import{a as ae}from"/build/_shared/chunk-MTWLPFJP.js";import{a as K}from"/build/_shared/chunk-J4UCJ3T4.js";import{a as te}from"/build/_shared/chunk-6HJM7BVW.js";import{c as Y}from"/build/_shared/chunk-XX5622KO.js";import{a as ee,b as Z,c as j,d as T,f as B}from"/build/_shared/chunk-P5YPHNIW.js";import{a as J}from"/build/_shared/chunk-PGOH7JLP.js";import{a as Q}from"/build/_shared/chunk-JA4FJ5TH.js";import{D as n,G as M,H as W,N as A,Q as g,y as f}from"/build/_shared/chunk-Z6MCQOJL.js";import{a as _,l as z,m as V,q as L}from"/build/_shared/chunk-6KANJRLS.js";import{c as i}from"/build/_shared/chunk-Q3IECNXJ.js";var b=i(ee()),$=i(J());var r=i(_()),x=i(re());var ie=i(ae()),oe=i(te());var se=i(Q());var e=i(L());var ve=a.object({customerFirstName:a.string().min(1,"Customer name is required"),customerLastName:a.string().min(1,"Customer name is required"),customerEmail:a.string().email("Invalid email address"),customerCity:a.string().min(1,"City is required"),customerDob:a.string().min(1,"Date of birth is required").transform(p=>new Date(p).toISOString()),customerState:a.string().min(1,"State is required"),customerZipCode:a.string().min(1,"Zip code is required"),customerPhone:a.string().min(1,"Phone number is required"),fixtureId:a.string().min(1,"Fixture is required"),noOfTickets:a.preprocess(Number,a.number().min(1,"No of tickets is required"))});function G(){var D,I,C,k,w,X;let{customers:p}=z(),o=r.useId(),u=V(),{fixtures:s}=Y(),[c,S]=r.useState((I=(D=s[0])==null?void 0:D.id)!=null?I:null),[m,v]=r.useState(),[l,H]=r.useState(1),y=u.state!=="idle",h=r.useMemo(()=>!m||!l?0:m.pricePerSeat*l,[m,l]),U=r.useMemo(()=>s.filter(t=>{var d;return(d=t.timeSlot)!=null&&d.date?new Date(t.timeSlot.date)>new Date:!1}),[s]);r.useEffect(()=>{c&&v(s.find(t=>t.id===c))},[c,s]);let[ne,ue]=r.useState(null);return(0,e.jsx)(e.Fragment,{children:(0,e.jsx)("div",{className:"flex max-w-screen-xl flex-col gap-12 p-10",children:(0,e.jsxs)("div",{className:"flex flex-col gap-8",children:[(0,e.jsx)(K,{title:"Walk In"}),(0,e.jsxs)(u.Form,{method:"post",replace:!0,children:[(0,e.jsxs)("fieldset",{disabled:y,className:"flex flex-col gap-4",children:[(0,e.jsx)(g,{name:"fixtureId",label:"Fixture",itemComponent:me,value:c,onChange:t=>S(t),data:U.map(t=>{var d,N,F,O,R,q,E,P;return{fixtureDate:(d=t.timeSlot)==null?void 0:d.date,fixtureStartTime:(N=t.timeSlot)==null?void 0:N.start,fixtureEndTime:(F=t.timeSlot)==null?void 0:F.end,stadium:(O=t.stadium)==null?void 0:O.name,teamOne:(R=t.teamOne)==null?void 0:R.name,teamTwo:(q=t.teamTwo)==null?void 0:q.name,label:`${(E=t.teamOne)==null?void 0:E.name} vs ${(P=t.teamTwo)==null?void 0:P.name}`,value:t.id}}),error:(k=(C=u.data)==null?void 0:C.fieldErrors)==null?void 0:k.fixtureId,required:!0}),(0,e.jsx)(A,{name:"noOfTickets",label:"No of tickets",value:l,onChange:t=>H(t),error:(X=(w=u.data)==null?void 0:w.fieldErrors)==null?void 0:X.noOfTickets,min:1,required:!0}),m?(0,e.jsxs)("p",{className:"text-sm",children:["Available Seats: ",m.availableSeats]}):null,(0,e.jsx)("p",{className:"text-sm",children:h?`Total price: ${B(h)}`:null}),(0,e.jsx)(g,{label:"Payment method",clearable:!1,required:!0,defaultValue:b.PaymentMethod.CREDIT_CARD,data:Object.values(b.PaymentMethod).map(t=>({label:Z(t.replace(/_/g," ")),value:t}))}),(0,e.jsx)(n.Wrapper,{id:o,label:"Credit card number",required:!0,children:(0,e.jsx)(n,{id:o,component:x.default,mask:"9999 9999 9999 9999",placeholder:"XXXX XXXX XXXX XXXX",defaultValue:"4242 4242 4242 4242",alwaysShowMask:!1})}),(0,e.jsxs)("div",{className:"flex items-center gap-4",children:[(0,e.jsx)(n.Wrapper,{id:o+"cvv",label:"CVV",required:!0,children:(0,e.jsx)(n,{id:o+"cvv",name:"cvv",component:x.default,mask:"999",placeholder:"XXX",defaultValue:"123",alwaysShowMask:!1})}),(0,e.jsx)(n.Wrapper,{id:o+"cvv",label:"Expiry",required:!0,children:(0,e.jsx)(n,{id:o+"expiryDate",name:"expiryDate",component:x.default,mask:"99/9999",placeholder:"MM/YYYY",alwaysShowMask:!1,defaultValue:"12/2029"})})]})]}),(0,e.jsx)("div",{}),(0,e.jsx)("div",{className:"mt-12 flex w-full items-center justify-end gap-4",children:(0,e.jsx)(M,{type:"submit",loading:y,loaderPosition:"right",children:"Buy tickets"})})]})]})})})}var me=r.forwardRef((p,o)=>{let{teamOne:u,teamTwo:s,fixtureDate:c,fixtureStartTime:S,fixtureEndTime:m,stadium:v,...l}=p;return(0,e.jsx)("div",{ref:o,...l,children:(0,e.jsx)(W,{noWrap:!0,children:(0,e.jsxs)("div",{children:[(0,e.jsxs)(f,{size:"sm",children:[u," vs ",s]}),(0,e.jsx)(f,{size:"xs",opacity:.65,children:v}),(0,e.jsxs)(f,{size:"xs",opacity:.65,children:[j(c)," (",T(S)," -"," ",T(m),")"]})]})})})});export{G as default};
