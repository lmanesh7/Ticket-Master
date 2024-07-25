import{a as Ne,b as J,c as Ue,d as ze,e as y,f as E}from"/build/_shared/chunk-4XRWHIFM.js";import{a as Me}from"/build/_shared/chunk-A62XF3CA.js";import{a as Oe}from"/build/_shared/chunk-J4UCJ3T4.js";import{a as Qe}from"/build/_shared/chunk-YQX6ADP4.js";import{c as Pe}from"/build/_shared/chunk-XX5622KO.js";import{a as Xe,b as Le,c as Fe,d as $}from"/build/_shared/chunk-P5YPHNIW.js";import{a as ke,b as M}from"/build/_shared/chunk-B3DSF6V2.js";import{a as We}from"/build/_shared/chunk-PGOH7JLP.js";import{c as Re,g as ye,k as Ee}from"/build/_shared/chunk-BU5VY3X4.js";import{a as je}from"/build/_shared/chunk-JA4FJ5TH.js";import{F as Te,G as b,I as be,L as ve,N as Ae,Q as Y,c as Se,p as Ce}from"/build/_shared/chunk-Z6MCQOJL.js";import{a as K,m as De,q as Be}from"/build/_shared/chunk-6KANJRLS.js";import{c as p}from"/build/_shared/chunk-Q3IECNXJ.js";var v=p(K(),1);function Ke({title:t,titleId:l,...g},w){return v.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:w,"aria-labelledby":l},g),t?v.createElement("title",{id:l},t):null,v.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"}))}var Ye=v.forwardRef(Ke),Z=Ye;var A=p(K(),1);function $e({title:t,titleId:l,...g},w){return A.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:w,"aria-labelledby":l},g),t?A.createElement("title",{id:l},t):null,A.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"}))}var Je=A.forwardRef($e),O=Je;var P=p(Xe()),Ze=p(We());var r=p(K());var _e=p(Qe());var eo=p(je());var e=p(Be());function He(){var te,ae,re,ne,le,fe,se,de,me,ue,ce,ie,pe,xe,Ie,he,ge;let t=De(),{fixtures:l,stadiums:g,teams:w}=Pe(),[qe,D]=Ce(!1),[S,N]=r.useState(null),[U,z]=r.useState(null),[H,_]=r.useState(0),[B,q]=r.useState(),[u,G]=r.useState(null),[x,L]=r.useState(null),[V,W]=r.useState(),[k,j]=r.useState(null),[f,X]=r.useState(null),[d,Q]=r.useState(null),[F,ee]=r.useState(null),[Ge,oe]=r.useState(!1),[Ve,R]=r.useState(null),C=t.state!=="idle";return r.useEffect(()=>{!u||!x||u===x&&L(null)},[u,x]),r.useEffect(()=>{var o;C||(o=t.data)!=null&&o.success&&(N(null),D.close())},[(te=t.data)==null?void 0:te.success,t.state,t.submission]),r.useEffect(()=>{var c,T,s,a,n,m;if(!S){z(null),G(null),L(null),j(null),W(void 0),X(null),Q(null),q(g[0].id);return}let o=l.find(i=>i.id===S);o&&(z(o),G(o.teamOneId),L(o.teamTwoId),W(o.pricePerSeat),j(new Date((T=(c=o.timeSlot)==null?void 0:c.date)!=null?T:"")),X(new Date((a=(s=o.timeSlot)==null?void 0:s.start)!=null?a:"")),Q(new Date((m=(n=o.timeSlot)==null?void 0:n.end)!=null?m:"")),q(o.stadiumId),D.open())},[l,S]),r.useEffect(()=>{if(oe(!1),R(null),!k||!f||!d||!V||!u&&!x&&!B)return;if(f.getTime()>=d.getTime()){R("Fixture start-time must be before end-time");return}let o=c=>l.filter(a=>{var n;return((n=a.timeSlot)==null?void 0:n.date)===k.toISOString()&&a.id!==S&&(a.teamOneId===c||a.teamTwoId===c)&&a.status!==P.ScheduleStatus.CANCELLED}).some(a=>{var i,I,h,we;let n=new Date((I=(i=a.timeSlot)==null?void 0:i.start)!=null?I:""),m=new Date((we=(h=a.timeSlot)==null?void 0:h.end)!=null?we:"");return n.getTime()>=f.getTime()&&n.getTime()<d.getTime()||m.getTime()>f.getTime()&&m.getTime()<=d.getTime()||n.getTime()<=f.getTime()&&m.getTime()>=d.getTime()});if(B&&l.filter(s=>{var a;return((a=s.timeSlot)==null?void 0:a.date)===k.toISOString()&&s.id!==S&&B===s.stadiumId&&s.status!==P.ScheduleStatus.CANCELLED}).some(s=>{var m,i,I,h;let a=new Date((i=(m=s.timeSlot)==null?void 0:m.start)!=null?i:""),n=new Date((h=(I=s.timeSlot)==null?void 0:I.end)!=null?h:"");return a.getTime()>=f.getTime()&&a.getTime()<d.getTime()||n.getTime()>f.getTime()&&n.getTime()<=d.getTime()||a.getTime()<=f.getTime()&&n.getTime()>=d.getTime()})){R("Stadium has a fixture at the same time");return}if(u&&o(u)){R("Host Team has another fixture on the same date and time");return}if(x&&o(x)){R("Away Team has another fixture on the same date and time");return}ee(new Date(f.getTime()-2*60*60*1e3)),oe(!0)},[k,d,f,l,S,B,u,x,V]),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("div",{className:"flex max-w-screen-xl flex-col gap-12 p-10",children:(0,e.jsxs)("div",{className:"flex flex-col gap-8",children:[(0,e.jsx)(Oe,{title:"Fixtures",rightSection:(0,e.jsx)(b,{color:"dark",radius:"md",onClick:()=>{_(1),D.open()},leftIcon:(0,e.jsx)(Ee,{size:18}),children:"Create"})}),l.length>0?(0,e.jsx)("div",{className:"flow-root",children:(0,e.jsx)("div",{className:"inline-block min-w-full py-2 align-middle",children:(0,e.jsxs)(Ne,{children:[(0,e.jsx)(ze,{children:(0,e.jsxs)(J,{children:[(0,e.jsx)(y,{pos:"first",children:"Fixtures"}),(0,e.jsx)(y,{children:"Details"}),(0,e.jsx)(y,{children:"Match Status"}),(0,e.jsx)(y,{pos:"last",children:(0,e.jsx)("span",{className:"sr-only",children:"Actions"})})]})}),(0,e.jsx)(Ue,{children:l.map((o,c)=>{var a,n,m,i,I,h;let T=c===l.length-1,s=o.status===P.ScheduleStatus.CANCELLED;return(0,e.jsxs)(J,{hasBorder:!T,children:[(0,e.jsx)(E,{pos:"first",children:(0,e.jsxs)("div",{className:"flex flex-col",children:[(0,e.jsxs)("div",{className:"font-medium text-gray-900",children:[o.teamOne.name," vs ",o.teamTwo.name]}),(0,e.jsx)("div",{className:"font-medium text-gray-500",children:o.stadium.name})]})}),(0,e.jsx)(E,{children:(0,e.jsxs)("div",{className:"flex flex-col",children:[(0,e.jsx)("div",{className:"font-medium text-gray-900",children:Fe((n=(a=o.timeSlot)==null?void 0:a.date)!=null?n:new Date)}),(0,e.jsxs)("div",{className:"text-gray-500",children:[$((i=(m=o.timeSlot)==null?void 0:m.start)!=null?i:new Date)," ","-"," ",$((h=(I=o.timeSlot)==null?void 0:I.end)!=null?h:new Date)]})]})}),(0,e.jsx)(E,{children:(0,e.jsx)(Te,{className:"max-w-min",variant:"dot",fullWidth:!1,color:o.status===P.ScheduleStatus.CONFIRMED?"green":"red",children:Le(o.status)})}),(0,e.jsx)(E,{children:(0,e.jsxs)("div",{className:"flex items-center justify-end gap-4",children:[(0,e.jsx)(b,{loading:C,variant:"subtle",color:"gray",compact:!0,loaderPosition:"right",disabled:s,onClick:()=>{N(o.id),_(0)},children:"Edit"}),(0,e.jsx)(b,{variant:"subtle",color:"red",compact:!0,loaderPosition:"right",loading:C,disabled:s,onClick:()=>t.submit({fixtureId:o.id},{method:"post",replace:!0,action:"/api/cancel-fixture"}),children:"Cancel Fixture"})]})})]})})})]})})}):(0,e.jsx)(Me,{label:"No fixtures have been added yet",icon:(0,e.jsx)(ye,{size:70,className:"text-gray-600"})})]})}),(0,e.jsx)(be,{opened:qe,onClose:()=>{N(null),D.close()},title:Se({"Edit fixture":H===0,"Add fixture":H===1}),position:"right",padding:"xl",size:"xl",children:(0,e.jsx)(t.Form,{method:"post",replace:!0,children:(0,e.jsxs)("fieldset",{disabled:C,className:"flex flex-col gap-4",children:[(0,e.jsx)("input",{hidden:!0,name:"fixtureId",value:U==null?void 0:U.id}),(0,e.jsx)(ve,{name:"stadiumId",label:"Stadium",value:B,placeholder:"Select stadium",onChange:o=>q(o.target.value),error:(re=(ae=t.data)==null?void 0:ae.fieldErrors)==null?void 0:re.stadiumId,data:g.map(o=>({label:o.name,value:o.id})),required:!0}),(0,e.jsx)(Y,{name:"teamOneId",label:"Host Team",value:u,onChange:o=>G(o),error:(le=(ne=t.data)==null?void 0:ne.fieldErrors)==null?void 0:le.teamOneId,data:w.map(o=>({label:o.name,value:o.id})),required:!0}),(0,e.jsx)(Y,{name:"teamTwoId",label:"Away Team",value:x,onChange:o=>L(o),error:(se=(fe=t.data)==null?void 0:fe.fieldErrors)==null?void 0:se.teamTwoId,disabled:!u,data:w.map(o=>({label:o.name,value:o.id,disabled:o.id===u})),required:!0}),(0,e.jsx)(Ae,{name:"pricePerSeat",label:"Price Per Seat",icon:"$",value:V,onChange:o=>W(o),min:0,error:(me=(de=t.data)==null?void 0:de.fieldErrors)==null?void 0:me.pricePerSeat,required:!0}),(0,e.jsx)(ke,{label:"Date",name:"fixtureDate",value:k,placeholder:"Select date",onChange:j,minDate:new Date(new Date().getTime()+24*60*60*1e3),icon:(0,e.jsx)(Z,{className:"h-4 w-4"}),error:(ce=(ue=t.data)==null?void 0:ue.fieldErrors)==null?void 0:ce.fixtureDate,hideOutsideDates:!0,withAsterisk:!0}),(0,e.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,e.jsx)(M,{icon:(0,e.jsx)(O,{className:"h-4 w-4"}),label:"Start Time",format:"12",withAsterisk:!0,value:f,onChange:X,error:(pe=(ie=t.data)==null?void 0:ie.fieldErrors)==null?void 0:pe.fixtureStartTime,placeholder:"Select start time"}),(0,e.jsx)("input",{hidden:!0,name:"fixtureStartTime",value:f==null?void 0:f.toISOString()}),(0,e.jsx)(M,{icon:(0,e.jsx)(O,{className:"h-4 w-4"}),label:"End Time",format:"12",value:d,onChange:Q,error:(Ie=(xe=t.data)==null?void 0:xe.fieldErrors)==null?void 0:Ie.fixtureEndTime,placeholder:"Select end time",withAsterisk:!0}),(0,e.jsx)("input",{hidden:!0,name:"fixtureEndTime",value:d==null?void 0:d.toISOString()})]}),(0,e.jsx)(M,{icon:(0,e.jsx)(Re,{className:"h-4 w-4"}),label:"Stadium Open Time",format:"12",withAsterisk:!0,value:F,onChange:ee,error:(ge=(he=t.data)==null?void 0:he.fieldErrors)==null?void 0:ge.stadiumOpenTime,placeholder:"Select stadium open time"}),(0,e.jsx)("input",{hidden:!0,name:"stadiumOpenTime",value:F==null?void 0:F.toISOString()}),(0,e.jsx)("p",{className:"text-sm text-red-500",children:Ve}),(0,e.jsxs)("div",{className:"mt-1 flex items-center justify-end gap-4",children:[(0,e.jsx)(b,{variant:"subtle",disabled:C,onClick:()=>{z(null),D.close()},color:"red",children:"Cancel"}),(0,e.jsx)(b,{type:"submit",loading:C,loaderPosition:"right",disabled:!Ge,children:H===0?"Save changes":"Add fixture"})]})]})})})]})}export{He as default};
