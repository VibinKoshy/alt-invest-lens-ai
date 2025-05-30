
import React from 'react';
import { FileText, Loader2, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { UploadedFile } from '@/pages/DataUpload';

interface UploadProgressProps {
  files: UploadedFile[];
}

const UploadProgress: React.FC<UploadProgressProps> = ({ files }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploading': return 'Uploading...';
      case 'processing': return 'Processing...';
      case 'extracted': return 'Data Extracted';
      case 'validated': return 'Validated';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading': return 'text-blue-600';
      case 'processing': return 'text-orange-600';
      case 'extracted': return 'text-green-600';
      case 'validated': return 'text-green-700';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'ppm': return 'PPM';
      case 'nav': return 'NAV Statement';
      case 'capital-call': return 'Capital Call';
      case 'financial': return 'Financial Statement';
      default: return 'Document';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ppm': return 'bg-blue-100 text-blue-700';
      case 'nav': return 'bg-green-100 text-green-700';
      case 'capital-call': return 'bg-orange-100 text-orange-700';
      case 'financial': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Progress</h3>
      
      <div className="space-y-4">
        {files.map((file) => (
          <div key={file.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(file.category)}`}>
                      {getCategoryLabel(file.category)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getStatusColor(file.status)}`}>
                  {getStatusText(file.status)}
                </span>
                {(file.status === 'uploading' || file.status === 'processing') && (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                )}
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {file.status === 'uploading' && (
              <div className="space-y-2">
                <Progress value={file.progress} className="h-2" />
                <p className="text-xs text-gray-500 text-right">
                  {file.progress}% complete
                </p>
              </div>
            )}
            
            {file.status === 'processing' && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  AI is extracting data from your document...
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadProgress;
