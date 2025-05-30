
import { useState } from 'react';
import Header from '@/components/Header';
import ReportTemplateSelector from '@/components/reports/ReportTemplateSelector';
import ContentSelector from '@/components/reports/ContentSelector';
import ReportPreview from '@/components/reports/ReportPreview';
import ExportOptions from '@/components/reports/ExportOptions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: string[];
}

export interface SelectedContent {
  charts: string[];
  metrics: string[];
  sections: string[];
  aiInsights: boolean;
  dateRange: {
    start: Date;
    end: Date;
  };
}

const ReportsExports = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [selectedContent, setSelectedContent] = useState<SelectedContent>({
    charts: [],
    metrics: [],
    sections: [],
    aiInsights: false,
    dateRange: {
      start: new Date(new Date().getFullYear(), 0, 1),
      end: new Date()
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reports & Export</h2>
          <p className="text-gray-600">Generate professional reports for Investment Committee presentations</p>
        </div>

        <Tabs defaultValue="templates" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="builder">Report Builder</TabsTrigger>
            <TabsTrigger value="history">Export History</TabsTrigger>
          </TabsList>

          <TabsContent value="templates">
            <ReportTemplateSelector 
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
              showAll={true}
            />
          </TabsContent>

          <TabsContent value="builder">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <ReportTemplateSelector 
                  selectedTemplate={selectedTemplate}
                  onTemplateSelect={setSelectedTemplate}
                />
                <ContentSelector 
                  selectedContent={selectedContent}
                  onContentChange={setSelectedContent}
                />
              </div>
              <div className="lg:col-span-2">
                <ReportPreview 
                  template={selectedTemplate}
                  content={selectedContent}
                />
              </div>
              <div className="lg:col-span-1">
                <ExportOptions 
                  template={selectedTemplate}
                  content={selectedContent}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Export History</h3>
              <p className="text-gray-600">Export history will be implemented in a future update.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ReportsExports;
