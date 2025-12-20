import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Upload as UploadIcon, File, CheckCircle, Clock, AlertCircle, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);

  const recentUploads = [
    {
      id: 1,
      name: 'ABC_Corp_Credit_Agreement_2024.pdf',
      size: '2.4 MB',
      uploadedAt: '2025-12-18 14:30',
      status: 'extracted',
      pages: 156,
    },
    {
      id: 2,
      name: 'XYZ_Term_Loan_Facility.docx',
      size: '1.8 MB',
      uploadedAt: '2025-12-18 13:15',
      status: 'processing',
      pages: 98,
    },
    {
      id: 3,
      name: 'Global_RCF_Amendment_3.pdf',
      size: '890 KB',
      uploadedAt: '2025-12-18 11:45',
      status: 'uploaded',
      pages: 42,
    },
    {
      id: 4,
      name: 'TechStart_Acquisition_Facility.pdf',
      size: '3.1 MB',
      uploadedAt: '2025-12-18 10:20',
      status: 'extracted',
      pages: 203,
    },
    {
      id: 5,
      name: 'Manufacturing_Bridge_Loan.pdf',
      size: '1.2 MB',
      uploadedAt: '2025-12-17 16:55',
      status: 'extracted',
      pages: 87,
    },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'extracted':
        return { icon: CheckCircle, variant: 'success', label: 'Extracted' };
      case 'processing':
        return { icon: Clock, variant: 'processing', label: 'Processing' };
      case 'uploaded':
        return { icon: AlertCircle, variant: 'warning', label: 'Uploaded' };
      default:
        return { icon: Clock, variant: 'default', label: 'Unknown' };
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Upload Loan Documents</h1>
        <p className="text-sm text-gray-500 mt-1">Upload PDF or Word documents to extract structured loan data</p>
      </div>

      <Card>
        <CardContent className="py-12">
          <div
            className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400 bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <UploadIcon className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-base font-medium text-gray-900">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports PDF and Word documents up to 50MB
                </p>
              </div>
              <div className="flex justify-center">
                <Button variant="primary">
                  Select Files
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Uploads</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Track the status of your uploaded documents</p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pages
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentUploads.map((upload) => {
                  const statusConfig = getStatusConfig(upload.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr key={upload.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                            <File className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{upload.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{upload.size}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{upload.pages}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{upload.uploadedAt}</td>
                      <td className="px-6 py-4">
                        <Badge variant={statusConfig.variant}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {upload.status === 'extracted' && (
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                              Review
                            </button>
                          )}
                          {upload.status === 'processing' && (
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-1.5">
                                <div className="bg-blue-600 h-1.5 rounded-full animate-pulse" style={{ width: '65%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500">65%</span>
                            </div>
                          )}
                          <button className="text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
