import{r as a,j as e,N as c}from"./index-CxkuHbAW.js";import{a as d,F as m}from"./ClockIcon-B58NgfWB.js";import{F as x}from"./EnvelopeIcon-B0T30380.js";import{F as h}from"./HomeIcon-DI55Pz-x.js";function f({title:s,titleId:t,...r},n){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":t},r),s?a.createElement("title",{id:t},s):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"}))}const p=a.forwardRef(f);function u({title:s,titleId:t,...r},n){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":t},r),s?a.createElement("title",{id:t},s):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"}))}const g=a.forwardRef(u);function w(){const[s,t]=a.useState(null);return a.useEffect(()=>{const n=new URLSearchParams(window.location.search).get("session_id");t(n)},[]),a.useEffect(()=>{const r=["#ff6b35","#f7931e","#fdc500","#4ecdc4"],i=setInterval(()=>{var l;const o=document.createElement("div");o.className="confetti",o.style.left=Math.random()*100+"%",o.style.backgroundColor=r[Math.floor(Math.random()*r.length)],o.style.animationDuration=Math.random()*3+2+"s",(l=document.getElementById("confetti-container"))==null||l.appendChild(o),setTimeout(()=>o.remove(),5e3)},100);return setTimeout(()=>clearInterval(i),3e3),()=>clearInterval(i)},[]),e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden",children:[e.jsx("div",{id:"confetti-container",className:"fixed inset-0 pointer-events-none z-50"}),e.jsx("style",{children:`
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          top: -10px;
          z-index: 9999;
          animation: fall linear forwards;
        }
        
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes checkmark {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(-45deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(-45deg);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-checkmark {
          animation: checkmark 0.6s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}),e.jsx("div",{className:"container mx-auto px-4 py-12 flex items-center justify-center min-h-screen",children:e.jsxs("div",{className:"max-w-2xl w-full",children:[e.jsxs("div",{className:"bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeInUp",children:[e.jsxs("div",{className:"bg-gradient-to-r from-[#4bb930] to-[#6dc757] p-8 text-center relative",children:[e.jsx("div",{className:"absolute inset-0 bg-white/10 backdrop-blur-sm"}),e.jsxs("div",{className:"relative z-10",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4 shadow-lg",children:e.jsx(d,{className:"h-16 w-16 text-green-500 animate-checkmark"})}),e.jsx("h1",{className:"text-4xl font-bold text-white mb-2",children:"Paiement réussi ! 🎉"}),e.jsx("p",{className:"text-green-100 text-lg",children:"Votre commande a été confirmée avec succès"})]})]}),e.jsxs("div",{className:"p-8",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("p",{className:"text-gray-700 text-lg mb-2",children:"Merci pour votre confiance ! 🙏"}),e.jsx("p",{className:"text-gray-600",children:"Nous préparons votre commande avec soin et amour"})]}),s&&e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-1",children:"Numéro de commande"}),e.jsxs("p",{className:"font-mono text-sm text-gray-800 break-all",children:[s.substring(0,30),"..."]})]}),e.jsxs("div",{className:"space-y-4 mb-8",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Que se passe-t-il maintenant ?"}),e.jsxs("div",{className:"flex items-start space-x-4 p-4 bg-blue-50 rounded-lg",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx(x,{className:"h-6 w-6 text-blue-600"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800",children:"Email de confirmation"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Vous allez recevoir un email avec tous les détails de votre commande"})]})]}),e.jsxs("div",{className:"flex items-start space-x-4 p-4 bg-orange-50 rounded-lg",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx(m,{className:"h-6 w-6 text-orange-600"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800",children:"Préparation"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Notre équipe commence immédiatement à préparer vos plats"})]})]}),e.jsxs("div",{className:"flex items-start space-x-4 p-4 bg-green-50 rounded-lg",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx(g,{className:"h-6 w-6 text-green-600"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800",children:"Livraison gratuite"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Votre commande sera livrée dans les meilleurs délais"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs(c,{to:"/",className:"w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]",children:[e.jsx(h,{className:"h-5 w-5"}),e.jsx("span",{children:"Retour à l'accueil"})]}),e.jsxs(c,{to:"/menu",className:"w-full flex items-center justify-center space-x-2 bg-white text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:text-orange-600 transition-all duration-300",children:[e.jsx(p,{className:"h-5 w-5"}),e.jsx("span",{children:"Continuer mes achats"})]})]})]})]}),e.jsxs("div",{className:"text-center mt-8 text-gray-600",children:[e.jsxs("p",{className:"text-sm",children:["🍽️ ",e.jsx("strong",{children:"Mama Food's"})," - Merci de nous faire confiance"]}),e.jsx("p",{className:"text-xs mt-2",children:"Besoin d'aide ? Contactez-nous à support@mamafoods.com"})]})]})})]})}export{w as default};
