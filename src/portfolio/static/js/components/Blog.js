// Blog Component
class Blog {
    constructor() {
        this.init();
    }

    init() {
        this.setupBlogCards();
        this.setupReadMoreButtons();
    }

    setupBlogCards() {
        const blogCards = document.querySelectorAll('.blog-post');
        
        blogCards.forEach((card, index) => {
            // Stagger animation for cards
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    setupReadMoreButtons() {
        const readMoreButtons = document.querySelectorAll('.read-more');
        
        readMoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Add ripple effect
                this.addRippleEffect(button, e);
            });
        });
    }

    addRippleEffect(element, event) {
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
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Blog();
});
