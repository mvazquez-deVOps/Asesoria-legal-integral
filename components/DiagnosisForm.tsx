
import React, { useState, useEffect } from 'react';
import { UserData } from '../types';

interface DiagnosisFormProps {
  onSubmit: (data: UserData) => void;
  initialCategory?: string | null;
}

const LEGAL_CATEGORIES: Record<string, string[]> = {
  "Familiar": ["Divorcio", "Pensión Alimenticia", "Custodia", "Sucesiones"],
  "Civil": ["Contratos", "Arrendamiento", "Recuperación Propiedad", "Responsabilidad Civil"],
  "Empresarial": ["Cobranza Mercantil", "Sociedades", "Laboral Patrón", "Compliance"],
  "Penal": ["Amparos", "Defensa en Fiscalía", "Fraudes", "Urgencias"]
};

export const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ onSubmit, initialCategory }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<UserData>({
    name: '', email: '', phone: '', category: '', subcategory: '',
    description: '', amount: '', location: '', counterparty: '', processStatus: ''
  });

  useEffect(() => {
    if (initialCategory && LEGAL_CATEGORIES[initialCategory]) {
      setFormData(prev => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const inputStyle = "w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all text-neutral-800 placeholder:text-neutral-400 font-medium";
  const labelStyle = "block text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 mb-2 ml-1";

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-neutral-800 tracking-tight">Identificación</h3>
              <p className="text-neutral-500 font-medium text-sm">Sus datos están protegidos por secreto profesional.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className={labelStyle}>Nombre Completo / Razón Social</label>
                <input required name="name" value={formData.name} onChange={handleChange} className={inputStyle} placeholder="Ej: Lic. Roberto García" />
              </div>
              <div>
                <label className={labelStyle}>WhatsApp</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputStyle} placeholder="10 dígitos" />
              </div>
              <div>
                <label className={labelStyle}>Correo Electrónico</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputStyle} placeholder="contacto@empresa.com" />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-neutral-800 tracking-tight">Contexto Jurídico</h3>
              <p className="text-neutral-500 font-medium text-sm">Defina la materia para aplicar la lógica legal correspondiente.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Materia</label>
                <select required name="category" value={formData.category} onChange={handleChange} className={inputStyle}>
                  <option value="">Seleccione...</option>
                  {Object.keys(LEGAL_CATEGORIES).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelStyle}>Subespecialidad</label>
                <select required name="subcategory" value={formData.subcategory} onChange={handleChange} disabled={!formData.category} className={`${inputStyle} disabled:opacity-50`}>
                  <option value="">Detalle el asunto...</option>
                  {formData.category && LEGAL_CATEGORIES[formData.category].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className={labelStyle}>Descripción de los Hechos</label>
                <textarea required name="description" value={formData.description} onChange={handleChange} rows={6} className={`${inputStyle} resize-none`} placeholder="Cuéntenos lo ocurrido de forma natural..." />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-neutral-800 tracking-tight">Variables de Éxito</h3>
              <p className="text-neutral-500 font-medium text-sm">Información técnica para determinar viabilidad.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Cuantía Estimada (MXN)</label>
                <input required type="number" name="amount" value={formData.amount} onChange={handleChange} className={inputStyle} placeholder="$0.00" />
              </div>
              <div>
                <label className={labelStyle}>Jurisdicción (Ciudad/Estado)</label>
                <input required name="location" value={formData.location} onChange={handleChange} className={inputStyle} placeholder="Ej: CDMX" />
              </div>
              <div className="col-span-2">
                <label className={labelStyle}>Nombre de la Contraparte</label>
                <input required name="counterparty" value={formData.counterparty} onChange={handleChange} className={inputStyle} placeholder="Persona o Entidad" />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-neutral-800 tracking-tight">Finalizar</h3>
              <p className="text-neutral-500 font-medium text-sm">Protocolo final para generación de dictamen.</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className={labelStyle}>Estatus Actual</label>
                <select required name="processStatus" value={formData.processStatus} onChange={handleChange} className={inputStyle}>
                  <option value="">Seleccione estatus...</option>
                  <option value="Preventivo">Preventivo (Sin acción aún)</option>
                  <option value="Notificado">Urgente (Fui notificado)</option>
                  <option value="En Juicio">En Curso (Seguimiento)</option>
                  <option value="Emergencia">Emergencia Crítica</option>
                </select>
              </div>
              <div className="p-12 border-2 border-dashed border-neutral-200 rounded-3xl flex flex-col items-center justify-center text-center space-y-3 bg-neutral-50/50 group hover:border-brand-blue/30 transition-colors">
                 <span className="text-3xl group-hover:scale-110 transition-transform">📂</span>
                 <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Adjuntar Evidencia (Opcional)</p>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-12 flex justify-between items-center px-2">
        <div className="flex space-x-2">
          {[0,1,2,3].map(i => (
            <div key={i} className={`h-1.5 w-12 rounded-full transition-all duration-500 ${i <= step ? 'bg-brand-blue' : 'bg-neutral-200'}`}></div>
          ))}
        </div>
        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Paso {step + 1} de 4</span>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 md:p-16 saas-card border-none shadow-xl">
        <form onSubmit={(e) => { e.preventDefault(); if(step === 3) onSubmit(formData); else nextStep(); }} className="space-y-12">
          {renderStep()}

          <div className="flex justify-between items-center pt-8 border-t border-neutral-100">
            {step > 0 ? (
              <button type="button" onClick={prevStep} className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-800">
                ← Anterior
              </button>
            ) : <div />}

            <button type="submit" className="pill-button px-10 py-5 bg-neutral-900 text-white text-[11px] uppercase tracking-[0.2em] hover:bg-black shadow-lg">
              {step === 3 ? "Generar Estrategia Maestra" : "Continuar →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
