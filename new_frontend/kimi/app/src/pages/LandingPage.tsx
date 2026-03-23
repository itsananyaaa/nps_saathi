import { useNavigate } from 'react-router-dom';
import { 
  Landmark, 
  Bot, 
  TrendingUp, 
  Calculator, 
  Shield, 
  Globe, 
  Mic,
  ArrowRight,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: 'AI-Powered Guidance',
      description: 'Get personalized pension advice from our intelligent assistant trained on Indian pension regulations.',
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: 'Monte Carlo Simulator',
      description: 'Simulate retirement outcomes under market uncertainty with advanced probability modeling.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Retirement Forecasting',
      description: 'Calculate deterministic projections for your retirement corpus and monthly pension.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Investment Advice',
      description: 'Receive personalized asset allocation recommendations based on your risk profile.',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Multilingual Support',
      description: 'Access pension guidance in 9 Indian languages including Hindi, Tamil, and Bengali.',
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: 'Voice Interaction',
      description: 'Ask questions using voice input powered by Bhashini speech recognition.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up with your basic details to get started.',
    },
    {
      number: '02',
      title: 'Set Your Profile',
      description: 'Enter your age, income, and retirement goals.',
    },
    {
      number: '03',
      title: 'Get Insights',
      description: 'Receive AI-powered recommendations and forecasts.',
    },
    {
      number: '04',
      title: 'Plan & Act',
      description: 'Make informed decisions for a secure retirement.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Landmark className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">NPS Saathi</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block py-2 text-gray-600">Features</a>
              <a href="#how-it-works" className="block py-2 text-gray-600">How it Works</a>
              <a href="#about" className="block py-2 text-gray-600">About</a>
              <hr />
              <Button variant="ghost" className="w-full" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button className="w-full" onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                AI-Powered Pension Advisory
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Plan Your Retirement with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Confidence
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                NPS Saathi helps you navigate the National Pension System with AI-driven insights, 
                simulations, and personalized recommendations for a secure future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => navigate('/register')} className="text-lg">
                  Start Planning Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                  Already a Member? Sign In
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Free to use
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  No registration required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Secure & Private
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8">
                {/* Mock Dashboard Preview */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Landmark className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">NPS Saathi</p>
                      <p className="text-xs text-gray-500">Dashboard</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Contribution</p>
                      <p className="font-bold text-blue-700">₹15,000</p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Corpus</p>
                      <p className="font-bold text-emerald-700">₹1.25Cr</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Pension</p>
                      <p className="font-bold text-amber-700">₹52,000</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-purple-600" />
                      <p className="text-sm font-medium">AI Insight</p>
                    </div>
                    <p className="text-xs text-gray-600">
                      Increase equity exposure by 10% for better long-term growth...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Retirement Planning
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and AI-powered insights to help you make informed decisions 
              about your pension and retirement savings.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How NPS Saathi Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and take control of your retirement planning journey.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Secure Your Future?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of Indians who are planning their retirement with NPS Saathi.
            It&apos;s free, secure, and takes just a few minutes to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={() => navigate('/register')}
              className="text-lg"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="text-lg border-white text-white hover:bg-white/10"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Landmark className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">NPS Saathi</span>
              </div>
              <p className="text-sm">
                AI-powered pension advisory platform helping Indians plan for a secure retirement.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">AI Assistant</a></li>
                <li><a href="#" className="hover:text-white">Simulator</a></li>
                <li><a href="#" className="hover:text-white">Forecast</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Policy Knowledge</a></li>
                <li><a href="#" className="hover:text-white">NPS Guide</a></li>
                <li><a href="#" className="hover:text-white">Tax Benefits</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>&copy; 2024 NPS Saathi. All rights reserved. Not affiliated with PFRDA or NPS Trust.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
