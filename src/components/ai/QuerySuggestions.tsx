
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChatMessage } from '@/lib/openai';

interface QuerySuggestionsProps {
  onSuggestionClick: (message: ChatMessage) => void;
}

const QuerySuggestions = ({ onSuggestionClick }: QuerySuggestionsProps) => {
  const suggestions = [
    {
      category: "Performance",
      queries: [
        "Summarize our portfolio performance this year",
        "How are we performing vs benchmark?",
        "What's our best performing asset class?",
        "Show me our monthly returns trend"
      ]
    },
    {
      category: "Risk & Exposure",
      queries: [
        "What's our current risk level?",
        "Show me our geographic allocation",
        "What's our concentration risk status?",
        "How exposed are we to private equity?"
      ]
    },
    {
      category: "Compliance",
      queries: [
        "What compliance alerts do we have?",
        "Are we within allocation limits?",
        "Show me our ESG compliance score",
        "What's our liquidity position?"
      ]
    }
  ];

  const handleSuggestionClick = (query: string) => {
    const message: ChatMessage = {
      id: `suggestion-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date()
    };
    onSuggestionClick(message);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Quick Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestions.map((section, index) => (
            <div key={index}>
              <h4 className="text-sm font-medium text-gray-700 mb-2">{section.category}</h4>
              <div className="space-y-2">
                {section.queries.map((query, queryIndex) => (
                  <Button
                    key={queryIndex}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start h-auto p-2 text-xs"
                    onClick={() => handleSuggestionClick(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuerySuggestions;
