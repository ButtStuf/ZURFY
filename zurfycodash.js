import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Brain, Target, Zap, BarChart3, Palette, Store, Package, 
  Globe, CheckCircle, XCircle, Loader2, Play, Settings, ArrowRight, 
  Eye, DollarSign, Award, Users, Lightbulb, Rocket, Crown, Star,
  PieChart, LineChart, Activity, FileText, Camera, Search, MessageSquare,
  Upload, Download, RefreshCw, Filter, SortDesc, Calendar, Bell, 
  Maximize2, ExternalLink, Copy, Share2, Heart, Bookmark
} from 'lucide-react';

// ===============================================
// MAIN ZURFY DASHBOARD COMPONENT
// ===============================================

const ZurfyDashboard = () => {
  const [activeTab, setActiveTab] = useState('ai-studio');
  const [user, setUser] = useState({ name: 'Creative Entrepreneur', plan: 'Professional' });
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Sample data states
  const [designs, setDesigns] = useState([
    {
      id: 1,
      title: 'Minimalist Cat Art',
      description: 'Simple line drawing of a sitting cat',
      tags: ['cat', 'minimalist', 'line art', 'pet'],
      image_url: 'https://via.placeholder.com/300x200/667eea/ffffff?text=Cat+Art',
      thumbnail_url: 'https://via.placeholder.com/150x100/667eea/ffffff?text=Cat',
      success_score: 87,
      canva_design_id: 'DAF123456',
      created_at: '2024-01-15',
      revenue_generated: 1170,
      sales_count: 234
    },
    {
      id: 2,
      title: 'Botanical Line Drawing',
      description: 'Modern botanical illustration',
      tags: ['botanical', 'plants', 'nature', 'line art'],
      image_url: 'https://via.placeholder.com/300x200/4CAF50/ffffff?text=Botanical',
      thumbnail_url: 'https://via.placeholder.com/150x100/4CAF50/ffffff?text=Plant',
      success_score: 92,
      canva_design_id: 'DAF789012',
      created_at: '2024-01-20',
      revenue_generated: 945,
      sales_count: 189
    },
    {
      id: 3,
      title: 'Coffee Quote Print',
      description: 'Motivational coffee-themed quote',
      tags: ['coffee', 'quote', 'motivation', 'typography'],
      image_url: 'https://via.placeholder.com/300x200/8B4513/ffffff?text=Coffee+Quote',
      thumbnail_url: 'https://via.placeholder.com/150x100/8B4513/ffffff?text=Coffee',
      success_score: 76,
      canva_design_id: 'DAF345678',
      created_at: '2024-01-18',
      revenue_generated: 780,
      sales_count: 156
    }
  ]);

  const [selectedDesign, setSelectedDesign] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [marketData, setMarketData] = useState({
    trending: [
      { keyword: 'minimalist line art', growth: '+189%', volume: '12k/mo', platforms: 'Etsy, Shopify' },
      { keyword: 'y2k aesthetic', growth: '+156%', volume: '8k/mo', platforms: 'All Platforms' },
      { keyword: 'mental health quotes', growth: '+134%', volume: '15k/mo', platforms: 'Etsy, Amazon' }
    ],
    opportunities: [
      { niche: 'Pet Memorial Art', score: 94, competition: 'Low' },
      { niche: 'Astrology Minimalism', score: 88, competition: 'Medium' },
      { niche: 'Workout Motivation', score: 76, competition: 'High' }
    ]
  });

  // Navigation tabs configuration
  const tabs = [
    { id: 'ai-studio', label: 'AI Design Studio', icon: Brain, badge: 'NEW' },
    { id: 'intelligence', label: 'Market Intelligence', icon: TrendingUp, badge: 'HOT' },
    { id: 'automation', label: 'Smart Workflows', icon: Zap },
    { id: 'analytics', label: 'Creator Analytics', icon: BarChart3 },
    { id: 'optimization', label: 'Platform Optimizer', icon: Target },
    { id: 'university', label: 'Zurfy University', icon: Users, badge: 'BETA' }
  ];

  // ===============================================
  // HEADER COMPONENT
  // ===============================================
  const Header = () => (
    <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Rocket className="w-8 h-8 text-purple-200" />
              <h1 className="text-2xl font-bold">Zurfy.co</h1>
            </div>
            <span className="text-purple-200 text-sm">AutoFy On The Fly</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-5 h-5 text-purple-200 hover:text-white cursor-pointer" />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-purple-200">{user.plan} Plan</div>
            </div>
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">CE</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  // ===============================================
  // NAVIGATION COMPONENT
  // ===============================================
  const Navigation = () => (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center space-x-2 py-4 px-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="absolute -top-1 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  // ===============================================
  // AI STUDIO TAB
  // ===============================================
  const AIStudioTab = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const analyzeDesign = async (design) => {
      setIsAnalyzing(true);
      setSelectedDesign(design);
      
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setAnalysisResult({
        success_score: design?.success_score || Math.floor(Math.random() * 30) + 70,
        prediction: 'High Success Potential',
        recommendations: [
          'Add vintage filter for +23% Etsy performance',
          'Use blue color variant for +18% Shopify conversion',
          'Target millennials 25-35 for optimal ROI',
          'Include seasonal keywords for +15% visibility'
        ],
        market_potential: 89,
        trend_alignment: 94,
        market_saturation: 12,
        revenue_prediction: {
          min_monthly: 2340,
          max_monthly: 4580,
          confidence: 87
        },
        visual_analysis: {
          colors: [
            { name: 'Deep Purple', hex: '#6366f1', percentage: 35 },
            { name: 'Soft Gray', hex: '#9ca3af', percentage: 28 },
            { name: 'Pure White', hex: '#ffffff', percentage: 22 },
            { name: 'Accent Blue', hex: '#3b82f6', percentage: 15 }
          ],
          color_harmony: 92
        },
        platform_optimization: {
          etsy: {
            score: 94,
            suggestions: ['Optimize for "minimalist art" keyword', 'Add seasonal tags']
          },
          shopify: {
            score: 87,
            suggestions: ['Improve product descriptions', 'Add upsell products']
          },
          printify: {
            score: 91,
            suggestions: ['Use premium paper option', 'Add multiple size variants']
          }
        }
      });
      
      setIsAnalyzing(false);
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Design Intelligence Studio</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            The world's first AI that predicts which designs will make money before you create them
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Design Analysis Panel */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Brain className="w-6 h-6 mr-2 text-purple-600" />
              Design Performance Predictor
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 hover:border-purple-400 transition-colors">
              <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">Upload your Canva design or paste URL</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2 inline" />
                  Upload Design
                </button>
                <button 
                  onClick={() => analyzeDesign(designs[0])}
                  disabled={isAnalyzing}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                      Analyzing...
                    </>
                  ) : (
                    'Try Demo'
                  )}
                </button>
              </div>
            </div>

            {/* Your Designs Gallery */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Your Recent Designs</h4>
              <div className="grid grid-cols-2 gap-3">
                {designs.slice(0, 4).map(design => (
                  <div 
                    key={design.id} 
                    className={`relative cursor-pointer rounded-lg overflow-hidden transition-all hover:shadow-md ${
                      selectedDesign?.id === design.id ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => analyzeDesign(design)}
                  >
                    <img 
                      src={design.thumbnail_url} 
                      alt={design.title}
                      className="w-full h-20 object-cover"
                    />
                    <div className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-1 py-0.5 rounded">
                      {design.success_score}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1">
                      {design.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Analysis Results or Trends */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            {analysisResult ? (
              <AnalysisResults result={analysisResult} design={selectedDesign} />
            ) : (
              <TrendIntelligence />
            )}
          </div>
        </div>

        {/* Quick Action Cards */}
        <QuickActionCards />

        {/* Upload Modal */}
        {showUploadModal && (
          <UploadModal onClose={() => setShowUploadModal(false)} onUpload={analyzeDesign} />
        )}
      </div>
    );
  };

  // ===============================================
  // ANALYSIS RESULTS COMPONENT
  // ===============================================
  const AnalysisResults = ({ result, design }) => {
    if (!result) return null;

    const getScoreColor = (score) => {
      if (score >= 80) return 'text-green-600';
      if (score >= 60) return 'text-yellow-600';
      return 'text-red-600';
    };

    const getScoreLabel = (score) => {
      if (score >= 90) return 'Excellent';
      if (score >= 80) return 'Very Good';
      if (score >= 70) return 'Good';
      if (score >= 60) return 'Fair';
      return 'Needs Improvement';
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold flex items-center">
            <Brain className="w-6 h-6 mr-2 text-purple-600" />
            AI Analysis Results
          </h3>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(result.success_score)}`}>
              {result.success_score}/100
            </div>
            <div className="text-sm text-gray-600">{getScoreLabel(result.success_score)}</div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-3">📊 Key Metrics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-green-700">Market Potential</div>
              <div className="text-xl font-bold text-green-600">{result.market_potential}%</div>
            </div>
            <div>
              <div className="text-sm text-green-700">Trend Alignment</div>
              <div className="text-xl font-bold text-green-600">{result.trend_alignment}%</div>
            </div>
          </div>
        </div>

        {/* Revenue Prediction */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-amber-800 mb-2">💰 Revenue Prediction</h4>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              ${result.revenue_prediction.min_monthly.toLocaleString()} - ${result.revenue_prediction.max_monthly.toLocaleString()}
            </div>
            <div className="text-sm text-amber-700">Monthly estimate ({result.revenue_prediction.confidence}% confidence)</div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-purple-800 mb-3">💡 AI Recommendations</h4>
          <div className="space-y-2">
            {result.recommendations.slice(0, 3).map((rec, index) => (
              <div key={index} className="flex items-start text-sm">
                <Star className="w-4 h-4 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                <span className="text-purple-700">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
            <Rocket className="w-4 h-4 mr-1 inline" />
            Create Products
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
            <Download className="w-4 h-4 mr-1 inline" />
            Save Report
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
            <RefreshCw className="w-4 h-4 mr-1 inline" />
            Re-analyze
          </button>
        </div>
      </div>
    );
  };

  // ===============================================
  // TREND INTELLIGENCE COMPONENT
  // ===============================================
  const TrendIntelligence = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold flex items-center">
        <TrendingUp className="w-6 h-6 mr-2 text-pink-600" />
        Real-Time Trend Intelligence
      </h3>
      
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-lg p-4">
        <h4 className="font-semibold text-pink-800 mb-3">🔥 Trending Now</h4>
        <div className="space-y-2">
          {marketData.trending.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-white rounded p-3">
              <div>
                <div className="font-medium text-gray-900">{item.keyword}</div>
                <div className="text-sm text-gray-600">{item.platforms}</div>
              </div>
              <div className="text-green-600 font-bold">{item.growth}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-3">🎯 Opportunity Score</h4>
        <div className="space-y-3">
          {marketData.opportunities.map((opp, index) => (
            <div key={index} className="bg-white rounded p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">{opp.niche}</span>
                <span className="text-blue-600 font-bold">{opp.score}/100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Competition: {opp.competition}</span>
                <button className="text-blue-600 hover:text-blue-700">Explore →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ===============================================
  // QUICK ACTION CARDS
  // ===============================================
  const QuickActionCards = () => {
    const actions = [
      {
        title: 'Smart Design Generator',
        description: 'AI creates 10 trending designs based on your style',
        icon: Palette,
        action: 'Generate Designs',
        color: 'from-purple-500 to-indigo-500'
      },
      {
        title: 'Competitor Spy',
        description: 'See what\'s working for top sellers in your niche',
        icon: Eye,
        action: 'Start Spying',
        color: 'from-pink-500 to-rose-500'
      },
      {
        title: 'Auto Product Creator',
        description: 'Turn 1 design into 20+ products across platforms',
        icon: Rocket,
        action: 'Create Products',
        color: 'from-green-500 to-emerald-500'
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{card.description}</p>
            <button className={`w-full bg-gradient-to-r ${card.color} text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity`}>
              {card.action}
            </button>
          </div>
        ))}
      </div>
    );
  };

  // ===============================================
  // UPLOAD MODAL COMPONENT
  // ===============================================
  const UploadModal = ({ onClose, onUpload }) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      tags: '',
      image_url: '',
      canva_design_id: ''
    });

    const handleSubmit = () => {
      if (!formData.title || !formData.tags || !formData.image_url) {
        alert('Please fill in all required fields');
        return;
      }

      const designData = {
        id: Date.now(),
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        thumbnail_url: formData.image_url,
        success_score: Math.floor(Math.random() * 30) + 70,
        created_at: new Date().toISOString().split('T')[0]
      };
      onUpload(designData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Upload New Design</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter design title"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your design"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)*</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={e => setFormData({...formData, tags: e.target.value})}
                  placeholder="cat, minimalist, wall art, printable"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL*</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://example.com/design.png"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Canva Design ID (optional)</label>
                <input
                  type="text"
                  value={formData.canva_design_id}
                  onChange={e => setFormData({...formData, canva_design_id: e.target.value})}
                  placeholder="DAFxxxxx"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Upload & Analyze
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ===============================================
  // MARKET INTELLIGENCE TAB
  // ===============================================
  const IntelligenceTab = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Intelligence Center</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Advanced analytics and market insights that give you unfair advantages over competitors
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Cards */}
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-purple-200" />
            <span className="text-sm bg-white/20 px-2 py-1 rounded">This Month</span>
          </div>
          <div className="text-3xl font-bold mb-1">$9,500</div>
          <div className="text-purple-200 mb-2">Total Revenue</div>
          <div className="text-sm text-green-200">↗ 23% from last month</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-200" />
            <span className="text-sm bg-white/20 px-2 py-1 rounded">Live</span>
          </div>
          <div className="text-3xl font-bold mb-1">87%</div>
          <div className="text-green-200 mb-2">Success Rate</div>
          <div className="text-sm text-green-100">8/10 designs profitable</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 text-orange-200" />
            <span className="text-sm bg-white/20 px-2 py-1 rounded">Ranking</span>
          </div>
          <div className="text-3xl font-bold mb-1">#12</div>
          <div className="text-orange-200 mb-2">In Your Niche</div>
          <div className="text-sm text-orange-100">↗ 5 positions this week</div>
        </div>
      </div>

      {/* Platform Performance & Competitor Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
            Platform Performance
          </h3>
          
          <div className="space-y-4">
            {[
              { platform: 'Etsy', revenue: '$4,280', share: 45, color: 'bg-orange-500' },
              { platform: 'Shopify', revenue: '$3,120', share: 33, color: 'bg-green-500' },
              { platform: 'Amazon', revenue: '$2,100', share: 22, color: 'bg-blue-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">{item.platform}</span>
                    <span className="text-sm text-gray-600">{item.revenue}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`${item.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${item.share}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Eye className="w-6 h-6 mr-2 text-pink-600" />
            Competitor Intelligence
          </h3>
          
          <div className="space-y-3">
            {[
              { competitor: 'ArtisticVibes', products: 342, avgPrice: '$18', topCategory: 'Wall Art' },
              { competitor: 'MinimalDesignCo', products: 189, avgPrice: '$22', topCategory: 'Quotes' },
              { competitor: 'TrendyPrints', products: 267, avgPrice: '$15', topCategory: 'Animals' }
            ].map((comp, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-900">{comp.competitor}</span>
                  <button className="text-pink-600 text-sm hover:text-pink-700">Analyze</button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                  <div>{comp.products} products</div>
                  <div>Avg {comp.avgPrice}</div>
                  <div>{comp.topCategory}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ===============================================
  // AUTOMATION TAB
  // ===============================================
  const AutomationTab = () => {
    const workflows = [
      {
        title: 'Design-to-Profit Pipeline',
        description: 'Canva design → AI analysis → 20+ products → All platforms',
        steps: ['Design Upload', 'AI Enhancement', 'Product Generation', 'Multi-Platform List'],
        color: 'from-purple-500 to-indigo-500',
        icon: Palette,
        active: true,
        saves: '15 hours/week'
      },
      {
        title: 'Smart Pricing Engine',
        description: 'Auto-optimize prices based on competition and demand',
        steps: ['Market Analysis', 'Price Optimization', 'A/B Testing', 'Revenue Max'],
        color: 'from-green-500 to-emerald-500',
        icon: DollarSign,
        active: true,
        saves: '$1,200/month'
      },
      {
        title: 'SEO Content Generator',
        description: 'Platform-specific titles, tags, descriptions for each product',
        steps: ['Keyword Research', 'Content Creation', 'Platform Optimization', 'Auto-Update'],
        color: 'from-blue-500 to-cyan-500',
        icon: FileText,
        active: false,
        saves: '8 hours/week'
      },
      {
        title: 'Trend Tracker & Alert',
        description: 'Monitor trends and auto-create products for viral niches',
        steps: ['Trend Detection', 'Opportunity Score', 'Auto-Design', 'Rapid Launch'],
        color: 'from-orange-500 to-red-500',
        icon: TrendingUp,
        active: true,
        saves: 'First-mover advantage'
      },
      {
        title: 'Quality Control Assistant',
        description: 'Auto-check orders, handle issues, manage customer service',
        steps: ['Order Monitoring', 'Issue Detection', 'Auto-Resolution', 'Customer Update'],
        color: 'from-pink-500 to-rose-500',
        icon: CheckCircle,
        active: false,
        saves: '6 hours/week'
      },
      {
        title: 'Revenue Optimizer',
        description: 'Pause low performers, boost winners, optimize inventory',
        steps: ['Performance Analysis', 'Auto-Decisions', 'Resource Reallocation', 'Profit Max'],
        color: 'from-yellow-500 to-orange-500',
        icon: Target,
        active: true,
        saves: '+34% revenue'
      }
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Workflow Automation</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Pre-built automations designed specifically for creative entrepreneurs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {workflows.map((workflow, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`h-2 bg-gradient-to-r ${workflow.color}`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${workflow.color} flex items-center justify-center`}>
                    <workflow.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    workflow.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {workflow.active ? 'Active' : 'Setup Required'}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{workflow.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{workflow.description}</p>
                
                <div className="space-y-2 mb-4">
                  {workflow.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                      <span className="text-gray-600">{step}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600 font-medium">Saves: {workflow.saves}</span>
                  <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    workflow.active 
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                      : `bg-gradient-to-r ${workflow.color} text-white hover:opacity-90`
                  }`}>
                    {workflow.active ? 'Configure' : 'Activate'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Workflow Builder */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Workflow Builder</h3>
            <p className="text-gray-600 mb-4">Need something specific? Build custom automations with our visual editor</p>
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors">
              Open Workflow Builder
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ===============================================
  // ANALYTICS TAB
  // ===============================================
  const AnalyticsTab = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Creator Analytics Dashboard</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Insights that matter for creative businesses - track what actually drives profit
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Design ROI', value: '347%', change: '+23%', icon: Palette, color: 'text-purple-600' },
          { label: 'Conversion Rate', value: '8.4%', change: '+1.2%', icon: Target, color: 'text-green-600' },
          { label: 'Avg Order Value', value: '$28.50', change: '+$3.20', icon: DollarSign, color: 'text-blue-600' },
          { label: 'Customer LTV', value: '$145', change: '+$18', icon: Users, color: 'text-orange-600' }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <metric.icon className={`w-8 h-8 ${metric.color}`} />
              <span className="text-green-600 text-sm font-medium">{metric.change}</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-gray-600 text-sm">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Design Performance & Platform Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-blue-600" />
            Top Performing Designs
          </h3>
          
          <div className="space-y-4">
            {designs.map((design, index) => (
              <div key={design.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-500">#{index + 1}</div>
                <img 
                  src={design.thumbnail_url} 
                  alt={design.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{design.title}</div>
                  <div className="text-sm text-gray-600">{design.sales_count} sales</div>
                </div>
                <div className="text-green-600 font-bold">${design.revenue_generated}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <PieChart className="w-6 h-6 mr-2 text-green-600" />
            Revenue by Platform
          </h3>
          
          <div className="space-y-4">
            {[
              { platform: 'Etsy', orders: 234, revenue: '$4,280', margin: '68%', trend: 'up' },
              { platform: 'Shopify', orders: 189, revenue: '$3,120', margin: '72%', trend: 'up' },
              { platform: 'Amazon', orders: 156, revenue: '$2,100', margin: '45%', trend: 'down' }
            ].map((platform, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-900">{platform.platform}</span>
                  <span className={`text-sm ${platform.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {platform.trend === 'up' ? '↗' : '↘'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="text-gray-600">Orders</div>
                    <div className="font-bold">{platform.orders}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Revenue</div>
                    <div className="font-bold">{platform.revenue}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Margin</div>
                    <div className="font-bold">{platform.margin}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ===============================================
  // PLATFORM OPTIMIZATION TAB
  // ===============================================
  const OptimizationTab = () => {
    const platforms = [
      {
        platform: 'Etsy',
        icon: Store,
        color: 'from-orange-500 to-red-500',
        score: 87,
        optimizations: [
          { task: 'SEO Title Optimization', status: 'completed', impact: '+23% visibility' },
          { task: 'Tag Research & Update', status: 'completed', impact: '+18% clicks' },
          { task: 'Photo Enhancement', status: 'in-progress', impact: '+15% CTR' },
          { task: 'Seasonal Category Shift', status: 'pending', impact: '+12% ranking' }
        ]
      },
      {
        platform: 'Shopify',
        icon: Globe,
        color: 'from-green-500 to-emerald-500',
        score: 92,
        optimizations: [
          { task: 'Product Schema Markup', status: 'completed', impact: '+28% Google visibility' },
          { task: 'Mobile Speed Optimization', status: 'completed', impact: '+35% mobile conversion' },
          { task: 'Upsell Automation', status: 'completed', impact: '+$12 AOV' },
          { task: 'Abandoned Cart Recovery', status: 'in-progress', impact: '+8% recovery rate' }
        ]
      },
      {
        platform: 'Amazon',
        icon: Package,
        color: 'from-blue-500 to-indigo-500',
        score: 74,
        optimizations: [
          { task: 'Keyword Optimization', status: 'completed', impact: '+19% impressions' },
          { task: 'A+ Content Creation', status: 'in-progress', impact: '+25% conversion' },
          { task: 'Review Management', status: 'pending', impact: '+0.8 star rating' },
          { task: 'PPC Campaign Setup', status: 'pending', impact: '+40% visibility' }
        ]
      },
      {
        platform: 'Pinterest',
        icon: Camera,
        color: 'from-pink-500 to-rose-500',
        score: 65,
        optimizations: [
          { task: 'Rich Pins Setup', status: 'completed', impact: '+22% clicks' },
          { task: 'Board Optimization', status: 'in-progress', impact: '+30% reach' },
          { task: 'Seasonal Pinning Strategy', status: 'pending', impact: '+45% seasonal traffic' },
          { task: 'Pinterest Shopping Setup', status: 'pending', impact: 'Direct sales enabled' }
        ]
      }
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Optimization Center</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Master each platform's algorithm and maximize your visibility
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {platforms.map((platform, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                    <platform.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{platform.platform}</h3>
                    <div className="text-sm text-gray-600">Optimization Score: {platform.score}/100</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${platform.score >= 80 ? 'text-green-600' : platform.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {platform.score}%
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {platform.optimizations.map((opt, optIndex) => (
                  <div key={optIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        opt.status === 'completed' ? 'bg-green-500' :
                        opt.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                      }`}></div>
                      <div>
                        <div className="font-medium text-gray-900">{opt.task}</div>
                        <div className="text-sm text-green-600">{opt.impact}</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      opt.status === 'completed' ? 'bg-green-100 text-green-800' :
                      opt.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {opt.status.replace('-', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ===============================================
  // ZURFY UNIVERSITY TAB
  // ===============================================
  const UniversityTab = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Zurfy University</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Learn, connect, and grow with the world's most successful creative entrepreneurs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Featured Course */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2 text-yellow-600" />
            Featured Course: POD Empire Blueprint
          </h3>
          
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6 mb-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Build a $10k/Month POD Business</h4>
                <p className="text-gray-600 mb-3">Master course by Sarah Chen, who built a 7-figure print-on-demand empire</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>12 modules</span>
                  <span>4.5 hours</span>
                  <span>2,340 students</span>
                  <span className="text-yellow-600">⭐ 4.9</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Trend Spotting Masterclass', instructor: 'Mike Rodriguez', students: 1.2, rating: 4.8 },
              { title: 'Etsy SEO Secrets', instructor: 'Emma Thompson', students: 890, rating: 4.9 },
              { title: 'Shopify Conversion Hacks', instructor: 'David Kim', students: 756, rating: 4.7 },
              { title: 'Amazon FBA for Creatives', instructor: 'Lisa Wang', students: 634, rating: 4.6 }
            ].map((course, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                <h5 className="font-medium text-gray-900 mb-1">{course.title}</h5>
                <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{course.students}k students</span>
                  <span className="text-yellow-600">⭐ {course.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats & Events */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Community Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Members</span>
                <span className="font-bold text-gray-900">12,847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Success Stories</span>
                <span className="font-bold text-gray-900">2,156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Monthly Revenue</span>
                <span className="font-bold text-green-600">$4,280</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Course Completion</span>
                <span className="font-bold text-blue-600">89%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Success Story</h3>
            <p className="text-green-100 text-sm mb-3">
              "Zurfy helped me go from $0 to $15k/month in 4 months. The AI predictions are scary accurate!"
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">JM</span>
              </div>
              <div>
                <div className="font-medium">Jessica Martinez</div>
                <div className="text-green-200 text-sm">Digital Artist</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
              Live Events
            </h3>
            <div className="space-y-3">
              <div className="border-l-4 border-purple-500 pl-3">
                <div className="font-medium text-gray-900">Weekly Q&A</div>
                <div className="text-sm text-gray-600">Every Friday 2PM EST</div>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <div className="font-medium text-gray-900">Trend Alert Workshop</div>
                <div className="text-sm text-gray-600">Next Tuesday 7PM EST</div>
              </div>
              <div className="border-l-4 border-green-500 pl-3">
                <div className="font-medium text-gray-900">Success Showcase</div>
                <div className="text-sm text-gray-600">Monthly - Last Saturday</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ===============================================
  // RENDER TAB CONTENT
  // ===============================================
  const renderTabContent = () => {
    switch (activeTab) {
      case 'ai-studio': return <AIStudioTab />;
      case 'intelligence': return <IntelligenceTab />;
      case 'automation': return <AutomationTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'optimization': return <OptimizationTab />;
      case 'university': return <UniversityTab />;
      default: return <AIStudioTab />;
    }
  };

  // ===============================================
  // MAIN COMPONENT RETURN
  // ===============================================
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <main>{renderTabContent()}</main>
      
      {/* Success-Based Pricing Footer */}
      <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Success-Based Pricing</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            We only succeed when you succeed. Pay based on your results, not our features.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            {[
              { 
                plan: 'Creator', 
                price: 'Free', 
                limit: 'Up to $1k/month revenue', 
                features: ['100 products/month', 'Basic analytics', 'Community access'] 
              },
              { 
                plan: 'Professional', 
                price: '3% of revenue', 
                limit: '$1k - $10k/month revenue', 
                features: ['Unlimited products', 'AI intelligence', 'Priority support'] 
              },
              { 
                plan: 'Empire', 
                price: '2% of revenue', 
                limit: '$10k+ monthly revenue', 
                features: ['Everything included', 'Personal success manager', 'Custom integrations'] 
              }
            ].map((tier, index) => (
              <div key={index} className={`bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 ${index === 1 ? 'ring-2 ring-purple-400' : ''}`}>
                <h3 className="text-xl font-semibold mb-2">{tier.plan}</h3>
                <div className="text-3xl font-bold mb-2">{tier.price}</div>
                <div className="text-purple-200 text-sm mb-4">{tier.limit}</div>
                <ul className="space-y-2 text-sm">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
            Start Your Creative Empire Today
          </button>
        </div>
      </footer>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
            <p className="text-gray-700">Processing your request...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZurfyDashboard;