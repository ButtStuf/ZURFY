import React, { useState, useEffect } from 'react';
import ZurfyDashboard from './ZurfyDashboard';
import { 
  AuthProvider, 
  ProtectedRoute, 
  AuthModal, 
  ErrorBoundary, 
  ToastProvider,
  useAuth,
  useToast,
  LoginForm,
  RegisterForm
} from './ZurfyAuthComponents';
import { wsService } from './ZurfyAPIService';
import { 
  Wifi, WifiOff, Bell, Settings, HelpCircle, Menu, X,
  Rocket, Crown, Star, TrendingUp, Zap, Target, ArrowRight,
  CheckCircle, Users, Globe, Package, Eye
} from 'lucide-react';

// ===============================================
// 1. MAIN APP COMPONENT
// ===============================================

const App = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
};

// ===============================================
// 2. APP CONTENT WITH INTERNAL ROUTING
// ===============================================

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('landing');
    }
  }, [isAuthenticated]);

  if (loading) {
    return <AppLoading />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage 
            onSignUp={() => setShowAuthModal(true)}
            onLogin={() => setCurrentPage('auth')}
          />
        );
      case 'auth':
        return (
          <AuthPage 
            onBack={() => setCurrentPage('landing')}
            onSuccess={() => setCurrentPage('dashboard')}
          />
        );
      case 'dashboard':
        return (
          <DashboardLayout 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            onNavigate={setCurrentPage}
          />
        );
      default:
        return <LandingPage onSignUp={() => setShowAuthModal(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}

      {/* Global Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      {/* Global Components */}
      <ConnectionStatus />
      <NotificationHandler />
    </div>
  );
};

// ===============================================
// 3. LANDING PAGE
// ===============================================

