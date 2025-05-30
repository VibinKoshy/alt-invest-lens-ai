
import React from 'react';
import { CheckCircle, AlertTriangle, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadedFile } from '@/pages/DataUpload';

interface DataExtractionStatusProps {
  files: UploadedFile[];
  onStartValidation: () => void;
}

const DataExtractionStatus: React.FC<DataExtractionStatusProps> = ({ 
  files, 
  onStartValidation 
}) => {
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return 'text-green-600';
    if (accuracy >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyIcon = (accuracy: number) => {
    if (accuracy >= 95) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (accuracy >= 85) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <AlertTriangle className="h-5 w-5 text-red-600" />;
  };

  const getConfidenceLevel = (accuracy: number) => {
    if (accuracy >= 95) return 'High Confidence';
    if (accuracy >= 85) return 'Medium Confidence';
    return 'Low Confidence - Review Required';
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

  const getExtractedFieldsCount = (category: string) => {
    switch (category) {
      case 'ppm': return 8;
      case 'nav': return 6;
      case 'capital-call': return 5;
      case 'financial': return 7;
      default: return 5;
    }
  };

  const averageAccuracy = files.reduce((sum, file) => sum + (file.accuracy || 0), 0) / files.length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Extraction Results</h3>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            Avg. Accuracy: {averageAccuracy.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {files.map((file) => (
          <div key={file.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{getCategoryLabel(file.category)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getAccuracyIcon(file.accuracy || 0)}
                <span className={`text-sm font-medium ${getAccuracyColor(file.accuracy || 0)}`}>
                  {file.accuracy}% Accurate
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Fields Extracted:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {getExtractedFieldsCount(file.category)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Confidence:</span>
                <span className={`ml-2 font-medium ${getAccuracyColor(file.accuracy || 0)}`}>
                  {getConfidenceLevel(file.accuracy || 0)}
                </span>
              </div>
            </div>

            {file.accuracy && file.accuracy < 95 && (
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
                <AlertTriangle className="h-3 w-3 inline mr-1" />
                Manual review recommended for optimal accuracy
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {files.length} document{files.length !== 1 ? 's' : ''} processed
        </div>
        <Button onClick={onStartValidation} className="bg-blue-600 hover:bg-blue-700">
          Review & Validate Data
        </Button>
      </div>
    </div>
  );
};

export default DataExtractionStatus;
