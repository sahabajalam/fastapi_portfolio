// Legacy navigation file - replaced by NavigationManager.js
// This file is kept for backwards compatibility but all functionality
// has been moved to NavigationManager.js

console.warn('navigation.js is deprecated. Use NavigationManager.js instead.');

// Initialize NavigationManager if it exists
if (typeof NavigationManager !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        new NavigationManager();
    });
}
