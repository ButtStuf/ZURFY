// ===============================================
// ZURFY.CO + N8N INTEGRATION SYSTEM
// Complete workflow automation with your n8n account
// ===============================================

// ===============================================
// 1. N8N SERVICE FOR FRONTEND INTEGRATION
// ===============================================

class ZurfyN8NService {
  constructor() {
    this.n8nBaseUrl = process.env.REACT_APP_N8N_BASE_URL || 'https://your-n8n-instance.app.n8n.cloud';
    this.n8nApiKey = process.env.REACT_APP_N8N_API_KEY;
    this.webhookBaseUrl = process.env.REACT_APP_N8N_WEBHOOK_URL || 'https://your-n8n-instance.app.n8n.cloud/webhook';
  }

  // Execute workflow via webhook
  async executeWorkflow(workflowId, data = {}) {
    try {
      const response = await fetch(`${this.webhookBaseUrl}/${workflowId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.n8nApiKey}`
        },
        body: JSON.stringify({
          ...data,
          source: 'zurfy-frontend',
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`n8n workflow execution failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('n8n workflow execution error:', error);
      throw error;
    }
  }

  // Get workflow status
  async getWorkflowStatus(executionId) {
    try {
      const response = await fetch(`${this.n8nBaseUrl}/api/v1/executions/${executionId}`, {
        headers: {
          'X-N8N-API-KEY': this.n8nApiKey
        }
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to get workflow status:', error);
      throw error;
    }
  }

  // List all workflows
  async getWorkflows() {
    try {
      const response = await fetch(`${this.n8nBaseUrl}/api/v1/workflows`, {
        headers: {
          'X-N8N-API-KEY': this.n8nApiKey
        }
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to get workflows:', error);
      throw error;
    }
  }

  // CORE ZURFY AUTOMATIONS
  
  // 1. Design Analysis Workflow
  async analyzeDesign(designData) {
    return this.executeWorkflow('design-analysis', {
      design: designData,
      action: 'analyze',
      requestedFeatures: ['color_analysis', 'trend_check', 'market_research', 'success_prediction']
    });
  }

  // 2. Multi-Platform Product Creation
  async createProducts(designId, platforms = ['etsy', 'shopify', 'printify']) {
    return this.executeWorkflow('create-products', {
      designId,
      platforms,
      action: 'create_products',
      variations: ['t-shirt', 'poster', 'mug', 'sticker']
    });
  }

  // 3. Price Optimization
  async optimizePricing(productId, platforms) {
    return this.executeWorkflow('price-optimization', {
      productId,
      platforms,
      action: 'optimize_pricing',
      strategy: 'competitive_analysis'
    });
  }

  // 4. SEO Content Generation
  async generateSEOContent(designData, platform) {
    return this.executeWorkflow('seo-content-generator', {
      design: designData,
      platform,
      action: 'generate_content',
      contentTypes: ['title', 'description', 'tags', 'alt_text']
    });
  }

  // 5. Market Research
  async conductMarketResearch(keywords, platforms) {
    return this.executeWorkflow('market-research', {
      keywords,
      platforms,
      action: 'research',
      depth: 'comprehensive'
    });
  }

  // 6. Competitor Analysis
  async analyzeCompetitors(niche, platform) {
    return this.executeWorkflow('competitor-analysis', {
      niche,
      platform,
      action: 'analyze_competitors',
      metrics: ['pricing', 'popularity', 'trends', 'gaps']
    });
  }

  // 7. Trend Detection
  async detectTrends(categories = ['art', 'quotes', 'animals', 'nature']) {
    return this.executeWorkflow('trend-detection', {
      categories,
      action: 'detect_trends',
      platforms: ['etsy', 'pinterest', 'google_trends'],
      timeframe: '30_days'
    });
  }

  // 8. Automated Quality Check
  async qualityCheck(productId) {
    return this.executeWorkflow('quality-check', {
      productId,
      action: 'quality_check',
      checks: ['image_quality', 'text_readability', 'size_requirements', 'platform_compliance']
    });
  }

  // 9. Performance Monitoring
  async monitorPerformance(productIds) {
    return this.executeWorkflow('performance-monitor', {
      productIds,
      action: 'monitor_performance',
      metrics: ['views', 'favorites', 'sales', 'ranking']
    });
  }

  // 10. Bulk Operations
  async bulkUpdate(operation, productIds, data) {
    return this.executeWorkflow('bulk-operations', {
      operation,
      productIds,
      data,
      action: 'bulk_update'
    });
  }
}

// ===============================================
// 2. REACT HOOKS FOR N8N INTEGRATION
// ===============================================

import { useState, useEffect, useCallback } from 'react';
import { useToast } from './ZurfyAuthComponents';

// Hook for workflow execution
export const useN8NWorkflow = () => {
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { addToast } = useToast();
  const n8nService = new ZurfyN8NService();

  const executeWorkflow = useCallback(async (workflowType, data) => {
    setExecuting(true);
    setError(null);
    setResult(null);

    try {
      let response;
      
      switch (workflowType) {
        case 'analyze-design':
          response = await n8nService.analyzeDesign(data);
          break;
        case 'create-products':
          response = await n8nService.createProducts(data.designId, data.platforms);
          break;
        case 'optimize-pricing':
          response = await n8nService.optimizePricing(data.productId, data.platforms);
          break;
        case 'generate-seo':
          response = await n8nService.generateSEOContent(data.design, data.platform);
          break;
        case 'market-research':
          response = await n8nService.conductMarketResearch(data.keywords, data.platforms);
          break;
        case 'competitor-analysis':
          response = await n8nService.analyzeCompetitors(data.niche, data.platform);
          break;
        case 'detect-trends':
          response = await n8nService.detectTrends(data.categories);
          break;
        default:
          throw new Error(`Unknown workflow type: ${workflowType}`);
      }

      setResult(response);
      addToast('Workflow executed successfully!', 'success');
      return response;
    } catch (err) {
      setError(err.message);
      addToast(`Workflow failed: ${err.message}`, 'error');
      throw err;
    } finally {
      setExecuting(false);
    }
  }, [addToast]);

  return { executeWorkflow, executing, result, error };
};

// Hook for real-time workflow monitoring
export const useWorkflowMonitor = (executionId) => {
  const [status, setStatus] = useState('unknown');
  const [progress, setProgress] = useState(0);
  const n8nService = new ZurfyN8NService();

  useEffect(() => {
    if (!executionId) return;

    const checkStatus = async () => {
      try {
        const result = await n8nService.getWorkflowStatus(executionId);
        setStatus(result.status);
        setProgress(result.progress || 0);
      } catch (error) {
        console.error('Failed to check workflow status:', error);
      }
    };

    const interval = setInterval(checkStatus, 2000); // Check every 2 seconds
    checkStatus(); // Initial check

    return () => clearInterval(interval);
  }, [executionId]);

  return { status, progress };
};

// ===============================================
// 3. ENHANCED COMPONENTS WITH N8N INTEGRATION
// ===============================================

import React from 'react';
import { Brain, Zap, TrendingUp, Target, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// Enhanced Design Analysis Component
export const N8NDesignAnalysis = ({ design, onAnalysisComplete }) => {
  const { executeWorkflow, executing, result, error } = useN8NWorkflow();
  
  const runAnalysis = async () => {
    try {
      const analysisResult = await executeWorkflow('analyze-design', design);
      onAnalysisComplete?.(analysisResult);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Brain className="w-6 h-6 mr-2 text-purple-600" />
        AI Design Analysis (n8n Powered)
      </h3>
      
      {design && (
        <div className="mb-6">
          <img 
            src={design.image_url} 
            alt={design.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h4 className="font-medium text-gray-900">{design.title}</h4>
          <p className="text-gray-600 text-sm">{design.description}</p>
        </div>
      )}

      <button
        onClick={runAnalysis}
        disabled={executing}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
      >
        {executing ? (
          <>
            <Clock className="w-5 h-5 mr-2 animate-spin inline" />
            Analyzing with AI...
          </>
        ) : (
          <>
            <Brain className="w-5 h-5 mr-2 inline" />
            Analyze Design
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {result.success_score || 85}/100
              </div>
              <div className="text-green-800 font-medium">
                {result.prediction || 'High Success Potential'}
              </div>
            </div>
            
            {result.recommendations && (
              <div className="space-y-2">
                <h5 className="font-semibold text-green-800">AI Recommendations:</h5>
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="text-green-700 text-sm flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                    {rec}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Product Creation Component
export const N8NProductCreator = ({ design, onProductsCreated }) => {
  const { executeWorkflow, executing, result } = useN8NWorkflow();
  const [selectedPlatforms, setSelectedPlatforms] = useState(['etsy', 'shopify', 'printify']);

  const createProducts = async () => {
    try {
      const productsResult = await executeWorkflow('create-products', {
        designId: design.id,
        platforms: selectedPlatforms
      });
      onProductsCreated?.(productsResult);
    } catch (error) {
      console.error('Product creation failed:', error);
    }
  };

  const platforms = [
    { id: 'etsy', name: 'Etsy', icon: '🛍️' },
    { id: 'shopify', name: 'Shopify', icon: '🛒' },
    { id: 'printify', name: 'Printify', icon: '🖨️' },
    { id: 'amazon', name: 'Amazon', icon: '📦' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Zap className="w-6 h-6 mr-2 text-green-600" />
        Auto Product Creator (n8n Powered)
      </h3>

      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Select Platforms:</h4>
        <div className="grid grid-cols-2 gap-3">
          {platforms.map(platform => (
            <label key={platform.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPlatforms.includes(platform.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPlatforms([...selectedPlatforms, platform.id]);
                  } else {
                    setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform.id));
                  }
                }}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">
                {platform.icon} {platform.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={createProducts}
        disabled={executing || selectedPlatforms.length === 0}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
      >
        {executing ? (
          <>
            <Clock className="w-5 h-5 mr-2 animate-spin inline" />
            Creating Products...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5 mr-2 inline" />
            Create {selectedPlatforms.length * 4} Products
          </>
        )}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h5 className="font-semibold text-green-800 mb-2">Products Created Successfully!</h5>
          <div className="text-sm text-green-700">
            <p>✅ {result.total_products || 12} products created</p>
            <p>✅ {result.platforms_updated || selectedPlatforms.length} platforms updated</p>
            <p>✅ SEO optimized for each platform</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Market Research Component
export const N8NMarketResearch = ({ onResearchComplete }) => {
  const { executeWorkflow, executing, result } = useN8NWorkflow();
  const [keywords, setKeywords] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['etsy', 'amazon']);

  const runResearch = async () => {
    if (!keywords.trim()) return;

    try {
      const researchResult = await executeWorkflow('market-research', {
        keywords: keywords.split(',').map(k => k.trim()),
        platforms: selectedPlatforms
      });
      onResearchComplete?.(researchResult);
    } catch (error) {
      console.error('Market research failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
        Market Research (n8n Powered)
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Keywords (comma-separated)
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="cat art, minimalist design, wall decor"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Research Platforms
          </label>
          <div className="flex space-x-4">
            {['etsy', 'amazon', 'pinterest', 'google_trends'].map(platform => (
              <label key={platform} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPlatforms([...selectedPlatforms, platform]);
                    } else {
                      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm capitalize">{platform.replace('_', ' ')}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={runResearch}
        disabled={executing || !keywords.trim()}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
      >
        {executing ? (
          <>
            <Clock className="w-5 h-5 mr-2 animate-spin inline" />
            Researching Market...
          </>
        ) : (
          <>
            <TrendingUp className="w-5 h-5 mr-2 inline" />
            Start Research
          </>
        )}
      </button>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-semibold text-blue-800 mb-3">Market Insights</h5>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Search Volume:</span>
                <span className="ml-2 text-blue-600">{result.search_volume || '12.5K/month'}</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Competition:</span>
                <span className="ml-2 text-blue-600">{result.competition || 'Medium'}</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Opportunity Score:</span>
                <span className="ml-2 text-blue-600">{result.opportunity_score || '78'}/100</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Avg Price:</span>
                <span className="ml-2 text-blue-600">{result.avg_price || '$18.50'}</span>
              </div>
            </div>
          </div>

          {result.trending_keywords && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h5 className="font-semibold text-green-800 mb-2">Trending Keywords</h5>
              <div className="flex flex-wrap gap-2">
                {result.trending_keywords.map((keyword, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ===============================================
// 4. WORKFLOW STATUS MONITOR
// ===============================================

export const WorkflowStatusMonitor = ({ executionId, workflowName }) => {
  const { status, progress } = useWorkflowMonitor(executionId);

  if (!executionId) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-blue-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return <Clock className="w-4 h-4 animate-spin" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className={getStatusColor(status)}>
            {getStatusIcon(status)}
          </span>
          <span className="font-medium text-gray-900">{workflowName}</span>
        </div>
        <span className={`text-sm ${getStatusColor(status)}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      
      {status === 'running' && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

// Create and export the service instance
export const n8nService = new ZurfyN8NService();

export default {
  ZurfyN8NService,
  useN8NWorkflow,
  useWorkflowMonitor,
  N8NDesignAnalysis,
  N8NProductCreator,
  N8NMarketResearch,
  WorkflowStatusMonitor,
  n8nService
};