
import { useState, useRef, useEffect } from 'react';
import ChatInterface from '@/components/ai/ChatInterface';
import MessageInput from '@/components/ai/MessageInput';
import QuerySuggestions from '@/components/ai/QuerySuggestions';
import APIKeyInput from '@/components/ai/APIKeyInput';
import { ChatMessage, isOpenAIInitialized } from '@/lib/openai';

const AIAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeySet, setApiKeySet] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setApiKeySet(isOpenAIInitialized());
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const handleSuggestionClick = (query: string) => {
    setInputValue(query);
  };

  if (!apiKeySet) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Portfolio Assistant</h2>
              <p className="text-gray-600">Ask natural language questions about your portfolio and get AI-powered insights</p>
            </div>
            <APIKeyInput onKeySet={() => setApiKeySet(true)} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Portfolio Assistant</h2>
            <p className="text-gray-600">Ask natural language questions about your portfolio and get AI-powered insights</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <ChatInterface 
                messages={messages} 
                isLoading={isLoading}
              />
              <MessageInput 
                onSendMessage={addMessage}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
              <div ref={chatEndRef} />
            </div>
            
            <div className="lg:col-span-1">
              <QuerySuggestions onSuggestionClick={handleSuggestionClick} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIAssistant;
