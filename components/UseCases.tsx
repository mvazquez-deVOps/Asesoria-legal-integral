
import React from 'react';
import { CATEGORIES_DATA, AppStep, SINGLE_DIAGNOSIS_PRICE, PERSONAL_PRICE } from '../types';

interface UseCasesProps {
  onSelect: (category: string) => void;
  onNavigate: (step: AppStep, category?: string | null) => void;
}

export const UseCases: React.FC<UseCasesProps> = ({ onSelect, onNavigate }) => {
  const getIcon = (cat: string) => {
    switch(cat) {
      case 'Familiar': return '🏠';
      case 'Civil': return '🏦';
      case 'Empresarial': return '🏢';
      case 'Penal': return '⚖️';
      default: return '🛡️';
    }
  };

  const getAccentColor = (cat: string) => {
    switch(cat) {
      case 'Familiar': return 'bg-brand-violet';
      case 'Civil': return 'bg-brand-blue';
      case 'Empresarial': return 'bg-brand-emerald';
      case 'Penal': return 'bg-brand-coral';
      default: return 'bg-neutral-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-24 py-16 px-6 pb-40 bg-neutral-50">
      <div className="text-center space-y-6">
        <h2 className="text-[11px] font-black text-brand-blue uppercase tracking-[0.5em]">Infraestructura de Alta Tecnología</h2>
        <h3 className="text-5xl md:text-7xl font-extrabold text-neutral-800 tracking-tighter uppercase">Usos del Sistema</h3>
        <p className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          Nuestra infraestructura legal digital cubre las áreas críticas para ciudadanos y empresas. Seleccione una materia para ver cómo podemos ayudarle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {Object.keys(CATEGORIES_DATA).map((cat) => (
          <div 
            key={cat}
            className="saas-card p-12 flex flex-col group transition-all duration-500 cursor-pointer overflow-hidden border-none"
            onClick={() => onNavigate(AppStep.CATEGORY_DETAIL, cat)}
          >
            <div className={`absolute top-0 left-0 w-full h-1.5 ${getAccentColor(cat)}`}></div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                      {getIcon(cat)}
                    </div>
                    <h4 className="text-3xl font-bold text-neutral-800 tracking-tight uppercase">{cat}</h4>
                  </div>
                  <div className="inline-block px-4 py-1.5 bg-neutral-50 rounded-full border border-neutral-200 text-[9px] font-black uppercase tracking-widest text-neutral-400">
                    98% de viabilidad en diagnósticos previos
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-neutral-600 font-medium leading-relaxed">
                  {CATEGORIES_DATA[cat].description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                   {CATEGORIES_DATA[cat].features.slice(0, 3).map(f => (
                     <span key={f} className="text-[9px] text-neutral-400 border border-neutral-200 px-3 py-1 rounded-full font-black uppercase tracking-wider">{f}</span>
                   ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 border-t border-neutral-100">
                <button 
                  onClick={(e) => { e.stopPropagation(); onNavigate(AppStep.DIAGNOSIS, cat); }}
                  className="w-full py-5 bg-neutral-900 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-[10px] shadow-lg hover:bg-black transition-all"
                >
                  Consulta Única • ${SINGLE_DIAGNOSIS_PRICE}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onNavigate(AppStep.PRICING); }}
                  className="w-full py-5 border border-neutral-200 text-neutral-800 font-bold rounded-2xl uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-50 transition-all"
                >
                  Protección Mensual • ${PERSONAL_PRICE}
                </button>
              </div>
              
              <div className="text-center pt-2">
                <p className="text-[8px] uppercase tracking-[0.4em] font-black text-neutral-300">Click para ver detalles y qué esperar del dictamen</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explicación de Valor Adicional Homologada */}
      <div className="saas-card p-16 rounded-[3rem] text-center space-y-12 border-none max-w-4xl mx-auto shadow-2xl bg-white">
         <h3 className="text-3xl font-bold text-neutral-800 tracking-tight uppercase">¿Por qué usar el Sistema JUXA?</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
               <span className="text-4xl block">🛡️</span>
               <h4 className="text-[10px] font-black uppercase text-brand-blue tracking-widest">Inmediatez Jurídica</h4>
               <p className="text-sm text-neutral-500 font-medium leading-relaxed">Sin esperas. Diagnóstico preliminar en segundos.</p>
            </div>
            <div className="space-y-4">
               <span className="text-4xl block">🔍</span>
               <h4 className="text-[10px] font-black uppercase text-brand-blue tracking-widest">Precisión Técnica</h4>
               <p className="text-sm text-neutral-500 font-medium leading-relaxed">Basado en bases de datos de jurisprudencia real.</p>
            </div>
            <div className="space-y-4">
               <span className="text-4xl block">📄</span>
               <h4 className="text-[10px] font-black uppercase text-brand-blue tracking-widest">Dictamen PDF</h4>
               <p className="text-sm text-neutral-500 font-medium leading-relaxed">Reciba un documento técnico listo para su abogado.</p>
            </div>
         </div>
      </div>
    </div>
  );
};
