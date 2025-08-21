// ===============================================
// ZURFY.CO API SERVICES & AUTHENTICATION
// Complete frontend integration layer for solo developer
// ===============================================

// ===============================================
// 1. API CONFIGURATION & BASE SERVICE
// ===============================================

class ZurfyAPIService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    this.token = localStorage.getItem('zurfy_token');
    this.refreshToken = localStorage.getItem('zurfy_refresh_token');
  }

  // Set authorization header
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Handle API errors
  async handleResponse(response) {
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, try to refresh
        const refreshed = await this.refreshAccessToken();
        if (!refreshed) {
          this.logout();
          throw new Error('Session expired. Please log in again.');
        }
        // Retry the original request
        return null; // Signal to retry
      }
      
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Something went wrong');
    }
    
    return response.json();
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      let response = await fetch(url, config);
      const result = await this.handleResponse(response);
      
      // If we need to retry due to token refresh
      if (result === null) {
        config.headers = this.getHeaders(); // Update headers with new token
        response = await fetch(url, config);
        return this.handleResponse(response);
      }
      
      return result;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Refresh access token
  async refreshAccessToken() {
    if (!this.refreshToken) return false;

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        this.token = data.accessToken;
        localStorage.setItem('zurfy_token', data.accessToken);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    return false;
  }

  // Logout and clean up
  logout() {
    this.token = null;
    this.refreshToken = null;
    localStorage.removeItem('zurfy_token');
    localStorage.removeItem('zurfy_refresh_token');
    localStorage.removeItem('zurfy_user');
    window.location.href = '/login';
  }
}

// ===============================================
// 2. AUTHENTICATION SERVICE
// ===============================================

class AuthService extends ZurfyAPIService {
  // Login user
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (data.accessToken) {
      this.token = data.accessToken;
      this.refreshToken = data.refreshToken;
      localStorage.setItem('zurfy_token', data.accessToken);
      localStorage.setItem('zurfy_refresh_token', data.refreshToken);
      localStorage.setItem('zurfy_user', JSON.stringify(data.user));
    }

    return data;
  }

  // Register new user
  async register(userData) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (data.accessToken) {
      this.token = data.accessToken;
      this.refreshToken = data.refreshToken;
      localStorage.setItem('zurfy_token', data.accessToken);
      localStorage.setItem('zurfy_refresh_token', data.refreshToken);
      localStorage.setItem('zurfy_user', JSON.stringify(data.user));
    }

    return data;
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('zurfy_user');
    return user ? JSON.parse(user) : null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }

  // Request password reset
  async requestPasswordReset(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Reset password
  async resetPassword(token, password) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  }

  // Update user profile
  async updateProfile(profileData) {
    const data = await this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });

    if (data.user) {
      localStorage.setItem('zurfy_user', JSON.stringify(data.user));
    }

    return data;
  }
}

// ===============================================
// 3. DESIGN ANALYSIS SERVICE
// ===============================================

class DesignService extends ZurfyAPIService {
  // Upload and analyze design
  async analyzeDesign(designData) {
    return this.request('/designs/analyze', {
      method: 'POST',
      body: JSON.stringify(designData),
    });
  }

  // Get user's designs
  async getDesigns(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/designs?${params}`);
  }

  // Get design by ID
  async getDesign(id) {
    return this.request(`/designs/${id}`);
  }

  // Update design
  async updateDesign(id, designData) {
    return this.request(`/designs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(designData),
    });
  }

  // Delete design
  async deleteDesign(id) {
    return this.request(`/designs/${id}`, {
      method: 'DELETE',
    });
  }

  // Get design performance metrics
  async getDesignMetrics(id, timeRange = '30d') {
    return this.request(`/designs/${id}/metrics?range=${timeRange}`);
  }

  // Bulk analyze designs
  async bulkAnalyze(designIds) {
    return this.request('/designs/bulk-analyze', {
      method: 'POST',
      body: JSON.stringify({ designIds }),
    });
  }

  // Get similar designs
  async getSimilarDesigns(designId) {
    return this.request(`/designs/${designId}/similar`);
  }
}

// ===============================================
// 4. MARKET INTELLIGENCE SERVICE
// ===============================================

class MarketService extends ZurfyAPIService {
  // Get trending keywords
  async getTrendingKeywords(platform = 'all') {
    return this.request(`/market/trends?platform=${platform}`);
  }

