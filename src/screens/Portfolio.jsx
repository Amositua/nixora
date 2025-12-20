import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Filter, Download, Eye, ChevronDown, ArrowUpDown } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Portfolio() {
  const [sortField, setSortField] = useState('loanName');
  const [sortDirection, setSortDirection] = useState('asc');

  const loans = [
    {
      id: 1,
      loanName: 'ABC Corp Senior Credit Facility',
      borrower: 'ABC Corporation Limited',
      principal: 500000000,
      currency: 'USD',
      benchmark: 'SOFR',
      margin: 2.75,
      maturityDate: '2029-12-31',
      transferEligible: true,
      consentRequired: false,
    },
    {
      id: 2,
      loanName: 'XYZ Limited Term Loan B',
      borrower: 'XYZ Limited',
      principal: 350000000,
      currency: 'USD',
      benchmark: 'SOFR',
      margin: 3.25,
      maturityDate: '2028-06-30',
      transferEligible: true,
      consentRequired: true,
    },
    {
      id: 3,
      loanName: 'Global Ventures RCF',
      borrower: 'Global Ventures PLC',
      principal: 200000000,
      currency: 'GBP',
      benchmark: 'SONIA',
      margin: 2.50,
      maturityDate: '2027-03-15',
      transferEligible: true,
      consentRequired: false,
    },
    {
      id: 4,
      loanName: 'TechStart Acquisition Facility',
      borrower: 'TechStart Inc',
      principal: 450000000,
      currency: 'USD',
      benchmark: 'SOFR',
      margin: 4.00,
      maturityDate: '2026-03-18',
      transferEligible: false,
      consentRequired: true,
    },
    {
      id: 5,
      loanName: 'Manufacturing Bridge Loan',
      borrower: 'Industrial Manufacturing Co',
      principal: 125000000,
      currency: 'EUR',
      benchmark: 'EURIBOR',
      margin: 3.50,
      maturityDate: '2026-09-30',
      transferEligible: true,
      consentRequired: false,
    },
    {
      id: 6,
      loanName: 'Real Estate Development Credit',
      borrower: 'Property Developers Ltd',
      principal: 280000000,
      currency: 'USD',
      benchmark: 'SOFR',
      margin: 3.75,
      maturityDate: '2030-12-31',
      transferEligible: true,
      consentRequired: true,
    },
    {
      id: 7,
      loanName: 'Energy Sector Term Facility',
      borrower: 'Green Energy Solutions',
      principal: 600000000,
      currency: 'USD',
      benchmark: 'SOFR',
      margin: 2.25,
      maturityDate: '2031-06-15',
      transferEligible: true,
      consentRequired: false,
    },
    {
      id: 8,
      loanName: 'Healthcare Acquisition Loan',
      borrower: 'MedTech Holdings',
      principal: 175000000,
      currency: 'USD',
      benchmark: 'SOFR',
      margin: 3.00,
      maturityDate: '2027-11-30',
      transferEligible: false,
      consentRequired: true,
    },
  ];

  const formatCurrency = (amount, currency) => {
    const formatted = (amount / 1000000).toFixed(1);
    return `${currency} ${formatted}M`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getDaysToMaturity = (dateString) => {
    const today = new Date();
    const maturity = new Date(dateString);
    const days = Math.floor((maturity - today) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Loan Portfolio</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track your loan portfolio</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="primary">
            Add Loan
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show:</span>
                <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Loans</option>
                  <option>Transfer Eligible</option>
                  <option>Maturing Soon</option>
                  <option>High Risk</option>
                </select>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium text-gray-900">{loans.length}</span> loans
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-y border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700">
                      <span>Loan Name</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700">
                      <span>Borrower</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700">
                      <span>Principal</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700">
                      <span>Benchmark</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700">
                      <span>Margin</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700">
                      <span>Maturity</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700">
                      <span>Transfer</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loans.map((loan) => {
                  const daysToMaturity = getDaysToMaturity(loan.maturityDate);
                  const isMaturingSoon = daysToMaturity < 365;

                  return (
                    <tr key={loan.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{loan.loanName}</p>
                          <p className="text-xs text-gray-500 mt-0.5">ID: LN-{loan.id.toString().padStart(6, '0')}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{loan.borrower}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(loan.principal, loan.currency)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="info">{loan.benchmark}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{loan.margin}%</p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-gray-900">{formatDate(loan.maturityDate)}</p>
                          {isMaturingSoon && (
                            <p className="text-xs text-yellow-600 font-medium mt-0.5">
                              {daysToMaturity} days
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {loan.transferEligible ? (
                          <div>
                            <Badge variant="success">Eligible</Badge>
                            {loan.consentRequired && (
                              <p className="text-xs text-gray-500 mt-1">Consent Required</p>
                            )}
                          </div>
                        ) : (
                          <Badge variant="error">Restricted</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing 1 to {loans.length} of {loans.length} results
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
