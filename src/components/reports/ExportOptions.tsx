
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, Table, Presentation, Loader2 } from 'lucide-react';
import { ReportTemplate, SelectedContent } from '@/pages/ReportsExports';
import { useToast } from '@/hooks/use-toast';

interface ExportOptionsProps {
  template: ReportTemplate | null;
  content: SelectedContent;
}

const ExportOptions = ({ template, content }: ExportOptionsProps) => {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const { toast } = useToast();

  const handleExport = async (format: 'pdf' | 'excel' | 'powerpoint') => {
    if (!template) {
      toast({
        title: "No Template Selected",
        description: "Please select a report template before exporting.",
        variant: "destructive"
      });
      return;
    }

    const selectedItemsCount = 
      content.charts.length + 
      content.metrics.length + 
      content.sections.length + 
      (content.aiInsights ? 1 : 0);

    if (selectedItemsCount === 0) {
      toast({
        title: "No Content Selected",
        description: "Please select content to include in your report.",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(format);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(null);
      toast({
        title: "Export Complete",
        description: `Your ${format.toUpperCase()} report has been generated and will download shortly.`,
      });
      
      // Create a dummy download (in real implementation, this would generate actual files)
      const blob = new Blob(['Report content'], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${template.name}-${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 2000);
  };

  const exportOptions = [
    {
      id: 'pdf',
      name: 'PDF Report',
      description: 'Professional PDF for Investment Committee',
      icon: <FileText className="h-5 w-5" />,
      recommended: true
    },
    {
      id: 'excel',
      name: 'Excel Workbook',
      description: 'Data tables and charts for analysis',
      icon: <Table className="h-5 w-5" />,
      recommended: false
    },
    {
      id: 'powerpoint',
      name: 'PowerPoint (Coming Soon)',
      description: 'Presentation slides with charts',
      icon: <Presentation className="h-5 w-5" />,
      recommended: false,
      disabled: true
    }
  ];

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Export Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Export Formats */}
        <div className="space-y-4">
          {exportOptions.map((option) => (
            <div
              key={option.id}
              className={`p-4 border rounded-lg ${
                option.disabled 
                  ? 'border-gray-200 bg-gray-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={option.disabled ? 'text-gray-400' : 'text-gray-600'}>
                    {option.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-medium ${option.disabled ? 'text-gray-400' : 'text-gray-900'}`}>
                        {option.name}
                      </h4>
                      {option.recommended && (
                        <Badge variant="default" className="text-xs">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm mt-1 ${option.disabled ? 'text-gray-400' : 'text-gray-600'}`}>
                      {option.description}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleExport(option.id as 'pdf' | 'excel' | 'powerpoint')}
                disabled={option.disabled || !template || isExporting !== null}
                className="w-full"
                variant={option.recommended ? 'default' : 'outline'}
              >
                {isExporting === option.id ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export {option.name.split(' ')[0]}
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>

        <Separator />

        {/* Export Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Export Summary</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <div>Template: {template?.name || 'None selected'}</div>
            <div>Charts: {content.charts.length}</div>
            <div>Metrics: {content.metrics.length}</div>
            <div>Sections: {content.sections.length}</div>
            <div>AI Insights: {content.aiInsights ? 'Yes' : 'No'}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => {
              // Reset selections
              window.location.reload();
            }}
          >
            Start Over
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportOptions;
