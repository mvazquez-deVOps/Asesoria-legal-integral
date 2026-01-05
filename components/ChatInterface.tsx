import React, { useState, useEffect, useRef } from 'react';
import { UserData, Message, AppStep } from '../types';
// Importamos el nuevo ApiService centralizado
import { ApiService } from '../services/apiService';
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

  // Función auxiliar para preparar el userData según los DTOs de Java
  const prepareUserDataForBackend = (data: UserData) => ({
    ...data,
    hasChildren: String(data.hasChildren || "false"), // Java espera String
    hasViolence: String(data.hasViolence || "false"), // Java espera String
    amount: data.amount || "0.0", // SQL es VARCHAR
    isPaid: false // Booleano real
  });
  
  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);
      try {
        // Llamada al endpoint de inicio del AiController.java
        const response = await fetch('https://back-legaladvice-284685729356.us-central1.run.app/api/ai/generate-initial-diagnosis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prepareUserDataForBackend(userData))
        });
        
        if (!response.ok) throw new Error();
        const data = await response.json();
        
        // El backend devuelve { text: "..." }
        setMessages([{ role: 'model', text: data.text }]);
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
    
    const userMsg: Message = { 
      role: 'user', 
      text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Usamos el nuevo ApiService para el chat interactivo
      const data = await ApiService.ai.sendMessage(
        messages, 
        prepareUserDataForBackend(userData), 
        currentInput
      );
      
      let finalText = data.text; // Obtenemos el texto de la respuesta del backend
      if (aiResponseCount === 3) {
        finalText += "\n\n**PROCESO CONCLUIDO:**\nHe recopilado los elementos necesarios para su Dictamen de Estrategia Maestra.";
      }

      setMessages(prev => [...prev, { role: 'model', text: finalText }]);
      setAiResponseCount(prev => prev + 1);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error de comunicación con el socio legal.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const isLocked = aiResponseCount >= 4;

  // ... (El resto del JSX se mantiene igual)
  return (
    // ... JSX original
    <div className="max-w-5xl mx-auto h-[850px] ...">
       {/* UI del chat */}
    </div>
  );
};
