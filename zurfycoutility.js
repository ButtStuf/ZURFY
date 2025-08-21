// ===============================================
// ZURFY.CO UTILITY COMPONENTS & TESTING SETUP
// Complete solo developer toolkit
// ===============================================

// ===============================================
// 1. UTILITY HOOKS
// ===============================================

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth, useToast } from './ZurfyAuthComponents';

// Hook for infinite scrolling
export const useInfiniteScroll = (fetchMore, hasMore) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!isFetching) return;

    const fetchData = async () => {
      if (hasMore) {
        await fetchMore();
      }
      setIsFetching(false);
    };

    fetchData();
  }, [isFetching, fetchMore, hasMore]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return [isFetching, setIsFetching];
};

// Hook for clipboard operations
export const useClipboard = () => {
  const { addToast } = useToast();
  
  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      addToast('Copied to clipboard!', 'success');
      return true;
    } catch (err) {
      addToast('Failed to copy to clipboard', 'error');
      return false;
    }
  }, [addToast]);

  return { copyToClipboard };
};

// Hook for image upload with preview
export const useImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { addToast } = useToast();

  const handleImageSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      addToast('Please select an image file', 'error');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      addToast('Image size must be less than 5MB', 'error');
      return;
    }

    setImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
  };

  return {
    image,
    preview,
    uploading,
    setUploading,
    handleImageSelect,
    clearImage
  };
};

