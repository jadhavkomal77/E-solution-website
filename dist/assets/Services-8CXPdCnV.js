import{b as x,e as d,g as m,j as e}from"./index-CLIh4Pj0.js";import{I as p,C as u}from"./lucide-react-D9PkTOiY.js";import{A as b}from"./arrow-right-CPNI0mML.js";import{L as g}from"./loader-circle-C8dWH4Xu.js";import{C as h}from"./circle-alert-C7KFFfg_.js";import"./createLucideIcon-B2OUqNTq.js";import"./calendar-BHJrlnWH.js";import"./sparkles-Ds71V6eh.js";import"./circle-check-Cde1JkLS.js";import"./shield-check-Blyy_EO5.js";import"./twitter-DLERfue2.js";import"./phone-Dx204BDv.js";import"./map-pin-CSh5_EMd.js";import"./menu-x1GGsmV7.js";import"./message-square-C1TGzIwZ.js";import"./shield-Cru-ugva.js";import"./send-cHFQsyxX.js";import"./star-E-CHSybG.js";import"./trash-2-ceRcFtpu.js";import"./user-BaFi5DL6.js";import"./x-CBqA7cnT.js";function O(){const{slug:t}=x(),n=d(),i=t||"main",{data:l,isLoading:a,isError:o}=m(i);if(a)return f();if(o)return v();const s=l?.services||[];return s.length?e.jsxs("section",{id:"services",className:`\r
        relative py-8 scroll-mt-28\r
        bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]\r
      `,children:[e.jsx("div",{className:`absolute -top-32 right-0 w-[320px] h-[320px]\r
        bg-blue-500/5 rounded-full blur-3xl`}),e.jsx("div",{className:`absolute -bottom-32 left-0 w-[300px] h-[300px]\r
        bg-indigo-500/5 rounded-full blur-3xl`}),e.jsxs("div",{className:"relative max-w-7xl mx-auto px-6 lg:px-8",children:[e.jsxs("div",{className:"text-center mb-20",children:[e.jsx("span",{className:`inline-block px-4 py-1.5 rounded-full\r
            text-xs font-semibold uppercase tracking-widest\r
            bg-blue-600/10 text-blue-600`,children:"Our Services"}),e.jsxs("h2",{className:"text-4xl sm:text-5xl font-extrabold mt-5 text-[#0B1220]",children:["Smart Solutions for"," ",e.jsx("span",{className:"text-blue-600",children:"Your Business"})]}),e.jsx("p",{className:"text-gray-600 max-w-2xl mx-auto mt-4 text-lg",children:"Reliable, scalable and future-ready services designed to accelerate your growth."})]}),e.jsx("div",{className:"grid sm:grid-cols-2 lg:grid-cols-3 gap-10",children:s.map(r=>{const c=p[r.icon]||u;return e.jsxs("div",{className:`\r
                  group bg-white\r
                  border border-gray-200\r
                  rounded-2xl p-8\r
                  shadow-[0_6px_20px_rgba(0,0,0,0.06)]\r
                  hover:shadow-[0_16px_40px_rgba(37,99,235,0.18)]\r
                  hover:-translate-y-1\r
                  transition-all duration-300\r
                  flex flex-col\r
                  overflow-hidden\r
                `,children:[e.jsx("div",{className:`w-16 h-16 rounded-xl\r
                  flex items-center justify-center mx-auto\r
                  bg-blue-600 text-white\r
                  shadow-md mb-6`,children:e.jsx(c,{size:28})}),e.jsx("h3",{className:`\r
                    text-xl font-bold text-[#0B1220]\r
                    text-center mb-2\r
                    line-clamp-2 break-words\r
                    group-hover:text-blue-600 transition\r
                  `,children:r.title}),e.jsx("p",{className:`\r
                    text-gray-600 text-center text-sm\r
                    line-clamp-3 break-words\r
                    flex-grow\r
                  `,children:r.description}),e.jsxs("button",{onClick:()=>n(t?`/site/${t}/services/${r._id}`:`/services/${r._id}`),className:`\r
                    mt-8 w-full px-6 py-3.5\r
                    text-sm font-semibold rounded-xl\r
                    bg-[#0B1220] text-white\r
                    hover:bg-blue-600\r
                    hover:shadow-[0_10px_24px_rgba(37,99,235,0.35)]\r
                    active:scale-95\r
                    transition inline-flex items-center justify-center gap-2\r
                  `,children:["Learn More ",e.jsx(b,{size:18})]})]},r._id)})})]})]}):null}function f(){return e.jsx("section",{className:"py-28 flex justify-center bg-white",children:e.jsx(g,{className:"w-8 h-8 text-blue-600 animate-spin"})})}function v(){return e.jsx("section",{className:"py-28 flex justify-center bg-white",children:e.jsxs("div",{className:"bg-red-50 border border-red-300 rounded-xl px-6 py-4 flex items-center gap-3",children:[e.jsx(h,{className:"text-red-600"}),e.jsx("p",{className:"text-red-700 font-medium",children:"Unable to load services"})]})})}export{O as default};
