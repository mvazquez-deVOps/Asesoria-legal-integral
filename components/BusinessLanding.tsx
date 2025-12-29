
import React from 'react';
import { AppStep, BUSINESS_PRICE, WHATSAPP_NUMBER } from '../types';

interface BusinessLandingProps {
  onNavigate: (step: AppStep) => void;
}

export const BusinessLanding: React.FC<BusinessLandingProps> = ({ onNavigate }) => {
  const benefits = [
    { title: "Apps Exclusivas", desc: "Acceso total a nuestro marketplace de herramientas legales automatizadas.", icon: "🛠️" },
    { title: "Abogados Senior", desc: "Consultas programadas con socios reales de la firma Duarte-Aupart.", icon: "👔" },
    { title: "Compliance IA", desc: "Auditoría constante de riesgos fiscales, laborales y mercantiles.", icon: "🛡️" },
    { title: "Gestión de Cartera", desc: "Protocolos automatizados para la recuperación de cuentas por cobrar.", icon: "💰" }
  ];

  return (
    <div className="bg-neutral-50 min-h-screen pb-40">
      <section className="max-w-7xl mx-auto px-6 py-24 text-center space-y-8 animate-fade-in">
        <h2 className="text-[11px] font-black text-brand-blue uppercase tracking-[0.5em]">División Corporativa</h2>
        <h1 className="text-5xl md:text-8xl font-[900] text-neutral-900 tracking-tighter leading-none">
          Infraestructura legal <br /> para el <span className="text-brand-blue">crecimiento.</span>
        </h1>
        <p className="text-neutral-500 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
          Diseñado para PyMEs que necesitan un departamento legal de élite sin los costos de una nómina fija.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((b, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] saas-card border-none shadow-sm space-y-6">
            <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center text-3xl">{b.icon}</div>
            <h3 className="text-xl font-black text-neutral-800 tracking-tight uppercase">{b.title}</h3>
            <p className="text-neutral-500 text-sm font-medium leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-32">
        <div className="bg-neutral-900 rounded-[3rem] p-12 md:p-20 text-center space-y-12">
          <div className="space-y-4">
            <h3 className="text-white text-3xl md:text-5xl font-[900] tracking-tight">Plan Suscripción PyME</h3>
            <p className="text-neutral-400 text-lg">Todo lo que tu empresa necesita por una inversión fija mensual.</p>
          </div>
          
          <div className="text-white">
            <span className="text-6xl font-[900] tracking-tighter">${BUSINESS_PRICE}</span>
            <span className="text-neutral-500 text-xl font-bold ml-4 tracking-widest uppercase">/ mes</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
              className="px-12 py-5 bg-white text-neutral-900 font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-2xl hover:bg-neutral-100 transition-all"
            >
              Hablar con un Socio
            </button>
            <button 
              onClick={() => onNavigate(AppStep.PRICING)}
              className="px-12 py-5 bg-neutral-800 text-white border border-neutral-700 font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-neutral-700 transition-all"
            >
              Ver Comparativa
            </button>
          </div>
          
          <p className="text-[9px] text-neutral-600 font-black uppercase tracking-[0.4em]">Soporte prioritario • Sin plazos forzosos • Facturación inmediata</p>
        </div>
      </section>
    </div>
  );
};
