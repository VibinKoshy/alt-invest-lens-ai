
import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadZoneProps {
  onFilesAdded: (files: File[]) => void;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ onFilesAdded }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const acceptedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ];

  const validateFiles = (files: FileList) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach(file => {
      if (!acceptedTypes.includes(file.type)) {
        errors.push(`${file.name}: Unsupported file type`);
        return;
      }
      
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        errors.push(`${file.name}: File too large (max 50MB)`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      setError(errors.join(', '));
      setTimeout(() => setError(null), 5000);
    }

    return validFiles;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const validFiles = validateFiles(e.dataTransfer.files);
    if (validFiles.length > 0) {
      onFilesAdded(validFiles);
    }
  }, [onFilesAdded]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const validFiles = validateFiles(e.target.files);
      if (validFiles.length > 0) {
        onFilesAdded(validFiles);
      }
    }
  };

  const documentTypes = [
    { name: 'Private Placement Memorandums', ext: 'PDF, DOCX' },
    { name: 'NAV Statements', ext: 'PDF, XLSX' },
    { name: 'Capital Call Notices', ext: 'PDF, DOCX' },
    { name: 'Financial Statements', ext: 'PDF, XLSX' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <Upload className={`mx-auto h-12 w-12 mb-4 ${
          isDragOver ? 'text-blue-500' : 'text-gray-400'
        }`} />
        
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-900">
            {isDragOver ? 'Drop files here' : 'Drag and drop files here'}
          </p>
          <p className="text-gray-500">or</p>
          
          <div>
            <input
              type="file"
              multiple
              accept=".pdf,.xlsx,.xls,.docx,.doc"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="file-upload" className="cursor-pointer">
                <FileText className="h-4 w-4 mr-2" />
                Select Files
              </label>
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          Maximum file size: 50MB. Supported formats: PDF, XLSX, DOCX
        </p>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Supported Document Types</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {documentTypes.map((type, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
              <FileText className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{type.name}</span>
              <span className="text-gray-400">({type.ext})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;
