/**
 * Certification Scroll Component
 * Handles scroll behavior and visual indicators for certification cards
 */

class CertificationScroll {
    constructor() {
        this.initScrollIndicator();
    }

    initScrollIndicator() {
        const scrollContainer = document.querySelector('.certification-scroll-container');
        const scrollHint = document.querySelector('.certification-scroll-hint');
        
        if (!scrollContainer) return;

        // Add scroll event listener
        scrollContainer.addEventListener('scroll', () => {
            this.handleScroll(scrollContainer);
            
            // Hide scroll hint after first scroll
            if (scrollHint && scrollContainer.scrollTop > 5) {
                scrollHint.classList.add('hidden');
            }
        });

        // Initial check
        this.handleScroll(scrollContainer);
        
        // Auto-hide scroll hint if content doesn't overflow
        setTimeout(() => {
            if (scrollContainer.scrollHeight <= scrollContainer.clientHeight) {
                if (scrollHint) {
                    scrollHint.classList.add('hidden');
                }
            }
        }, 100);
    }

    handleScroll(container) {
        const isScrolledToBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
        const isScrolledFromTop = container.scrollTop > 10;
        
        // Handle bottom indicator
        if (isScrolledToBottom) {
            container.classList.add('scrolled-to-bottom');
        } else {
            container.classList.remove('scrolled-to-bottom');
        }
        
        // Handle top indicator
        if (isScrolledFromTop) {
            container.classList.add('scrolled');
        } else {
            container.classList.remove('scrolled');
        }
    }

    // Smooth scroll to specific certification
    scrollToCertification(index) {
        const scrollContainer = document.querySelector('.certification-scroll-container');
        const certificationCards = scrollContainer.querySelectorAll('.certification-card');
        
        if (certificationCards[index]) {
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