  // Get market opportunities
  async getOpportunities(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/market/opportunities?${params}`);
  }

  // Get competitor analysis
  async getCompetitorAnalysis(niche) {
    return this.request(`/market/competitors?niche=${encodeURIComponent(niche)}`);
  }

  // Get market saturation data
  async getMarketSaturation(keyword) {
    return this.request(`/market/saturation?keyword=${encodeURIComponent(keyword)}`);
  }

  // Get pricing recommendations
  async getPricingRecommendations(designId, platforms) {
    return this.request('/market/pricing', {
      method: 'POST',
      body: JSON.stringify({ designId, platforms }),
    });
  }

  // Get market reports
  async getMarketReport(timeRange = '30d') {
    return this.request(`/market/report?range=${timeRange}`);
  }

  // Search trends by keyword
  async searchTrends(keyword, platform = 'all') {
    return this.request(`/market/search?keyword=${encodeURIComponent(keyword)}&platform=${platform}`);
  }
}

// ===============================================
// 5. AUTOMATION SERVICE
// ===============================================

class AutomationService extends ZurfyAPIService {
  // Get user's automations
  async getAutomations() {
    return this.request('/automations');
  }

  // Create new automation
  async createAutomation(automationData) {
    return this.request('/automations', {
      method: 'POST',
      body: JSON.stringify(automationData),
    });
  }

  // Update automation
  async updateAutomation(id, automationData) {
    return this.request(`/automations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(automationData),
    });
  }

  // Delete automation
  async deleteAutomation(id) {
    return this.request(`/automations/${id}`, {
      method: 'DELETE',
    });
  }

  // Start/stop automation
  async toggleAutomation(id, action) {
    return this.request(`/automations/${id}/${action}`, {
      method: 'POST',
    });
  }

  // Get automation logs
  async getAutomationLogs(id, limit = 50) {
    return this.request(`/automations/${id}/logs?limit=${limit}`);
  }

  // Test automation
  async testAutomation(id) {
    return this.request(`/automations/${id}/test`, {
      method: 'POST',
    });
  }

  // Get automation templates
  async getTemplates() {
    return this.request('/automations/templates');
  }
}

// ===============================================
// 6. PLATFORM INTEGRATION SERVICE
// ===============================================

class PlatformService extends ZurfyAPIService {
  // Connect platform
  async connectPlatform(platform, credentials) {
    return this.request('/platforms/connect', {
      method: 'POST',
      body: JSON.stringify({ platform, credentials }),
    });
  }

  // Disconnect platform
  async disconnectPlatform(platform) {
    return this.request(`/platforms/disconnect/${platform}`, {
      method: 'POST',
    });
  }

  // Get connected platforms
  async getConnectedPlatforms() {
    return this.request('/platforms');
  }

  // Test platform connection
  async testConnection(platform) {
    return this.request(`/platforms/test/${platform}`, {
      method: 'POST',
    });
  }

  // Sync platform data
  async syncPlatform(platform) {
    return this.request(`/platforms/sync/${platform}`, {
      method: 'POST',
    });
  }

  // Get platform products
  async getPlatformProducts(platform, filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/platforms/${platform}/products?${params}`);
  }

  // Create product on platform
  async createProduct(platform, productData) {
    return this.request(`/platforms/${platform}/products`, {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  // Update product on platform
  async updateProduct(platform, productId, productData) {
    return this.request(`/platforms/${platform}/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  // Get platform analytics
  async getPlatformAnalytics(platform, timeRange = '30d') {
    return this.request(`/platforms/${platform}/analytics?range=${timeRange}`);
  }
}

// ===============================================
// 7. ANALYTICS SERVICE
// ===============================================

class AnalyticsService extends ZurfyAPIService {
  // Get dashboard metrics
  async getDashboardMetrics(timeRange = '30d') {
    return this.request(`/analytics/dashboard?range=${timeRange}`);
  }

  // Get design performance analytics
  async getDesignAnalytics(timeRange = '30d', filters = {}) {
    const params = new URLSearchParams({ range: timeRange, ...filters });
    return this.request(`/analytics/designs?${params}`);
  }

  // Get revenue analytics
  async getRevenueAnalytics(timeRange = '30d', groupBy = 'day') {
    return this.request(`/analytics/revenue?range=${timeRange}&groupBy=${groupBy}`);
  }

  // Get platform performance
  async getPlatformPerformance(timeRange = '30d') {
    return this.request(`/analytics/platforms?range=${timeRange}`);
  }

  // Get conversion funnel
  async getConversionFunnel(timeRange = '30d') {
    return this.request(`/analytics/funnel?range=${timeRange}`);
  }

  // Get customer analytics
  async getCustomerAnalytics(timeRange = '30d') {
    return this.request(`/analytics/customers?range=${timeRange}`);
  }

