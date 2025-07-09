import React from 'react';
import { 
  CheckCircle, 
  Users, 
  Calendar, 
  BarChart3, 
  ArrowRight, 
  Star,
  Zap,
  Shield,
} from 'lucide-react';

import { SigninButton } from './auth/signin-button';

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Smart Task Organization",
      description: "Organize tasks with priorities, labels, and custom workflows that adapt to your team's needs."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Assign tasks, track progress, and collaborate seamlessly with your team members."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Deadline Management",
      description: "Never miss a deadline with intelligent scheduling and automated reminders."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Progress Analytics",
      description: "Get insights into team productivity and project progress with detailed analytics."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content: "Real Flow transformed how our team manages projects. The intuitive interface and powerful features make task management effortless.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Engineering Lead",
      company: "StartupXYZ",
      content: "The best task management tool we've used. Clean, fast, and exactly what our development team needed.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Director",
      company: "GrowthCo",
      content: "Real Flow's analytics help us identify bottlenecks and optimize our workflow. Highly recommended!",
      rating: 5
    }
  ];

  const stats = [
    { id:"1" ,number: "10K+", label: "Active Users" },
    { id:"2", number: "50K+", label: "Tasks Completed" },
    {id:"3", number: "99.9%", label: "Uptime" },
    { id:"4",number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b border-neutral-200 z-50 flex justify-center">
        <div className="w-full  px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-800">Real Flow</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-neutral-800 hover:text-neutral-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-neutral-800 hover:text-neutral-600 transition-colors">How it works</a>
            <SigninButton/>
            
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-neutral-100 text-neutral-800 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Get Things Done. Simplified.
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-800 mb-6 leading-tight">
              Real Flow is your
              <br />
              <span className="text-neutral-800">personal task manager</span>
            </h1>
            
            <p className="text-xl text-neutral-800 mb-8 max-w-2xl mx-auto leading-relaxed">
              Stay on top of everyday tasks. Streamline your workflow and 
              boost productivity with our intuitive task management platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-neutral-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-neutral-700 transition-all transform hover:scale-105 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="text-neutral-800 px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition-colors">
                See how it works
              </button>
            </div>
          </div>

          {/* App Screenshot */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
              <div className="bg-neutral-100 px-6 py-4 border-b border-neutral-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="p-8 bg-white min-h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-12 h-12 text-neutral-800" />
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-800 mb-2">Screenshot of App</h3>
                  <p className="text-neutral-800">Beautiful task management interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-neutral-800 mb-2">{stat.number}</div>
                <div className="text-neutral-800">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-xl text-neutral-800 max-w-2xl mx-auto">
              Powerful features designed to help you and your team work more efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-800 mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">{feature.title}</h3>
                <p className="text-neutral-800 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">
              Simple workflow, powerful results
            </h2>
            <p className="text-xl text-neutral-800 max-w-2xl mx-auto">
              Get started in minutes with our intuitive three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Create Tasks</h3>
              <p className="text-neutral-800">Add tasks with priorities, due dates, and assign them to team members</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Track Progress</h3>
              <p className="text-neutral-800">Monitor task status and team progress with real-time updates</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Get Results</h3>
              <p className="text-neutral-800">Complete projects faster with improved team collaboration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-neutral-800 max-w-2xl mx-auto">
              See what our customers have to say about Real Flow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} aria-hidden="true" className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-800 mb-6 leading-relaxed">{testimonial.content}</p>
                <div>
                  <div className="font-semibold text-neutral-800">{testimonial.name}</div>
                  <div className="text-sm text-neutral-600">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-neutral-200 mb-8 max-w-2xl mx-auto">
            Join thousands of teams who have already improved their productivity with Real Flow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-neutral-800 px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-neutral-800 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16 flex justify-center">
        <div className="w-screen px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Real Flow</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                The modern task management platform for teams who want to get things done.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-400">
            <p>&copy; 2025 Real Flow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};