import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, MicOff, Bot, User, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const npsResponses: Record<string, string> = {
  'default': 'I can help you understand NPS! Try asking:\n- "What is NPS?"\n- "What is NPS Tier 1?"\n- "When can I withdraw?"\n- "How much pension will I get?"\n\nI\'m here to simplify pension planning for you. 🙏',
};

export default function AssistantPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: npsResponses['default'] },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    
    const userMsgId = Date.now().toString();
    const userMsg: Message = { id: userMsgId, role: 'user', content: text };
    
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response: any = await api.post('/assistant/query', { message: text });
      
      if (response.success) {
        const assistantMsg: Message = { 
          id: (Date.now() + 1).toString(), 
          role: 'assistant', 
          content: response.reply 
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (error: any) {
      console.error('Assistant API Error:', error);
      toast.error(t('chat.error') || 'Failed to get response');
      
      // Local fallback logic if backend fails
      const fallbackContent = "I am having trouble connecting to my brain right now. Please try again in a moment.";
      const errorMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: fallbackContent };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      toast.error('Voice recognition is not supported in this browser.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (isListening) {
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
    setIsListening(true);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col p-4 md:p-8">
      <h1 className="mb-4 font-display text-3xl font-bold text-foreground">{t('chat.title')}</h1>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 rounded-xl border border-border bg-card p-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm senior-text-boost whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <User className="h-5 w-5 text-accent" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleVoice}
          className={`shrink-0 h-12 w-12 rounded-xl ${isListening ? 'bg-destructive text-destructive-foreground animate-pulse-gentle' : ''}`}
          aria-label={isListening ? t('chat.listening') : t('chat.voice')}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder={t('chat.placeholder')}
          className="h-12 text-base senior-text-boost rounded-xl"
          aria-label={t('chat.placeholder')}
        />
        <Button onClick={() => sendMessage(input)} size="icon" className="shrink-0 h-12 w-12 rounded-xl" aria-label={t('chat.send')}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
