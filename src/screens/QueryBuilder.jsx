import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Search, Plus, Save, Play, TrendingUp, BarChart3 } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function QueryBuilder() {
  const [queryMode, setQueryMode] = useState('natural');

  const savedQueries = [
    { id: 1, name: 'Loans Maturing in 12 Months', results: 34, lastRun: '2025-12-18' },
    { id: 2, name: 'SOFR-Based Loans Over $100M', results: 28, lastRun: '2025-12-17' },
    { id: 3, name: 'Transfer-Eligible with No Consent', results: 67, lastRun: '2025-12-16' },
    { id: 4, name: 'High Margin Loans (>3.5%)', results: 19, lastRun: '2025-12-15' },
  ];

  const queryResults = [
    {
      loanName: 'ABC Corp Senior Credit Facility',
      borrower: 'ABC Corporation Limited',
      principal: 'USD 500.0M',
      maturityDate: '2029-12-31',
      daysToMaturity: 1474,
    },
    {
      loanName: 'XYZ Limited Term Loan B',
      borrower: 'XYZ Limited',
      principal: 'USD 350.0M',
      maturityDate: '2028-06-30',
      daysToMaturity: 919,
    },
    {
      loanName: 'Global Ventures RCF',
      borrower: 'Global Ventures PLC',
      principal: 'GBP 200.0M',
      maturityDate: '2027-03-15',
      daysToMaturity: 452,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Search & Queries</h1>
        <p className="text-sm text-gray-500 mt-1">Build custom queries to analyze your loan portfolio</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Query Builder</CardTitle>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQueryMode('natural')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  queryMode === 'natural'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Natural Language
              </button>
              <button
                onClick={() => setQueryMode('advanced')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  queryMode === 'advanced'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Advanced Filters
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {queryMode === 'natural' ? (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g., Show loans maturing in the next 12 months with SOFR benchmark"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Try:</span>
                  <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                    Loans over $100M
                  </button>
                  <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                    Transfer-eligible loans
                  </button>
                  <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                    SONIA-based facilities
                  </button>
                </div>
                <Button variant="primary">
                  <Play className="w-4 h-4 mr-2" />
                  Run Query
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maturity Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500 self-center">to</span>
                    <input
                      type="date"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Benchmark Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Benchmarks</option>
                    <option>SOFR</option>
                    <option>SONIA</option>
                    <option>EURIBOR</option>
                    <option>HIBOR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Principal Amount Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500 self-center">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transfer Eligibility
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Loans</option>
                    <option>Transfer Eligible</option>
                    <option>Transfer Restricted</option>
                    <option>Consent Required</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Filter
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    Clear All
                  </Button>
                  <Button variant="primary">
                    <Play className="w-4 h-4 mr-2" />
                    Run Query
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Query Results</CardTitle>
                <p className="text-sm text-gray-500 mt-1">3 loans match your criteria</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Query
                </Button>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-y border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loan Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Borrower
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Principal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Maturity
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {queryResults.map((loan, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{loan.loanName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{loan.borrower}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{loan.principal}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-gray-900">{loan.maturityDate}</p>
                          <p className="text-xs text-gray-500">{loan.daysToMaturity} days</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saved Queries</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Quick access to your saved searches</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {savedQueries.map((query) => (
                <div key={query.id} className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{query.name}</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <p className="text-xs text-gray-500">
                          {query.results} results
                        </p>
                        <span className="text-xs text-gray-400">•</span>
                        <p className="text-xs text-gray-500">
                          Last run {query.lastRun}
                        </p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Results by Benchmark</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">SOFR</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">2</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">SONIA</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">1</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Exposure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-semibold text-gray-900">$1.05B</p>
                <p className="text-sm text-gray-500 mt-1">Combined principal amount</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
