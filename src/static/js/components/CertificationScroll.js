/**
 * Certification Scroll Component
 * Handles scroll behavior and visual indicators for certification cards
 */

class CertificationScroll {
    constructor() {
        this.initScrollIndicator();
    }

    initScrollIndicator() {
        const scrollContainer = document.getElementById('certification-container');
        const scrollHint = document.getElementById('scroll-hint');
        const scrollFadeTop = document.getElementById('scroll-fade-top');
        const scrollFadeBottom = document.getElementById('scroll-fade-bottom');

        if (!scrollContainer) return;

        // Add scroll event listener
        scrollContainer.addEventListener('scroll', () => {
            this.handleScroll(scrollContainer, scrollHint, scrollFadeTop, scrollFadeBottom);
        });

        // Initial check
        this.handleScroll(scrollContainer, scrollHint, scrollFadeTop, scrollFadeBottom);

        // Auto-hide scroll hint if content doesn't overflow
        setTimeout(() => {
            if (scrollContainer.scrollHeight <= scrollContainer.clientHeight) {
                if (scrollHint) {
                    scrollHint.style.display = 'none';
                }
                if (scrollFadeBottom) {
                    scrollFadeBottom.style.opacity = '0';
                }
            }
        }, 100);
    }

    handleScroll(container, scrollHint, scrollFadeTop, scrollFadeBottom) {
        const isScrolledToBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
        const isScrolledFromTop = container.scrollTop > 10;

        // Handle scroll hint visibility
        if (scrollHint) {
            if (container.scrollTop > 20) {
                scrollHint.style.opacity = '0';
                scrollHint.style.transform = 'translateY(-10px)';
            } else {
                scrollHint.style.opacity = '1';
                scrollHint.style.transform = 'translateY(0)';
            }
        }

        // Handle fade indicators
        if (scrollFadeTop) {
            scrollFadeTop.style.opacity = isScrolledFromTop ? '1' : '0';
        }

        if (scrollFadeBottom) {
            scrollFadeBottom.style.opacity = isScrolledToBottom ? '0' : '1';
        }
    }

    // Smooth scroll to specific certification
    scrollToCertification(index) {
        const scrollContainer = document.getElementById('certification-container');
        const certificationCards = scrollContainer?.querySelectorAll('[class*="flex items-start gap-4"]');

        if (certificationCards?.[index]) {
            certificationCards[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CertificationScroll();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CertificationScroll;
}