// Hook for keyboard shortcuts
export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey || event.metaKey;
      const shift = event.shiftKey;
      const alt = event.altKey;

      for (const [shortcut, callback] of Object.entries(shortcuts)) {
        const [targetKey, ...modifiers] = shortcut.split('+').reverse();
        
        if (key === targetKey.toLowerCase()) {
          const hasCtrl = modifiers.includes('ctrl') === ctrl;
          const hasShift = modifiers.includes('shift') === shift;
          const hasAlt = modifiers.includes('alt') === alt;
          
          if (hasCtrl && hasShift && hasAlt) {
            event.preventDefault();
            callback(event);
            break;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

// ===============================================
// 2. ADVANCED UI COMPONENTS
// ===============================================

// Advanced Data Table Component
export const DataTable = ({ 
  data, 
  columns, 
  loading = false, 
  sortable = true, 
  filterable = true,
  pagination = true,
  pageSize = 10 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterConfig, setFilterConfig] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Filter data
  const filteredData = React.useMemo(() => {
    return sortedData.filter(row => {
      return Object.entries(filterConfig).every(([key, value]) => {
        if (!value) return true;
        return String(row[key]).toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [sortedData, filterConfig]);

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!pagination) return filteredData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize, pagination]);

  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilter = (key, value) => {
    setFilterConfig(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / pageSize);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="animate-pulse">
          <div className="bg-gray-50 h-12"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-t h-16 bg-gray-25"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Filters */}
      {filterable && (
        <div className="p-4 bg-gray-50 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {columns.filter(col => col.filterable !== false).map(column => (
              <div key={column.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {column.label}
                </label>
                <input
                  type="text"
                  value={filterConfig[column.key] || ''}
                  onChange={(e) => handleFilter(column.key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder={`Filter by ${column.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    sortable && column.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortable && sortConfig.key === column.key && (
                      <span className="text-purple-600">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map(column => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="bg-white px-4 py-3 border-t flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === i + 1
                    ? 'bg-purple-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Advanced File Upload Component
export const FileUploadZone = ({ 
  onFileSelect, 
  accept = "image/*", 
  multiple = false, 
  maxSize = 5 * 1024 * 1024 // 5MB
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const { addToast } = useToast();

  const validateFile = (file) => {
    if (file.size > maxSize) {
      addToast(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`, 'error');
      return false;
    }
    return true;
  };

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(validateFile);
    if (validFiles.length > 0) {
      onFileSelect(multiple ? validFiles : validFiles[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e) => {
    handleFiles(e.target.files);
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragOver
          ? 'border-purple-400 bg-purple-50'
          : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
      />
      
      <div className="space-y-4">
        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <div>
          <p className="text-lg font-medium text-gray-900">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-gray-500">
            {accept.includes('image') ? 'PNG, JPG, GIF up to' : 'Files up to'} {Math.round(maxSize / (1024 * 1024))}MB
          </p>
        </div>
      </div>
    </div>
  );
};

// Advanced Modal Component
export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  closeOnEscape = true,
  closeOnOverlay = true 
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (closeOnEscape) {
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };
      
      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, closeOnEscape, onClose]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className={`bg-white rounded-xl ${sizes[size]} w-full max-h-[90vh] overflow-hidden shadow-xl transform transition-all`}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// ===============================================
// 3. TESTING UTILITIES
// ===============================================

// Test utilities file (save as src/utils/testUtils.js)
export const testUtils = `
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, ToastProvider } from '../ZurfyAuthComponents';

// Mock implementations
export const mockAuthService = {
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
  getCurrentUser: jest.fn(),
  isAuthenticated: jest.fn()
};

export const mockDesignService = {
  analyzeDesign: jest.fn(),
  getDesigns: jest.fn(),
  updateDesign: jest.fn(),
  deleteDesign: jest.fn()
};

// Custom render function with providers
export const renderWithProviders = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <ToastProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ToastProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Mock user for testing
export const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  plan: 'Professional'
};

// Mock design data
export const mockDesign = {
  id: 1,
  title: 'Test Design',
  description: 'A test design',
  tags: ['test', 'design'],
  image_url: 'https://example.com/image.jpg',
  success_score: 85
};

// Helper functions
export const typeInInput = async (input, value) => {
  const user = userEvent.setup();
  await user.clear(input);
  await user.type(input, value);
};

export const clickButton = async (button) => {
  const user = userEvent.setup();
  await user.click(button);
};

export const waitForLoadingToFinish = () => 
  waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

// Custom matchers
expect.extend({
  toBeVisible(received) {
    const pass = received.style.display !== 'none' && received.style.visibility !== 'hidden';
    return {
      message: () => \`expected element to be \${pass ? 'hidden' : 'visible'}\`,
      pass
    };
  }
});
`;

// Example test file (save as src/components/__tests__/ZurfyDashboard.test.js)
export const exampleTest = `
import React from 'react';
import { screen } from '@testing-library/react';
import ZurfyDashboard from '../ZurfyDashboard';
import { renderWithProviders, mockUser, clickButton } from '../../utils/testUtils';

// Mock the services
jest.mock('../ZurfyAPIService', () => ({
  designService: {
    getDesigns: jest.fn(() => Promise.resolve([])),
    analyzeDesign: jest.fn()
  },
  marketService: {
    getTrendingKeywords: jest.fn(() => Promise.resolve([])),
    getOpportunities: jest.fn(() => Promise.resolve([]))
  }
}));

describe('ZurfyDashboard', () => {
  beforeEach(() => {
    // Mock authenticated user
    localStorage.setItem('zurfy_user', JSON.stringify(mockUser));
    localStorage.setItem('zurfy_token', 'mock-token');
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders dashboard with all tabs', () => {
    renderWithProviders(<ZurfyDashboard />);
    
    expect(screen.getByText('AI Design Studio')).toBeInTheDocument();
    expect(screen.getByText('Market Intelligence')).toBeInTheDocument();
    expect(screen.getByText('Smart Workflows')).toBeInTheDocument();
    expect(screen.getByText('Creator Analytics')).toBeInTheDocument();
    expect(screen.getByText('Platform Optimizer')).toBeInTheDocument();
    expect(screen.getByText('Zurfy University')).toBeInTheDocument();
  });

  test('switches between tabs correctly', async () => {
    renderWithProviders(<ZurfyDashboard />);
    
    const marketTab = screen.getByText('Market Intelligence');
    await clickButton(marketTab);
    
    expect(screen.getByText('Market Intelligence Center')).toBeInTheDocument();
  });

  test('shows AI Studio by default', () => {
    renderWithProviders(<ZurfyDashboard />);
    
    expect(screen.getByText('AI Design Intelligence Studio')).toBeInTheDocument();
    expect(screen.getByText('Design Performance Predictor')).toBeInTheDocument();
  });
});
`;

// ===============================================
// 4. PERFORMANCE MONITORING
// ===============================================

// Performance monitoring utility
export const PerformanceMonitor = ({ children }) => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
          setMetrics(prev => ({
            ...prev,
            [entry.name]: entry.duration
          }));
        }
      }
    });

    observer.observe({ entryTypes: ['measure'] });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  // Log performance metrics in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.table(metrics);
    }
  }, [metrics]);

  return children;
};

// ===============================================
// 5. ERROR REPORTING SETUP
// ===============================================

// Error reporting utility (integrate with Sentry, LogRocket, etc.)
export const ErrorReporter = {
  init() {
    // Initialize error reporting service
    if (process.env.REACT_APP_SENTRY_DSN) {
      // Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
    }
  },

  captureException(error, context = {}) {
    console.error('Error captured:', error, context);
    
    // Send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureException(error, { extra: context });
    }
  },

  captureMessage(message, level = 'info') {
    console.log(\`[\${level.toUpperCase()}] \${message}\`);
    
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureMessage(message, level);
    }
  }
};

// ===============================================
// 6. DEPLOYMENT HELPERS
// ===============================================

// Build information component
export const BuildInfo = () => {
  const buildInfo = {
    version: process.env.REACT_APP_VERSION || '1.0.0',
    buildDate: process.env.REACT_APP_BUILD_DATE || new Date().toISOString(),
    gitCommit: process.env.REACT_APP_GIT_COMMIT || 'unknown',
    environment: process.env.REACT_APP_ENVIRONMENT || 'development'
  };

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs p-2 rounded">
      <div>v{buildInfo.version}</div>
      <div>{buildInfo.environment}</div>
      <div>{buildInfo.gitCommit.slice(0, 7)}</div>
    </div>
  );
};

// Service worker registration
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

export default {
  useInfiniteScroll,
  useClipboard,
  useImageUpload,
  useKeyboardShortcuts,
  DataTable,
  FileUploadZone,
  Modal,
  PerformanceMonitor,
  ErrorReporter,
  BuildInfo,
  registerServiceWorker
};