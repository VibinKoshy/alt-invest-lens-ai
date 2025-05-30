
import React, { useState } from 'react';
import { CheckCircle, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadedFile } from '@/pages/DataUpload';

interface DataValidationProps {
  files: UploadedFile[];
  onValidate: (fileId: string, validatedData: any) => void;
}

const DataValidation: React.FC<DataValidationProps> = ({ files, onValidate }) => {
  const [selectedFileId, setSelectedFileId] = useState<string>(files[0]?.id || '');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Record<string, any>>({});

  const selectedFile = files.find(f => f.id === selectedFileId);

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setEditedData(prev => ({
      ...prev,
      [selectedFileId]: {
        ...prev[selectedFileId],
        [field]: value
      }
    }));
  };

  const handleSave = (field: string) => {
    setEditingField(null);
    // Update the file's extracted data
    if (selectedFile) {
      const updatedData = {
        ...selectedFile.extractedData,
        ...editedData[selectedFileId]
      };
      onValidate(selectedFileId, updatedData);
    }
  };

  const handleValidateAll = () => {
    files.forEach(file => {
      const finalData = {
        ...file.extractedData,
        ...editedData[file.id]
      };
      onValidate(file.id, finalData);
    });
  };

  const getFieldLabel = (key: string) => {
    const labels: Record<string, string> = {
      fundName: 'Fund Name',
      targetSize: 'Target Size',
      managementFee: 'Management Fee',
      carriedInterest: 'Carried Interest',
      investmentPeriod: 'Investment Period',
      navPerShare: 'NAV Per Share',
      totalNav: 'Total NAV',
      reportDate: 'Report Date',
      quarterlyReturn: 'Quarterly Return',
      callAmount: 'Call Amount',
      dueDate: 'Due Date',
      purpose: 'Purpose',
      totalCommitment: 'Total Commitment',
      companyName: 'Company Name',
      revenue: 'Revenue',
      ebitda: 'EBITDA',
      reportPeriod: 'Report Period',
      growthRate: 'Growth Rate'
    };
    return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  if (!selectedFile) return null;

  const currentData = {
    ...selectedFile.extractedData,
    ...editedData[selectedFileId]
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Validate Extracted Data</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {files.filter(f => f.status === 'validated').length} of {files.length} validated
          </span>
        </div>
      </div>

      {/* File Selector */}
      {files.length > 1 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Document to Review
          </label>
          <select
            value={selectedFileId}
            onChange={(e) => setSelectedFileId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {files.map((file) => (
              <option key={file.id} value={file.id}>
                {file.name} - {file.accuracy}% accurate
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Data Fields */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-gray-900">Extracted Fields</h4>
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
            selectedFile.status === 'validated' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {selectedFile.status === 'validated' ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Validated
              </>
            ) : (
              'Pending Review'
            )}
          </span>
        </div>

        {Object.entries(currentData || {}).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getFieldLabel(key)}
              </label>
              {editingField === key ? (
                <Input
                  value={editedData[selectedFileId]?.[key] || String(value || '')}
                  onChange={(e) => handleEdit(key, e.target.value)}
                  className="w-full"
                  autoFocus
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-2 rounded border">
                  {String(value || '')}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              {editingField === key ? (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleSave(key)}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingField(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingField(key)}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <Button variant="outline">
          Previous Document
        </Button>
        <div className="space-x-2">
          <Button 
            onClick={() => onValidate(selectedFileId, currentData)}
            variant="outline"
          >
            Approve This Document
          </Button>
          <Button 
            onClick={handleValidateAll}
            className="bg-green-600 hover:bg-green-700"
          >
            Validate All Documents
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataValidation;
