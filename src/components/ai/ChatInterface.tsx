
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Bot } from 'lucide-react';
import { ChatMessage } from '@/lib/openai';
import { isInDemoMode } from '@/lib/openai';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatInterface = ({ messages, isLoading }: ChatInterfaceProps) => {
  const demoMode = isInDemoMode();

  if (messages.length === 0 && !isLoading) {
    return (
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Bot className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Welcome to your AI Portfolio Assistant
            {demoMode && <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full ml-2">Demo Mode</span>}
          </h3>
          <p className="text-gray-600 mb-4">
            Ask questions about your portfolio performance, risk exposure, compliance status, or any other portfolio-related queries.
          </p>
          <div className="text-sm text-gray-500">
            {demoMode ? (
              <>Try asking: "What's our current performance?" or "Show me risk metrics?"</>
            ) : (
              <>Try asking: "What's our current allocation?" or "How did we perform last quarter?"</>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardContent className="p-6">
        {demoMode && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-orange-800">Demo Mode Active</span>
            </div>
            <p className="text-xs text-orange-700 mt-1">
              Responses use sample portfolio data. Enter your API key for real portfolio analysis.
            </p>
          </div>
        )}
        
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="flex space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className={message.role === 'user' ? 'bg-blue-100' : 'bg-green-100'}>
                  {message.role === 'user' ? (
                    <User className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Bot className="h-4 w-4 text-green-600" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className={`p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-50 text-blue-900' 
                    : 'bg-gray-50 text-gray-900'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-green-100">
                  <Bot className="h-4 w-4 text-green-600" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">AI Assistant</span>
                  <span className="text-xs text-gray-500">thinking...</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