  // Export analytics data
  async exportAnalytics(type, timeRange = '30d', format = 'csv') {
    return this.request(`/analytics/export?type=${type}&range=${timeRange}&format=${format}`);
  }
}

// ===============================================
// 8. NOTIFICATION SERVICE
// ===============================================

class NotificationService extends ZurfyAPIService {
  // Get user notifications
  async getNotifications(unreadOnly = false) {
    return this.request(`/notifications?unreadOnly=${unreadOnly}`);
  }

  // Mark notification as read
  async markAsRead(notificationId) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'POST',
    });
  }

  // Mark all notifications as read
  async markAllAsRead() {
    return this.request('/notifications/read-all', {
      method: 'POST',
    });
  }

  // Delete notification
  async deleteNotification(notificationId) {
    return this.request(`/notifications/${notificationId}`, {
      method: 'DELETE',
    });
  }

  // Update notification preferences
  async updatePreferences(preferences) {
    return this.request('/notifications/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }

  // Get notification preferences
  async getPreferences() {
    return this.request('/notifications/preferences');
  }
}

// ===============================================
// 9. FILE UPLOAD SERVICE
// ===============================================

class UploadService extends ZurfyAPIService {
  // Upload file
  async uploadFile(file, type = 'design') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return fetch(`${this.baseURL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: formData,
    }).then(this.handleResponse.bind(this));
  }

  // Upload multiple files
  async uploadFiles(files, type = 'design') {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    formData.append('type', type);

    return fetch(`${this.baseURL}/upload/multiple`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: formData,
    }).then(this.handleResponse.bind(this));
  }

  // Get upload progress (for large files)
  async uploadWithProgress(file, type = 'design', onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const percentComplete = (e.loaded / e.total) * 100;
          onProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error('Upload failed'));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('POST', `${this.baseURL}/upload`);
      xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      xhr.send(formData);
    });
  }
}

// ===============================================
// 10. WEBSOCKET SERVICE FOR REAL-TIME UPDATES
// ===============================================

class WebSocketService {
  constructor() {
    this.ws = null;
    this.reconnectInterval = 5000;
    this.maxReconnectAttempts = 10;
    this.reconnectAttempts = 0;
    this.listeners = new Map();
  }

  connect() {
    const token = localStorage.getItem('zurfy_token');
    if (!token) return;

    const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:3001';
    this.ws = new WebSocket(`${wsUrl}?token=${token}`);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      } catch (error) {
        console.error('WebSocket message parse error:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.attemptReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, this.reconnectInterval);
    }
  }

  handleMessage(data) {
    const { type, payload } = data;
    const listeners = this.listeners.get(type);
    
    if (listeners) {
      listeners.forEach(callback => callback(payload));
    }
  }

  subscribe(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType).add(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(eventType);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.listeners.delete(eventType);
        }
      }
    };
  }

  send(type, payload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }
}

// ===============================================
// 11. SERVICE INSTANCES & EXPORTS
// ===============================================

// Create service instances
export const authService = new AuthService();
export const designService = new DesignService();
export const marketService = new MarketService();
export const automationService = new AutomationService();
export const platformService = new PlatformService();
export const analyticsService = new AnalyticsService();
export const notificationService = new NotificationService();
export const uploadService = new UploadService();
export const wsService = new WebSocketService();

// ===============================================
// 12. UTILITY FUNCTIONS
// ===============================================

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

// Format percentage
export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

// Format date
export const formatDate = (date, options = {}) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(new Date(date));
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate URL
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Get file extension
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// ===============================================
// 13. ERROR HANDLING
// ===============================================

export class ZurfyError extends Error {
  constructor(message, code, details) {
    super(message);
    this.name = 'ZurfyError';
    this.code = code;
    this.details = details;
  }
}

// Global error handler
export const handleError = (error, context = '') => {
  console.error(`Error in ${context}:`, error);
  
  // Send error to monitoring service (if available)
  if (process.env.NODE_ENV === 'production') {
    // Analytics/monitoring service integration
    // Example: Sentry, LogRocket, etc.
  }
  
  // Return user-friendly message
  if (error instanceof ZurfyError) {
    return error.message;
  }
  
  if (error.message?.includes('Network')) {
    return 'Network error. Please check your connection and try again.';
  }
  
  return 'Something went wrong. Please try again.';
};

// ===============================================
// 14. LOCAL STORAGE HELPERS
// ===============================================

export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  }
};

// ===============================================
// 15. INITIALIZATION
// ===============================================

// Initialize services when module loads
export const initializeServices = () => {
  // Connect WebSocket if user is authenticated
  if (authService.isAuthenticated()) {
    wsService.connect();
  }
  
  // Set up global error handling
  window.addEventListener('unhandledrejection', (event) => {
    handleError(event.reason, 'Unhandled Promise Rejection');
  });
  
  console.log('🚀 Zurfy services initialized');
};

// Auto-initialize when imported
initializeServices();