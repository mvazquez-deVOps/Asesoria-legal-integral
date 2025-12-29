
import React from 'react';
import { AppStep, BRAND_NAME } from '../types';

interface MethodologyProps {
  onNavigate: (step: AppStep) => void;
}

export const Methodology: React.FC<MethodologyProps> = ({ onNavigate }) => {
  const steps = [
    {
      title: "Traducción Lexicográfica",
      desc: "Nuestra IA procesa su lenguaje natural y lo traduce a variables jurídicas técnicas, identificando materias, cuantías y jurisdicciones en milisegundos.",
      icon: "💬"
    },
    {
      title: "Análisis Heurístico",
      desc: "Contrastamos su narrativa con nuestra base de datos propietaria de jurisprudencia y precedentes de alta cuantía de la SCJN.",
      icon: "🧠"
    },
    {
      title: "Mapeo de Riesgos",
      desc: "Identificamos 'red flags' procesales, términos de prescripción y la solvencia probable de la contraparte.",
      icon: "⚖️"
    },
    {
      title: "Dictamen Certificado",
      desc: "Generamos una hoja de ruta estratégica en PDF, lista para ser ejecutada por usted o nuestra red de socios senior.",
      icon: "📄"
    }
  ];

  return (
    <div className="bg-neutral-50 min-h-screen pb-40">
      <section className="max-w-7xl mx-auto px-6 py-24 text-center space-y-8 animate-fade-in">
        <h2 className="text-[11px] font-black text-brand-blue uppercase tracking-[0.5em]">Lógica Operativa</h2>
        <h1 className="text-5xl md:text-8xl font-[900] text-neutral-900 tracking-tighter leading-none">
          Cómo JUXA piensa <br /> su <span className="text-brand-blue">defensa.</span>
        </h1>
        <p className="text-neutral-500 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
          No somos un chat; somos un motor de razonamiento jurídico de alta fidelidad.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((s, i) => (
            <div key={i} className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-neutral-100 group hover:shadow-2xl transition-all duration-500">
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <span className="text-3xl font-[900] text-neutral-100">0{i+1}</span>
              </div>
              <h3 className="text-2xl font-black text-neutral-900 tracking-tight uppercase mb-4">{s.title}</h3>
              <p className="text-neutral-500 font-medium leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 mt-32">
        <div className="bg-neutral-900 rounded-[3rem] p-12 md:p-20 text-center space-y-10">
          <h3 className="text-white text-3xl md:text-5xl font-black tracking-tight leading-tight">
            ¿Listo para ver nuestra <br /> metodología en acción?
          </h3>
          <p className="text-neutral-400 font-medium text-lg">Inicie un diagnóstico y obtenga su Estrategia Maestra en segundos.</p>
          <div className="pt-4">
            <button 
              onClick={() => onNavigate(AppStep.DIAGNOSIS)}
              className="px-12 py-5 bg-brand-blue text-white font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-2xl hover:bg-blue-600 transition-all"
            >
              Iniciar Diagnóstico
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
