// ZURFY.CO FRONTEND DASHBOARD
// Solo Developer Frontend Power! ⚡
// React Dashboard for Design Analysis & Automation

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

// ===============================================
// 1. MAIN DASHBOARD COMPONENT
// ===============================================

const ZurfyDashboard = () => {
  const [activeTab, setActiveTab] = useState('designs');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('zurfy_token');
    if (token) {
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // You could also verify token here
    }
  }, []);

  const tabs = [
    { id: 'designs', label: 'Design Analysis', icon: '🎨' },
    { id: 'automation', label: 'Automation', icon: '⚡' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'trends', label: 'Market Trends', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'designs': return <DesignAnalysisTab />;
      case 'automation': return <AutomationTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'trends': return <TrendsTab />;
      case 'settings': return <SettingsTab />;
      default: return <DesignAnalysisTab />;
    }
  };

  return (
    <div className="zurfy-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🚀 Zurfy.co</h1>
          <div className="header-actions">
            <span>AutoFy On The Fly</span>
            <button className="btn-primary">Upgrade to Pro</button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {renderTabContent()}
      </main>

      {/* Loading Overlay */}
      {loading && <LoadingOverlay />}
    </div>
  );
};

// ===============================================
// 2. DESIGN ANALYSIS TAB
// ===============================================

