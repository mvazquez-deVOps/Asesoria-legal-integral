
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AppStep } from '../types';
import { AISparkIcon } from './Header';

interface SiteAssistantProps {
  onNavigate: (step: AppStep) => void;
}

export const SiteAssistant: React.FC<SiteAssistantProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Hola, soy el asistente de JUXA. ¿Buscas un diagnóstico o quieres conocer nuestras herramientas para empresas?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages.map(m => ({ role: m.role, parts: [{text: m.text}] })), { role: 'user', parts: [{text: textToSend}] }],
        config: {
          systemInstruction: `
            ERES: Concierge de Conversión de JUXA (NO ERES ABOGADO).
            MISIÓN: Guiar al usuario, explicar beneficios y cerrar ventas de diagnósticos.
            REGLA DE ORO: SI EL USUARIO HACE PREGUNTAS LEGALES ESPECÍFICAS, di: "Como guía del sitio, no doy asesoría legal, pero nuestro Diagnóstico IA está diseñado para darte tu Estrategia Maestra. ¿Quieres iniciarlo ahora?"
            TONO: Amigable, profesional, estilo Google Support.
          `,
          temperature: 0.4
        }
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "Hubo un error al procesar tu duda." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Lo siento, estoy fuera de línea en este momento." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickOptions = [
    { label: "¿Cómo funciona?", text: "Explícame cómo funciona el diagnóstico" },
    { label: "Ver Precios", text: "¿Cuáles son los precios de los planes?" },
    { label: "Hablar con un Socio", text: "¿Cómo puedo contactar a un abogado?" }
  ];

  return (
    <div className="fixed bottom-10 right-10 z-[200] flex flex-col items-end">
      {isOpen && (
        <div className="w-[380px] h-[550px] bg-white border border-neutral-100 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden mb-6 animate-slide-up ring-1 ring-black/5">
          <header className="p-7 bg-white border-b border-neutral-50 flex justify-between items-center">
             <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-brand-blue text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
                  <AISparkIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-black text-neutral-800 tracking-tight block uppercase">Concierge</span>
                  <span className="text-[9px] text-brand-blue font-black tracking-widest uppercase">Inteligencia JUXA</span>
                </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-neutral-50 flex items-center justify-center transition-colors">✕</button>
          </header>

          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-neutral-50/30">
             {messages.map((m, i) => (
               <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-[13px] leading-relaxed font-medium ${
                    m.role === 'user' ? 'bg-brand-blue text-white shadow-md' : 'bg-white border border-neutral-100 text-neutral-600 shadow-sm'
                  }`}>
                    {m.text}
                  </div>
               </div>
             ))}
             {!isLoading && (
               <div className="flex flex-wrap gap-2 pt-2">
                  {quickOptions.map(opt => (
                    <button 
                      key={opt.label}
                      onClick={() => handleSend(opt.text)}
                      className="text-[10px] px-4 py-2 rounded-full bg-white border border-neutral-200 text-neutral-500 font-bold hover:border-brand-blue hover:text-brand-blue transition-all shadow-sm"
                    >
                      {opt.label}
                    </button>
                  ))}
               </div>
             )}
             {isLoading && <div className="text-[9px] text-neutral-400 animate-pulse px-2 font-black uppercase tracking-widest">Calculando...</div>}
             <div ref={scrollRef} />
          </div>

          <div className="p-6 bg-white border-t border-neutral-50">
             <div className="flex space-x-3">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe aquí..."
                  className="flex-1 bg-neutral-50 border-none rounded-2xl px-5 py-4 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/10"
                />
                <button 
                  onClick={() => handleSend()}
                  className="w-12 h-12 bg-neutral-900 text-white flex items-center justify-center rounded-2xl shadow-lg hover:bg-black transition-all"
                >
                  ↑
                </button>
             </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-white border border-neutral-100 text-brand-blue rounded-[2rem] flex items-center justify-center shadow-2xl hover:scale-105 transition-all relative overflow-hidden group ring-1 ring-black/5"
      >
        <div className="flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
          {isOpen ? <span className="text-xl text-neutral-400">✕</span> : <AISparkIcon className="w-8 h-8" />}
        </div>
        {!isOpen && (
          <div className="absolute top-0 right-0 p-3">
            <div className="w-2 h-2 bg-brand-red rounded-full animate-ping"></div>
          </div>
        )}
      </button>
    </div>
  );
};
