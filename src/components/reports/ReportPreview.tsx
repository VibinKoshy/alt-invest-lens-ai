
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ReportTemplate, SelectedContent } from '@/pages/ReportsExports';
import { FileText, Eye } from 'lucide-react';

interface ReportPreviewProps {
  template: ReportTemplate | null;
  content: SelectedContent;
}

const ReportPreview = ({ template, content }: ReportPreviewProps) => {
  if (!template) {
    return (
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Template Selected</h3>
          <p className="text-gray-600 text-center">
            Select a report template to see a preview of your report
          </p>
        </CardContent>
      </Card>
    );
  }

  const selectedItemsCount = 
    content.charts.length + 
    content.metrics.length + 
    content.sections.length + 
    (content.aiInsights ? 1 : 0);

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-gray-600" />
          <CardTitle className="text-lg font-semibold text-gray-900">Report Preview</CardTitle>
        </div>
        <Badge variant="outline" className="ml-auto">
          {selectedItemsCount} items selected
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Header */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h2>
          <p className="text-gray-600 mb-4">{template.description}</p>
          <div className="text-sm text-gray-500">
            Generated on: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Selected Charts Preview */}
        {content.charts.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Charts & Visualizations</h4>
            <div className="grid grid-cols-2 gap-3">
              {content.charts.map((chartId) => (
                <div key={chartId} className="bg-gray-100 h-24 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-600 capitalize">
                    {chartId.replace('-', ' ')} Chart
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Metrics Preview */}
        {content.metrics.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Key Metrics</h4>
            <div className="grid grid-cols-2 gap-3">
              {content.metrics.map((metricId) => (
                <div key={metricId} className="bg-blue-50 p-3 rounded border">
                  <div className="text-xs text-gray-600 capitalize mb-1">
                    {metricId.replace('-', ' ')}
                  </div>
                  <div className="text-lg font-semibold text-blue-600">$2.4B</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Sections Preview */}
        {content.sections.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Report Sections</h4>
            <div className="space-y-2">
              {content.sections.map((sectionId, index) => (
                <div key={sectionId} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium text-gray-600">{index + 1}.</span>
                  <span className="text-sm text-gray-900 capitalize">
                    {sectionId.replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Insights Preview */}
        {content.aiInsights && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">AI-Generated Insights</h4>
            <div className="bg-green-50 p-4 rounded border border-green-200">
              <div className="text-sm text-green-800">
                ✓ AI-generated executive summary and insights will be included
              </div>
            </div>
          </div>
        )}

        {selectedItemsCount === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">
              Select content from the left panel to see preview
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportPreview;
