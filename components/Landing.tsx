
import React from 'react';
import { AppStep, BRAND_NAME, BRAND_TAGLINE } from '../types';
// Import LogoIcon from Header component
import { LogoIcon } from './Header';

interface LandingProps {
  onSelectCategory: (category: string) => void;
  onStartGeneral: () => void;
  onNavigate: (step: AppStep, category?: string | null) => void;
}

export const Landing: React.FC<LandingProps> = ({ onSelectCategory, onStartGeneral, onNavigate }) => {
  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section: Reduced Spacing */}
      <section className="max-w-7xl mx-auto px-6 pt-8 md:pt-12 pb-24 text-center animate-fade-in">
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-white border border-neutral-200/50 rounded-full mb-8 shadow-sm">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-blue"></span>
          </span>
          <span className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.4em]">IA Legal Activa 2026</span>
        </div>

        <h1 className="text-5xl md:text-[8.5rem] font-[900] text-neutral-900 tracking-[-0.05em] scale-y-95 leading-[0.82] mb-10 text-balance antialiased">
          Estrategia legal <br />
          <span className="text-brand-blue">de élite.</span>
        </h1>
        
        <p className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto mb-14 font-medium leading-relaxed">
          {BRAND_NAME} democratiza la lógica de un socio <br />
          titular mediante <span className="text-neutral-900 font-bold">legaltech intelligence.</span>
        </p>
        
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-white google-search-bar rounded-[2.5rem] py-4 px-8 md:py-5 md:px-10 flex items-center justify-between shadow-xl ring-1 ring-black/5">
            <div className="flex items-center space-x-5 flex-1">
              <span className="text-2xl opacity-40">🔍</span>
              <input 
                type="text"
                placeholder="¿Cuál es su desafío legal hoy?"
                className="w-full bg-transparent border-none outline-none text-lg text-neutral-800 placeholder:text-neutral-400 font-medium"
                onFocus={onStartGeneral}
              />
            </div>
            <button 
              onClick={onStartGeneral}
              className="bg-neutral-900 text-white rounded-xl px-8 py-3.5 font-black text-[10px] tracking-widest uppercase hover:bg-brand-blue transition-all shadow-lg"
            >
              Iniciar
            </button>
          </div>
        </div>
      </section>

      {/* Methodology Section (Restored) */}
      <section className="py-24 px-6 bg-white border-y border-neutral-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
            {[
              { icon: "💬", title: "Entrada Natural", desc: "Interactúe sin tecnicismos. Nuestra IA traduce sus hechos a variables legales técnicas." },
              { icon: "🧠", title: "Motor Lógico", desc: "Contrastamos sus hechos con jurisprudencia y precedentes de alta cuantía en tiempo real." },
              { icon: "📄", title: "Dictamen Maestro", desc: "Obtenga un documento técnico certificado por JUXA para su defensa inmediata." }
            ].map((feature, i) => (
              <div key={i} className="space-y-6 text-center md:text-left group">
                <div className="w-16 h-16 bg-neutral-50 rounded-[2rem] flex items-center justify-center text-3xl shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 mx-auto md:mx-0">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-black text-neutral-900 tracking-tight uppercase leading-none">{feature.title}</h4>
                <p className="text-neutral-500 font-medium leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business/PyME Incentive Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-neutral-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-blue/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="inline-block px-4 py-1 bg-brand-blue/20 text-brand-blue rounded-full text-[9px] font-black uppercase tracking-[0.3em]">
                Exclusivo para Negocios
              </div>
              <h2 className="text-4xl md:text-5xl font-[900] text-white tracking-tighter leading-none">
                Optimiza tu departamento <br /> legal con el <span className="text-brand-blue">Plan PyME</span>
              </h2>
              <p className="text-neutral-400 text-lg font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Acceso total a las herramientas de compliance, auditoría y recuperación de cartera para tu negocio.
              </p>
              
              <div className="pt-6 flex flex-wrap justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => onNavigate(AppStep.PRICING)}
                  className="px-10 py-4 bg-white text-neutral-900 font-black rounded-xl uppercase tracking-widest text-[9px] shadow-2xl hover:bg-neutral-100 transition-all"
                >
                  Comparar Planes
                </button>
                <button 
                  onClick={() => window.open(`https://wa.me/5215511527404`, '_blank')}
                  className="px-10 py-4 bg-neutral-800 text-white border border-neutral-700 font-black rounded-xl uppercase tracking-widest text-[9px] hover:bg-neutral-700 transition-all"
                >
                  Hablar con Ventas
                </button>
              </div>
            </div>
            
            <div className="hidden lg:block w-[300px]">
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl">
                 <div className="w-12 h-12 bg-brand-blue/20 text-brand-blue rounded-xl flex items-center justify-center text-xl mb-6">🛡️</div>
                 <h4 className="text-white font-black text-sm uppercase tracking-widest mb-2">Compliance IA</h4>
                 <p className="text-neutral-500 text-xs font-medium leading-relaxed">Auditoría constante de riesgos fiscales y laborales.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refined Footer: Premium adaptation */}
      <footer className="pt-24 pb-12 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 pb-16 border-b border-neutral-50">
            <div className="flex flex-col items-center md:items-start space-y-4">
               <div className="flex items-center space-x-3">
                 <div className="w-8 h-8">
                   <LogoIcon className="w-full h-full" />
                 </div>
                 <h2 className="text-neutral-900 font-[900] text-3xl tracking-[-0.07em] uppercase leading-none">
                  {BRAND_NAME}
                 </h2>
               </div>
               <span className="text-[7px] text-neutral-400 font-black uppercase tracking-[0.8em] ml-[0.2em]">
                {BRAND_TAGLINE}
               </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 text-center md:text-left">
              <div className="space-y-4">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-neutral-900">Empresa</h5>
                <ul className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest space-y-2">
                  <li className="hover:text-brand-blue cursor-pointer" onClick={() => onNavigate(AppStep.METHODOLOGY)}>Metodología</li>
                  <li className="hover:text-brand-blue cursor-pointer" onClick={() => onNavigate(AppStep.CASES)}>Especialidades</li>
                  <li className="hover:text-brand-blue cursor-pointer">Seguridad</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-neutral-900">Recursos</h5>
                <ul className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest space-y-2">
                  <li className="hover:text-brand-blue cursor-pointer" onClick={() => onNavigate(AppStep.RESOURCES)}>Biblioteca</li>
                  <li className="hover:text-brand-blue cursor-pointer" onClick={() => onNavigate(AppStep.LEGAL_APPS)}>Apps</li>
                  <li className="hover:text-brand-blue cursor-pointer">Soporte</li>
                </ul>
              </div>
              <div className="space-y-4 col-span-2 md:col-span-1">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-neutral-900">Legal</h5>
                <ul className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest space-y-2">
                  <li className="hover:text-brand-blue cursor-pointer" onClick={() => onNavigate(AppStep.PRIVACY)}>Privacidad</li>
                  <li className="hover:text-brand-blue cursor-pointer" onClick={() => onNavigate(AppStep.TERMS)}>Términos</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-neutral-300 text-[8px] font-black uppercase tracking-[0.4em]">
               © 2026 JUXA LEGAL TECH • MÉXICO • SILICON VALLEY DNA
             </p>
             <div className="flex items-center space-x-6">
                <div className="h-px w-8 bg-neutral-100"></div>
                <span className="text-neutral-400 text-[8px] font-black uppercase tracking-widest">Protocolo Lexia-Secure</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
