import { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  onSend: (message: string) => void;
  onVoiceClick: () => void;
  isLoading?: boolean;
  isRecording?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSend, 
  onVoiceClick, 
  isLoading = false,
  isRecording = false,
  placeholder = 'Type your question...'
}: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="pr-12 py-6 text-base"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onVoiceClick}
          disabled={isLoading && !isRecording}
          className={`absolute right-2 top-1/2 -translate-y-1/2 ${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-blue-600'}`}
        >
          <Mic className="w-5 h-5" />
        </Button>
      </div>
      <Button 
        type="submit" 
        disabled={!input.trim() || isLoading}
        className="px-6"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </Button>
    </form>
  );
}
