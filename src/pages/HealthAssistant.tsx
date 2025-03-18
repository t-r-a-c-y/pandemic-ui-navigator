
import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from '@/components/ChatMessage';
import { Send, Stethoscope, Info, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface Message {
  text: string;
  isAI: boolean;
  timestamp: Date;
}

const HealthAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your Health Assistant. I can help you understand your symptoms and provide basic health guidance. Note that I'm not a replacement for professional medical advice. What symptoms are you experiencing?",
      isAI: true,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = { 
      text: input, 
      isAI: false, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      setMessages(prev => [...prev, {
        text: aiResponse,
        isAI: true,
        timestamp: new Date()
      }]);
      setIsLoading(false);
    }, 1000);
  };
  
  // Simple rule-based responses
  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('fever') || input.includes('temperature')) {
      return "Fever can be a symptom of many conditions, including viral infections like flu or COVID-19, bacterial infections, or inflammatory conditions. Monitor your temperature regularly. If it exceeds 103°F (39.4°C) or persists for more than three days, please consult a healthcare provider. In the meantime, stay hydrated and rest.";
    }
    
    if (input.includes('cough') || input.includes('sore throat')) {
      return "Coughing and sore throat are common symptoms of upper respiratory infections, allergies, or irritation. For relief, try drinking warm liquids, using throat lozenges, or taking over-the-counter pain relievers. If symptoms persist for more than a week, worsen suddenly, or are accompanied by difficulty breathing, please seek medical attention.";
    }
    
    if (input.includes('headache') || input.includes('head hurts')) {
      return "Headaches can be caused by stress, dehydration, eyestrain, or illness. Try resting in a quiet, dark room, staying hydrated, and taking appropriate over-the-counter pain relievers. If your headache is severe, sudden, or accompanied by fever, confusion, stiff neck, or vision problems, please seek immediate medical attention as these could indicate a more serious condition.";
    }
    
    if (input.includes('stomach') || input.includes('nausea') || input.includes('diarrhea') || input.includes('vomiting')) {
      return "Digestive issues can be caused by food poisoning, viral gastroenteritis, or other conditions. It's important to stay hydrated with small sips of water or electrolyte solutions. Stick to bland foods like rice, toast, or bananas when you can eat. If symptoms persist beyond 48 hours, include severe pain, or if you notice blood, please consult a healthcare provider immediately.";
    }
    
    if (input.includes('dizzy') || input.includes('diziness') || input.includes('fainting')) {
      return "Dizziness can be caused by dehydration, inner ear issues, low blood sugar, or more serious conditions. Make sure you're staying hydrated and eating regularly. Sit or lie down when feeling dizzy to prevent falls. If dizziness is severe, recurrent, or accompanied by other symptoms like chest pain or severe headache, please seek immediate medical attention.";
    }
    
    if (input.includes('rash') || input.includes('skin')) {
      return "Skin rashes can be caused by allergic reactions, infections, or other conditions. Avoid scratching and apply cool compresses for comfort. Over-the-counter hydrocortisone cream might help with itching. If the rash is widespread, painful, blistering, or accompanied by fever or difficulty breathing, please seek immediate medical attention as this could indicate a severe allergic reaction.";
    }
    
    // Default response
    return "Based on the symptoms you've described, it could be a number of different conditions. To get a better understanding, could you provide more details about:\n\n- When did your symptoms start?\n- Have you been in contact with anyone who's sick?\n- Do you have any pre-existing health conditions?\n\nRemember, this is just basic guidance and not a replacement for professional medical advice. If your symptoms are severe or persistent, please consult a healthcare provider.";
  };
  
  return (
    <Layout>
      <div className="page-container flex flex-col h-[calc(100vh-9rem)]">
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope className="h-6 w-6 text-pandemic-blue" />
          <h2 className="text-2xl font-bold tracking-tight">Health Assistant</h2>
        </div>
        
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important disclaimer</AlertTitle>
          <AlertDescription>
            This AI assistant provides general health guidance only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </AlertDescription>
        </Alert>
        
        <ScrollArea className="flex-1 mb-4 p-4 border rounded-lg">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.text}
                isAI={msg.isAI}
                timestamp={msg.timestamp}
              />
            ))}
            {isLoading && (
              <div className="flex items-center text-muted-foreground gap-2">
                <div className="animate-pulse">
                  <div className="h-3 w-3 bg-pandemic-blue rounded-full inline-block mr-1"></div>
                  <div className="h-3 w-3 bg-pandemic-blue rounded-full inline-block mr-1 animate-delay-100"></div>
                  <div className="h-3 w-3 bg-pandemic-blue rounded-full inline-block animate-delay-200"></div>
                </div>
                <span className="text-sm">Assistant is typing...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
        
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-pandemic-blue hover:bg-pandemic-blue/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default HealthAssistant;
