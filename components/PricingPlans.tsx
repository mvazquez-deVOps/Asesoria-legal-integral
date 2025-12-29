
import React from 'react';
import { AppStep, SINGLE_DIAGNOSIS_PRICE, PERSONAL_PRICE, BUSINESS_PRICE } from '../types';

interface PricingPlansProps {
  onNavigate: (step: AppStep) => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({ onNavigate }) => {
  const plans = [
    {
      name: "Diagnóstico",
      price: SINGLE_DIAGNOSIS_PRICE,
      period: "único",
      desc: "Análisis táctico puntual de un caso específico.",
      features: ["Dictamen Estrategia Maestra PDF", "Chat de seguimiento 24h", "Validación Duarte-Aupart"],
      cta: "Iniciar Diagnóstico",
      step: AppStep.DIAGNOSIS,
      color: "bg-neutral-800",
      accent: "border-neutral-200"
    },
    {
      name: "Protección Personal",
      price: PERSONAL_PRICE,
      period: "mes",
      desc: "Tu 'Abogado de Bolsillo' para blindaje familiar.",
      features: ["Diagnósticos ilimitados", "IA 24/7 Premium", "Revisión de contratos", "Soporte preferencial"],
      cta: "Activar Plan",
      step: AppStep.HUMAN_PROFILING,
      color: "bg-brand-blue",
      accent: "border-brand-blue/30",
      highlight: true
    },
    {
      name: "Business Strategy",
      price: BUSINESS_PRICE,
      period: "mes",
      desc: "Blindaje legal corporativo para empresas.",
      features: ["Auditoría Compliance", "Cobranza mercantil activa", "Acceso Legal-Apps", "Consultoría Senior"],
      cta: "Contactar Ventas",
      step: AppStep.HUMAN_PROFILING,
      color: "bg-brand-emerald",
      accent: "border-brand-emerald/30"
    }
  ];

  return (
    <div className="bg-white py-24 px-6 animate-fade-in pb-40">
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-800 tracking-tight">Planes de Defensa</h1>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">Selecciona el nivel de protección que tu patrimonio requiere hoy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`monday-card flex flex-col p-10 space-y-8 relative ${plan.highlight ? 'border-brand-blue ring-2 ring-brand-blue/10' : ''}`}
            >
              {plan.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">Más Recomendado</span>
              )}
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-neutral-800">{plan.name}</h3>
                <p className="text-sm text-neutral-600">{plan.desc}</p>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-bold text-neutral-800">${plan.price}</span>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">/ {plan.period}</span>
              </div>

              <div className="w-full h-[1px] bg-neutral-100"></div>

              <ul className="flex-1 space-y-4">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-sm text-neutral-600">
                    <span className="text-brand-green">✔</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => onNavigate(plan.step)}
                className={`w-full py-4 rounded-xl text-white font-bold text-sm tracking-widest uppercase transition-all shadow-md ${plan.color} hover:opacity-90 active:scale-95`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="p-12 bg-neutral-50 rounded-[2rem] border border-neutral-200 text-center space-y-8">
           <h4 className="text-2xl font-bold text-neutral-800">¿Deseas una sesión directa con un Socio?</h4>
           <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="text-left border-l-4 border-brand-yellow pl-6">
                 <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Inversión Sesión Senior</span>
                 <span className="text-3xl font-bold text-neutral-800">$999 MXN</span>
              </div>
              <button 
                onClick={() => onNavigate(AppStep.HUMAN_PROFILING)}
                className="pill-button px-10 py-4 bg-white border border-neutral-300 text-neutral-800 font-bold text-sm hover:bg-neutral-100 transition-all shadow-sm"
              >
                Perfilar para Socio
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
