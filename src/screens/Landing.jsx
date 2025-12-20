import { FileText, BarChart3, Search, Calendar, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Landing({ setCurrentScreen }) {
  const features = [
    {
      icon: FileText,
      title: 'Document Processing',
      description: 'Convert loan agreements into structured digital data aligned with LMA standards',
    },
    {
      icon: BarChart3,
      title: 'Portfolio Analytics',
      description: 'Comprehensive analysis and reporting across your entire loan portfolio',
    },
    {
      icon: Search,
      title: 'Advanced Search',
      description: 'Natural language queries and powerful filters to find exactly what you need',
    },
    {
      icon: Calendar,
      title: 'Timeline Management',
      description: 'Track important dates, deadlines, and events with calendar integration',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with role-based access and comprehensive audit trails',
    },
    {
      icon: Zap,
      title: 'Real-Time Alerts',
      description: 'Stay informed with customizable notifications for critical events',
    },
  ];

  const benefits = [
    'Automate loan document processing and data extraction',
    'Reduce manual work by up to 80% on document review',
    'Achieve full transparency across your loan portfolio',
    'Make faster, data-driven decisions with advanced analytics',
    'Ensure compliance with LMA standards and regulations',
    'Seamlessly integrate with your existing workflows',
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">LoanHub</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              About
            </button>
            <div className="w-px h-6 bg-gray-200"></div>
            <Button variant="outline" size="sm" onClick={() => setCurrentScreen('signin')}>
              Sign In
            </Button>
            <Button variant="primary" size="sm" onClick={() => setCurrentScreen('signup')}>
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <section className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
                <span className="text-sm font-medium text-blue-700">Digital Transformation</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Digitize Your Loan Portfolio
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Convert loan documents into structured digital data, analyze your entire portfolio, and make faster decisions with LoanHub's enterprise-grade platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" onClick={() => setCurrentScreen('signup')} className="flex items-center justify-center">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                No credit card required. Start processing documents in minutes.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl border border-blue-200 p-8 shadow-xl">
                  <div className="space-y-4">
                    <div className="h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg opacity-10"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 bg-blue-500/5 rounded-lg border border-blue-200/50"></div>
                      <div className="h-32 bg-teal-500/5 rounded-lg border border-teal-200/50"></div>
                    </div>
                    <div className="h-16 bg-gradient-to-r from-blue-500/5 to-teal-500/5 rounded-lg border border-blue-200/50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features Built for Lenders
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage, analyze, and optimize your loan portfolio in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose LoanHub?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
                <div className="text-4xl font-bold mb-2">247</div>
                <p className="text-blue-100">Loans Managed</p>
              </div>
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-white">
                <div className="text-4xl font-bold mb-2">$4.2B</div>
                <p className="text-teal-100">Total Principal</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-4xl font-bold mb-2">98%</div>
                <p className="text-purple-100">Data Accuracy</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
                <div className="text-4xl font-bold mb-2">80%</div>
                <p className="text-orange-100">Time Saved</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200">
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl border border-blue-200 p-12 sm:p-20 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Loan Management?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join leading financial institutions that are digitizing their loan portfolios with LoanHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={() => setCurrentScreen('signup')} className="flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-200 bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">LoanHub</span>
                </div>
                <p className="text-sm text-gray-600">
                  Enterprise loan management platform for financial professionals.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-gray-900">Features</a></li>
                  <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                  <li><a href="#" className="hover:text-gray-900">Security</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-gray-900">About</a></li>
                  <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                  <li><a href="#" className="hover:text-gray-900">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
                  <li><a href="#" className="hover:text-gray-900">Terms</a></li>
                  <li><a href="#" className="hover:text-gray-900">Compliance</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-8 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                © 2025 LoanHub. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Twitter</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
