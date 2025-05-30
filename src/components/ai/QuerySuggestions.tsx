
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuerySuggestionsProps {
  onSuggestionClick: (query: string) => void;
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
    onSuggestionClick(query);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base md:text-lg font-semibold text-gray-900">Quick Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4">
          {suggestions.map((section, index) => (
            <div key={index}>
              <h4 className="text-xs md:text-sm font-medium text-gray-700 mb-2">{section.category}</h4>
              <div className="space-y-1.5 md:space-y-2">
                {section.queries.map((query, queryIndex) => (
                  <Button
                    key={queryIndex}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start min-h-[2rem] md:min-h-[2.5rem] h-auto px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-normal whitespace-normal break-words leading-tight"
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
