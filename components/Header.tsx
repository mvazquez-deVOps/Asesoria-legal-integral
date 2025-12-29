
import React from 'react';
import { BRAND_NAME, BRAND_TAGLINE, AppStep } from '../types';

export const LogoIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`relative ${className} flex items-center justify-center overflow-visible`}>
    <div className="relative w-full h-full flex items-center justify-center translate-y-[-5%]">
      <div className="absolute w-[35%] h-[12%] bg-brand-blue rounded-full -translate-x-[55%] -translate-y-[150%] rotate-[-5deg] opacity-90 shadow-sm"></div>
      <div className="absolute w-[35%] h-[12%] bg-brand-red rounded-full translate-x-[55%] -translate-y-[150%] rotate-[5deg] opacity-90 shadow-sm"></div>
      <div className="absolute w-[12%] h-[65%] bg-neutral-900 rounded-full z-10 translate-y-[10%]"></div>
      <div className="absolute bottom-[5%] w-[85%] h-[12%] bg-neutral-900 rounded-full"></div>
      <div className="absolute top-[20%] w-[12%] h-[12%] bg-brand-yellow rounded-full blur-[2px] animate-pulse"></div>
    </div>
  </div>
);

export const AISparkIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
  </svg>
);

interface HeaderProps {
  onNavigate: (step: AppStep, category?: string | null) => void;
  currentStep: AppStep;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentStep }) => {
  return (
    <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur-3xl border-b border-neutral-100/50">
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex justify-between items-center">
        <div 
          className="flex items-center space-x-5 cursor-pointer group" 
          onClick={() => onNavigate(AppStep.LANDING)}
        >
          <div className="p-1.5 bg-neutral-50 rounded-xl transition-all duration-500 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-neutral-200/40 group-hover:-rotate-2">
            <LogoIcon className="w-7 h-7" />
          </div>
          <div className="flex flex-col items-start justify-center pt-0.5">
            <h1 className="text-neutral-900 font-[900] text-[1.6rem] md:text-[1.85rem] tracking-[-0.07em] leading-[0.75] transition-all duration-300 group-hover:text-brand-blue antialiased">
              {BRAND_NAME}
            </h1>
            <span className="text-[6.5px] md:text-[7.5px] text-neutral-400 font-[800] tracking-[0.75em] uppercase mt-2 md:mt-2.5 ml-[0.15em] transition-all duration-500 group-hover:text-neutral-600">
              {BRAND_TAGLINE}
            </span>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-8 text-[9px] font-black text-neutral-500 uppercase tracking-[0.2em]">
          <button 
            onClick={() => onNavigate(AppStep.METHODOLOGY)}
            className={`hover:text-neutral-900 transition-all relative py-1 ${currentStep === AppStep.METHODOLOGY ? 'text-neutral-900 after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-brand-blue after:rounded-full' : ''}`}
          >
            Metodología
          </button>
          <button 
            onClick={() => onNavigate(AppStep.PRICING)}
            className={`hover:text-neutral-900 transition-all relative py-1 ${currentStep === AppStep.PRICING ? 'text-neutral-900 after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-brand-blue after:rounded-full' : ''}`}
          >
            Planes
          </button>
          <button 
            onClick={() => onNavigate(AppStep.CASES)}
            className={`hover:text-neutral-900 transition-all relative py-1 ${currentStep === AppStep.CASES ? 'text-neutral-900 after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-brand-blue after:rounded-full' : ''}`}
          >
            Especialidades
          </button>
          <button 
            onClick={() => onNavigate(AppStep.LEGAL_APPS)}
            className={`hover:text-neutral-900 transition-all relative py-1 ${currentStep === AppStep.LEGAL_APPS ? 'text-neutral-900 after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-brand-blue after:rounded-full' : ''}`}
          >
            Herramientas
          </button>
          <div className="h-4 w-px bg-neutral-200 mx-2"></div>
          <button 
            onClick={() => onNavigate(AppStep.HUMAN_PROFILING)}
            className="px-6 py-3 bg-neutral-900 text-white font-black rounded-xl uppercase tracking-widest text-[8px] shadow-lg hover:shadow-2xl hover:bg-brand-blue hover:-translate-y-0.5 transition-all transform active:scale-95"
          >
            Asocio Senior
          </button>
        </nav>
      </div>
    </header>
  );
};
