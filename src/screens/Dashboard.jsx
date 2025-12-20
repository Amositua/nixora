import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { TrendingUp, DollarSign, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';
import Badge from '../components/ui/Badge';

export default function Dashboard() {
  const overviewCards = [
    {
      title: 'Total Loans',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      color: 'blue',
    },
    {
      title: 'Total Outstanding Principal',
      value: '$4.2B',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'teal',
    },
    {
      title: 'Maturing in 12 Months',
      value: '34',
      change: '14%',
      trend: 'neutral',
      icon: Calendar,
      color: 'yellow',
    },
    {
      title: 'Transfer-Eligible Loans',
      value: '189',
      change: '76%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green',
    },
  ];

  const maturityData = [
    { period: '0-3M', count: 12, value: 340 },
    { period: '3-6M', count: 18, value: 520 },
    { period: '6-12M', count: 24, value: 680 },
    { period: '1-2Y', count: 48, value: 1100 },
    { period: '2-3Y', count: 67, value: 980 },
    { period: '3-5Y', count: 78, value: 580 },
  ];

  const benchmarkData = [
    { name: 'SOFR', percentage: 45, loans: 112, color: 'blue' },
    { name: 'SONIA', percentage: 28, loans: 69, color: 'teal' },
    { name: 'EURIBOR', percentage: 18, loans: 44, color: 'purple' },
    { name: 'HIBOR', percentage: 9, loans: 22, color: 'green' },
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Interest Payment Due',
      loan: 'ABC Corp Senior Credit Facility',
      date: '2025-12-25',
      amount: '$1.2M',
    },
    {
      id: 2,
      type: 'error',
      title: 'Covenant Test Due Tomorrow',
      loan: 'XYZ Limited Term Loan B',
      date: '2025-12-19',
      amount: '$850K',
    },
    {
      id: 3,
      type: 'info',
      title: 'Reporting Deadline',
      loan: 'Global Ventures RCF',
      date: '2025-12-28',
      amount: '$500K',
    },
    {
      id: 4,
      type: 'warning',
      title: 'Loan Matures in 90 Days',
      loan: 'TechStart Acquisition Facility',
      date: '2026-03-18',
      amount: '$3.5M',
    },
  ];

  const maxValue = Math.max(...maturityData.map(d => d.value));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your loan portfolio and key metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardContent className="py-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{card.title}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-2">{card.value}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className={`font-medium ${card.trend === 'up' ? 'text-green-600' : 'text-gray-600'}`}>
                        {card.change}
                      </span>
                      {' '}from last quarter
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-${card.color}-50`}>
                    <Icon className={`w-6 h-6 text-${card.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Maturity Distribution</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Outstanding principal by maturity period</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maturityData.map((item) => (
                <div key={item.period}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{item.period}</span>
                    <span className="text-sm text-gray-900 font-semibold">${item.value}M</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all"
                        style={{ width: `${(item.value / maxValue) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 w-12 text-right">{item.count} loans</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benchmark Breakdown</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Distribution by interest rate benchmark</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {benchmarkData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div className="w-32">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.loans} loans</p>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-${item.color}-500 h-2 rounded-full transition-all`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <p className="text-sm font-semibold text-gray-900">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts & Notifications</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Important upcoming events and deadlines</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {alert.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                      {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                      {alert.type === 'info' && <Calendar className="w-5 h-5 text-blue-500" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                        <Badge variant={alert.type}>
                          {alert.type === 'error' ? 'Urgent' : alert.type === 'warning' ? 'Important' : 'Info'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{alert.loan}</p>
                      <p className="text-xs text-gray-500 mt-1">Due: {alert.date} • Amount: {alert.amount}</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
