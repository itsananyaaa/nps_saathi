import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, MicOff, Bot, User, Loader2, Volume2, VolumeX } from 'lucide-react';
import { apiService } from '@/services/apiService';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isVoice?: boolean;
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'bn', name: 'Bengali' }
];

const npsResponses: Record<string, string> = {
  'default': 'I can help you understand NPS! Try asking:\n- "What is NPS?"\n- "What is NPS Tier 1?"\n- "When can I withdraw?"\n- "How much pension will I get?"\n\nI\'m here to simplify pension planning for you. 🙏',
};

export default function AssistantPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: npsResponses['default'] },
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTTSMuted, setIsTTSMuted] = useState(false);
  const isTTSMutedRef = useRef(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

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
      const res = await apiService.askTextQuery(text, language);
      if (res.response) {
        const assistantMsg: Message = { 
          id: (Date.now() + 1).toString(), 
          role: 'assistant', 
          content: res.response 
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (error: any) {
      console.error('Assistant API Error:', error);
      toast.error(t('chat.error') || 'Failed to get response');
      
      const fallbackContent = "I am having trouble connecting to my brain right now. Please try again in a moment.";
      const errorMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: fallbackContent };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          let base64data = reader.result as string;
          base64data = base64data.split(',')[1];
          await sendVoiceMessage(base64data);
        };
        
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      toast.error('Could not access microphone.');
      setIsListening(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleVoice = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleToggleMute = () => {
    const newMutedState = !isTTSMuted;
    setIsTTSMuted(newMutedState);
    isTTSMutedRef.current = newMutedState;
    if (newMutedState && currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
  };

  const sendVoiceMessage = async (base64Audio: string) => {
    setLoading(true);
    const userMsgId = Date.now().toString();
    const userMsg: Message = { id: userMsgId, role: 'user', content: '🎤 Voice Audio', isVoice: true };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await apiService.askVoiceQuery(base64Audio, language);
      if (res.response) {
        const assistantMsg: Message = { 
          id: (Date.now() + 1).toString(), 
          role: 'assistant', 
          content: res.response 
        };
        setMessages((prev) => [...prev, assistantMsg]);
        
        if (res.audio_response && !isTTSMutedRef.current) {
             const audioUrl = `data:audio/wav;base64,${res.audio_response}`;
             const audio = new Audio(audioUrl);
             currentAudioRef.current = audio;
             audio.play().catch(e => console.error("Audio playback failed", e));
        }
      }
    } catch (error: any) {
      console.error('Voice API Error:', error);
      toast.error('Voice query failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col p-4 md:p-8">
      <div className="mb-4 flex items-center justify-between">
         <h1 className="font-display text-3xl font-bold text-foreground">{t('chat.title')}</h1>
         <div className="flex items-center gap-4">
           <Button
             variant="ghost"
             size="icon"
             onClick={handleToggleMute}
             className="text-muted-foreground mr-2"
             title={isTTSMuted ? "Enable AI Voice" : "Mute AI Voice"}
           >
             {isTTSMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5 text-primary" />}
           </Button>
           <Select value={language} onValueChange={setLanguage}>
             <SelectTrigger className="w-[180px]">
               <SelectValue placeholder="Select Language" />
             </SelectTrigger>
             <SelectContent>
               {LANGUAGES.map(lang => (
                 <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
               ))}
             </SelectContent>
           </Select>
         </div>
      </div>

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
          {loading && (
             <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-start"
            >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <Button
          variant={isListening ? "destructive" : "outline"}
          size="icon"
          onClick={toggleVoice}
          className={`shrink-0 h-12 w-12 rounded-xl ${isListening ? 'animate-pulse' : ''}`}
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
