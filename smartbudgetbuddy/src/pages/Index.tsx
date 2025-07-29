
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowRight, 
  Users, 
  LineChart, 
  BellRing, 
  ChevronRight, 
  BadgeCheck 
} from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    hero: false,
    features: false,
    benefits: false,
    cta: false,
  });
  
  const refs = {
    hero: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    benefits: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null),
  };
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    
    const observers: IntersectionObserver[] = [];
    
    Object.entries(refs).forEach(([key, ref]) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [key]: true }));
          }
        });
      }, observerOptions);
      
      if (ref.current) {
        observer.observe(ref.current);
        observers.push(observer);
      }
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const features = [
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Smart Expense Tracking",
      description: "Automatically categorize your expenses as you record them, with smart suggestions and pattern recognition."
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "AI Budget Predictions",
      description: "Our intelligent algorithm analyzes your spending patterns to recommend personalized budget limits."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Group Expense Management",
      description: "Easily split bills, track shared expenses, and settle up with friends and family without awkward reminders."
    },
    {
      icon: <BellRing className="h-6 w-6" />,
      title: "Smart Notifications",
      description: "Receive timely alerts about upcoming bills, spending trends, and budget warnings before overspending."
    }
  ];

  const benefits = [
    "Reduce financial stress with clear spending insights",
    "Save time with automatic expense categorization",
    "Avoid overspending with predictive budget warnings",
    "Eliminate awkward money conversations in groups",
    "Build better spending habits through data insights",
    "Make confident financial decisions with clear analysis"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={refs.hero}
        className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 min-h-[90vh] flex items-center bg-gradient-to-b from-blue-50 to-white"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div 
              className={`space-y-6 md:space-y-8 transition-all duration-1000 transform ${
                isVisible.hero ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
            >
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Smart Finance Management
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Smart Expense <span className="text-primary">Management</span> with Auto-Budgeting
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Take control of your finances with intelligent expense tracking, predictive budgeting, and effortless group expense settlement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
            
            <div 
              className={`relative transition-all duration-1000 delay-300 transform ${
                isVisible.hero ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-xl p-4 border overflow-hidden">
                <div className="absolute top-0 right-0 left-0 h-2 bg-primary" />
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Dashboard Preview" 
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">Monthly Overview</h3>
                    <p className="text-sm text-muted-foreground">Budget tracking insights</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <LayoutDashboard className="mr-1 h-3 w-3" />
                    Dashboard
                  </Button>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 -z-10 w-3/4 h-3/4 rounded-full bg-blue-100 blur-3xl opacity-70" />
              <div className="absolute -top-4 -left-4 -z-10 w-1/2 h-1/2 rounded-full bg-indigo-100 blur-3xl opacity-70" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={refs.features}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Master Your Finances
            </h2>
            <p className="text-lg text-muted-foreground">
              Our powerful features work together to make financial management simple, insightful, and even enjoyable.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 transform ${
                  isVisible.features 
                    ? "translate-y-0 opacity-100" 
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section 
        ref={refs.benefits}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div 
              className={`relative transition-all duration-1000 transform ${
                isVisible.benefits ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
              }`}
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Person using app" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="absolute -bottom-4 -left-4 -z-10 w-2/3 h-2/3 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 blur-3xl opacity-70" />
            </div>
            
            <div 
              className={`space-y-6 transition-all duration-1000 delay-300 transform ${
                isVisible.benefits ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Transform Your Financial Habits
              </h2>
              <p className="text-lg text-muted-foreground">
                SmartBudget isn't just about tracking expenses—it's about transforming your relationship with money through insightful analytics and intelligent recommendations.
              </p>
              
              <div className="space-y-4 pt-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-start"
                    style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                  >
                    <div className="mt-1 mr-3 flex-shrink-0">
                      <BadgeCheck className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <Link to="/dashboard">
                  <Button size="lg" className="group">
                    Start Your Financial Journey
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        ref={refs.cta}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white"
      >
        <div 
          className={`container mx-auto max-w-4xl text-center transition-all duration-1000 transform ${
            isVisible.cta ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Join thousands of users who have transformed their financial habits with our smart budgeting tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Get Started for Free
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-300">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">SmartBudget</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} SmartBudget. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
