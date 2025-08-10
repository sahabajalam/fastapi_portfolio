// Hero Section Component
class Hero {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollIndicator();
        this.setupTypewriter();
    }

    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                document.getElementById('about')?.scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }

    setupTypewriter() {
        const typewriterElement = document.querySelector('.typewriter-text');
        if (typewriterElement) {
            // Typewriter effect implementation
            const text = typewriterElement.textContent;
            typewriterElement.textContent = '';
            let i = 0;
            
            const typeWriter = () => {
                if (i < text.length) {
                    typewriterElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Hero();
});
