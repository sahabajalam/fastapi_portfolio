// Legacy animations file - replaced by AnimationEngine.js
// This file is kept for backwards compatibility but all functionality
// has been moved to AnimationEngine.js

console.warn('animations.js is deprecated. Use AnimationEngine.js instead.');

// Initialize AnimationEngine if it exists
if (typeof AnimationEngine !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        window.animationEngine = new AnimationEngine();
    });
}

// Keep only the ripple effect as it's unique functionality
document.addEventListener('DOMContentLoaded', function () {
    // Add ripple effect to buttons
    const addRippleEffect = (element, event) => {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(0, 185, 107, 0.2) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    };

    // CSS keyframes for ripple animation
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add ripple to interactive elements
    document.querySelectorAll('.btn-primary, .btn-secondary, .view-all-btn, .project-link, .blog-post').forEach(element => {
        element.addEventListener('click', (e) => {
            addRippleEffect(element, e);
        });
    });
});