const LandingPage = ({ onSignUp, onLogin }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative">
          {/* Navigation */}
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Rocket className="w-8 h-8 text-purple-200" />
                <span className="text-2xl font-bold">Zurfy.co</span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-purple-200 hover:text-white transition-colors">
                  Features
                </button>
                <button className="text-purple-200 hover:text-white transition-colors">
                  Pricing
                </button>
                <button 
                  onClick={onLogin}
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={onSignUp}
                  className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                >
                  Start Free
                </button>
              </div>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 text-sm font-medium mb-8">
                <Crown className="w-4 h-4 mr-2" />
                The Operating System for Creative Entrepreneurs
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                Turn Creativity Into Profit
              </h1>
              
              <p className="text-xl md:text-2xl mb-12 text-purple-100 max-w-4xl mx-auto">
                AI-powered design intelligence + multi-platform automation + predictive analytics = Your creative business on autopilot
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button 
                  onClick={onSignUp}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Your Creative Empire
                </button>
                <button className="border border-purple-400 hover:bg-purple-500/20 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
                  Watch AI Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[
                  { metric: '347%', label: 'Avg Revenue Increase' },
                  { metric: '15min', label: 'Setup Time' },
                  { metric: '87%', label: 'Success Prediction Accuracy' },
                  { metric: '24/7', label: 'Automated Sales' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">{stat.metric}</div>
                    <div className="text-sm text-purple-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Dominate
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The only platform that combines AI intelligence, automation, and community to guarantee your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Design Intelligence',
                description: 'AI predicts which designs will make money before you create them',
                color: 'from-purple-500 to-indigo-500'
              },
              {
                icon: Zap,
                title: 'Smart Automation',
                description: 'Turn 1 design into 20+ products across all platforms automatically',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Target,
                title: 'Platform Optimization',
                description: 'Master each platform\'s algorithm and maximize your visibility',
                color: 'from-pink-500 to-rose-500'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Demo Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See Zurfy in Action</h2>
            <p className="text-xl text-gray-600">Watch how our AI predicts design success in real-time</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
              <div className="flex items-center space-x-2 text-white">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm">Zurfy AI Studio - Design Analysis</span>
              </div>
            </div>
            
            <div className="p-8">
              <LiveDemo />
            </div>
          </div>
        </div>
      </div>

      {/* Success-Based Pricing */}
      <div className="py-20 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Success-Based Pricing</h2>
          <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
            We only succeed when you succeed. Pay based on your results, not our features.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {[
              { 
                plan: 'Creator', 
                price: 'Free', 
                limit: 'Up to $1k/month revenue', 
                features: ['100 products/month', 'Basic analytics', 'Community access'],
                popular: false
              },
              { 
                plan: 'Professional', 
                price: '3% of revenue', 
                limit: '$1k - $10k/month revenue', 
                features: ['Unlimited products', 'AI intelligence', 'Priority support'],
                popular: true
              },
              { 
                plan: 'Empire', 
                price: '2% of revenue', 
                limit: '$10k+ monthly revenue', 
                features: ['Everything included', 'Personal success manager', 'Custom integrations'],
                popular: false
              }
            ].map((tier, index) => (
              <div key={index} className={`bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/20 ${tier.popular ? 'ring-2 ring-purple-400 scale-105' : ''}`}>
                {tier.popular && (
                  <div className="bg-purple-500 text-white text-sm px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-2">{tier.plan}</h3>
                <div className="text-4xl font-bold mb-2">{tier.price}</div>
                <div className="text-purple-200 text-sm mb-6">{tier.limit}</div>
                <ul className="space-y-3 text-sm mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={onSignUp}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    tier.popular 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
          
          <button 
            onClick={onSignUp}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Start Your Creative Empire Today
          </button>
        </div>
      </div>
    </div>
  );
};

// ===============================================
// 4. LIVE DEMO COMPONENT
// ===============================================

const LiveDemo = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const runDemo = async () => {
    setAnalyzing(true);
    setResult(null);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setResult({
      score: 87,
      prediction: 'High Success Potential',
      revenue: '$2,340 - $4,580',
      confidence: 87
    });
    setAnalyzing(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Demo Design</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <img 
            src="https://via.placeholder.com/300x200/667eea/ffffff?text=Minimalist+Cat+Art"
            alt="Demo design"
            className="mx-auto rounded-lg mb-4"
          />
          <p className="text-gray-600 mb-4">Minimalist Cat Line Art</p>
          <button
            onClick={runDemo}
            disabled={analyzing}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
          >
            {analyzing ? 'Analyzing...' : 'Analyze with AI'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">AI Analysis Results</h3>
        {analyzing ? (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
            <p className="text-center text-gray-600 mt-4">AI is analyzing design elements...</p>
          </div>
        ) : result ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-green-600 mb-1">{result.score}/100</div>
              <div className="text-green-800 font-medium">{result.prediction}</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Revenue:</span>
                <span className="font-bold text-green-600">{result.revenue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Confidence:</span>
                <span className="font-bold text-green-600">{result.confidence}%</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-600">Click "Analyze with AI" to see the magic happen!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ===============================================
// 5. AUTH PAGE
// ===============================================

const AuthPage = ({ onBack, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button
          onClick={onBack}
          className="mb-4 flex items-center text-purple-600 hover:text-purple-700"
        >
          ← Back to home
        </button>
        
        {isLogin ? (
          <LoginForm 
            onSuccess={onSuccess}
            onSwitchToRegister={() => setIsLogin(false)} 
          />
        ) : (
          <RegisterForm 
            onSuccess={onSuccess}
            onSwitchToLogin={() => setIsLogin(true)} 
          />
        )}
      </div>
    </div>
  );
};

// ===============================================
// 6. DASHBOARD LAYOUT
// ===============================================

const DashboardLayout = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-50 lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <DashboardSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <Rocket className="w-6 h-6 text-purple-600" />
            <span className="font-bold text-gray-900">Zurfy.co</span>
          </div>
        </div>

        {/* Dashboard content */}
        <ZurfyDashboard />
      </div>
    </div>
  );
};

// ===============================================
// 7. DASHBOARD SIDEBAR
// ===============================================

const DashboardSidebar = ({ onClose }) => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
    { id: 'designs', name: 'My Designs', icon: Star },
    { id: 'automation', name: 'Automations', icon: Zap },
    { id: 'analytics', name: 'Analytics', icon: Target },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Rocket className="w-8 h-8 text-purple-600" />
          <span className="text-xl font-bold text-gray-900">Zurfy.co</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{user?.name || 'User'}</div>
            <div className="text-sm text-gray-600">{user?.plan || 'Free'} Plan</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeSection === item.id
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 space-y-2">
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span>Help & Support</span>
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

// ===============================================
// 8. CONNECTION STATUS
// ===============================================

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // WebSocket connection monitoring
    const wsCheckInterval = setInterval(() => {
      setWsConnected(wsService.ws?.readyState === WebSocket.OPEN);
    }, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(wsCheckInterval);
    };
  }, []);

  if (isOnline && wsConnected) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-lg ${
        isOnline ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
      }`}>
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span className="text-sm">Reconnecting...</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span className="text-sm">You're offline</span>
          </>
        )}
      </div>
    </div>
  );
};

// ===============================================
// 9. NOTIFICATION HANDLER
// ===============================================

const NotificationHandler = () => {
  const { addToast } = useToast();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    // Listen for WebSocket notifications
    const unsubscribe = wsService.subscribe('notification', (notification) => {
      addToast(notification.message, notification.type || 'info');
    });

    // Listen for automation status updates
    const unsubscribeAutomation = wsService.subscribe('automation_update', (update) => {
      addToast(`Automation "${update.name}" ${update.status}`, 'success');
    });

    // Listen for design analysis completion
    const unsubscribeAnalysis = wsService.subscribe('analysis_complete', (analysis) => {
      addToast(`Design analysis complete! Score: ${analysis.score}/100`, 'success');
    });

    return () => {
      unsubscribe();
      unsubscribeAutomation();
      unsubscribeAnalysis();
    };
  }, [isAuthenticated, addToast]);

  return null;
};

// ===============================================
// 10. APP LOADING
// ===============================================

const AppLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-purple-300 border-t-white rounded-full animate-spin mx-auto"></div>
          <Rocket className="w-8 h-8 absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Initializing Zurfy</h2>
        <p className="text-purple-200">Preparing your creative empire...</p>
      </div>
    </div>
  );
};

// ===============================================
// 11. UTILITY COMPONENTS
// ===============================================

// Confirmation Dialog
export const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, type = 'danger' }) => {
  if (!isOpen) return null;

  const typeStyles = {
    danger: 'bg-red-600 hover:bg-red-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    info: 'bg-blue-600 hover:bg-blue-700'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-lg transition-colors ${typeStyles[type]}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
export const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="text-center py-12">
      <Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">{description}</p>
      {action && action}
    </div>
  );
};

// Progress Bar
export const ProgressBar = ({ value, max = 100, color = 'purple', size = 'md' }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const colorClasses = {
    purple: 'bg-purple-600',
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    red: 'bg-red-600'
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
      <div 
        className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default App;