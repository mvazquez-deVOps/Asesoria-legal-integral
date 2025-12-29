
import React, { useState, useEffect, useRef } from 'react';
import { Message, AppStep, HUMAN_CONSULTATION_PRICE, SINGLE_DIAGNOSIS_PRICE, PERSONAL_PRICE } from '../types';
import { LogoIcon } from './Header';

// Added missing interface definition for HumanProfilingChat component props
interface HumanProfilingChatProps {
  onNavigate: (step: AppStep) => void;
}

export const HumanProfilingChat: React.FC<HumanProfilingChatProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Bienvenido al Centro de Consultoría Humana de Élite. Antes de conectarle con un Socio Titular, necesito perfilar su caso. ¿Cuál es la urgencia de su situación en una escala del 1 al 10?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    setTimeout(() => {
      let nextResponse = "";
      if (step === 0) {
        nextResponse = "Entiendo. ¿El asunto involucra montos superiores a $200,000 MXN o hay personas en riesgo inminente?";
        setStep(1);
      } else if (step === 1) {
        nextResponse = "Análisis de perfilamiento concluido. He detectado que su caso requiere una estrategia de alta complejidad.";
        setStep(2);
      }
      setMessages(prev => [...prev, { role: 'model', text: nextResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  const isCompleted = step === 2;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 pb-40 space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-extrabold text-neutral-800 tracking-tighter uppercase">Perfilamiento <span className="text-brand-blue">Humano</span></h2>
        <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.4em]">Filtro Senior de Consultoría</p>
      </div>

      <div className="bg-white h-[750px] flex flex-col rounded-[3rem] saas-card border-none shadow-2xl overflow-hidden relative">
        <div className={`flex-1 overflow-y-auto p-12 space-y-10 bg-neutral-50/50 ${isCompleted ? 'blur-sm grayscale opacity-30 pointer-events-none' : ''}`}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-8 py-5 rounded-2xl text-base leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-brand-blue text-white shadow-md rounded-br-none' 
                  : 'bg-white border border-neutral-200 text-neutral-700 rounded-bl-none shadow-sm font-medium'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-[10px] text-neutral-400 font-black uppercase tracking-widest animate-pulse">Analizando Perfil...</div>}
          <div ref={chatEndRef} />
        </div>

        {isCompleted && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-white/20 backdrop-blur-md animate-fade-in">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-12 rounded-[2.5rem] saas-card border-brand-blue/30 shadow-2xl flex flex-col justify-between space-y-8 border-none">
                <div className="space-y-4">
                  <span className="text-brand-blue text-[9px] font-black uppercase tracking-[0.4em]">Opción Senior Recomendada</span>
                  <h3 className="text-3xl font-bold text-neutral-800 uppercase tracking-tight leading-none">Socio Titular</h3>
                  <p className="text-neutral-500 text-sm font-medium leading-relaxed">Sesión táctica de 45 min con un abogado Senior para estructurar su defensa.</p>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-neutral-100 pb-4">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Inversión Única</span>
                    <span className="text-4xl font-extrabold text-neutral-800">${HUMAN_CONSULTATION_PRICE}</span>
                  </div>
                  <button className="w-full py-6 bg-brand-blue text-white font-black rounded-2xl uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-blue-600 transition-all">Contratar Humano</button>
                </div>
              </div>

              <div className="bg-white/80 p-12 rounded-[2.5rem] saas-card border-none flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <span className="text-neutral-400 text-[9px] font-black uppercase tracking-[0.4em]">Alternativa Digital</span>
                  <h3 className="text-3xl font-bold text-neutral-800 uppercase tracking-tight leading-none">IA Estratégica</h3>
                  <p className="text-neutral-500 text-sm font-medium leading-relaxed">Diagnóstico técnico masivo sin intervención humana inmediata.</p>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-neutral-100 pb-4">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Desde</span>
                    <span className="text-4xl font-extrabold text-neutral-800">${SINGLE_DIAGNOSIS_PRICE}</span>
                  </div>
                  <button onClick={() => onNavigate(AppStep.DIAGNOSIS)} className="w-full py-6 border border-neutral-200 text-neutral-800 font-black rounded-2xl uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-50 transition-all">Usar IA JUXA</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isCompleted && (
          <div className="p-8 bg-white border-t border-neutral-100">
            <div className="flex space-x-4 max-w-4xl mx-auto">
              <input 
                type="text" 
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Escriba su respuesta..."
                className="flex-1 bg-neutral-50 border border-neutral-200 rounded-2xl px-8 py-5 focus:outline-none focus:ring-4 focus:ring-brand-blue/5 text-neutral-800 font-medium"
              />
              <button 
                onClick={handleSend}
                className="px-10 bg-neutral-900 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-lg hover:bg-black transition-all"
              >
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
