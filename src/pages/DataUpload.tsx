import React, { useState } from 'react';
import { Upload, FileText, TrendingUp, DollarSign, Building } from 'lucide-react';
import FileUploadZone from '@/components/upload/FileUploadZone';
import UploadProgress from '@/components/upload/UploadProgress';
import DataExtractionStatus from '@/components/upload/DataExtractionStatus';
import DataValidation from '@/components/upload/DataValidation';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  category: 'ppm' | 'nav' | 'capital-call' | 'financial';
  progress: number;
  status: 'uploading' | 'processing' | 'extracted' | 'validated' | 'error';
  extractedData?: any;
  accuracy?: number;
}

const DataUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [activeStep, setActiveStep] = useState<'upload' | 'extraction' | 'validation'>('upload');

  const handleFilesAdded = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      category: getCategoryFromFileName(file.name),
      progress: 0,
      status: 'uploading'
    }));
    
    setFiles(prev => [...prev, ...uploadedFiles]);
    simulateUpload(uploadedFiles);
  };

  const getCategoryFromFileName = (name: string): UploadedFile['category'] => {
    const lower = name.toLowerCase();
    if (lower.includes('ppm') || lower.includes('memorandum')) return 'ppm';
    if (lower.includes('nav') || lower.includes('valuation')) return 'nav';
    if (lower.includes('capital') || lower.includes('call')) return 'capital-call';
    return 'financial';
  };

  const simulateUpload = (uploadedFiles: UploadedFile[]) => {
    uploadedFiles.forEach(file => {
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === file.id) {
            const newProgress = Math.min(f.progress + 10, 100);
            const newStatus = newProgress === 100 ? 'processing' : 'uploading';
            
            if (newProgress === 100) {
              clearInterval(interval);
              setTimeout(() => simulateExtraction(file.id), 1000);
            }
            
            return { ...f, progress: newProgress, status: newStatus };
          }
          return f;
        }));
      }, 200);
    });
  };

  const simulateExtraction = (fileId: string) => {
    setTimeout(() => {
      setFiles(prev => prev.map(f => {
        if (f.id === fileId) {
          return {
            ...f,
            status: 'extracted',
            accuracy: Math.floor(Math.random() * 10) + 85,
            extractedData: generateMockData(f.category)
          };
        }
        return f;
      }));
      setActiveStep('extraction');
    }, 2000);
  };

  const generateMockData = (category: string) => {
    const baseData = {
      ppm: {
        fundName: 'Growth Capital Fund III',
        targetSize: '$500M',
        managementFee: '2.0%',
        carriedInterest: '20%',
        investmentPeriod: '5 years'
      },
      nav: {
        fundName: 'Real Estate Opportunity Fund',
        navPerShare: '$125.67',
        totalNav: '$45.2M',
        reportDate: '2024-03-31',
        quarterlyReturn: '3.2%'
      },
      'capital-call': {
        fundName: 'Infrastructure Fund II',
        callAmount: '$2.5M',
        dueDate: '2024-06-15',
        purpose: 'Portfolio Company Acquisition',
        totalCommitment: '$10M'
      },
      financial: {
        companyName: 'TechCorp Solutions',
        revenue: '$15.3M',
        ebitda: '$4.2M',
        reportPeriod: 'Q1 2024',
        growthRate: '18%'
      }
    };
    return baseData[category as keyof typeof baseData] || baseData.financial;
  };

  const handleValidateData = (fileId: string, validatedData: any) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'validated', extractedData: validatedData } : f
    ));
  };

  const getDocumentTypeIcon = (category: string) => {
    switch (category) {
      case 'ppm': return <FileText className="h-5 w-5 text-blue-600" />;
      case 'nav': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'capital-call': return <DollarSign className="h-5 w-5 text-orange-600" />;
      case 'financial': return <Building className="h-5 w-5 text-purple-600" />;
      default: return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const extractedFiles = files.filter(f => f.status === 'extracted');
  const processingFiles = files.filter(f => f.status === 'uploading' || f.status === 'processing');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Upload</h1>
          <p className="text-gray-600">
            Upload PPMs, NAV statements, capital calls, and financial statements for automated data extraction
          </p>
        </div>

        {/* Upload Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeStep === 'upload' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
            }`}>
              <Upload className="h-4 w-4" />
              <span className="text-sm font-medium">Upload Files</span>
            </div>
            <div className="h-px bg-gray-300 w-8"></div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeStep === 'extraction' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
            }`}>
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">Data Extraction</span>
            </div>
            <div className="h-px bg-gray-300 w-8"></div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeStep === 'validation' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
            }`}>
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Validation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload and Progress */}
          <div className="space-y-6">
            <FileUploadZone onFilesAdded={handleFilesAdded} />
            
            {processingFiles.length > 0 && (
              <UploadProgress files={processingFiles} />
            )}
          </div>

          {/* Right Column - Extraction Status and Validation */}
          <div className="space-y-6">
            {extractedFiles.length > 0 && (
              <DataExtractionStatus 
                files={extractedFiles}
                onStartValidation={() => setActiveStep('validation')}
              />
            )}
            
            {activeStep === 'validation' && extractedFiles.length > 0 && (
              <DataValidation 
                files={extractedFiles}
                onValidate={handleValidateData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;
