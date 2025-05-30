
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { SelectedContent } from '@/pages/ReportsExports';

const contentOptions = {
  charts: [
    { id: 'allocation', name: 'Asset Allocation Chart' },
    { id: 'performance', name: 'Performance vs Benchmark' },
    { id: 'risk-metrics', name: 'Risk Assessment Chart' },
    { id: 'concentration', name: 'Concentration Analysis' }
  ],
  metrics: [
    { id: 'total-aum', name: 'Total AUM' },
    { id: 'net-irr', name: 'Net IRR' },
    { id: 'portfolio-multiple', name: 'Portfolio Multiple' },
    { id: 'vintage-spread', name: 'Vintage Spread' },
    { id: 'var', name: 'Portfolio VaR' },
    { id: 'compliance-score', name: 'Compliance Score' }
  ],
  sections: [
    { id: 'executive-summary', name: 'Executive Summary' },
    { id: 'holdings-detail', name: 'Holdings Detail' },
    { id: 'risk-analysis', name: 'Risk Analysis' },
    { id: 'compliance-status', name: 'Compliance Status' },
    { id: 'market-outlook', name: 'Market Outlook' }
  ]
};

interface ContentSelectorProps {
  selectedContent: SelectedContent;
  onContentChange: (content: SelectedContent) => void;
}

const ContentSelector = ({ selectedContent, onContentChange }: ContentSelectorProps) => {
  const handleCheckboxChange = (
    category: 'charts' | 'metrics' | 'sections',
    itemId: string,
    checked: boolean
  ) => {
    const currentArray = selectedContent[category] as string[];
    const newArray = checked
      ? [...currentArray, itemId]
      : currentArray.filter(id => id !== itemId);

    onContentChange({
      ...selectedContent,
      [category]: newArray
    });
  };

  const handleAIInsightsChange = (checked: boolean) => {
    onContentChange({
      ...selectedContent,
      aiInsights: checked
    });
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Content Selection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Charts Section */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Charts & Visualizations</h4>
          <div className="space-y-2">
            {contentOptions.charts.map((chart) => (
              <div key={chart.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`chart-${chart.id}`}
                  checked={selectedContent.charts.includes(chart.id)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange('charts', chart.id, !!checked)
                  }
                />
                <Label
                  htmlFor={`chart-${chart.id}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {chart.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Metrics Section */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Key Metrics</h4>
          <div className="space-y-2">
            {contentOptions.metrics.map((metric) => (
              <div key={metric.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`metric-${metric.id}`}
                  checked={selectedContent.metrics.includes(metric.id)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange('metrics', metric.id, !!checked)
                  }
                />
                <Label
                  htmlFor={`metric-${metric.id}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {metric.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Sections */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Report Sections</h4>
          <div className="space-y-2">
            {contentOptions.sections.map((section) => (
              <div key={section.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`section-${section.id}`}
                  checked={selectedContent.sections.includes(section.id)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange('sections', section.id, !!checked)
                  }
                />
                <Label
                  htmlFor={`section-${section.id}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {section.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* AI Insights */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">AI-Generated Content</h4>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ai-insights"
              checked={selectedContent.aiInsights}
              onCheckedChange={handleAIInsightsChange}
            />
            <Label htmlFor="ai-insights" className="text-sm text-gray-700 cursor-pointer">
              Include AI-generated insights and summaries
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentSelector;
