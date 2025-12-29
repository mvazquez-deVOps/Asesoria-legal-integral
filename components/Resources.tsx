
import React from 'react';
import { AppStep } from '../types';

interface ResourcesProps {
  onNavigate?: (step: AppStep) => void;
}

const RESOURCE_ITEMS = [
  { 
    title: "Protocolo de Emergencia Penal", 
    type: "Guía PDF", 
    desc: "Pasos críticos a seguir en caso de detención o cateo inmediato.",
    color: "bg-brand-red",
    icon: "📕"
  },
  { 
    title: "Calculador de Pensión 2026", 
    type: "Tool Interactiva", 
    desc: "Estimación técnica basada en salarios mínimos y jurisprudencia actual.",
    color: "bg-brand-yellow",
    icon: "⚖️"
  },
  { 
    title: "Manual de Protección Patrimonial", 
    type: "Whitepaper", 
    desc: "Estrategias de blindaje de activos para empresarios y familias.",
    color: "bg-brand-blue",
    icon: "🛡️"
  },
  { 
    title: "Guía de Amparo Digital", 
    type: "Video Masterclass", 
    desc: "Cómo funciona el juicio de amparo contra actos de autoridad.",
    color: "bg-brand-violet",
    icon: "📽️"
  },
  { 
    title: "Checklist: Transacciones Globales", 
    type: "Recurso Gratis", 
    desc: "Puntos clave para contratos internacionales y comercio exterior.",
    color: "bg-brand-emerald",
    icon: "🌍"
  },
  { 
    title: "Estatuto de Ciberseguridad Legal", 
    type: "Framework", 
    desc: "Normativa mexicana sobre protección de datos y delitos digitales.",
    color: "bg-neutral-400",
    icon: "💻"
  }
];

export const Resources: React.FC<ResourcesProps> = ({ onNavigate }) => {
  return (
    <div className="bg-neutral-50 min-h-screen pb-40">
      {/* Header Estilo Landing */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h2 className="text-[11px] font-black text-brand-blue uppercase tracking-[0.5em]">Repositorio JUXA</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-neutral-800 tracking-tighter leading-none">
            Biblioteca de <br />
            <span className="text-neutral-400">Inteligencia Jurídica.</span>
          </h1>
          <div className="w-20 h-1.5 bg-brand-blue mx-auto rounded-full mt-8"></div>
        </div>
        <p className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          Conocimiento técnico abierto y herramientas de consulta rápida para la era post-jurídica.
        </p>
      </section>

      {/* Grid de Recursos Homologado */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESOURCE_ITEMS.map((item, i) => (
            <div 
              key={i} 
              className="saas-card bg-white flex flex-col group overflow-hidden border-none cursor-pointer"
            >
              <div className={`h-1.5 w-full ${item.color}`}></div>
              <div className="p-10 flex-1 flex flex-col space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-neutral-800 tracking-tight leading-tight group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-100 mt-auto flex items-center text-brand-blue text-[10px] font-black uppercase tracking-widest">
                  <span>Acceder al Recurso</span>
                  <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-4xl mx-auto px-6 mt-32">
        <div className="saas-card p-12 bg-white border-2 border-dashed border-neutral-200 text-center space-y-6">
          <h4 className="text-2xl font-bold text-neutral-800">¿No encuentras lo que buscas?</h4>
          <p className="text-neutral-500 font-medium">Nuestra IA puede generar una guía personalizada basada en tu caso específico.</p>
          <button 
            onClick={() => onNavigate?.(AppStep.DIAGNOSIS)}
            className="pill-button px-12 py-5 bg-neutral-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-lg"
          >
            Iniciar Diagnóstico Personalizado
          </button>
        </div>
      </section>
    </div>
  );
};
