
import React from 'react';
import { CATEGORIES_DATA, AppStep } from '../types';

interface CategoryDetailProps {
  category: string;
  onStart: () => void;
  onNavigate: (step: AppStep) => void;
}

export const CategoryDetail: React.FC<CategoryDetailProps> = ({ category, onStart, onNavigate }) => {
  const data = CATEGORIES_DATA[category];

  if (!data) return null;

  return (
    <div className="bg-white py-12 pb-40 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        <div className="flex-1 space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-neutral-50 rounded-full border border-neutral-200">
              <span className="w-2 h-2 bg-brand-blue rounded-full"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Especialidad JUXA</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-800 tracking-tight leading-tight">
              {data.title}
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed font-medium">
              "{data.logic}"
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.features.map((f: string) => (
              <div key={f} className="monday-card p-6 flex items-center space-x-4">
                <span className="text-brand-green font-bold">✔</span>
                <span className="text-neutral-800 font-semibold">{f}</span>
              </div>
            ))}
          </div>

          <div className="p-10 bg-neutral-800 rounded-[2rem] text-white space-y-8 shadow-xl relative overflow-hidden">
            <h3 className="text-brand-yellow text-xl font-bold uppercase tracking-widest">Resultado del Dictamen JUXA:</h3>
            <p className="text-neutral-300 text-lg leading-relaxed">
              {data.results}
            </p>
            <div className="pt-4 border-t border-white/10">
               <p className="text-[11px] text-neutral-400 font-medium uppercase tracking-widest leading-relaxed">Representación opcional disponible a través de nuestra Red de Socios Especialistas.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <button 
              onClick={onStart}
              className="pill-button px-10 py-5 bg-brand-blue text-white font-bold uppercase tracking-widest text-xs shadow-lg hover:bg-blue-600 transition-all"
            >
              Iniciar Diagnóstico Ahora
            </button>
            <button 
              onClick={() => onNavigate(AppStep.PRICING)}
              className="pill-button px-10 py-5 bg-white text-neutral-800 font-bold uppercase tracking-widest text-xs border border-neutral-200 hover:bg-neutral-50 transition-all shadow-sm"
            >
              Ver Planes de Defensa
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[350px] space-y-8">
          <div className="monday-card p-10 flex flex-col justify-center items-center text-center space-y-6">
            <div className="text-6xl font-bold text-brand-blue">{data.stats.replace('Certeza del ', '')}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">Efectividad Técnica</div>
            <div className="w-full h-px bg-neutral-100 my-2"></div>
            <p className="text-sm text-neutral-600 leading-relaxed italic">"Garantizamos que su estrategia esté basada en jurisprudencia vigente."</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-2">Casos de Éxito:</h4>
            {data.examples.map((ex, i) => (
              <div key={i} className="bg-neutral-50 border border-neutral-200 p-6 rounded-2xl space-y-2 hover:bg-white transition-all shadow-sm">
                <p className="text-sm text-neutral-800 font-semibold leading-relaxed">{ex}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
