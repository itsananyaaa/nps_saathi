import { useState, useRef, useEffect } from 'react';
import { askQuery, askVoiceQuery, askTextQuery } from '../services/apiService';
import { globalUserProfile } from '../store/userProfile';
import { useLanguage } from '@/context/LanguageContext';
import { Bot, Sparkles, Globe, ChevronDown, VolumeX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import type { Message } from '@/types';
import { SUGGESTED_QUESTIONS, LANGUAGES } from '@/utils/constants';

export function AIAssistantPage() {
  const { language, setLanguage, t } = useLanguage();

  const makeGreeting = (): Message => ({
    id: '1',
    role: 'assistant',
    content: t('aiGreeting') || "Hello! I'm NPS Saathi, your AI pension advisor. What would you like to know?",
    timestamp: new Date(),
  });

  const [messages, setMessages] = useState<Message[]>([makeGreeting()]);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const globalAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleMuteAll = () => {
    if (globalAudioRef.current) {
      globalAudioRef.current.pause();
      globalAudioRef.current.currentTime = 0;
    }
  };

  // Reset greeting when language changes
  useEffect(() => {
    setMessages([makeGreeting()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      let res;
      if (language === 'en') {
        res = await askQuery(content, globalUserProfile);
      } else {
        res = await askTextQuery(content, language, globalUserProfile);
      }

      const mappedSources = res.sources ? res.sources.map(s => ({
        title: typeof s === 'string' ? s : (s as any).title || 'Reference',
        url: '#'
      })) : [];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: res.response || 'I am sorry, but I was unable to generate a response.',
        timestamp: new Date(),
        sources: mappedSources,
      };
      setMessages((prev: Message[]) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I am having trouble connecting to my brain right now. Please try again in a moment.',
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          setIsTyping(true);

          setMessages((prev: Message[]) => [
            ...prev,
            {
              id: Date.now().toString(),
              role: 'user',
              content: '🎤 [Voice Audio Sent]',
              timestamp: new Date(),
            },
          ]);

          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64Audio = (reader.result as string).split(',')[1];
            try {
              const res = await askVoiceQuery(base64Audio, language, globalUserProfile);
              const mappedSources = res.sources ? res.sources.map(s => ({
                title: typeof s === 'string' ? s : (s as any).title || 'Reference',
                url: '#'
              })) : [];
              const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: res.response || 'I processed your voice but could not generate a response.',
                timestamp: new Date(),
                sources: mappedSources,
                audio: res.audio_response,
              };
              setMessages((prev: Message[]) => [...prev, aiMessage]);
            } catch (error: any) {
              console.error(error);
              setMessages((prev: Message[]) => [
                ...prev,
                {
                  id: (Date.now() + 1).toString(),
                  role: 'assistant',
                  content: error?.response?.data?.detail || 'I am having trouble processing your voice right now.',
                  timestamp: new Date(),
                },
              ]);
            } finally {
              setIsTyping(false);
              stream.getTracks().forEach((track) => track.stop());
            }
          };
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Error accessing microphone:', err);
        alert('Could not access microphone.');
      }
    }
  };

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t('aiAssistant')}</h2>
            <p className="text-sm text-gray-500">{t('aiAssistantSub')}</p>
          </div>
        </div>

        {/* Inline Language Selector + Mute */}
        <div className="flex items-center gap-2">
          {/* Mute Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleMuteAll}
            className="flex items-center gap-1.5 text-red-600 border-red-200 hover:bg-red-50"
            title="Stop AI voice"
          >
            <VolumeX className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Mute</span>
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-dashed border-purple-300">
              <Globe className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-purple-700">{currentLang.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Chat Language
            </div>
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center justify-between ${language === lang.code ? 'bg-purple-50 text-purple-700 font-medium' : ''}`}
              >
                <span>{lang.nativeName}</span>
                <span className="text-gray-400 text-xs">{lang.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} globalAudioRef={globalAudioRef} />
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-none p-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length < 3 && (
            <div className="px-4 py-3 border-t bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-gray-600">Suggested questions:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage(question)}
                    className="text-xs bg-white hover:bg-blue-50"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <ChatInput
              onSend={handleSendMessage}
              onVoiceClick={handleVoiceClick}
              isLoading={isTyping}
              isRecording={isRecording}
              placeholder={t('askNPSPlaceholder') || 'Ask about NPS, withdrawal rules, tax benefits...'}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
