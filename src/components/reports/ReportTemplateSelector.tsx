
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, PieChart, Shield, TrendingUp } from 'lucide-react';
import { ReportTemplate } from '@/pages/ReportsExports';

const templates: ReportTemplate[] = [
  {
    id: 'executive',
    name: 'Executive Summary',
    description: 'High-level overview for senior leadership',
    sections: ['performance', 'allocation', 'key-metrics', 'ai-insights']
  },
  {
    id: 'investment-committee',
    name: 'Investment Committee',
    description: 'Comprehensive analysis for IC meetings',
    sections: ['performance', 'allocation', 'holdings', 'risk', 'scenarios', 'ai-insights']
  },
  {
    id: 'quarterly',
    name: 'Quarterly Review',
    description: 'Regular quarterly performance report',
    sections: ['performance', 'allocation', 'compliance', 'risk', 'outlook']
  },
  {
    id: 'risk-assessment',
    name: 'Risk Assessment',
    description: 'Focused risk and compliance analysis',
    sections: ['risk', 'compliance', 'concentration', 'stress-tests']
  }
];

interface ReportTemplateSelectorProps {
  selectedTemplate: ReportTemplate | null;
  onTemplateSelect: (template: ReportTemplate) => void;
  showAll?: boolean;
}

const ReportTemplateSelector = ({ 
  selectedTemplate, 
  onTemplateSelect, 
  showAll = false 
}: ReportTemplateSelectorProps) => {
  const getTemplateIcon = (templateId: string) => {
    switch (templateId) {
      case 'executive': return <TrendingUp className="h-5 w-5" />;
      case 'investment-committee': return <PieChart className="h-5 w-5" />;
      case 'quarterly': return <FileText className="h-5 w-5" />;
      case 'risk-assessment': return <Shield className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Report Templates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedTemplate?.id === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onTemplateSelect(template)}
          >
            <div className="flex items-start space-x-3">
              <div className="text-gray-600">
                {getTemplateIcon(template.id)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{template.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {template.sections.slice(0, showAll ? undefined : 3).map((section) => (
                    <Badge key={section} variant="outline" className="text-xs">
                      {section.replace('-', ' ')}
                    </Badge>
                  ))}
                  {!showAll && template.sections.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.sections.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ReportTemplateSelector;
