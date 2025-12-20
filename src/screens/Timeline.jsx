import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Calendar, DollarSign, AlertTriangle, FileText, LayoutGrid, List, ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Timeline() {
  const [viewMode, setViewMode] = useState('timeline');
  const [showSyncModal, setShowSyncModal] = useState(false);

  const events = [
    {
      id: 1,
      type: 'payment',
      title: 'Interest Payment Due',
      loan: 'ABC Corp Senior Credit Facility',
      date: '2025-12-25',
      amount: '$1,250,000',
      clause: '8.5',
      page: 25,
      status: 'upcoming',
    },
    {
      id: 2,
      type: 'covenant',
      title: 'Covenant Test Due',
      loan: 'XYZ Limited Term Loan B',
      date: '2025-12-19',
      amount: '$850,000',
      clause: '19.3',
      page: 68,
      status: 'urgent',
    },
    {
      id: 3,
      type: 'reporting',
      title: 'Quarterly Reporting Deadline',
      loan: 'Global Ventures RCF',
      date: '2025-12-28',
      amount: '$500,000',
      clause: '17.1',
      page: 54,
      status: 'upcoming',
    },
    {
      id: 4,
      type: 'maturity',
      title: 'Loan Maturity',
      loan: 'TechStart Acquisition Facility',
      date: '2026-03-18',
      amount: '$3,500,000',
      clause: '9.1',
      page: 28,
      status: 'future',
    },
    {
      id: 5,
      type: 'payment',
      title: 'Principal Repayment',
      loan: 'Manufacturing Bridge Loan',
      date: '2026-01-15',
      amount: '$2,100,000',
      clause: '8.2',
      page: 22,
      status: 'future',
    },
    {
      id: 6,
      type: 'covenant',
      title: 'Financial Covenant Test',
      loan: 'Real Estate Development Credit',
      date: '2026-01-31',
      amount: null,
      clause: '19.5',
      page: 72,
      status: 'future',
    },
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'payment':
        return DollarSign;
      case 'covenant':
        return AlertTriangle;
      case 'reporting':
        return FileText;
      case 'maturity':
        return Calendar;
      default:
        return Calendar;
    }
  };

  const getEventColor = (status) => {
    switch (status) {
      case 'urgent':
        return 'red';
      case 'upcoming':
        return 'yellow';
      case 'future':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const days = Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days < 0) return `${Math.abs(days)} days ago`;
    return `in ${days} days`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Loan Timelines</h1>
          <p className="text-sm text-gray-500 mt-1">Track important dates and deadlines across your portfolio</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'timeline' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              <List className="w-4 h-4 inline mr-1" />
              Timeline
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              <LayoutGrid className="w-4 h-4 inline mr-1" />
              Calendar
            </button>
          </div>
          <Button variant="primary" onClick={() => setShowSyncModal(true)}>
            <Calendar className="w-4 h-4 mr-2" />
            Sync to Calendar
          </Button>
        </div>
      </div>

      {viewMode === 'timeline' ? (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {events.map((event) => {
                const EventIcon = getEventIcon(event.type);
                const color = getEventColor(event.status);
                return (
                  <div key={event.id} className="px-6 py-5 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-${color}-50 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <EventIcon className={`w-6 h-6 text-${color}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-base font-semibold text-gray-900">{event.title}</h3>
                              <Badge variant={event.status === 'urgent' ? 'error' : event.status === 'upcoming' ? 'warning' : 'info'}>
                                {getDaysUntil(event.date)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{event.loan}</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-sm font-medium text-gray-900">{formatDate(event.date)}</p>
                            {event.amount && (
                              <p className="text-sm text-gray-600 mt-1">{event.amount}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-3">
                          <button className="flex items-center text-xs text-blue-600 hover:text-blue-700">
                            <FileText className="w-3 h-3 mr-1" />
                            Clause {event.clause}, Page {event.page}
                          </button>
                          <button className="text-xs text-blue-600 hover:text-blue-700">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>December 2025</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600 pb-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => {
                const dayEvents = events.filter(e => {
                  const eventDate = new Date(e.date);
                  return eventDate.getDate() === i + 1 && eventDate.getMonth() === 11;
                });
                return (
                  <div
                    key={i}
                    className={`aspect-square border border-gray-200 rounded-lg p-2 ${
                      dayEvents.length > 0 ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
                    } transition-colors cursor-pointer`}
                  >
                    <p className="text-sm font-medium text-gray-900">{i + 1}</p>
                    {dayEvents.length > 0 && (
                      <div className="mt-1 space-y-1">
                        {dayEvents.map((event, idx) => (
                          <div
                            key={idx}
                            className={`text-xs px-1 py-0.5 rounded bg-${getEventColor(event.status)}-100 text-${getEventColor(event.status)}-700 truncate`}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Upcoming Payments', count: 12, color: 'blue' },
          { label: 'Covenant Tests', count: 5, color: 'yellow' },
          { label: 'Reporting Deadlines', count: 8, color: 'teal' },
          { label: 'Maturities (12M)', count: 34, color: 'purple' },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="py-6">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className={`text-3xl font-semibold text-${stat.color}-600 mt-2`}>{stat.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {showSyncModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Sync to Google Calendar</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Export loan events to your calendar</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900 font-medium mb-2">Events to Sync</p>
                  <div className="space-y-2">
                    {events.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center justify-between text-sm">
                        <span className="text-blue-700">{event.title}</span>
                        <span className="text-blue-600 font-medium">{event.date}</span>
                      </div>
                    ))}
                    <p className="text-xs text-blue-700 mt-2">+ 3 more events</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Include clause references in event description</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Set reminders 7 days before event</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Include amount in event title</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setShowSyncModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Sync to Calendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
