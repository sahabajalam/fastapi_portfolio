// Home page specific functionality
// Note: Navigation functionality has been moved to NavigationManager.js

document.addEventListener('DOMContentLoaded', function () {
    // Initialize NavigationManager for this page
    if (typeof NavigationManager !== 'undefined') {
        new NavigationManager();
    }

    // Initialize AnimationEngine for this page
    if (typeof AnimationEngine !== 'undefined') {
        window.animationEngine = new AnimationEngine();
    }

    // Page-specific functionality
    initInspiringQuoteEffects();
    initNavbarScrollEffect();
});

// Initialize inspiring quote section effects
function initInspiringQuoteEffects() {
    // Add subtle parallax effect to background quote marks in inspiring quote section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.15;

        const mark1 = document.querySelector('.inspiring-quote-section .bg-quote-mark.mark-1');
        const mark2 = document.querySelector('.inspiring-quote-section .bg-quote-mark.mark-2');

        if (mark1) {
            mark1.style.transform = `translateY(${rate}px) rotate(${rate * 0.08}deg)`;
        }
        if (mark2) {
            mark2.style.transform = `translateY(${rate * 0.6}px) rotate(${rate * -0.08}deg)`;
        }
    });

    // Add ripple effect on inspiring quote card click
    const inspiringCard = document.querySelector('.inspiring-quote-card');
    if (inspiringCard) {
        inspiringCard.addEventListener('click', function (e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(0, 185, 107, 0.1) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    }
}

// Initialize navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                // Handle navbar scrolled effect
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Utility functions (kept for backward compatibility)
function scrollToBlog() {
    document.getElementById('blog')?.scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth'
    });
}
