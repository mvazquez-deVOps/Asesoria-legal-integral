
import React, { useState, useRef, useEffect } from 'react';
import { Message, AppStep } from '../types';
import { generateLegalResponse } from '../services/geminiService';
import { LogoIcon } from './Header';

interface TrialChatProps {
  onNavigate: (step: AppStep) => void;
}

export const TrialChat: React.FC<TrialChatProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Bienvenido a JUXA. Soy su asistente legal de inteligencia artificial. ¿En qué situación jurídica puedo orientarle hoy? (Por favor, describa su caso brevemente)." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading || msgCount >= 3) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setMsgCount(prev => prev + 1);
    setIsLoading(true);

    try {
      const dummyUserData = {
        name: 'Usuario en Prueba', email: '', phone: '', category: 'Consulta General',
        subcategory: 'Interacción Rápida', description: userText, amount: '0',
        location: 'México', counterparty: 'N/A', processStatus: 'Inicial'
      };

      const aiText = await generateLegalResponse(messages, dummyUserData, userText);
      let responseText = aiText;
      if (msgCount === 2) {
        responseText += "\n\n**DIAGNÓSTICO LIMITADO:** He detectado elementos críticos que requieren un análisis técnico profundo. Para continuar, inicie el protocolo oficial.";
      }
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Error de conexión legal. Intente de nuevo." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const isLocked = msgCount >= 3;

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-12 px-6 pb-40 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-800 tracking-tight uppercase">Consulta Rápida <span className="text-brand-blue">IA</span></h2>
        <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.4em]">Opinión preliminar instantánea</p>
      </div>

      <div className="bg-white h-[700px] flex flex-col rounded-[2.5rem] saas-card border-none shadow-2xl overflow-hidden relative">
        <div className={`flex-1 overflow-y-auto p-10 space-y-8 bg-neutral-50/50 ${isLocked ? 'blur-sm grayscale opacity-30 pointer-events-none' : ''}`}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-6 py-4 rounded-2xl text-base leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-brand-blue text-white shadow-md rounded-br-none' 
                  : 'bg-white border border-neutral-200 text-neutral-700 shadow-sm rounded-bl-none font-medium'
              }`}>
                {m.text.split('\n').map((line, idx) => (
                   <p key={idx} className={line.startsWith('**') ? 'font-bold text-neutral-900 mt-2' : 'mb-2'}>
                     {line}
                   </p>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-neutral-200 px-5 py-2.5 rounded-full flex items-center space-x-3 shadow-sm">
                <div className="flex space-x-1"><div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce delay-100"></div></div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Analizando...</span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {isLocked && (
          <div className="absolute inset-0 z-40 bg-white/20 backdrop-blur-md flex flex-col items-center justify-center p-12 text-center space-y-10 animate-fade-in">
             <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center shadow-lg text-4xl">🔐</div>
             <div className="space-y-4">
                <h3 className="text-3xl font-bold text-neutral-800 tracking-tight">Análisis Inicial Concluido</h3>
                <p className="text-neutral-500 font-medium max-w-sm">
                  Para acceder a la estrategia legal completa y dictámenes certificados, inicie su diagnóstico oficial.
                </p>
             </div>
             <button 
                onClick={() => onNavigate(AppStep.DIAGNOSIS)}
                className="px-12 py-5 bg-neutral-900 text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-xl hover:bg-black transition-all"
              >
                Iniciar Diagnóstico Oficial
              </button>
          </div>
        )}

        {!isLocked && (
          <div className="p-8 bg-white border-t border-neutral-100">
            <div className="flex space-x-4">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describa su situación legal..."
                className="flex-1 bg-neutral-50 border border-neutral-200 rounded-2xl px-8 py-5 focus:outline-none focus:ring-4 focus:ring-brand-blue/5 text-neutral-800 font-medium"
              />
              <button 
                onClick={handleSend}
                className="px-10 bg-neutral-900 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-lg"
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
