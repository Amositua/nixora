import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Bell, AlertTriangle, CheckCircle, Info, Clock, Settings as SettingsIcon, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'error',
      title: 'Urgent: Covenant Test Due Tomorrow',
      message: 'XYZ Limited Term Loan B has a financial covenant test due on 2025-12-19.',
      loan: 'XYZ Limited Term Loan B',
      time: '2 hours ago',
      read: false,
      details: {
        amount: '$850,000',
        clause: '19.3',
        page: 68,
      },
    },
    {
      id: 2,
      type: 'warning',
      title: 'Interest Payment Due in 7 Days',
      message: 'ABC Corp Senior Credit Facility has an interest payment due on 2025-12-25.',
      loan: 'ABC Corp Senior Credit Facility',
      time: '5 hours ago',
      read: false,
      details: {
        amount: '$1,250,000',
        clause: '8.5',
        page: 25,
      },
    },
    {
      id: 3,
      type: 'info',
      title: 'New Document Extracted',
      message: 'The loan document "Global_RCF_Amendment_3.pdf" has been successfully processed and extracted.',
      loan: 'Global Ventures RCF',
      time: '1 day ago',
      read: false,
      details: null,
    },
    {
      id: 4,
      type: 'warning',
      title: 'Loan Matures in 90 Days',
      message: 'TechStart Acquisition Facility will mature on 2026-03-18.',
      loan: 'TechStart Acquisition Facility',
      time: '1 day ago',
      read: true,
      details: {
        amount: '$3,500,000',
        clause: '9.1',
        page: 28,
      },
    },
    {
      id: 5,
      type: 'success',
      title: 'Payment Processed Successfully',
      message: 'Interest payment for Manufacturing Bridge Loan has been processed.',
      loan: 'Manufacturing Bridge Loan',
      time: '2 days ago',
      read: true,
      details: {
        amount: '$437,500',
        clause: '8.5',
        page: 25,
      },
    },
    {
      id: 6,
      type: 'info',
      title: 'Reporting Deadline Reminder',
      message: 'Quarterly reporting deadline for Global Ventures RCF is approaching on 2025-12-28.',
      loan: 'Global Ventures RCF',
      time: '2 days ago',
      read: true,
      details: {
        clause: '17.1',
        page: 54,
      },
    },
    {
      id: 7,
      type: 'warning',
      title: 'Covenant Ratio Alert',
      message: 'Real Estate Development Credit is approaching covenant threshold.',
      loan: 'Real Estate Development Credit',
      time: '3 days ago',
      read: true,
      details: {
        clause: '19.5',
        page: 72,
      },
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'error':
        return AlertTriangle;
      case 'warning':
        return Clock;
      case 'success':
        return CheckCircle;
      case 'info':
        return Info;
      default:
        return Bell;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-red-600 bg-red-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'info':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getBadgeVariant = (type) => {
    switch (type) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'success':
        return 'success';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">
            Stay updated on important loan events and deadlines
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <SettingsIcon className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline">
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Unread</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">{unreadCount}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Urgent</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">
                  {notifications.filter(n => n.type === 'error').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">This Week</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">
                  {notifications.filter(n => n.time.includes('hour') || n.time.includes('day')).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Notifications</CardTitle>
            <div className="flex items-center space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Types</option>
                <option>Urgent</option>
                <option>Warnings</option>
                <option>Info</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => {
              const Icon = getIcon(notification.type);
              const iconColor = getIconColor(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`px-6 py-5 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className="text-xs text-gray-500">{notification.time}</span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center space-x-3">
                        <Badge variant="default">{notification.loan}</Badge>
                        {notification.details && (
                          <>
                            {notification.details.amount && (
                              <span className="text-xs text-gray-500">
                                Amount: {notification.details.amount}
                              </span>
                            )}
                            {notification.details.clause && (
                              <button className="text-xs text-blue-600 hover:text-blue-700">
                                Clause {notification.details.clause}, Page {notification.details.page}
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Manage how you receive notifications</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-900">Payment Due Alerts</p>
                <p className="text-xs text-gray-500 mt-1">Get notified 7 days before payments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-900">Covenant Test Reminders</p>
                <p className="text-xs text-gray-500 mt-1">Get notified about upcoming covenant tests</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-900">Maturity Warnings</p>
                <p className="text-xs text-gray-500 mt-1">Get notified 90 days before loan maturity</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-gray-900">Document Processing Updates</p>
                <p className="text-xs text-gray-500 mt-1">Get notified when documents are processed</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
