
import React, { useState, useEffect, useRef } from 'react';
import { UserData, Message, AppStep } from '../types';
import { generateLegalResponse, startDiagnosis } from '../services/geminiService';
import { LogoIcon, AISparkIcon } from './Header';

interface ChatInterfaceProps {
  userData: UserData;
  onComplete: (history: Message[]) => void;
  onNavigate: (step: AppStep) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ userData, onComplete, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [aiResponseCount, setAiResponseCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);
      try {
        const aiResponse = await startDiagnosis(userData);
        setMessages([{ role: 'model', text: aiResponse }]);
        setAiResponseCount(1);
      } catch(e) {
        setMessages([{ role: 'model', text: "Lo sentimos, el motor estratégico está experimentando latencia. Reintente." }]);
      }
      setIsLoading(false);
    };
    if (userData) initializeChat();
  }, [userData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || aiResponseCount >= 4 || isLoading) return;
    
    const userMsg: Message = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);
    
    const aiResponse = await generateLegalResponse(messages, userData, currentInput);
    
    let finalText = aiResponse;
    if (aiResponseCount === 3) {
      finalText += "\n\n**PROCESO CONCLUIDO:**\nHe recopilado los elementos necesarios para su Dictamen de Estrategia Maestra.";
    }

    setMessages(prev => [...prev, { role: 'model', text: finalText }]);
    setAiResponseCount(prev => prev + 1);
    setIsLoading(false);
  };

  const isLocked = aiResponseCount >= 4;

  return (
    <div className="max-w-5xl mx-auto h-[850px] flex flex-col bg-white saas-card border-none shadow-2xl overflow-hidden animate-fade-in ring-1 ring-black/5">
      {/* Chat Header */}
      <div className="px-12 py-10 border-b border-neutral-50 flex justify-between items-center bg-white z-10">
        <div className="flex items-center space-x-6">
          <div className="w-14 h-14 bg-brand-blue text-white rounded-[1.25rem] flex items-center justify-center shadow-xl shadow-brand-blue/20">
            <AISparkIcon className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight uppercase">Socio IA JUXA</h2>
            <p className="text-[9px] uppercase tracking-[0.4em] text-brand-blue font-black mt-1">Diagnóstico Táctico en Curso</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {[1,2,3].map(i => (
            <div key={i} className={`h-1.5 w-10 rounded-full transition-all duration-1000 ${i < aiResponseCount ? 'bg-brand-blue' : 'bg-neutral-100'}`}></div>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className={`flex-1 overflow-y-auto p-12 space-y-10 bg-neutral-50/20 ${isLocked ? 'blur-md grayscale opacity-40 pointer-events-none' : ''}`}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-8 py-5 rounded-[1.5rem] text-base leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-brand-blue text-white shadow-xl shadow-brand-blue/10 rounded-br-none font-medium' 
                : 'bg-white border border-neutral-100 text-neutral-700 shadow-sm rounded-bl-none font-medium'
            }`}>
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className={line.startsWith('**') ? 'font-bold text-neutral-900 mt-3 mb-1' : 'mb-3 last:mb-0'}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex items-center space-x-4 px-6 py-4 bg-white border border-neutral-50 rounded-full shadow-sm">
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-brand-red rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-brand-yellow rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Calculando Estrategia...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Paywall Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-12 bg-white/40 backdrop-blur-xl animate-fade-in">
          <div className="bg-white p-14 max-w-lg w-full rounded-[3rem] shadow-2xl text-center space-y-10 border border-neutral-50">
            <div className="w-24 h-24 bg-brand-blue/10 text-brand-blue rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
               <AISparkIcon className="w-10 h-10" />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-neutral-900 tracking-tight uppercase">Análisis Concluido</h3>
              <p className="text-neutral-500 font-medium">Su Estrategia Maestra Certificada está lista para ser consultada.</p>
            </div>
            <button 
              onClick={() => onComplete(messages)}
              className="w-full py-6 bg-brand-blue text-white font-black rounded-2xl uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-blue-600 hover:shadow-brand-blue/40 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Ver Mi Dictamen Oficial
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-10 bg-white border-t border-neutral-50">
        <div className="flex space-x-5 max-w-4xl mx-auto">
          <input
            type="text"
            disabled={isLocked || isLoading}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isLocked ? "Proceso concluido." : "Describa hechos o responda a la IA..."}
            className="flex-1 bg-neutral-50 border-none rounded-[1.5rem] px-8 py-5 focus:outline-none focus:ring-4 focus:ring-brand-blue/5 text-neutral-800 font-medium placeholder:text-neutral-400"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLocked || isLoading || !inputValue.trim()}
            className="px-12 bg-neutral-900 text-white font-black rounded-[1.5rem] uppercase tracking-widest text-[11px] shadow-xl disabled:opacity-20 hover:bg-black transition-all active:scale-95"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
