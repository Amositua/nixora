import React, { useState, useEffect } from 'react';
import {
  FileText,
  BarChart3,
  Search,
  Calendar,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Link } from 'react-router-dom';

import Logo from "../../assets/sa.jpeg"

export default function Landing({setCurrentScreen}) {
  const [scrolled, setScrolled] = useState(false);
  // const [currentScreen, setCurrentScreen] = useState('landing');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: FileText,
      title: "Document Processing",
      description: "Convert loan agreements into structured digital data aligned with LMA standards",
      color: "blue"
    },
    {
      icon: BarChart3,
      title: "Portfolio Analytics",
      description: "Comprehensive analysis and reporting across your entire loan portfolio",
      color: "purple"
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Natural language queries and powerful filters to find exactly what you need",
      color: "teal"
    },
    {
      icon: Calendar,
      title: "Timeline Management",
      description: "Track important dates, deadlines, and events with calendar integration",
      color: "orange"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with role-based access and comprehensive audit trails",
      color: "green"
    },
    {
      icon: Zap,
      title: "Real-Time Alerts",
      description: "Stay informed with customizable notifications for critical events",
      color: "yellow"
    },
  ];

  const benefits = [
    "Automate loan document processing and data extraction",
    "Reduce manual work by up to 80% on document review",
    "Achieve full transparency across your loan portfolio",
    "Make faster, data-driven decisions with advanced analytics",
    "Ensure compliance with LMA standards and regulations",
    "Seamlessly integrate with your existing workflows",
  ];

  const stats = [
    { value: "247+", label: "Loans Managed", icon: FileText, gradient: "from-blue-500 to-blue-600" },
    { value: "$5.3m", label: "Total Principal", icon: TrendingUp, gradient: "from-teal-500 to-teal-600" },
    { value: "98%", label: "Data Accuracy", icon: Shield, gradient: "from-purple-500 to-purple-600" },
    { value: "80%", label: "Time Saved", icon: Clock, gradient: "from-orange-500 to-orange-600" },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
      teal: "from-teal-500 to-teal-600",
      orange: "from-orange-500 to-orange-600",
      green: "from-green-500 to-green-600",
      yellow: "from-yellow-500 to-yellow-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative group">
              {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl blur-sm group-hover:blur-md transition-all"></div> */}
              {/* <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center"> */}
                            <img src={Logo} alt="Logo" className="w-8 h-8 rounded-lg" />
                
              {/* </div> */}
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Nixora</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Features</a>
            <a href="#benefits" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Benefits</a>
            <a href="#pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
            <div className="w-px h-6 bg-gray-300"></div>
            <button 
              onClick={() => setCurrentScreen("signin")}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => setCurrentScreen("signup")}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-full">
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  ✨ Digital Transformation for Lenders
                </span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 leading-tight">
                Digitize Your
                <span className="block bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 bg-clip-text text-transparent">
                  Loan Portfolio
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform loan documents into structured digital data, analyze your entire portfolio, and make faster decisions with our enterprise-grade AI-powered platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setCurrentScreen("signup")}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-900 rounded-xl font-semibold hover:border-blue-600 hover:shadow-lg transition-all duration-200">
                  Watch Demo
                </button>
              </div>
              
              {/* <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 border-2 border-white"></div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Trusted by 100+ institutions</p>
                  <p className="text-xs text-gray-600">No credit card required</p>
                </div>
              </div> */}
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-teal-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Loan Agreement</p>
                          <p className="text-xs text-gray-600">Processing...</p>
                        </div>
                      </div>
                      <div className="text-teal-600 font-semibold">98%</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {stats.slice(0, 2).map((stat, i) => (
                        <div key={i} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-xs text-gray-600">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      {[85, 92, 78].map((width, i) => (
                        <div key={i} className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-1000"
                            style={{ width: `${width}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                  <div className="relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300">
                    <Icon className="w-8 h-8 text-gray-400 mb-3" />
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-gray-900">
              Powerful Features
              <span className="block text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text">
                Built for Lenders
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage, analyze, and optimize your loan portfolio in one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(feature.color)} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                  <div className="relative">
                    <div className={`w-14 h-14 bg-gradient-to-br ${getColorClasses(feature.color)} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <a href="#" className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:text-teal-600 transition-colors">
                      Learn more
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-bold text-gray-900">
                Why Leading Lenders
                <span className="block text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text">
                  Choose Nixora
                </span>
              </h2>
              <div className="space-y-5">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform shadow-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setCurrentScreen("signup")}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                    <div className={`relative bg-gradient-to-br ${stat.gradient} rounded-2xl p-8 text-white hover:scale-105 transition-transform`}>
                      <Icon className="w-10 h-10 mb-4 opacity-80" />
                      <div className="text-4xl font-bold mb-2">{stat.value}</div>
                      <p className="text-white/80">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-teal-600 to-purple-600 rounded-3xl"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34c0-2.21 1.79-4 3.99-4S44 31.79 44 34s-1.79 4-4 4-4-1.79-4-4zm0-10c0-2.21 1.79-4 3.99-4S44 21.79 44 24s-1.79 4-4 4-4-1.79-4-4zm0-10c0-2.21 1.79-4 3.99-4S44 11.79 44 14s-1.79 4-4 4-4-1.79-4-4zM26 34c0-2.21 1.79-4 3.99-4S34 31.79 34 34s-1.79 4-4 4-4-1.79-4-4zm0-10c0-2.21 1.79-4 3.99-4S34 21.79 34 24s-1.79 4-4 4-4-1.79-4-4zm0-10c0-2.21 1.79-4 3.99-4S34 11.79 34 14s-1.79 4-4 4-4-1.79-4-4zM16 34c0-2.21 1.79-4 3.99-4S24 31.79 24 34s-1.79 4-4 4-4-1.79-4-4zm0-10c0-2.21 1.79-4 3.99-4S24 21.79 24 24s-1.79 4-4 4-4-1.79-4-4zm0-10c0-2.21 1.79-4 3.99-4S24 11.79 24 14s-1.79 4-4 4-4-1.79-4-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            <div className="relative px-12 py-20 text-center">
              <h2 className="text-5xl font-bold text-white mb-6">
                Ready to Transform Your
                <span className="block">Loan Management?</span>
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join leading financial institutions that are digitizing their loan portfolios with Nixora's AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setCurrentScreen("signup")}
                  className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-200">
                  Schedule Demo
                </button>
              </div>
              <p className="text-sm text-white/70 mt-6">
                ✓ No credit card required  ✓ 14-day free trial  ✓ Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl blur-sm"></div>
                    <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Nixora</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Enterprise AI-powered loan management platform for modern financial institutions.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Product</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li><a href="#features" className="hover:text-blue-600 transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Security</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Integrations</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li><Link to="/privacy" className="hover:text-gray-900">
  Privacy Policy
</Link></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Compliance</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                © 2025 Nixora. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                  Twitter
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}