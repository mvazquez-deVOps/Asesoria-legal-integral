
import React from 'react';
import { AppStep } from '../types';

interface BottomNavProps {
  onNavigate: (step: AppStep) => void;
  currentStep: AppStep;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onNavigate, currentStep }) => {
  const navItems = [
    { id: AppStep.LANDING, label: 'Inicio', icon: '🏠' },
    { id: AppStep.DIAGNOSIS, label: 'Diagnóstico', icon: '🧠', primary: true },
    { id: AppStep.LEGAL_APPS, label: 'Herramientas', icon: '🛠️' },
    { id: AppStep.ACCOUNT, label: 'Mi Cuenta', icon: '👤' }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-t border-neutral-200 px-6 py-5 flex justify-around items-center shadow-[0_-5px_25px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center space-y-1.5 transition-all ${
            currentStep === item.id 
              ? 'text-brand-blue' 
              : 'text-neutral-400'
          }`}
        >
          <div className={`text-2xl transition-transform ${item.primary ? 'bg-brand-blue text-white p-3.5 rounded-2xl -mt-10 shadow-xl ring-4 ring-neutral-50' : 'group-hover:scale-110'}`}>
            {item.icon}
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
