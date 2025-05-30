
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { ChatMessage, sendChatMessage } from '@/lib/openai';
import { buildPortfolioContext } from '@/lib/portfolioContext';
import { useToast } from '@/hooks/use-toast';

interface MessageInputProps {
  onSendMessage: (message: ChatMessage) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  inputValue?: string;
  setInputValue?: (value: string) => void;
}

const MessageInput = ({ 
  onSendMessage, 
  isLoading, 
  setIsLoading,
  inputValue: externalInputValue = '',
  setInputValue: setExternalInputValue
}: MessageInputProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle external input value updates
  useEffect(() => {
    if (externalInputValue && externalInputValue !== input) {
      setInput(externalInputValue);
      // Focus the textarea when external input is set
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [externalInputValue]);

  // Update external input value when internal input changes
  const handleInputChange = (value: string) => {
    setInput(value);
    if (setExternalInputValue) {
      setExternalInputValue(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    onSendMessage(userMessage);
    handleInputChange('');
    setIsLoading(true);

    try {
      const portfolioContext = buildPortfolioContext();
      const aiResponse = await sendChatMessage(updatedMessages, portfolioContext);
      
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      onSendMessage(assistantMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your portfolio... (e.g., 'What's our exposure to renewable energy?' or 'Summarize last quarter's performance')"
            className="flex-1 min-h-[80px] resize-none"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <div className="mt-2 text-xs text-gray-500">
          Press Enter to send, Shift+Enter for new line
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageInput;
