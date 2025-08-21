import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Brain, Target, Zap, BarChart3, Palette, Store, Package, 
  Globe, CheckCircle, XCircle, Loader2, Play, Settings, ArrowRight, 
  Eye, DollarSign, Award, Users, Lightbulb, Rocket, Crown, Star,
  PieChart, LineChart, Activity, FileText, Camera, Search, MessageSquare
} from 'lucide-react';

const ZurfyNextGen = () => {
  const [activeTab, setActiveTab] = useState('ai-studio');
  const [designAnalysis, setDesignAnalysis] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulate AI analysis
  const analyzeDesign = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDesignAnalysis({
      score: 87,
      prediction: 'High Success Potential',
      recommendations: [
        'Add vintage filter for +23% Etsy performance',
        'Use blue color variant for +18% Shopify conversion',
        'Target millennials 25-35 for optimal ROI'
      ],
      trendAlignment: 94,
      marketSaturation: 'Low (12% saturated)',
      estimatedMonthlyRevenue: '$2,340 - $4,580'
    });
    setIsAnalyzing(false);
  };

  const NavigationTabs = () => (
    <div className="border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-6 overflow-x-auto">
          {[
            { id: 'ai-studio', label: 'AI Design Studio', icon: Brain, badge: 'NEW' },
            { id: 'intelligence', label: 'Market Intelligence', icon: TrendingUp, badge: 'HOT' },
            { id: 'automation', label: 'Smart Workflows', icon: Zap },
            { id: 'analytics', label: 'Creator Analytics', icon: BarChart3 },
            { id: 'optimization', label: 'Platform Optimizer', icon: Target },
            { id: 'community', label: 'Zurfy University', icon: Users, badge: 'BETA' }
          ].map((tab) => (
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
        </nav>
      </div>
    </div>
  );

  const HeroSection = () => (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-sm font-medium mb-6">
            <Crown className="w-4 h-4 mr-2" />
            The Operating System for Creative Entrepreneurs
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
            Turn Creativity Into Profit
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-4xl mx-auto">
            AI-powered design intelligence + multi-platform automation + predictive analytics = Your creative business on autopilot
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
              Start Your Creative Empire
            </button>
            <button className="border border-purple-400 hover:bg-purple-500/20 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
              Watch AI Demo
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { metric: '347%', label: 'Avg Revenue Increase' },
              { metric: '15min', label: 'Setup Time' },
              { metric: '87%', label: 'Success Prediction Accuracy' },
              { metric: '24/7', label: 'Automated Sales' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.metric}</div>
                <div className="text-sm text-purple-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AIStudioTab = () => (
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
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
            <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Upload your Canva design or paste URL</p>
            <button 
              onClick={analyzeDesign}
              disabled={isAnalyzing}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                  Analyzing...
                </>
              ) : (
                'Analyze Design Potential'
              )}
            </button>
          </div>

          {designAnalysis && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-green-800">Success Score</span>
                  <span className="text-2xl font-bold text-green-600">{designAnalysis.score}/100</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${designAnalysis.score}%` }}
                  ></div>
                </div>
                <p className="text-green-700 mt-2 font-medium">{designAnalysis.prediction}</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">AI Recommendations</h4>
                <ul className="space-y-1">
                  {designAnalysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-purple-700 text-sm flex items-start">
                      <Star className="w-4 h-4 mr-2 mt-0.5 text-purple-500" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">{designAnalysis.trendAlignment}%</div>
                  <div className="text-sm text-blue-700">Trend Alignment</div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                  <div className="text-sm font-bold text-orange-600">{designAnalysis.marketSaturation}</div>
                  <div className="text-sm text-orange-700">Market Saturation</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-amber-800 mb-1">Estimated Monthly Revenue</div>
                <div className="text-2xl font-bold text-amber-600">{designAnalysis.estimatedMonthlyRevenue}</div>
              </div>
            </div>
          )}
        </div>

        {/* Trend Intelligence Panel */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-pink-600" />
            Real-Time Trend Intelligence
          </h3>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-lg p-4">
              <h4 className="font-semibold text-pink-800 mb-3">🔥 Trending Now</h4>
              <div className="space-y-2">
                {[
                  { trend: 'Minimalist Line Art', growth: '+189%', platforms: 'Etsy, Shopify' },
                  { trend: 'Y2K Aesthetic', growth: '+156%', platforms: 'All Platforms' },
                  { trend: 'Mental Health Quotes', growth: '+134%', platforms: 'Etsy, Amazon' }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-white rounded p-3">
                    <div>
                      <div className="font-medium text-gray-900">{item.trend}</div>
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
                {[
                  { niche: 'Pet Memorial Art', score: 94, competition: 'Low' },
                  { niche: 'Astrology Minimalism', score: 88, competition: 'Medium' },
                  { niche: 'Workout Motivation', score: 76, competition: 'High' }
                ].map((opp, index) => (
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
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
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
        ].map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
            <p className="text-gray-600 mb-4">{card.description}</p>
            <button className={`w-full bg-gradient-to-r ${card.color} text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity`}>
              {card.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const IntelligenceTab = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Intelligence Center</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Advanced analytics and market insights that give you unfair advantages over competitors
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Market Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
            Cross-Platform Performance
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Platform Revenue Distribution</h4>
              <div className="space-y-3">
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

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Top Performing Designs</h4>
              <div className="space-y-3">
                {[
                  { design: 'Minimalist Cat Art', sales: 234, revenue: '$1,170' },
                  { design: 'Botanical Line Drawing', sales: 189, revenue: '$945' },
                  { design: 'Coffee Quote Print', sales: 156, revenue: '$780' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">{item.design}</div>
                        <div className="text-sm text-gray-600">{item.sales} sales</div>
                      </div>
                      <div className="text-green-600 font-bold">{item.revenue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-purple-200" />
              <span className="text-sm bg-white/20 px-2 py-1 rounded">This Month</span>
            </div>
            <div className="text-3xl font-bold mb-1">$9,500</div>
            <div className="text-purple-200 mb-2">Total Revenue</div>
            <div className="text-sm text-green-200">↑ 23% from last month</div>
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
            <div className="text-sm text-orange-100">↑ 5 positions this week</div>
          </div>
        </div>
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Search className="w-6 h-6 mr-2 text-indigo-600" />
            SEO & Keyword Intelligence
          </h3>
          
          <div className="space-y-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-800 mb-3">Top Keywords Driving Sales</h4>
              <div className="space-y-2">
                {[
                  { keyword: 'minimalist wall art', volume: '12k/mo', difficulty: 'Low', revenue: '$890' },
                  { keyword: 'cat lover gift', volume: '8k/mo', difficulty: 'Medium', revenue: '$670' },
                  { keyword: 'motivational quote', volume: '15k/mo', difficulty: 'High', revenue: '$450' }
                ].map((kw, index) => (
                  <div key={index} className="bg-white rounded p-3 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{kw.keyword}</div>
                      <div className="text-sm text-gray-600">{kw.volume} • {kw.difficulty} competition</div>
                    </div>
                    <div className="text-green-600 font-bold">{kw.revenue}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Eye className="w-6 h-6 mr-2 text-pink-600" />
            Competitor Intelligence
          </h3>
          
          <div className="space-y-4">
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <h4 className="font-semibold text-pink-800 mb-3">Top Competitors Analysis</h4>
              <div className="space-y-3">
                {[
                  { competitor: 'ArtisticVibes', products: 342, avgPrice: '$18', topCategory: 'Wall Art' },
                  { competitor: 'MinimalDesignCo', products: 189, avgPrice: '$22', topCategory: 'Quotes' },
                  { competitor: 'TrendyPrints', products: 267, avgPrice: '$15', topCategory: 'Animals' }
                ].map((comp, index) => (
                  <div key={index} className="bg-white rounded p-3">
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
      </div>
    </div>
  );

  const AutomationTab = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Workflow Automation</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Pre-built automations designed specifically for creative entrepreneurs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
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
        ].map((workflow, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
            <div className={`h-2 bg-gradient-to-r ${workflow.color}`}></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${workflow.color} flex items-center justify-center`}>
                  <workflow.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  {workflow.active ? (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Setup Required</span>
                  )}
                </div>
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

      <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
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

  const AnalyticsTab = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Creator Analytics Dashboard</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Insights that matter for creative businesses - track what actually drives profit
        </p>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-blue-600" />
            Revenue by Design Element
          </h3>
          
          <div className="space-y-4">
            {[
              { element: 'Minimalist Style', revenue: '$2,840', percentage: 45 },
              { element: 'Plant/Nature Theme', revenue: '$1,890', percentage: 30 },
              { element: 'Typography Focus', revenue: '$1,260', percentage: 20 },
              { element: 'Geometric Patterns', revenue: '$315', percentage: 5 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-medium">{item.element}</span>
                  <span className="text-gray-600">{item.revenue}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <PieChart className="w-6 h-6 mr-2 text-green-600" />
            Platform Performance
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

  const OptimizationTab = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Optimization Center</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Master each platform's algorithm and maximize your visibility
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
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
        ].map((platform, index) => (
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

  const CommunityTab = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Zurfy University</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Learn, connect, and grow with the world's most successful creative entrepreneurs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
                  <span className="text-yellow-600">★ 4.9</span>
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
                  <span className="text-yellow-600">★ {course.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ai-studio': return <AIStudioTab />;
      case 'intelligence': return <IntelligenceTab />;
      case 'automation': return <AutomationTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'optimization': return <OptimizationTab />;
      case 'community': return <CommunityTab />;
      default: return <AIStudioTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <NavigationTabs />
      {renderTabContent()}
      
      {/* Success-Based Pricing Footer */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Success-Based Pricing</h2>
          <p className="text-xl text-purple-100 mb-8 max-width-2xl mx-auto">
            We only succeed when you succeed. Pay based on your results, not our features.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { plan: 'Creator', price: 'Free', limit: 'Up to $1k/month revenue', features: ['100 products/month', 'Basic analytics', 'Community access'] },
              { plan: 'Professional', price: '3% of revenue', limit: '$1k - $10k/month revenue', features: ['Unlimited products', 'AI intelligence', 'Priority support'] },
              { plan: 'Empire', price: '2% of revenue', limit: '$10k+ monthly revenue', features: ['Everything included', 'Personal success manager', 'Custom integrations'] }
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
          
          <button className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
            Start Your Creative Empire Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZurfyNextGen;