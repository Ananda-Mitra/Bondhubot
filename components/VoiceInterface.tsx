
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, ChevronDown, Volume2, User, Bot } from 'lucide-react';
import { getBondhuBotResponse } from '../services/gemini';

const VoiceInterface: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'আসসালামু আলাইকুম! আমি বন্ধুবট। আমি আপনাকে কীভাবে সাহায্য করতে পারি?' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, transcript]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'bn-BD';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const currentTranscript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setTranscript(currentTranscript);

        if (event.results[0].isFinal) {
          handleUserMessage(currentTranscript);
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleUserMessage = async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text }]);
    setTranscript('');
    setIsProcessing(true);

    const response = await getBondhuBotResponse(text);
    
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsProcessing(false);

    // Simple built-in TTS fallback (Bengali might vary by OS)
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = 'bn-BD';
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      recognitionRef.current?.start();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] relative pb-20">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2E7D32]/10 rounded-full flex items-center justify-center text-[#2E7D32]">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold text-gray-800">বন্ধুবট এআই</h2>
            <div className="flex items-center text-[10px] text-green-500 font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse" /> অনলাইনে আছে
            </div>
          </div>
        </div>
        <button className="p-2 text-gray-400"><ChevronDown size={20} /></button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-[#2E7D32] text-white rounded-tr-none' 
                : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {transcript && (
          <div className="flex justify-end opacity-50">
            <div className="bg-[#2E7D32] text-white p-3 rounded-2xl rounded-tr-none">
              <p className="text-xs italic">{transcript}...</p>
            </div>
          </div>
        )}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#2E7D32] rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-[#2E7D32] rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-[#2E7D32] rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Mic Button */}
      <div className="absolute bottom-24 left-0 right-0 flex flex-col items-center">
        <button 
          onClick={toggleListening}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isListening ? 'bg-red-500 scale-110' : 'bg-[#2E7D32]'
          }`}
        >
          {isListening ? (
            <div className="relative">
              <MicOff size={32} className="text-white" />
              <div className="absolute inset-0 scale-[1.5] rounded-full border-2 border-white/30 animate-ping" />
            </div>
          ) : (
            <Mic size={32} className="text-white" />
          )}
        </button>
        <span className={`mt-3 text-xs font-bold ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}>
          {isListening ? 'আমি শুনছি...' : 'কথা বলতে চাপ দিন'}
        </span>
      </div>
    </div>
  );
};

export default VoiceInterface;
