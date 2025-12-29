
import React, { useState } from 'react';
import { AppStep, SINGLE_DIAGNOSIS_PRICE, PERSONAL_PRICE, BUSINESS_PRICE } from '../types';

interface LegalAppsProps {
  onNavigate: (step: AppStep) => void;
}

interface AppTool {
  id: string;
  name: string;
  icon: string;
  desc: string;
  tier: 'Public' | 'Personal' | 'Business';
  actionLabel: string;
}

const APP_MARKETPLACE: AppTool[] = [
  { id: 'lft', name: 'Calculadora LFT', icon: '🧮', desc: 'Cálculo técnico de liquidaciones y finiquitos oficiales.', tier: 'Public', actionLabel: 'Usar Ahora' },
  { id: 'aviso', name: 'Generador de Aviso', icon: '📝', desc: 'Aviso de Privacidad (LFPDPPP) para sitios web.', tier: 'Public', actionLabel: 'Generar' },
  { id: 'contratos', name: 'Analizador de Riesgos', icon: '🔍', desc: 'Auditoría IA de cláusulas abusivas en contratos.', tier: 'Personal', actionLabel: 'Activar con Plan' },
  { id: 'juris', name: 'Buscador Pro', icon: '⚖️', desc: 'Jurisprudencia aplicada a hechos concretos.', tier: 'Personal', actionLabel: 'Activar con Plan' },
  { id: 'compliance', name: 'Auditor PyME', icon: '🛡️', desc: 'Diagnóstico holístico de riesgos operativos.', tier: 'Business', actionLabel: 'Solicitar Demo' },
  { id: 'cartera', name: 'Gestor de Cartera', icon: '💰', desc: 'Protocolo de cobranza judicial automatizado.', tier: 'Business', actionLabel: 'Solicitar Demo' }
];

export const LegalApps: React.FC<LegalAppsProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'All' | 'Public' | 'Personal' | 'Business'>('All');

  const filteredApps = filter === 'All' ? APP_MARKETPLACE : APP_MARKETPLACE.filter(app => app.tier === filter);

  const getTierBadge = (tier: string) => {
    switch(tier) {
      case 'Public': return <span className="text-[9px] font-black bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full uppercase tracking-widest">Abierto</span>;
      case 'Personal': return <span className="text-[9px] font-black bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-full uppercase tracking-widest">Suscripción</span>;
      case 'Business': return <span className="text-[9px] font-black bg-brand-violet/10 text-brand-violet px-2 py-0.5 rounded-full uppercase tracking-widest">Plan PyME</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-20 animate-fade-in pb-40">
      {/* Header Estilo Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-neutral-200 pb-12">
        <div className="space-y-4">
          <h2 className="text-[11px] font-bold text-brand-blue uppercase tracking-[0.5em]">Infraestructura Legal</h2>
          <h1 className="text-5xl font-extrabold text-neutral-800 tracking-tighter">Ecosistema JUXA Apps</h1>
          <p className="text-neutral-500 max-w-lg font-medium">Herramientas tácticas diseñadas para automatizar la lógica jurídica en tu día a día.</p>
        </div>
        
        <div className="flex bg-neutral-100 p-1 rounded-2xl border border-neutral-200">
          {(['All', 'Public', 'Personal', 'Business'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${filter === t ? 'bg-white text-neutral-800 shadow-sm' : 'text-neutral-400 hover:text-neutral-600'}`}
            >
              {t === 'All' ? 'Todas' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Aplicaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredApps.map((app) => (
          <div 
            key={app.id} 
            className="saas-card bg-white p-10 flex flex-col group border-none shadow-sm hover:shadow-xl"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {app.icon}
              </div>
              {getTierBadge(app.tier)}
            </div>

            <div className="space-y-4 flex-1">
              <h3 className="text-2xl font-bold text-neutral-800 tracking-tight">{app.name}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                {app.desc}
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-neutral-100 flex items-center justify-between">
              <button 
                onClick={() => {
                  if (app.tier === 'Public') onNavigate(AppStep.DIAGNOSIS);
                  else onNavigate(AppStep.PRICING);
                }}
                className={`py-3 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  app.tier === 'Public' 
                    ? 'bg-neutral-800 text-white hover:bg-black' 
                    : 'text-brand-blue hover:bg-brand-blue/5'
                }`}
              >
                {app.actionLabel}
              </button>
              <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">v2.4.0</span>
            </div>
          </div>
        ))}
      </div>

      {/* Banner de Conversión Business */}
      <div className="bg-neutral-900 rounded-[3rem] p-12 md:p-20 text-center space-y-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-violet blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h4 className="text-brand-violet text-xs font-black uppercase tracking-[0.5em]">Exclusivo para Empresas</h4>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">Optimiza tu departamento legal con el Plan PyME</h3>
          <p className="text-neutral-400 font-medium">Acceso total a las herramientas de compliance, auditoría y recuperación de cartera para tu negocio.</p>
          <div className="pt-8 flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => onNavigate(AppStep.PRICING)}
              className="px-10 py-5 bg-white text-neutral-900 font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-2xl hover:bg-neutral-100 transition-all"
            >
              Comparar Planes
            </button>
            <button 
              onClick={() => window.open(`https://wa.me/5215511527404`, '_blank')}
              className="px-10 py-5 bg-neutral-800 text-white border border-neutral-700 font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-neutral-700 transition-all"
            >
              Hablar con Ventas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
