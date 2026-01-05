
export enum AppStep {
  LANDING,
  CATEGORY_DETAIL,
  DIAGNOSIS,
  CHAT,
  TRIAL_CHAT,
  PAYMENT,
  RESOURCES,
  CASES,
  LEGAL_APPS,
  PRICING,
  ACCOUNT,
  DICTAMEN,
  HUMAN_PROFILING,
  BUSINESS_LANDING,
  METHODOLOGY,
  PRIVACY,
  TERMS
}

export interface UserData {
  id?: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  subcategory: string;
  description: string;
  amount: string; 
  location: string; 
  counterparty: string; 
  processStatus: string; 
  hasChildren?: string;
  hasViolence?: string;
  isPaid?: boolean;
  diagnosisPreference?: string;
  createAdt?: string;

}

export interface Message {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export const BRAND_NAME = "JUXA";
export const BRAND_TAGLINE = "LEGALTECH INTELLIGENCE";
export const WHATSAPP_NUMBER = "5215511527404"; 
export const CONSULTATION_PRICE = 999;
export const HUMAN_CONSULTATION_PRICE = 999;
export const SINGLE_DIAGNOSIS_PRICE = 299;
export const PERSONAL_PRICE = 489;
export const BUSINESS_PRICE = 1499;

export interface CategoryData {
  title: string;
  description: string;
  stats: string;
  features: string[];
  examples: string[];
  results: string;
  logic: string;
}

export const CATEGORIES_DATA: Record<string, CategoryData> = {
  "Familiar": {
    title: "Derecho Familiar & Lógica Humana",
    description: "Resolución estratégica de crisis domésticas y protección de patrimonio familiar mediante análisis técnico avanzado.",
    stats: "Certeza del 98%",
    features: ["Divorcio Incausado", "Pensión Alimenticia", "Custodia", "Juicios Sucesorios"],
    examples: [
      "Determinación técnica de pensión alimenticia justa.",
      "Hoja de ruta para divorcios de alta cuantía.",
      "Gestión lógica de herencias e intestados."
    ],
    results: "Recibirá un Dictamen con la estrategia de blindaje familiar, cronograma procesal y cálculo de prestaciones.",
    logic: "No solo resolvemos dudas; te damos la lógica de tu situación familiar: qué documentos necesitas, cuánto tiempo real tomará y cómo proteger a tus hijos."
  },
  "Civil": {
    title: "Derecho Civil & Patrimonial",
    description: "Blindaje absoluto de activos, contratos y recuperación de propiedad con rigor jurídico.",
    stats: "Blindaje Total",
    features: ["Recuperación de Propiedad", "Incumplimiento de Contratos", "Daño Moral", "Arrendamiento"],
    examples: [
      "Estrategia de desalojo legal en tiempo récord.",
      "Auditoría de contratos para evitar riesgos futuros.",
      "Regularización de títulos de propiedad en litigio."
    ],
    results: "Obtendrá un mapa de riesgos contractuales, ruta crítica de recuperación y matriz de solvencia de la contraparte.",
    logic: "Mapeamos la lógica de tus activos: analizamos la validez de tus títulos y diseñamos la ofensiva legal para recuperar lo que es tuyo."
  },
  "Empresarial": {
    title: "Estrategia Corporativa & Compliance",
    description: "Soporte legal inteligente para el crecimiento y blindaje operativo de empresas mexicanas.",
    stats: "ROI Legal",
    features: ["Cobranza Mercantil", "Estructura de Sociedades", "Protección de Marca", "Laboral Patrón"],
    examples: [
      "Recuperación judicial de cartera vencida.",
      "Protocolo de Compliance para evitar multas normativas.",
      "Blindaje de secretos industriales y marcas."
    ],
    results: "Informe de cumplimiento operativo, matriz de riesgos fiscales/laborales y tácticas de negociación corporativa.",
    logic: "Transformamos la operación de tu negocio en una fortaleza legal: detectamos fugas de responsabilidad y blindamos tu flujo de efectivo."
  },
  "Penal": {
    title: "Defensa Penal & Amparo Táctico",
    description: "Acción inmediata y estratégica para la protección de la libertad y derechos fundamentales.",
    stats: "24/7 Urgencia",
    features: ["Amparos Contra Detención", "Defensa en Fiscalía", "Fraudes Patrimoniales", "Delitos Fiscales"],
    examples: [
      "Suspensión inmediata de actos de autoridad.",
      "Defensa técnica en audiencias de control.",
      "Estrategia ante denuncias por fraude o abuso."
    ],
    results: "Plan de defensa inmediata, análisis de material probatorio y activación de protocolo de emergencia amparo.",
    logic: "En materia penal, la lógica es el tiempo: activamos mecanismos de protección constitucional al segundo uno para salvaguardar tu libertad."
  }
};
