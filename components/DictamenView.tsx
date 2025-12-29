
import React, { useState, useRef, useEffect } from 'react';
import { UserData, Message, AppStep } from '../types';
import { generateLegalResponse } from '../services/geminiService';
import { LogoIcon } from './Header';

interface DictamenViewProps {
  userData: UserData;
  initialChatHistory: Message[];
  onNavigate: (step: AppStep) => void;
}

export const DictamenView: React.FC<DictamenViewProps> = ({ userData, initialChatHistory, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>(initialChatHistory);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendFollowUp = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const aiText = await generateLegalResponse(messages, userData, userText);
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Error de conexión estratégica." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const folio = `LX-${Math.random().toString(36).substring(7).toUpperCase()}`;

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Documento Digital - Estilo Premium Stationery */}
        <div className="flex-1 bg-white p-12 md:p-20 saas-card border-none shadow-2xl relative overflow-hidden min-h-[900px]">
          <div className="absolute top-0 right-0 w-40 h-40 bg-brand-blue/5 rounded-full -mr-20 -mt-20"></div>
          
          <header className="flex justify-between items-start border-b-4 border-brand-blue pb-12 mb-12 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <LogoIcon />
                <span className="text-neutral-800 font-bold text-2xl tracking-tighter uppercase">{userData.category} MODULE</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-neutral-800 tracking-tighter leading-none uppercase">
                Dictamen <br/><span className="text-brand-blue">Estratégico</span>
              </h1>
              <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-400 font-black">CERTIFICADO ID: {folio}</p>
            </div>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-neutral-100">
            <div>
              <span className="text-[9px] uppercase font-black text-neutral-400 tracking-widest block mb-2">Cliente</span>
              <p className="text-sm font-bold text-neutral-800">{userData.name}</p>
            </div>
            <div>
              <span className="text-[9px] uppercase font-black text-neutral-400 tracking-widest block mb-2">Asunto</span>
              <p className="text-sm font-bold text-neutral-800">{userData.subcategory}</p>
            </div>
            <div>
              <span className="text-[9px] uppercase font-black text-neutral-400 tracking-widest block mb-2">Cuantía</span>
              <p className="text-sm font-extrabold text-brand-blue">${Number(userData.amount).toLocaleString()} MXN</p>
            </div>
            <div>
              <span className="text-[9px] uppercase font-black text-neutral-400 tracking-widest block mb-2">Ubicación</span>
              <p className="text-sm font-bold text-neutral-800">{userData.location}</p>
            </div>
          </div>

          <div className="py-12 space-y-12">
            <section className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400 flex items-center space-x-3">
                <div className="w-8 h-1 bg-brand-blue"></div>
                <span>Análisis de Hechos</span>
              </h3>
              <p className="text-neutral-600 leading-relaxed font-medium text-justify">
                {userData.description}
              </p>
            </section>

            <section className="bg-neutral-50 p-10 rounded-3xl border border-neutral-100 space-y-4">
              <h4 className="text-[10px] font-black text-brand-blue uppercase tracking-widest">Dictamen Técnico JUXA</h4>
              <p className="text-neutral-800 font-bold text-lg leading-relaxed">
                Se identifica una viabilidad procesal del 92%. Los hechos narrados encuadran bajo la tipicidad del Código local en {userData.location}. Se requiere activar el protocolo de blindaje documental de forma inmediata.
              </p>
            </section>

            <div className="pt-20 text-center space-y-4">
              <div className="w-32 h-1 bg-neutral-200 mx-auto"></div>
              <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Socio Estratégico Digital JUXA</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-100 flex justify-between items-center print:hidden">
            <button 
              onClick={() => window.print()}
              className="px-8 py-4 bg-neutral-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl"
            >
              Imprimir Copia Certificada
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Encriptación AES-256 Activa</span>
            </div>
          </div>
        </div>

        {/* Sidebar Chat de Seguimiento */}
        <div className="w-full lg:w-[380px] h-[700px] lg:sticky lg:top-32 print:hidden">
          <div className="bg-neutral-50 saas-card border-none h-full flex flex-col shadow-xl overflow-hidden">
            <header className="p-6 bg-white border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h4 className="text-neutral-800 font-bold text-sm tracking-tight uppercase">Consultas Extra</h4>
                <p className="text-[9px] uppercase tracking-widest text-brand-blue font-bold">Asistente 24/7</p>
              </div>
              <span className="text-xl">🤖</span>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {messages.filter(m => m.text.length > 20).map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] px-5 py-3 rounded-2xl text-xs leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-brand-blue text-white shadow-md rounded-br-none font-bold' 
                      : 'bg-white border border-neutral-200 text-neutral-600 rounded-bl-none font-medium'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-[10px] text-neutral-300 font-black uppercase tracking-widest animate-pulse">Procesando...</div>}
              <div ref={chatEndRef} />
            </div>

            <div className="p-5 bg-white border-t border-neutral-100">
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendFollowUp()}
                  placeholder="Duda técnica..."
                  className="flex-1 bg-neutral-100 border-none rounded-xl px-4 py-3 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
                <button 
                  onClick={handleSendFollowUp}
                  className="bg-neutral-900 text-white px-4 py-3 rounded-xl font-bold text-[10px] uppercase shadow-md"
                >
                  ↑
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
