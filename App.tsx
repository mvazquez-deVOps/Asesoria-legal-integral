
import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Landing } from './components/Landing';
import { CategoryDetail } from './components/CategoryDetail';
import { DiagnosisForm } from './components/DiagnosisForm';
import { ChatInterface } from './components/ChatInterface';
import { TrialChat } from './components/TrialChat';
import { PaymentGate } from './components/PaymentGate';
import { DictamenView } from './components/DictamenView';
import { HumanProfilingChat } from './components/HumanProfilingChat';
import { PricingPlans } from './components/PricingPlans';
import { SiteAssistant } from './components/SiteAssistant';
import { Resources } from './components/Resources';
import { UseCases } from './components/UseCases';
import { LegalApps } from './components/LegalApps';
import { BusinessLanding } from './components/BusinessLanding';
import { Methodology } from './components/Methodology';
import { LegalDocuments } from './components/LegalDocuments';
import { AppStep, UserData, Message } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const navigateTo = (step: AppStep, category: string | null = null) => {
    if (category) setSelectedCategory(category);
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDiagnosisSubmit = (data: UserData) => {
    setUserData(data);
    navigateTo(AppStep.CHAT);
  };

  const handleChatComplete = (history: Message[]) => {
    setChatHistory(history);
    navigateTo(AppStep.DICTAMEN);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case AppStep.CATEGORY_DETAIL:
        return selectedCategory ? (
          <CategoryDetail 
            category={selectedCategory} 
            onStart={() => navigateTo(AppStep.DIAGNOSIS)} 
            onNavigate={navigateTo}
          />
        ) : null;
      case AppStep.DIAGNOSIS:
        return <DiagnosisForm onSubmit={handleDiagnosisSubmit} initialCategory={selectedCategory} />;
      case AppStep.CHAT:
        return userData ? <ChatInterface userData={userData} onComplete={handleChatComplete} onNavigate={navigateTo} /> : null;
      case AppStep.DICTAMEN:
        return userData ? <DictamenView userData={userData} initialChatHistory={chatHistory} onNavigate={navigateTo} /> : null;
      case AppStep.HUMAN_PROFILING:
        return <HumanProfilingChat onNavigate={navigateTo} />;
      case AppStep.PRICING:
        return <PricingPlans onNavigate={navigateTo} />;
      case AppStep.TRIAL_CHAT:
        return <TrialChat onNavigate={navigateTo} />;
      case AppStep.PAYMENT:
        return userData ? <PaymentGate userData={userData} /> : null;
      case AppStep.RESOURCES:
        return <Resources onNavigate={navigateTo} />;
      case AppStep.CASES:
        return <UseCases onSelect={(cat) => navigateTo(AppStep.CATEGORY_DETAIL, cat)} onNavigate={navigateTo} />;
      case AppStep.LEGAL_APPS:
        return <LegalApps onNavigate={navigateTo} />;
      case AppStep.BUSINESS_LANDING:
        return <BusinessLanding onNavigate={navigateTo} />;
      case AppStep.METHODOLOGY:
        return <Methodology onNavigate={navigateTo} />;
      case AppStep.PRIVACY:
        return <LegalDocuments type="privacy" onNavigate={navigateTo} />;
      case AppStep.TERMS:
        return <LegalDocuments type="terms" onNavigate={navigateTo} />;
      case AppStep.LANDING:
      default:
        return <Landing onSelectCategory={(cat) => navigateTo(AppStep.CATEGORY_DETAIL, cat)} onStartGeneral={() => navigateTo(AppStep.DIAGNOSIS)} onNavigate={navigateTo} />;
      case AppStep.ACCOUNT:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-8 animate-fade-in px-6">
            <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center border border-neutral-200 shadow-sm">
              <span className="text-4xl">👤</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-neutral-800 tracking-tight uppercase">Mi Cuenta JUXA</h2>
              <p className="text-neutral-500 font-medium text-sm">Gestiona tus expedientes certificados</p>
            </div>
            <button className="pill-button px-10 py-4 bg-brand-blue text-white font-bold uppercase tracking-widest text-xs shadow-md hover:bg-blue-600 transition-all">Iniciar Sesión</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-neutral-50">
      <Header 
        onNavigate={navigateTo} 
        currentStep={currentStep} 
      />

      <main className="flex-grow container mx-auto pt-0 pb-8 z-10 print:py-0 print:px-0">
        <div className="animate-fade-in">
          {renderCurrentStep()}
        </div>
      </main>

      <BottomNav onNavigate={navigateTo} currentStep={currentStep} />
      <SiteAssistant onNavigate={navigateTo} />
    </div>
  );
}

export default App;
