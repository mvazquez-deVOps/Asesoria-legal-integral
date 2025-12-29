
import React from 'react';
import { AppStep, BRAND_NAME } from '../types';

interface LegalDocumentsProps {
  type: 'privacy' | 'terms';
  onNavigate: (step: AppStep) => void;
}

export const LegalDocuments: React.FC<LegalDocumentsProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="bg-neutral-50 min-h-screen pb-40">
      <section className="max-w-4xl mx-auto px-6 py-24 animate-fade-in">
        <div className="mb-16 space-y-6 text-center">
          <h2 className="text-[11px] font-black text-brand-blue uppercase tracking-[0.5em]">Transparencia JUXA</h2>
          <h1 className="text-5xl md:text-6xl font-[900] text-neutral-900 tracking-tighter leading-none">
            {isPrivacy ? 'Aviso de Privacidad' : 'Términos y Condiciones'}
          </h1>
          <div className="pt-4 flex justify-center items-center space-x-4">
            <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Última actualización: Enero 2026</span>
            <div className="w-1.5 h-1.5 bg-brand-green rounded-full"></div>
            <span className="text-[9px] font-black text-brand-green uppercase tracking-widest">Vigente</span>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-xl border border-neutral-100 space-y-12">
          {/* AI SUMMARY BOX */}
          <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-3xl p-8 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🧠</span>
              <h4 className="text-[10px] font-black text-brand-blue uppercase tracking-widest">Resumen IA (Lectura rápida)</h4>
            </div>
            <p className="text-sm text-neutral-700 font-medium leading-relaxed italic">
              {isPrivacy 
                ? "Respetamos su anonimato táctico. Sus datos se encriptan bajo protocolo Lexia-Secure y solo se usan para generar su Dictamen. No vendemos información a terceros."
                : "JUXA es una herramienta de inteligencia estratégica. Proporcionamos dictámenes técnicos basados en datos, pero la representación legal definitiva se formaliza a través de nuestros Socios Senior."
              }
            </p>
          </div>

          <article className="prose prose-neutral max-w-none text-neutral-600 space-y-10">
            {isPrivacy ? (
              <>
                <section className="space-y-4">
                  <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">1. Responsable del Tratamiento</h3>
                  <p className="text-sm leading-relaxed font-medium">
                    {BRAND_NAME} LegalTech Intelligence, con domicilio en Ciudad de México, es responsable del uso y protección de sus datos personales. Nuestra infraestructura utiliza encriptación AES-256 para garantizar que sus hechos jurídicos permanezcan confidenciales.
                  </p>
                </section>
                <section className="space-y-4">
                  <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">2. Finalidades del Tratamiento</h3>
                  <p className="text-sm leading-relaxed font-medium">
                    Los datos que recopilamos (Nombre, WhatsApp, Contexto Legal) tienen como fin exclusivo:
                  </p>
                  <ul className="list-disc pl-6 text-sm space-y-2 font-medium">
                    <li>Generar diagnósticos jurídicos preliminares mediante IA.</li>
                    <li>Contactarle para seguimiento de casos de alta complejidad.</li>
                    <li>Gestionar su cuenta de usuario en el ecosistema JUXA.</li>
                  </ul>
                </section>
                <section className="space-y-4">
                  <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">3. Derechos ARCO</h3>
                  <p className="text-sm leading-relaxed font-medium">
                    Usted tiene derecho a conocer qué datos tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal, la eliminación de nuestros registros y la oposición al uso de sus datos para fines específicos.
                  </p>
                </section>
              </>
            ) : (
              <>
                <section className="space-y-4">
                  <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">1. Aceptación de los Términos</h3>
                  <p className="text-sm leading-relaxed font-medium">
                    Al acceder a JUXA, usted acepta los presentes términos. Nuestra plataforma es una solución de "LegalTech" que utiliza modelos de lenguaje avanzados para proporcionar análisis estratégico y no constituye asesoría legal vinculante hasta que se formalice con un Socio Senior.
                  </p>
                </section>
                <section className="space-y-4">
                  <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">2. Uso de la IA</h3>
                  <p className="text-sm leading-relaxed font-medium">
                    El Dictamen Estratégico generado por nuestra IA es una herramienta de orientación basada en jurisprudencia y precedentes. La precisión del dictamen depende totalmente de la veracidad y detalle de la información proporcionada por el usuario.
                  </p>
                </section>
                <section className="space-y-4">
                  <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">3. Limitación de Responsabilidad</h3>
                  <p className="text-sm leading-relaxed font-medium">
                    {BRAND_NAME} no se hace responsable por decisiones tomadas de forma unilateral basadas exclusivamente en el dictamen automatizado sin la supervisión de un profesional legal certificado.
                  </p>
                </section>
              </>
            )}
          </article>

          <div className="pt-12 border-t border-neutral-100 flex flex-col items-center space-y-6">
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">¿Tiene dudas sobre este documento?</p>
            <button 
              onClick={() => window.open(`https://wa.me/5215511527404`, '_blank')}
              className="px-10 py-4 border border-neutral-200 text-neutral-800 font-black rounded-2xl uppercase tracking-widest text-[9px] hover:bg-neutral-50 transition-all"
            >
              Consultar con Soporte Legal
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={() => onNavigate(AppStep.LANDING)}
            className="text-[10px] font-black text-brand-blue uppercase tracking-[0.4em] hover:opacity-70 transition-all"
          >
            ← Volver al Inicio
          </button>
        </div>
      </section>
    </div>
  );
};
