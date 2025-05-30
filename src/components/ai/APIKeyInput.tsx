
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Key, Play } from 'lucide-react';
import { initializeOpenAI, enableDemoMode } from '@/lib/openai';
import { useToast } from '@/hooks/use-toast';

interface APIKeyInputProps {
  onKeySet: () => void;
}

const APIKeyInput = ({ onKeySet }: APIKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      initializeOpenAI(apiKey.trim());
      localStorage.setItem('openai_api_key', apiKey.trim());
      
      toast({
        title: "API Key Set Successfully",
        description: "You can now start chatting with the AI assistant!",
      });
      
      onKeySet();
    } catch (error) {
      toast({
        title: "Invalid API Key",
        description: "Please check your OpenAI API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoMode = () => {
    enableDemoMode();
    toast({
      title: "Demo Mode Enabled",
      description: "You can now explore the AI assistant with sample data!",
    });
    onKeySet();
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Key className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">AI Portfolio Assistant</CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Enter your OpenAI API key for full functionality, or try demo mode with sample data.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="apiKey">OpenAI API Key (Optional)</Label>
              <div className="relative mt-1">
                <Input
                  id="apiKey"
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showKey ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Setting up...' : 'Start with API Key'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleDemoMode}
          >
            <Play className="h-4 w-4 mr-2" />
            Try Demo Mode
          </Button>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Don't have an API key?</strong> Get one from{' '}
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-blue-900"
              >
                OpenAI's platform
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIKeyInput;
