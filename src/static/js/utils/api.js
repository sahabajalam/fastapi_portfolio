// API utility functions
class ApiClient {
    constructor(baseURL = '/api') {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        };
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: { ...this.defaultHeaders, ...options.headers },
            ...options
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }

            return await response.text();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;

        return this.request(url, {
            method: 'GET'
        });
    }

    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async put(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }

    async uploadFile(endpoint, file, additionalData = {}) {
        const formData = new FormData();
        formData.append('file', file);

        Object.keys(additionalData).forEach(key => {
            formData.append(key, additionalData[key]);
        });

        return this.request(endpoint, {
            method: 'POST',
            body: formData,
            headers: {} // Let browser set Content-Type for FormData
        });
    }
}

// Portfolio API endpoints
class PortfolioAPI {
    constructor() {
        this.client = new ApiClient();
    }

    // Blog endpoints
    async getBlogs() {
        return this.client.get('/blogs/');
    }

    async getBlog(id) {
        return this.client.get(`/blogs/${id}`);
    }

    async getFeaturedBlogs(limit = 3) {
        return this.client.get('/blogs/featured/', { limit });
    }

    // Portfolio endpoints
    async getPersonalInfo() {
        return this.client.get('/portfolio/info');
    }

    async getProjects() {
        return this.client.get('/portfolio/projects');
    }

    async getCertifications() {
        return this.client.get('/portfolio/certifications');
    }

    // Content endpoints
    async getMetadata() {
        return this.client.get('/v1/content/metadata');
    }

    async getNavigation() {
        return this.client.get('/v1/content/navigation');
    }

    // Health check
    async healthCheck() {
        return this.client.get('/v1/health/');
    }
}

// Request cache utility
class RequestCache {
    constructor(maxAge = 5 * 60 * 1000) { // 5 minutes default
        this.cache = new Map();
        this.maxAge = maxAge;
    }

    generateKey(url, options) {
        return `${url}_${JSON.stringify(options)}`;
    }

    set(url, options, data) {
        const key = this.generateKey(url, options);
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    get(url, options) {
        const key = this.generateKey(url, options);
        const cached = this.cache.get(key);

        if (!cached) return null;

        if (Date.now() - cached.timestamp > this.maxAge) {
            this.cache.delete(key);
            return null;
        }

        return cached.data;
    }

    clear() {
        this.cache.clear();
    }

    delete(url, options) {
        const key = this.generateKey(url, options);
        this.cache.delete(key);
    }
}

// Cached API client
class CachedApiClient extends ApiClient {
    constructor(baseURL = '/api', cacheMaxAge = 5 * 60 * 1000) {
        super(baseURL);
        this.cache = new RequestCache(cacheMaxAge);
    }

    async request(endpoint, options = {}) {
        // Only cache GET requests
        if (options.method !== 'GET' && !options.method) {
            const cached = this.cache.get(endpoint, options);
            if (cached) {
                return cached;
            }
        }

        const data = await super.request(endpoint, options);

        // Cache successful GET requests
        if (options.method !== 'GET' && !options.method) {
            this.cache.set(endpoint, options, data);
        }

        return data;
    }
}

// Error handling utilities
function handleApiError(error) {
    console.error('API Error:', error);

    if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return {
            message: 'Network error. Please check your connection.',
            type: 'network'
        };
    }

    if (error.message.includes('404')) {
        return {
            message: 'Resource not found.',
            type: 'not_found'
        };
    }

    if (error.message.includes('500')) {
        return {
            message: 'Server error. Please try again later.',
            type: 'server'
        };
    }

    return {
        message: 'An unexpected error occurred.',
        type: 'unknown'
    };
}

// Loading state manager
class LoadingManager {
    constructor() {
        this.loadingStates = new Set();
        this.callbacks = [];
    }

    start(key) {
        this.loadingStates.add(key);
        this.notifyCallbacks();
    }

    stop(key) {
        this.loadingStates.delete(key);
        this.notifyCallbacks();
    }

    isLoading(key = null) {
        if (key) {
            return this.loadingStates.has(key);
        }
        return this.loadingStates.size > 0;
    }

    onStateChange(callback) {
        this.callbacks.push(callback);
    }

    notifyCallbacks() {
        this.callbacks.forEach(callback => {
            callback(this.isLoading(), Array.from(this.loadingStates));
        });
    }
}

// Initialize global instances
const portfolioAPI = new PortfolioAPI();
const loadingManager = new LoadingManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ApiClient,
        PortfolioAPI,
        RequestCache,
        CachedApiClient,
        handleApiError,
        LoadingManager,
        portfolioAPI,
        loadingManager
    };
}
