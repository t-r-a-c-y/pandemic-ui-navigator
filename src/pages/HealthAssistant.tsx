import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import ChatMessage from '@/components/ChatMessage';
import { Send, Stethoscope, Info, AlertCircle, MicrophoneIcon, PlusCircle, Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface Message {
  text: string;
  isAI: boolean;
  timestamp: Date;
  messageType?: 'general' | 'warning' | 'success' | 'info';
}

interface Symptom {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
}

const HealthAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm PandemicNet AI, your advanced health assistant. I can help with symptom checking, treatment recommendations, and health monitoring. What can I help you with today?",
      isAI: true,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [newSymptom, setNewSymptom] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [recording, setRecording] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
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
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(input, symptoms);
      setMessages(prev => [...prev, {
        text: aiResponse.message,
        isAI: true,
        timestamp: new Date(),
        messageType: aiResponse.messageType,
      }]);
      setIsLoading(false);
    }, 1000);
  };
  
  const addSymptom = () => {
    if (!newSymptom.trim()) return;
    
    const symptom: Symptom = {
      name: newSymptom,
      severity: 'moderate',
      duration: '1-3 days'
    };
    
    setSymptoms(prev => [...prev, symptom]);
    setNewSymptom('');
    
    // Add AI response
    if (symptoms.length === 0) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "I've recorded your first symptom. Please add any other symptoms you're experiencing so I can provide a more accurate assessment.",
          isAI: true,
          timestamp: new Date()
        }]);
      }, 500);
    }
  };
  
  const removeSymptom = (index: number) => {
    setSymptoms(prev => prev.filter((_, i) => i !== index));
  };
  
  const updateSymptomSeverity = (index: number, severity: 'mild' | 'moderate' | 'severe') => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[index].severity = severity;
    setSymptoms(updatedSymptoms);
  };
  
  const analyzeSymptoms = () => {
    if (symptoms.length === 0) {
      toast({
        title: "No symptoms recorded",
        description: "Please add at least one symptom for analysis",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const analysis = performSymptomAnalysis(symptoms);
      setMessages(prev => [...prev, {
        text: analysis,
        isAI: true,
        timestamp: new Date(),
        messageType: 'info'
      }]);
      setIsLoading(false);
      setActiveTab('chat');
    }, 1500);
  };
  
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Please type your message instead.",
        variant: "destructive"
      });
      return;
    }
    
    setRecording(!recording);
    
    if (!recording) {
      // Simulating voice recording functionality
      toast({
        title: "Voice Recording Started",
        description: "Please speak clearly...",
      });
      
      // Simulate end of recording after 3 seconds
      setTimeout(() => {
        setRecording(false);
        setInput("I have a fever and sore throat for 2 days");
        toast({
          title: "Voice Recorded",
          description: "Your message has been recorded.",
        });
      }, 3000);
    } else {
      // Stop recording
      setRecording(false);
      toast({
        title: "Voice Recording Stopped",
      });
    }
  };
  
  // Enhanced AI response system with symptom analysis
  const getAIResponse = (userInput: string, symptoms: Symptom[]): { message: string, messageType?: 'general' | 'warning' | 'success' | 'info' } => {
    const input = userInput.toLowerCase();
    
    // Check for emergency keywords
    if (input.includes('emergency') || 
        input.includes('can\'t breathe') || 
        input.includes('chest pain') || 
        input.includes('unconscious') || 
        input.includes('severe bleeding')) {
      return {
        message: "⚠️ MEDICAL EMERGENCY DETECTED ⚠️\n\nBased on what you've described, you may be experiencing a medical emergency. Please:\n\n1. Call emergency services (911) immediately\n2. Do not wait for symptoms to improve on their own\n3. If possible, have someone stay with you until help arrives\n\nThis is an urgent situation that requires immediate professional medical attention.",
        messageType: 'warning'
      };
    }
    
    // COVID-specific symptoms
    if ((input.includes('fever') || input.includes('temperature')) && 
        (input.includes('cough') || input.includes('breathing') || input.includes('taste') || input.includes('smell'))) {
      return {
        message: "Your symptoms could be consistent with COVID-19. I recommend:\n\n1. Take a COVID-19 test as soon as possible\n2. Self-isolate until you receive your results\n3. Monitor your symptoms, especially breathing difficulties\n4. Stay hydrated and rest\n5. Take over-the-counter pain relievers for fever if needed\n\nWould you like information on local testing facilities or home testing options?",
        messageType: 'info'
      };
    }
    
    // Common conditions responses
    if (input.includes('fever') || input.includes('temperature')) {
      return {
        message: "Fever can indicate your body is fighting an infection. Here's what you should know:\n\n• Adult fever is typically defined as 100.4°F (38°C) or higher\n• Stay hydrated and rest\n• Over-the-counter medications like acetaminophen or ibuprofen can help reduce fever\n• For high fevers (103°F/39.4°C+ in adults) or fevers lasting more than 3 days, consult a healthcare provider\n\nWould you like me to analyze other symptoms alongside your fever for a more complete assessment?",
        messageType: 'general'
      };
    }
    
    if (input.includes('cough') || input.includes('sore throat')) {
      return {
        message: "Coughing and sore throat are common symptoms that could indicate several conditions:\n\n• Viral infections (common cold, flu, COVID-19)\n• Bacterial infections\n• Allergies\n• Environmental irritants\n\nRecommendations:\n• Stay hydrated with warm liquids\n• Try throat lozenges for temporary relief\n• Use a humidifier to add moisture to the air\n• For persistent symptoms (>1 week) or high fever, consult a healthcare provider\n\nIs your cough productive (producing mucus) or dry?",
        messageType: 'general'
      };
    }
    
    if (input.includes('headache') || input.includes('head hurts')) {
      return {
        message: "Headaches can have many causes including stress, dehydration, eyestrain, illness, or tension.\n\nFor relief:\n• Rest in a quiet, dark room\n• Apply a cool compress to your forehead\n• Stay hydrated\n• Consider appropriate over-the-counter pain relievers\n\n🚨 Seek immediate medical attention if your headache:\n• Is sudden and severe (\"thunderclap\")\n• Follows a head injury\n• Is accompanied by fever, stiff neck, confusion, seizures, double vision, weakness, numbness, or difficulty speaking\n\nWould you like me to help track your headache patterns?",
        messageType: 'general'
      };
    }
    
    if (input.includes('stomach') || input.includes('nausea') || input.includes('diarrhea') || input.includes('vomiting')) {
      return {
        message: "Digestive issues can be caused by infections, food poisoning, or other conditions.\n\nImportant recommendations:\n• Focus on hydration with small, frequent sips of clear fluids\n• Try the BRAT diet (bananas, rice, applesauce, toast) once you can eat\n• Avoid dairy, fatty, spicy, or highly seasoned foods\n• Rest your stomach by eating smaller meals\n\n🚨 Seek medical care if you experience:\n• Signs of dehydration (extreme thirst, dry mouth, dark urine)\n• Blood in stool or vomit\n• Severe abdominal pain\n• Symptoms lasting more than 2 days\n• High fever\n\nCan you tell me when your symptoms started and if you've noticed any foods triggering them?",
        messageType: 'general'
      };
    }
    
    if (input.includes('anxiety') || input.includes('stress') || input.includes('mental health') || input.includes('depression')) {
      return {
        message: "I'm here to support your mental health. Feeling anxious or stressed is a common experience.\n\nTry these evidence-based techniques:\n• Deep breathing: 4 counts in, hold for 4, 4 counts out\n• Progressive muscle relaxation: Tense and release each muscle group\n• Mindfulness meditation: Focus on the present moment\n• Regular physical activity\n• Maintaining social connections\n\nRemember that professional help is available and effective. Would you like resources for mental health services in your area?",
        messageType: 'info'
      };
    }
    
    // Vaccination question
    if (input.includes('vaccine') || input.includes('vaccination') || input.includes('booster')) {
      return {
        message: "Staying up-to-date with vaccinations is an important part of preventive healthcare. Based on current guidelines:\n\n• COVID-19 vaccines are recommended for most individuals 6 months and older\n• Annual flu vaccines are recommended for everyone 6 months and older\n• Other vaccine recommendations vary by age, health conditions, and risk factors\n\nWould you like me to provide information about specific vaccines or help you locate vaccination services near you?",
        messageType: 'success'
      };
    }
    
    // Treatment related
    if (input.includes('treatment') || input.includes('medicine') || input.includes('medication') || input.includes('cure')) {
      return {
        message: "To recommend appropriate treatments, I need to understand your specific symptoms better. Common home treatment approaches include:\n\n• Rest and adequate hydration\n• Over-the-counter medications for symptom relief\n• Proper nutrition to support recovery\n\nFor personalized treatment recommendations, please share:\n• Your specific symptoms\n• How long you've had them\n• Their severity\n• Any existing health conditions\n• Medications you're currently taking\n\nThis will help me provide more tailored guidance.",
        messageType: 'general'
      };
    }
    
    // Default response
    return {
      message: "Based on what you've shared, I'd like to learn more about your situation to provide better guidance. Could you tell me:\n\n• When did your symptoms begin?\n• Have they gotten better, worse, or stayed the same?\n• Have you tried any treatments already?\n• Do you have any pre-existing health conditions?\n\nThe more details you can provide, the more personalized advice I can offer. Remember, I'm here to help but not to replace professional medical care when needed.",
      messageType: 'general'
    };
  };
  
  // Advanced symptom analysis function
  const performSymptomAnalysis = (symptoms: Symptom[]): string => {
    // Count severe symptoms
    const severeSymptomsCount = symptoms.filter(s => s.severity === 'severe').length;
    const symptomNames = symptoms.map(s => s.name.toLowerCase());
    
    // Check for COVID-19 pattern
    const covidRelatedSymptoms = ['fever', 'cough', 'shortness of breath', 'difficulty breathing', 'loss of taste', 'loss of smell'];
    const hasCovidSymptoms = covidRelatedSymptoms.some(s => 
      symptomNames.some(userSymptom => userSymptom.includes(s))
    );
    
    // Check for flu pattern
    const fluRelatedSymptoms = ['fever', 'body aches', 'chills', 'fatigue', 'cough', 'sore throat'];
    const hasFluSymptoms = fluRelatedSymptoms.some(s => 
      symptomNames.some(userSymptom => userSymptom.includes(s))
    );
    
    // Check for common cold pattern
    const coldRelatedSymptoms = ['runny nose', 'congestion', 'sneezing', 'sore throat', 'cough', 'mild headache'];
    const hasColdSymptoms = coldRelatedSymptoms.some(s => 
      symptomNames.some(userSymptom => userSymptom.includes(s))
    );
    
    // Check for allergies pattern
    const allergyRelatedSymptoms = ['itchy eyes', 'runny nose', 'sneezing', 'congestion', 'rash', 'itchy throat'];
    const hasAllergySymptoms = allergyRelatedSymptoms.some(s => 
      symptomNames.some(userSymptom => userSymptom.includes(s))
    );
    
    // Check for emergency warning signs
    const emergencySymptoms = ['chest pain', 'difficulty breathing', 'unconscious', 'severe bleeding', 'seizure'];
    const hasEmergencySymptoms = emergencySymptoms.some(s => 
      symptomNames.some(userSymptom => userSymptom.includes(s))
    );
    
    if (hasEmergencySymptoms || severeSymptomsCount >= 2) {
      return "⚠️ URGENT CARE RECOMMENDED ⚠️\n\nBased on the symptoms you've reported, particularly their severity, I recommend seeking prompt medical attention. Some of your symptoms may require professional evaluation as soon as possible.\n\nWhile waiting to see a healthcare provider:\n• Stay calm and rest\n• Don't eat or drink if you're experiencing severe abdominal pain\n• Have someone stay with you if possible\n\nWould you like me to help locate the nearest urgent care or emergency facility?";
    }
    
    if (hasCovidSymptoms) {
      return "Your symptoms are consistent with COVID-19, though other conditions can cause similar symptoms.\n\nRecommended actions:\n1. Take a COVID-19 test (PCR or rapid antigen)\n2. Self-isolate until you receive results\n3. Monitor your symptoms, especially breathing\n4. Stay hydrated and rest\n5. Take acetaminophen or ibuprofen for fever if needed\n\nSymptoms requiring immediate medical attention:\n• Difficulty breathing\n• Persistent chest pain or pressure\n• Confusion or inability to wake/stay awake\n• Bluish lips or face\n\nWould you like information on testing locations or home care guidance?";
    }
    
    if (hasFluSymptoms) {
      return "Your symptoms suggest you may have influenza (flu).\n\nRecommendations:\n• Rest at home and avoid contact with others\n• Stay hydrated with water, broth, and electrolyte drinks\n• Take acetaminophen or ibuprofen for fever and body aches\n• Consider contacting your healthcare provider about antiviral medications (most effective if started within 48 hours of symptom onset)\n\nWatch for worsening symptoms such as difficulty breathing, chest pain, or severe weakness.\n\nTypical recovery time is 5-7 days, though fatigue may persist longer.";
    }
    
    if (hasColdSymptoms) {
      return "Your symptoms match those of a common cold.\n\nHome care recommendations:\n• Rest and stay hydrated\n• Use over-the-counter cold medications for symptom relief\n• Try saline nasal sprays or rinses for congestion\n• Use throat lozenges for sore throat\n• Consider a humidifier to add moisture to the air\n\nMost colds improve within 7-10 days. Contact a healthcare provider if symptoms worsen significantly or last more than 10 days.";
    }
    
    if (hasAllergySymptoms) {
      return "Your symptoms suggest allergies rather than an infection.\n\nRecommended approaches:\n• Try over-the-counter antihistamines\n• Use nasal steroids for congestion\n• Avoid known allergens when possible\n• Try saline nasal rinses\n• Keep windows closed during high pollen seasons\n\nUnlike colds, allergies often cause itching, don't cause fever, and may persist as long as you're exposed to allergens.\n\nIf symptoms significantly impact your quality of life, consider seeing an allergist for testing and more targeted treatments.";
    }
    
    // General analysis for other symptom combinations
    return `Based on your reported symptoms (${symptoms.map(s => s.name).join(", ")}), I recommend the following:\n\n• Monitor your symptoms for any changes in severity\n• Rest and stay hydrated\n• Consider over-the-counter medications for symptom relief as appropriate\n\nIf your symptoms persist for more than 7 days, worsen suddenly, or if you develop new concerning symptoms, please consult with a healthcare professional.\n\nWould you like more specific guidance on any particular symptom?`;
  };
  
  return (
    <Layout>
      <div className="page-container flex flex-col h-[calc(100vh-9rem)]">
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope className="h-6 w-6 text-pandemic-blue" />
          <h2 className="text-2xl font-bold tracking-tight">PandemicNet AI</h2>
        </div>
        
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important disclaimer</AlertTitle>
          <AlertDescription>
            This AI assistant provides general health guidance only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician for any medical condition.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="chat" className="mb-4" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
            <TabsTrigger value="symptoms">Symptom Checker</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="flex flex-col space-y-4">
            <ScrollArea className="flex-1 mb-4 p-4 border rounded-lg h-[calc(100vh-23rem)]">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <ChatMessage
                    key={index}
                    message={msg.text}
                    isAI={msg.isAI}
                    timestamp={msg.timestamp}
                    messageType={msg.messageType}
                  />
                ))}
                {isLoading && (
                  <div className="flex items-center text-muted-foreground gap-2">
                    <div className="animate-pulse">
                      <div className="h-3 w-3 bg-pandemic-blue rounded-full inline-block mr-1"></div>
                      <div className="h-3 w-3 bg-pandemic-blue rounded-full inline-block mr-1 animate-delay-100"></div>
                      <div className="h-3 w-3 bg-pandemic-blue rounded-full inline-block animate-delay-200"></div>
                    </div>
                    <span className="text-sm">PandemicNet is analyzing...</span>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>
            
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your symptoms or ask a health question..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline"
                disabled={isLoading}
                onClick={handleVoiceInput}
                className={recording ? "animate-pulse bg-red-50" : ""}
              >
                {recording ? <Loader2 className="h-4 w-4 animate-spin" /> : <MicrophoneIcon className="h-4 w-4" />}
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-pandemic-blue hover:bg-pandemic-blue/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="symptoms" className="flex flex-col space-y-4">
            <div className="border rounded-lg p-4 h-[calc(100vh-23rem)] flex flex-col">
              <h3 className="text-lg font-medium mb-2">Symptom Tracker</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add all your symptoms below for a comprehensive analysis.
              </p>
              
              <div className="flex gap-2 mb-4">
                <Input
                  value={newSymptom}
                  onChange={(e) => setNewSymptom(e.target.value)}
                  placeholder="Enter a symptom (e.g., fever, cough)"
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={addSymptom}
                  disabled={!newSymptom.trim()}
                  variant="outline"
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-auto mb-4">
                {symptoms.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No symptoms added yet. Add symptoms to receive an analysis.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {symptoms.map((symptom, index) => (
                      <div key={index} className="flex items-center justify-between border rounded-md p-2">
                        <div className="flex-1">
                          <p className="font-medium">{symptom.name}</p>
                          <div className="flex gap-2 mt-1">
                            <Button 
                              size="sm" 
                              variant={symptom.severity === 'mild' ? 'default' : 'outline'}
                              className={symptom.severity === 'mild' ? 'bg-green-500 hover:bg-green-600' : ''}
                              onClick={() => updateSymptomSeverity(index, 'mild')}
                            >
                              Mild
                            </Button>
                            <Button 
                              size="sm" 
                              variant={symptom.severity === 'moderate' ? 'default' : 'outline'}
                              className={symptom.severity === 'moderate' ? 'bg-amber-500 hover:bg-amber-600' : ''}
                              onClick={() => updateSymptomSeverity(index, 'moderate')}
                            >
                              Moderate
                            </Button>
                            <Button 
                              size="sm" 
                              variant={symptom.severity === 'severe' ? 'default' : 'outline'}
                              className={symptom.severity === 'severe' ? 'bg-red-500 hover:bg-red-600' : ''}
                              onClick={() => updateSymptomSeverity(index, 'severe')}
                            >
                              Severe
                            </Button>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-destructive"
                          onClick={() => removeSymptom(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Button 
                className="w-full bg-pandemic-blue hover:bg-pandemic-blue/90"
                disabled={symptoms.length === 0 || isLoading}
                onClick={analyzeSymptoms}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Symptoms...
                  </>
                ) : (
                  'Analyze Symptoms'
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default HealthAssistant;
