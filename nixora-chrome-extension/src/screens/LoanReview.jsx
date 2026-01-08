import { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { FileText, AlertCircle, CheckCircle, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function LoanReview() {
  const [selectedField, setSelectedField] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const loanData = {
    borrower: { value: 'ABC Corporation Limited', confidence: 98, clause: '1.1', page: 3 },
    facilityType: { value: 'Senior Secured Term Loan B', confidence: 95, clause: '2.1', page: 5 },
    principal: { value: '500,000,000', confidence: 99, clause: '2.2', page: 6 },
    currency: { value: 'USD', confidence: 100, clause: '2.2', page: 6 },
    benchmark: { value: 'SOFR', confidence: 92, clause: '8.3', page: 24 },
    margin: { value: '2.75', confidence: 97, clause: '8.3', page: 24 },
    paymentFrequency: { value: 'Quarterly', confidence: 94, clause: '8.5', page: 25 },
    maturityDate: { value: '2029-12-31', confidence: 96, clause: '9.1', page: 28 },
    transferRestrictions: { value: 'Requires Borrower Consent', confidence: 88, clause: '24.3', page: 87 },
  };

  const eventsOfDefault = [
    { title: 'Non-Payment', clause: '23.1', page: 82, confidence: 96 },
    { title: 'Breach of Representation', clause: '23.2', page: 83, confidence: 94 },
    { title: 'Cross-Default', clause: '23.4', page: 84, confidence: 91 },
    { title: 'Insolvency', clause: '23.7', page: 85, confidence: 98 },
  ];

  const getConfidenceColor = (confidence) => {
    if (confidence >= 95) return 'text-green-600';
    if (confidence >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBadge = (confidence) => {
    if (confidence >= 95) return 'success';
    if (confidence >= 85) return 'warning';
    return 'error';
  };

  return (
    <div className="h-full flex">
      <div className="flex-1 overflow-y-auto border-r border-gray-200 bg-gray-50">
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Digital Loan Review</h1>
            <p className="text-sm text-gray-500 mt-1">Review and verify extracted loan data</p>
            <div className="flex items-center space-x-2 mt-3">
              <Badge variant="info">ABC_Corp_Credit_Agreement_2024.pdf</Badge>
              <Badge variant="default">156 pages</Badge>
            </div>
          </div>

          <Card>
            <CardContent className="py-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedField === 'borrower'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    onClick={() => setSelectedField('borrower')}
                  >
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Borrower
                    </label>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {loanData.borrower.value}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <button className="flex items-center text-xs text-blue-600 hover:text-blue-700">
                        <MapPin className="w-3 h-3 mr-1" />
                        Clause {loanData.borrower.clause}, Page {loanData.borrower.page}
                      </button>
                      <Badge variant={getConfidenceBadge(loanData.borrower.confidence)}>
                        {loanData.borrower.confidence}%
                      </Badge>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedField === 'facilityType'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    onClick={() => setSelectedField('facilityType')}
                  >
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Facility Type
                    </label>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {loanData.facilityType.value}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <button className="flex items-center text-xs text-blue-600 hover:text-blue-700">
                        <MapPin className="w-3 h-3 mr-1" />
                        Clause {loanData.facilityType.clause}, Page {loanData.facilityType.page}
                      </button>
                      <Badge variant={getConfidenceBadge(loanData.facilityType.confidence)}>
                        {loanData.facilityType.confidence}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Financial Terms
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedField === 'principal'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    onClick={() => setSelectedField('principal')}
                  >
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Principal Amount
                    </label>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {loanData.currency.value} {loanData.principal.value}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <button className="flex items-center text-xs text-blue-600 hover:text-blue-700">
                        <MapPin className="w-3 h-3 mr-1" />
                        Clause {loanData.principal.clause}, Page {loanData.principal.page}
                      </button>
                      <Badge variant={getConfidenceBadge(loanData.principal.confidence)}>
                        {loanData.principal.confidence}%
                      </Badge>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedField === 'benchmark'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    onClick={() => setSelectedField('benchmark')}
                  >
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Benchmark Rate
                    </label>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {loanData.benchmark.value} + {loanData.margin.value}%
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <button className="flex items-center text-xs text-blue-600 hover:text-blue-700">
                        <MapPin className="w-3 h-3 mr-1" />
                        Clause {loanData.benchmark.clause}, Page {loanData.benchmark.page}
                      </button>
                      <Badge variant={getConfidenceBadge(loanData.benchmark.confidence)}>
                        {loanData.benchmark.confidence}%
                      </Badge>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedField === 'paymentFrequency'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    onClick={() => setSelectedField('paymentFrequency')}
                  >
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Payment Frequency
                    </label>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {loanData.paymentFrequency.value}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <button className="flex items-center text-xs text-blue-600 hover:text-blue-700">
                        <MapPin className="w-3 h-3 mr-1" />
                        Clause {loanData.paymentFrequency.clause}, Page {loanData.paymentFrequency.page}
                      </button>
                      <Badge variant={getConfidenceBadge(loanData.paymentFrequency.confidence)}>
                        {loanData.paymentFrequency.confidence}%
                      </Badge>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedField === 'maturityDate'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    onClick={() => setSelectedField('maturityDate')}
                  >
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Maturity Date
                    </label>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {loanData.maturityDate.value}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <button className="flex items-center text-xs text-blue-600 hover:text-blue-700">
                        <MapPin className="w-3 h-3 mr-1" />
                        Clause {loanData.maturityDate.clause}, Page {loanData.maturityDate.page}
                      </button>
                      <Badge variant={getConfidenceBadge(loanData.maturityDate.confidence)}>
                        {loanData.maturityDate.confidence}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Transfer & Restrictions
                </h3>
                <div
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedField === 'transferRestrictions'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => setSelectedField('transferRestrictions')}
                >
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Transfer Restrictions
                  </label>
                  <p className="text-base font-medium text-gray-900 mt-1">
                    {loanData.transferRestrictions.value}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <button className="flex items-center text-xs text-blue-600 hover:text-blue-700">
                      <MapPin className="w-3 h-3 mr-1" />
                      Clause {loanData.transferRestrictions.clause}, Page {loanData.transferRestrictions.page}
                    </button>
                    <Badge variant={getConfidenceBadge(loanData.transferRestrictions.confidence)}>
                      {loanData.transferRestrictions.confidence}%
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Events of Default
                </h3>
                <div className="space-y-3">
                  {eventsOfDefault.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{event.title}</p>
                          <p className="text-xs text-gray-500">
                            Clause {event.clause}, Page {event.page}
                          </p>
                        </div>
                      </div>
                      <Badge variant={getConfidenceBadge(event.confidence)}>
                        {event.confidence}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Button variant="outline">
              Save as Draft
            </Button>
            <div className="flex space-x-3">
              <Button variant="outline">
                Reject
              </Button>
              <Button variant="success">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve & Add to Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 bg-gray-100 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Source Document</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Page {currentPage} of 156</span>
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                  Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.min(156, currentPage + 1))}>
                  Next
                </Button>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="aspect-[8.5/11] bg-white border border-gray-300 rounded-lg overflow-hidden">
                <div className="w-full h-full p-8 text-sm text-gray-700 font-mono leading-relaxed">
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="font-bold text-lg mb-2">CREDIT AGREEMENT</h3>
                      <p className="text-xs text-gray-500">Dated as of December 15, 2024</p>
                    </div>

                    <div className={`p-3 rounded ${selectedField === 'borrower' ? 'bg-yellow-100 ring-2 ring-yellow-400' : ''}`}>
                      <p className="font-semibold mb-1">1.1 PARTIES</p>
                      <p>This Credit Agreement is entered into between <span className="font-semibold">ABC Corporation Limited</span> (the "Borrower"), a corporation organized under the laws of Delaware...</p>
                    </div>

                    <div className={`p-3 rounded ${selectedField === 'facilityType' ? 'bg-yellow-100 ring-2 ring-yellow-400' : ''}`}>
                      <p className="font-semibold mb-1">2.1 FACILITY TYPE</p>
                      <p>The Lenders agree to provide a <span className="font-semibold">Senior Secured Term Loan B</span> facility to the Borrower on the terms and conditions set forth herein...</p>
                    </div>

                    <div className={`p-3 rounded ${selectedField === 'principal' ? 'bg-yellow-100 ring-2 ring-yellow-400' : ''}`}>
                      <p className="font-semibold mb-1">2.2 PRINCIPAL AMOUNT</p>
                      <p>The aggregate principal amount of the Term Loan shall not exceed <span className="font-semibold">Five Hundred Million United States Dollars (USD 500,000,000)</span>...</p>
                    </div>

                    <p className="text-xs text-gray-400 mt-8 text-center">
                      {selectedField ? 'Highlighted clause shown above' : 'Click on a field to view its source in the document'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
