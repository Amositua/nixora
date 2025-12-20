import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { FileText, Download, Eye, Calendar, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Reports() {
  const reports = [
    {
      id: 1,
      name: 'Maturity Exposure Report',
      description: 'Detailed analysis of loans maturing within specified periods',
      category: 'Risk Analysis',
      lastGenerated: '2025-12-18 09:30',
      format: 'PDF',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Transfer-Ready Loans',
      description: 'Loans eligible for transfer without borrower consent',
      category: 'Trading',
      lastGenerated: '2025-12-18 08:15',
      format: 'Excel',
      size: '890 KB',
    },
    {
      id: 3,
      name: 'High-Risk Covenant Report',
      description: 'Loans with upcoming covenant tests and compliance status',
      category: 'Compliance',
      lastGenerated: '2025-12-17 16:45',
      format: 'PDF',
      size: '1.8 MB',
    },
    {
      id: 4,
      name: 'Portfolio Summary',
      description: 'Comprehensive overview of entire loan portfolio',
      category: 'Management',
      lastGenerated: '2025-12-17 14:20',
      format: 'PDF',
      size: '3.2 MB',
    },
    {
      id: 5,
      name: 'Benchmark Rate Analysis',
      description: 'Distribution and exposure by interest rate benchmark',
      category: 'Market Analysis',
      lastGenerated: '2025-12-16 11:00',
      format: 'Excel',
      size: '1.1 MB',
    },
    {
      id: 6,
      name: 'Quarterly Performance Review',
      description: 'Quarterly portfolio performance and key metrics',
      category: 'Performance',
      lastGenerated: '2025-12-15 10:30',
      format: 'PDF',
      size: '4.5 MB',
    },
  ];

  const reportCategories = ['All Reports', 'Risk Analysis', 'Trading', 'Compliance', 'Management', 'Market Analysis'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Generate and access portfolio reports and analytics</p>
        </div>
        <Button variant="primary">
          <FileText className="w-4 h-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      <div className="flex space-x-2">
        {reportCategories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              index === 0
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <Badge variant="info">{report.category}</Badge>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {report.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {report.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Last Generated:</span>
                  <span className="font-medium text-gray-700">{report.lastGenerated}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Format:</span>
                  <span className="font-medium text-gray-700">{report.format}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Size:</span>
                  <span className="font-medium text-gray-700">{report.size}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-3 h-3 mr-1" />
                  Preview
                </Button>
                <Button variant="primary" size="sm" className="flex-1">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Automatically generated reports and their schedules</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {[
              { name: 'Weekly Portfolio Summary', frequency: 'Every Monday at 9:00 AM', nextRun: '2025-12-23' },
              { name: 'Monthly Risk Assessment', frequency: 'First day of month at 8:00 AM', nextRun: '2026-01-01' },
              { name: 'Quarterly Performance Review', frequency: 'End of quarter', nextRun: '2026-03-31' },
            ].map((scheduled, index) => (
              <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{scheduled.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{scheduled.frequency}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">Next Run</p>
                  <p className="text-xs text-gray-500 mt-1">{scheduled.nextRun}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
