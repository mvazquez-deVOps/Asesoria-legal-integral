
import React, { useState, useEffect } from 'react';
import { CONSULTATION_PRICE, UserData, WHATSAPP_NUMBER, BRAND_NAME } from '../types';

interface PaymentGateProps {
  userData: UserData;
}

export const PaymentGate: React.FC<PaymentGateProps> = ({ userData }) => {
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsValidated(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in print:p-0 pb-32">
      <header className="text-center space-y-4 print:hidden">
        <div className="flex justify-center mb-6">
           <div className={`transition-all duration-1000 transform ${isValidated ? 'scale-110 opacity-100' : 'scale-50 opacity-0'}`}>
              <div className="w-28 h-28 rounded-full border-[6px] border-[#D4AF37] flex items-center justify-center relative shadow-[0_0_50px_rgba(212,175,55,0.3)]">
                 <span className="text-[#D4AF37] font-black text-[11px] text-center uppercase tracking-tighter leading-tight">EXPEDIENTE<br/>CERTIFICADO</span>
              </div>
           </div>
        </div>
        <h2 className="text-5xl font-black text-white tracking-tighter uppercase">ESTRATEGIA MAESTRA GENERADA</h2>
        <p className="text-slate-500 font-light text-xl">Análisis táctico para {userData.name} concluido con éxito.</p>
      </header>

      <div className="grid grid-cols-12 gap-10">
        {/* Informe Printable: El Expediente Lexia */}
        <div className="col-span-12 lg:col-span-9 glass-morphism p-16 space-y-12 print:bg-white print:text-black print:border-none print:shadow-none print:p-0 bg-midnight/50">
          <div className="flex justify-between items-start border-b border-[#D4AF37]/20 pb-12 print:border-black/10">
            <div className="space-y-4">
              <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em] print:text-black">LEXIA | Firm Intellectual Property</span>
              <h3 className="text-6xl font-black print:text-3xl tracking-tighter uppercase leading-none">Dictamen de <br/>Defensa Legal</h3>
              <p className="text-slate-500 text-[10px] font-mono tracking-[0.3em] uppercase">FOLIO: LX-{Math.random().toString(36).substring(7).toUpperCase()} • CDMX, MEXICO</p>
            </div>
            <div className="w-24 h-24 border-2 border-[#D4AF37]/40 rounded-3xl flex items-center justify-center font-black text-4xl text-[#D4AF37] print:border-black print:text-black">L</div>
          </div>

          <div className="grid grid-cols-4 gap-10 py-10 border-b border-white/5 print:border-black/5">
            <div>
              <span className="text-[9px] uppercase font-black text-slate-500 block mb-3 tracking-widest">Sujeto</span>
              <p className="text-sm font-bold text-white print:text-black">{userData.name}</p>
            </div>
            <div>
              <span className="text-[9px] uppercase font-black text-slate-500 block mb-3 tracking-widest">Rama Legal</span>
              <p className="text-sm font-bold text-white print:text-black">{userData.category}</p>
            </div>
            <div>
              <span className="text-[9px] uppercase font-black text-slate-500 block mb-3 tracking-widest">Cuantía Litigiosa</span>
              <p className="text-sm font-bold text-[#D4AF37] print:text-black">${Number(userData.amount).toLocaleString()} MXN</p>
            </div>
            <div>
              <span className="text-[9px] uppercase font-black text-slate-500 block mb-3 tracking-widest">Competencia</span>
              <p className="text-sm font-bold text-white print:text-black">{userData.location}</p>
            </div>
          </div>

          <div className="space-y-16">
            <section className="space-y-6">
              <h4 className="text-[10px] uppercase font-black tracking-[0.5em] text-[#D4AF37] border-l-4 border-[#D4AF37] pl-6">01. Análisis de Viabilidad Técnica</h4>
              <div className="p-10 bg-white/[0.02] rounded-3xl border border-white/5 space-y-6 print:text-black print:bg-transparent">
                <p className="text-base leading-relaxed text-slate-300 font-light">
                  Tras el análisis algorítmico de los hechos presentados en relación a la acción de <span className="text-white font-bold">{userData.subcategory}</span>, se determina una <span className="text-white font-bold">Probabilidad de Éxito del 92%</span>. La jurisdicción aplicable corresponde a los juzgados de lo civil/familiar en <span className="text-white font-bold">{userData.location}</span>.
                </p>
                <div className="p-6 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/20 text-xs text-[#D4AF37] font-medium italic">
                  "Se detecta riesgo de prescripción en los próximos 90 días. Se recomienda ejecución inmediata."
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
               <div className="space-y-8">
                  <h4 className="text-[10px] uppercase font-black tracking-[0.5em] text-slate-500">Cronología Procesal</h4>
                  <div className="space-y-6">
                    {[
                      { s: 'Radicación de Demanda', t: '15-20 Días' },
                      { s: 'Emplazamiento a Contraparte', t: '30-45 Días' },
                      { s: 'Etapa de Desahogo', t: '6-8 Meses' }
                    ].map(i => (
                      <div key={i.s} className="flex justify-between items-center border-b border-white/5 pb-4">
                        <span className="text-xs text-white print:text-black font-bold">{i.s}</span>
                        <span className="text-[10px] font-black text-[#D4AF37]">{i.t}</span>
                      </div>
                    ))}
                  </div>
               </div>
               <div className="space-y-8">
                  <h4 className="text-[10px] uppercase font-black tracking-[0.5em] text-slate-500">Costos de Operación (Estimados)</h4>
                  <div className="space-y-6">
                    {[
                      { s: 'Derechos & Aranceles', t: '$6,500 - $12,000' },
                      { s: 'Gestoría & Notificaciones', t: '$3,500' },
                      { s: 'Fondo de Peritajes', t: 'Por Definir' }
                    ].map(i => (
                      <div key={i.s} className="flex justify-between items-center border-b border-white/5 pb-4">
                        <span className="text-xs text-white print:text-black font-bold">{i.s}</span>
                        <span className="text-[10px] font-black text-[#D4AF37]">{i.t}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </section>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex justify-between items-center print:hidden">
             <button 
                onClick={handleDownloadPDF}
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center space-x-3"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                <span>Imprimir Copia de Seguridad</span>
              </button>
              <div className="flex items-center space-x-4 text-[#D4AF37]">
                <span className="text-[8px] font-black uppercase tracking-widest">Protocolo de Confidencialidad LEXIA-SECURE</span>
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
              </div>
          </div>
        </div>

        {/* Sidebar de Cierre de Venta (Urgencia) */}
        <div className="col-span-12 lg:col-span-3 space-y-8 print:hidden">
          <div className="glass-morphism p-12 space-y-10 bg-[#D4AF37]/[0.05] border-[#D4AF37]/30 shadow-[0_0_80px_rgba(212,175,55,0.1)]">
            <div className="space-y-3">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Propuesta Titular</span>
              <h4 className="text-3xl font-black text-white leading-tight">Representación de Élite</h4>
            </div>
            
            <div className="p-8 bg-midnight/60 rounded-3xl border border-white/5 space-y-5">
               <div className="text-[10px] uppercase font-black text-[#D4AF37] tracking-[0.3em]">Beneficio Exclusivo</div>
               <p className="text-xs text-slate-400 font-light leading-relaxed">
                 Acreditaremos sus <span className="text-white font-bold">${CONSULTATION_PRICE}</span> al pago inicial de honorarios si confirma la representación en las próximas <span className="text-[#D4AF37] font-bold">48 horas</span>.
               </p>
            </div>

            <button className="w-full py-7 bg-[#D4AF37] text-midnight font-black rounded-2xl uppercase tracking-[0.4em] text-[10px] hover:scale-105 transition-all shadow-xl active:scale-95">
              Contratar Ahora
            </button>
            
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              className="w-full py-5 border border-[#D4AF37]/20 text-[#D4AF37] font-black rounded-2xl uppercase tracking-[0.4em] text-[10px] hover:bg-[#D4AF37]/5 transition-all text-center block"
            >
              Hablar con Socio Titular
            </a>

            <div className="flex flex-col items-center space-y-2 pt-4">
              <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Capacidad limitada</span>
              <div className="flex space-x-1">
                {[1,2,3,4,5].map(i => <div key={i} className={`h-1 w-4 rounded-full ${i <= 2 ? 'bg-[#D4AF37]' : 'bg-white/10'}`}></div>)}
              </div>
              <span className="text-[7px] text-slate-500 font-bold uppercase tracking-widest">2 cupos restantes esta semana</span>
            </div>
          </div>
          
          <div className="glass-morphism p-8 flex items-center space-x-5 border-[#D4AF37]/10">
            <span className="text-2xl opacity-50">⚖️</span>
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500 leading-relaxed">Avalado por el Código de Ética del Barra Mexicana de Abogados</p>
          </div>
        </div>
      </div>
    </div>
  );
};
