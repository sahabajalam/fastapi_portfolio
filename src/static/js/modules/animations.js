// Interactive animations and effects
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
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add ripple to interactive elements
    document.querySelectorAll('.btn-primary, .btn-secondary, .view-all-btn, .project-link, .blog-post').forEach(element => {
        element.addEventListener('click', (e) => {
            addRippleEffect(element, e);
        });
    });

    // Staggered animation for cards
    const animateCards = (cards, baseDelay = 0) => {
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, baseDelay + (index * 150));
        });
    };

    // Animate blog cards
    const blogCards = document.querySelectorAll('.blog-post');
    if (blogCards.length > 0) {
        animateCards(blogCards);
    }

    // Animate about cards
    const aboutCards = document.querySelectorAll('.about-card');
    if (aboutCards.length > 0) {
        animateCards(aboutCards, 200);
    }

    // Dynamic content scaling based on viewport
    const updateContentScale = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        let scale = 1;

        // Width-based scaling
        if (vw >= 2560) {
            scale = 1.2;
        } else if (vw >= 1920) {
            scale = 1.05;
        } else if (vw >= 1440) {
            scale = 1;
        } else if (vw >= 1200) {
            scale = 0.95;
        } else if (vw >= 1024) {
            scale = 0.85;
        } else if (vw >= 768) {
            scale = 0.75;
        } else {
            scale = 0.8;
        }

        // Height adjustments
        if (vh < 600) {
            scale *= 0.8;
        } else if (vh < 700) {
            scale *= 0.9;
        } else if (vh > 1200) {
            scale *= 1.05;
        }

        document.documentElement.style.setProperty('--content-scale', scale);
    };

    // Initialize scaling
    updateContentScale();
    window.addEventListener('resize', updateContentScale);

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards for scroll animations
    const projectCards = document.querySelectorAll('.project-card, .view-all-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Smooth hover effects for skills
    const skillItems = document.querySelectorAll('.about-skill-item');
    skillItems.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.style.transform = 'scale(1.05)';
            skill.style.transition = 'transform 0.3s ease';
        });

        skill.addEventListener('mouseleave', () => {
            skill.style.transform = 'scale(1)';
        });
    });
});
