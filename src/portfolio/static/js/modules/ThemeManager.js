class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        this.loadSavedTheme();
        this.setupThemeToggle();
        this.setupSystemThemeDetection();
        this.applyTheme(this.currentTheme);
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Check for system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.currentTheme = 'dark';
            }
        }
    }

    setupThemeToggle() {
        const themeToggle = document.querySelector('#theme-toggle');
        const themeToggleMobile = document.querySelector('#theme-toggle-mobile');

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        if (themeToggleMobile) {
            themeToggleMobile.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Update toggle button states
        this.updateToggleButtons();
    }

    setupSystemThemeDetection() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addListener((e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem('portfolio-theme')) {
                    this.currentTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme(this.currentTheme);
                    this.updateToggleButtons();
                }
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveTheme();
        this.updateToggleButtons();
        this.animateThemeTransition();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            const colors = {
                light: '#ffffff',
                dark: '#1a1a1a'
            };
            metaThemeColor.setAttribute('content', colors[theme] || colors.light);
        }

        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme }
        }));
    }

    saveTheme() {
        localStorage.setItem('portfolio-theme', this.currentTheme);
    }

    updateToggleButtons() {
        const toggleButtons = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');

        toggleButtons.forEach(button => {
            if (!button) return;

            const icon = button.querySelector('i');
            const text = button.querySelector('.theme-text');

            if (this.currentTheme === 'dark') {
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
                if (text) {
                    text.textContent = 'Light Mode';
                }
                button.setAttribute('aria-label', 'Switch to light mode');
                button.title = 'Switch to light mode';
            } else {
                if (icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
                if (text) {
                    text.textContent = 'Dark Mode';
                }
                button.setAttribute('aria-label', 'Switch to dark mode');
                button.title = 'Switch to dark mode';
            }
        });
    }

    animateThemeTransition() {
        // Add transition class to body
        document.body.classList.add('theme-transitioning');

        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);

        // Optional: Ripple effect from toggle button
        const themeToggle = document.querySelector('#theme-toggle:hover') ||
            document.querySelector('#theme-toggle-mobile:hover');

        if (themeToggle) {
            this.createRippleEffect(themeToggle);
        }
    }

    createRippleEffect(button) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('div');

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = rect.left + (rect.width / 2) - (size / 2) + 'px';
        ripple.style.top = rect.top + (rect.height / 2) - (size / 2) + 'px';
        ripple.classList.add('theme-ripple');

        document.body.appendChild(ripple);

        // Animate ripple
        setTimeout(() => {
            ripple.style.transform = 'scale(4)';
            ripple.style.opacity = '0';
        }, 10);

        // Remove ripple after animation
        setTimeout(() => {
            document.body.removeChild(ripple);
        }, 600);
    }

    // Get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Set theme programmatically
    setTheme(theme) {
        if (['light', 'dark'].includes(theme)) {
            this.currentTheme = theme;
            this.applyTheme(theme);
            this.saveTheme();
            this.updateToggleButtons();
        }
    }

    // Check if dark theme is active
    isDarkTheme() {
        return this.currentTheme === 'dark';
    }

    // Theme-aware color utilities
    getThemeColor(colorName) {
        const colors = {
            light: {
                primary: '#2563eb',
                secondary: '#64748b',
                accent: '#f59e0b',
                background: '#ffffff',
                surface: '#f8fafc',
                text: '#1e293b',
                textSecondary: '#64748b',
                border: '#e2e8f0'
            },
            dark: {
                primary: '#3b82f6',
                secondary: '#94a3b8',
                accent: '#fbbf24',
                background: '#0f172a',
                surface: '#1e293b',
                text: '#f1f5f9',
                textSecondary: '#94a3b8',
                border: '#334155'
            }
        };

        return colors[this.currentTheme]?.[colorName] || colors.light[colorName];
    }

    // Apply theme to dynamically created elements
    applyThemeToElement(element) {
        if (this.currentTheme === 'dark') {
            element.classList.add('dark-theme');
        } else {
            element.classList.remove('dark-theme');
        }
    }

    // Theme transition for images
    updateImages() {
        const themeImages = document.querySelectorAll('[data-light-src][data-dark-src]');

        themeImages.forEach(img => {
            const lightSrc = img.dataset.lightSrc;
            const darkSrc = img.dataset.darkSrc;

            if (this.currentTheme === 'dark' && darkSrc) {
                img.src = darkSrc;
            } else if (lightSrc) {
                img.src = lightSrc;
            }
        });
    }

    // Update external links (like social media icons) for theme
    updateExternalAssets() {
        // Update social media icons if they need theme variants
        const socialIcons = document.querySelectorAll('.social-icon[data-theme-variant]');

        socialIcons.forEach(icon => {
            const baseClass = icon.dataset.themeVariant;
            icon.className = `social-icon ${baseClass}-${this.currentTheme}`;
        });
    }

    // Initialize theme for new pages
    initializePageTheme() {
        this.applyTheme(this.currentTheme);
        this.updateToggleButtons();
        this.updateImages();
        this.updateExternalAssets();
    }

    // Export theme settings
    exportThemeSettings() {
        return {
            theme: this.currentTheme,
            timestamp: new Date().toISOString(),
            systemPreference: window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        };
    }

    // Import theme settings
    importThemeSettings(settings) {
        if (settings && settings.theme) {
            this.setTheme(settings.theme);
        }
    }
}