const DesignAnalysisTab = () => {
  const [designs, setDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      const response = await axios.get('/api/designs');
      setDesigns(response.data);
    } catch (error) {
      console.error('Failed to fetch designs:', error);
    }
  };

  const analyzeDesign = async (design) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/designs/analyze', {
        canva_design_id: design.canva_design_id,
        title: design.title,
        description: design.description,
        tags: design.tags,
        image_url: design.image_url
      });
      
      setAnalysisResult(response.data.analysis);
      setSelectedDesign(design);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const uploadNewDesign = async (designData) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/designs/analyze', designData);
      setAnalysisResult(response.data.analysis);
      fetchDesigns(); // Refresh the list
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="design-analysis-tab">
      <div className="tab-header">
        <h2>🎨 Design Analysis & Prediction</h2>
        <DesignUploader onUpload={uploadNewDesign} />
      </div>

      <div className="analysis-content">
        {/* Design Gallery */}
        <div className="design-gallery">
          <h3>Your Designs</h3>
          <div className="design-grid">
            {designs.map(design => (
              <DesignCard 
                key={design.id}
                design={design}
                onAnalyze={() => analyzeDesign(design)}
                isSelected={selectedDesign?.id === design.id}
              />
            ))}
            {designs.length === 0 && (
              <div className="empty-state">
                <p>No designs yet. Upload your first Canva design to get started!</p>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="analysis-results">
            <AnalysisResults 
              result={analysisResult}
              design={selectedDesign}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// ===============================================
// 3. DESIGN CARD COMPONENT
// ===============================================

const DesignCard = ({ design, onAnalyze, isSelected }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  return (
    <div className={`design-card ${isSelected ? 'selected' : ''}`}>
      <div className="card-image">
        <img src={design.thumbnail_url || design.image_url} alt={design.title} />
        {design.success_score && (
          <div 
            className="success-badge"
            style={{ backgroundColor: getScoreColor(design.success_score) }}
          >
            {design.success_score}/100
          </div>
        )}
      </div>
      
      <div className="card-content">
        <h4>{design.title}</h4>
        <div className="card-tags">
          {design.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        
        <div className="card-actions">
          <button 
            className="btn-secondary"
            onClick={onAnalyze}
          >
            🧠 Analyze
          </button>
          <button className="btn-primary">
            🚀 Automate
          </button>
        </div>
      </div>
    </div>
  );
};

// ===============================================
// 4. DESIGN UPLOADER COMPONENT
// ===============================================

const DesignUploader = ({ onUpload }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    image_url: '',
    canva_design_id: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const designData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    onUpload(designData);
    setShowModal(false);
    setFormData({ title: '', description: '', tags: '', image_url: '', canva_design_id: '' });
  };

  return (
    <>
      <button 
        className="btn-primary"
        onClick={() => setShowModal(true)}
      >
        📤 Upload Design
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Upload New Design</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title*</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter design title"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your design"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Tags (comma-separated)*</label>
                <input
                  type="text"
                  required
                  value={formData.tags}
                  onChange={e => setFormData({...formData, tags: e.target.value})}
                  placeholder="cat, minimalist, wall art, printable"
                />
              </div>

              <div className="form-group">
                <label>Image URL*</label>
                <input
                  type="url"
                  required
                  value={formData.image_url}
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://example.com/design.png"
                />
              </div>

              <div className="form-group">
                <label>Canva Design ID (optional)</label>
                <input
                  type="text"
                  value={formData.canva_design_id}
                  onChange={e => setFormData({...formData, canva_design_id: e.target.value})}
                  placeholder="DAFxxxxx"
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Upload & Analyze
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// ===============================================
// 5. ANALYSIS RESULTS COMPONENT
// ===============================================

const AnalysisResults = ({ result, design }) => {
  if (!result) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="analysis-results">
      <div className="results-header">
        <h3>🧠 AI Analysis Results</h3>
        <div className="success-score-large">
          <div 
            className="score-circle"
            style={{ borderColor: getScoreColor(result.success_score) }}
          >
            <span className="score-number">{result.success_score}</span>
            <span className="score-label">/100</span>
          </div>
          <div className="score-description">
            {getScoreLabel(result.success_score)}
          </div>
        </div>
      </div>

      <div className="results-grid">
        {/* Key Metrics */}
        <div className="results-card">
          <h4>📊 Key Metrics</h4>
          <div className="metrics">
            <div className="metric">
              <span className="metric-label">Market Potential</span>
              <div className="metric-bar">
                <div 
                  className="metric-fill"
                  style={{ 
                    width: `${result.market_potential}%`,
                    backgroundColor: getScoreColor(result.market_potential)
                  }}
                />
              </div>
              <span className="metric-value">{result.market_potential}%</span>
            </div>

            <div className="metric">
              <span className="metric-label">Trend Alignment</span>
              <div className="metric-bar">
                <div 
                  className="metric-fill"
                  style={{ 
                    width: `${result.trend_alignment}%`,
                    backgroundColor: getScoreColor(result.trend_alignment)
                  }}
                />
              </div>
              <span className="metric-value">{result.trend_alignment}%</span>
            </div>

            <div className="metric">
              <span className="metric-label">Market Saturation</span>
              <div className="metric-bar">
                <div 
                  className="metric-fill"
                  style={{ 
                    width: `${100 - result.market_saturation}%`,
                    backgroundColor: getScoreColor(100 - result.market_saturation)
                  }}
                />
              </div>
              <span className="metric-value">{result.market_saturation}% saturated</span>
            </div>
          </div>
        </div>

        {/* Revenue Prediction */}
        <div className="results-card">
          <h4>💰 Revenue Prediction</h4>
          <div className="revenue-prediction">
            <div className="revenue-range">
              <span className="range-label">Monthly Estimate</span>
              <span className="range-value">
                ${result.revenue_prediction?.min_monthly || 0} - 
                ${result.revenue_prediction?.max_monthly || 0}
              </span>
            </div>
            <div className="confidence">
              <span className="confidence-label">Confidence</span>
              <span className="confidence-value">
                {result.revenue_prediction?.confidence || 50}%
              </span>
            </div>
          </div>
        </div>

        {/* Color Analysis */}
        {result.visual_analysis?.colors && (
          <div className="results-card">
            <h4>🎨 Color Analysis</h4>
            <div className="color-palette">
              {result.visual_analysis.colors.slice(0, 5).map((color, index) => (
                <div key={index} className="color-item">
                  <div 
                    className="color-swatch"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="color-info">
                    <span className="color-name">{color.name}</span>
                    <span className="color-percentage">{color.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="harmony-score">
              Color Harmony: {result.visual_analysis.color_harmony}/100
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="results-card recommendations">
          <h4>💡 AI Recommendations</h4>
          <div className="recommendations-list">
            {result.recommendations?.map((rec, index) => (
              <div key={index} className={`recommendation ${rec.priority}`}>
                <div className="rec-header">
                  <span className="rec-type">{rec.type.toUpperCase()}</span>
                  <span className={`rec-priority ${rec.priority}`}>
                    {rec.priority.toUpperCase()}
                  </span>
                </div>
                <div className="rec-suggestion">{rec.suggestion}</div>
                <div className="rec-impact">{rec.impact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Optimization */}
        {result.platform_optimization && (
          <div className="results-card">
            <h4>🎯 Platform Optimization</h4>
            <div className="platform-scores">
              {Object.entries(result.platform_optimization).map(([platform, data]) => (
                <div key={platform} className="platform-item">
                  <div className="platform-header">
                    <span className="platform-name">{platform.toUpperCase()}</span>
                    <span className="platform-score">{data.score}/100</span>
                  </div>
                  <div className="platform-suggestions">
                    {data.suggestions?.slice(0, 2).map((suggestion, index) => (
                      <div key={index} className="suggestion-item">
                        • {suggestion}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="results-actions">
        <button className="btn-primary">
          🚀 Create Products
        </button>
        <button className="btn-secondary">
          📊 Save Report
        </button>
        <button className="btn-secondary">
          🔄 Re-analyze
        </button>
      </div>
    </div>
  );
};

// ===============================================
// 6. AUTOMATION TAB
// ===============================================

const AutomationTab = () => {
  const [automations, setAutomations] = useState([]);
  const [activeAutomation, setActiveAutomation] = useState(null);

  useEffect(() => {
    // Load existing automations
    fetchAutomations();
  }, []);

  const fetchAutomations = async () => {
    try {
      const response = await axios.get('/api/automations');
      setAutomations(response.data);
    } catch (error) {
      console.error('Failed to fetch automations:', error);
    }
  };

  const createAutomation = async (automationData) => {
    try {
      const response = await axios.post('/api/automations', automationData);
      setAutomations([...automations, response.data]);
    } catch (error) {
      console.error('Failed to create automation:', error);
    }
  };

  return (
    <div className="automation-tab">
      <div className="tab-header">
        <h2>⚡ Automation Workflows</h2>
        <button className="btn-primary">
          ➕ Create Automation
        </button>
      </div>

      <div className="automation-templates">
        <h3>Quick Start Templates</h3>
        <div className="template-grid">
          <AutomationTemplate
            title="Design → Multi-Platform"
            description="Automatically create products on Etsy, Shopify, and Printify from Canva designs"
            platforms={['canva', 'etsy', 'shopify', 'printify']}
            onClick={() => createAutomation({
              name: 'Design to Products',
              workflow_type: 'design_to_product',
              source_platform: 'canva',
              target_platforms: ['etsy', 'shopify', 'printify']
            })}
          />

          <AutomationTemplate
            title="Price Optimization"
            description="Automatically adjust prices based on competition and demand"
            platforms={['etsy', 'shopify']}
            onClick={() => createAutomation({
              name: 'Smart Pricing',
              workflow_type: 'price_optimization',
              target_platforms: ['etsy', 'shopify']
            })}
          />

          <AutomationTemplate
            title="Trend Monitor"
            description="Monitor trends and create products for viral niches"
            platforms={['trends', 'canva', 'etsy']}
            onClick={() => createAutomation({
              name: 'Trend Tracker',
              workflow_type: 'trend_automation',
              target_platforms: ['etsy', 'shopify']
            })}
          />
        </div>
      </div>

      <div className="active-automations">
        <h3>Active Automations</h3>
        <div className="automation-list">
          {automations.map(automation => (
            <AutomationCard
              key={automation.id}
              automation={automation}
              onToggle={() => {/* Toggle automation */}}
              onEdit={() => setActiveAutomation(automation)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ===============================================
// 7. AUTOMATION TEMPLATE COMPONENT
// ===============================================

const AutomationTemplate = ({ title, description, platforms, onClick }) => {
  const platformIcons = {
    canva: '🎨',
    etsy: '🛍️',
    shopify: '🛒',
    printify: '🖨️',
    trends: '📈'
  };

  return (
    <div className="automation-template" onClick={onClick}>
      <h4>{title}</h4>
      <p>{description}</p>
      <div className="template-platforms">
        {platforms.map(platform => (
          <span key={platform} className="platform-icon">
            {platformIcons[platform]} {platform}
          </span>
        ))}
      </div>
      <button className="template-button">
        Create Automation
      </button>
    </div>
  );
};

// ===============================================
// 8. AUTOMATION CARD COMPONENT
// ===============================================

const AutomationCard = ({ automation, onToggle, onEdit }) => {
  const getStatusColor = (status) => {
    return status === 'active' ? '#4CAF50' : '#FF9800';
  };

  return (
    <div className="automation-card">
      <div className="automation-header">
        <h4>{automation.name}</h4>
        <div className="automation-status">
          <span 
            className="status-indicator"
            style={{ backgroundColor: getStatusColor(automation.status) }}
          />
          {automation.status}
        </div>
      </div>

      <div className="automation-info">
        <div className="info-item">
          <span className="label">Type:</span>
          <span className="value">{automation.workflow_type}</span>
        </div>
        <div className="info-item">
          <span className="label">Platforms:</span>
          <span className="value">{automation.target_platforms?.join(', ')}</span>
        </div>
        <div className="info-item">
          <span className="label">Last Run:</span>
          <span className="value">
            {automation.last_run ? new Date(automation.last_run).toLocaleDateString() : 'Never'}
          </span>
        </div>
      </div>

      <div className="automation-actions">
        <button className="btn-secondary" onClick={onEdit}>
          ✏️ Edit
        </button>
        <button 
          className={`btn-${automation.status === 'active' ? 'danger' : 'primary'}`}
          onClick={onToggle}
        >
          {automation.status === 'active' ? '⏸️ Pause' : '▶️ Start'}
        </button>
      </div>
    </div>
  );
};

// ===============================================
// 9. ANALYTICS TAB (SIMPLIFIED)
// ===============================================

const AnalyticsTab = () => {
  const [analytics, setAnalytics] = useState(null);
  const [timeRange, setTimeRange] = useState('30');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`/api/analytics/dashboard?days=${timeRange}`);
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  if (!analytics) {
    return <div className="loading">Loading analytics...</div>;
  }

  return (
    <div className="analytics-tab">
      <div className="tab-header">
        <h2>📊 Analytics Dashboard</h2>
        <select 
          value={timeRange} 
          onChange={e => setTimeRange(e.target.value)}
          className="time-range-select"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="analytics-overview">
        <div className="metric-card">
          <h3>Total Revenue</h3>
          <div className="metric-value">${analytics.total_revenue.toFixed(2)}</div>
        </div>
        
        <div className="metric-card">
          <h3>Designs Analyzed</h3>
          <div className="metric-value">{analytics.designs_count || 0}</div>
        </div>
        
        <div className="metric-card">
          <h3>Products Created</h3>
          <div className="metric-value">{analytics.products_count || 0}</div>
        </div>
        
        <div className="metric-card">
          <h3>Success Rate</h3>
          <div className="metric-value">{analytics.success_rate || 0}%</div>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-section">
          <h3>Platform Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.platform_breakdown}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-section">
          <h3>Top Performing Designs</h3>
          <div className="top-designs">
            {analytics.top_designs?.map((design, index) => (
              <div key={index} className="design-performance">
                <span className="design-rank">#{index + 1}</span>
                <span className="design-title">{design.title}</span>
                <span className="design-revenue">${design.revenue?.toFixed(2) || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===============================================
// 10. TRENDS TAB (SIMPLIFIED)
// ===============================================

const TrendsTab = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/trends/etsy');
      setTrends(response.data);
    } catch (error) {
      console.error('Failed to fetch trends:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trends-tab">
      <div className="tab-header">
        <h2>📈 Market Trends</h2>
        <button className="btn-primary" onClick={fetchTrends}>
          🔄 Refresh Trends
        </button>
      </div>

      {loading ? (
        <div className="loading">Fetching latest trends...</div>
      ) : (
        <div className="trends-list">
          {trends.map((trend, index) => (
            <div key={index} className="trend-item">
              <div className="trend-rank">#{index + 1}</div>
              <div className="trend-content">
                <h4>{trend.keyword}</h4>
                <div className="trend-metrics">
                  <span className="metric">
                    📊 Volume: {trend.search_volume?.toLocaleString()}
                  </span>
                  <span className="metric">
                    🎯 Competition: {trend.competition_level}
                  </span>
                  <span className="metric">
                    💎 Opportunity: {trend.opportunity_score}/100
                  </span>
                </div>
              </div>
              <button className="btn-secondary">
                🚀 Create Design
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ===============================================
// 11. SETTINGS TAB (SIMPLIFIED)
// ===============================================

const SettingsTab = () => {
  const [apiKeys, setApiKeys] = useState({
    canva: '',
    etsy: '',
    shopify: '',
    printify: ''
  });

  const saveApiKeys = async () => {
    try {
      await axios.post('/api/settings/api-keys', apiKeys);
      alert('API keys saved successfully!');
    } catch (error) {
      console.error('Failed to save API keys:', error);
      alert('Failed to save API keys. Please try again.');
    }
  };

  return (
    <div className="settings-tab">
      <div className="tab-header">
        <h2>⚙️ Settings</h2>
      </div>

      <div className="settings-section">
        <h3>API Configuration</h3>
        <div className="api-keys-form">
          {Object.entries(apiKeys).map(([platform, key]) => (
            <div key={platform} className="form-group">
              <label>{platform.charAt(0).toUpperCase() + platform.slice(1)} API Key</label>
              <input
                type="password"
                value={key}
                onChange={e => setApiKeys({...apiKeys, [platform]: e.target.value})}
                placeholder={`Enter your ${platform} API key`}
              />
            </div>
          ))}
          <button className="btn-primary" onClick={saveApiKeys}>
            💾 Save API Keys
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>Automation Preferences</h3>
        <div className="preferences">
          <label className="checkbox-label">
            <input type="checkbox" /> Auto-create products for high-scoring designs (80+)
          </label>
          <label className="checkbox-label">
            <input type="checkbox" /> Send daily trend reports
          </label>
          <label className="checkbox-label">
            <input type="checkbox" /> Enable smart pricing optimization
          </label>
        </div>
      </div>
    </div>
  );
};

// ===============================================
// 12. LOADING OVERLAY
// ===============================================

const LoadingOverlay = () => (
  <div className="loading-overlay">
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Processing your request...</p>
    </div>
  </div>
);

// ===============================================
// 13. EXPORT MAIN COMPONENT
// ===============================================

export default ZurfyDashboard;

// ===============================================
// 14. CSS STYLES (ADD TO SEPARATE FILE)
// ===============================================

const styles = `
/* ZURFY DASHBOARD STYLES */

.zurfy-dashboard {
  min-height: 100vh;
  background: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.dashboard-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.header-content h1 {
  margin: 0;
  font-size: 1.8rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dashboard-nav {
  background: white;
  padding: 0 2rem;
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid #e0e0e0;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
}

.nav-tab:hover {
  color: #667eea;
}

.nav-tab.active {
  color: #667eea;
  border-bottom-color: #667eea;
}

.dashboard-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #f8f9fa;
  color: #495057;
  border: 1px solid #dee2e6;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #e9ecef;
}

/* Design Analysis Styles */
.design-analysis-tab {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.design-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.design-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.design-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.design-card.selected {
  border: 2px solid #667eea;
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.success-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.card-content {
  padding: 1rem;
}

.card-content h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: #f1f3f4;
  color: #5f6368;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

/* Analysis Results Styles */
.analysis-results {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.score-circle {
  width: 80px;
  height: 80px;
  border: 4px solid;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.score-number {
  font-size: 1.5rem;
  font-weight: bold;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.results-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.metric {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.metric-bar {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  transition: width 0.5s ease;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

/* Loading Styles */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-nav {
    flex-direction: column;
    gap: 0;
  }
  
  .nav-tab {
    padding: 0.75rem 0;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .design-grid {
    grid-template-columns: 1fr;
  }
}
`;

// Add this CSS to your app or create a separate zurfy-dashboard.css file