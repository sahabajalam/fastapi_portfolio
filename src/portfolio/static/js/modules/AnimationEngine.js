class AnimationEngine {
    constructor() {
        this.init();
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
        this.setupTypewriter();
    }

    init() {
        // Set up GSAP defaults if available
        if (typeof gsap !== 'undefined') {
            gsap.set('.animate-on-scroll', { opacity: 0, y: 50 });
        }
    }

    setupIntersectionObserver() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');

        if (!animatedElements.length) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    animateElement(element) {
        const animationType = element.dataset.animation || 'fadeInUp';
        const delay = parseFloat(element.dataset.delay) || 0;

        // Use GSAP if available, otherwise use CSS animations
        if (typeof gsap !== 'undefined') {
            this.gsapAnimate(element, animationType, delay);
        } else {
            this.cssAnimate(element, animationType, delay);
        }
    }

    gsapAnimate(element, animationType, delay) {
        const animations = {
            fadeInUp: { opacity: 1, y: 0, duration: 0.8, delay },
            fadeInLeft: { opacity: 1, x: 0, duration: 0.8, delay },
            fadeInRight: { opacity: 1, x: 0, duration: 0.8, delay },
            scaleIn: { opacity: 1, scale: 1, duration: 0.8, delay },
            rotateIn: { opacity: 1, rotation: 0, duration: 0.8, delay }
        };

        gsap.to(element, animations[animationType] || animations.fadeInUp);
    }

    cssAnimate(element, animationType, delay) {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) translateX(0) scale(1) rotate(0)';
            element.style.transition = 'all 0.8s ease-out';
            element.classList.add('animated', animationType);
        }, delay * 1000);
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-element');

        if (!parallaxElements.length) return;

        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(element => {
                const rate = scrolled * (parseFloat(element.dataset.rate) || -0.5);
                element.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        }, 16));
    }

    setupTypewriter() {
        const typewriterElements = document.querySelectorAll('.typewriter');

        typewriterElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.speed) || 50;
            element.textContent = '';
            element.style.borderRight = '2px solid';

            this.typeText(element, text, speed);
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Blinking cursor effect
                setInterval(() => {
                    element.style.borderRight = element.style.borderRight === '2px solid transparent'
                        ? '2px solid'
                        : '2px solid transparent';
                }, 500);
            }
        }, speed);
    }

    // Stagger animations for multiple elements
    staggerAnimate(elements, options = {}) {
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(elements,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: options.duration || 0.6,
                    stagger: options.stagger || 0.1,
                    ease: options.ease || 'power2.out'
                }
            );
        } else {
            elements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.style.transition = 'all 0.6s ease-out';
                }, index * (options.stagger || 100));
            });
        }
    }

    // Animate project cards
    animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        this.staggerAnimate(projectCards, { stagger: 0.15 });
    }

    // Animate skill bars
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');

        skillBars.forEach(bar => {
            const percentage = bar.dataset.percentage || '0';
            if (typeof gsap !== 'undefined') {
                gsap.to(bar, { width: percentage + '%', duration: 1.5, ease: 'power2.out' });
            } else {
                setTimeout(() => {
                    bar.style.width = percentage + '%';
                    bar.style.transition = 'width 1.5s ease-out';
                }, 200);
            }
        });
    }

    // Animate counters
    animateCounters() {
        const counters = document.querySelectorAll('.counter');

        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target) || 0;
            const duration = parseInt(counter.dataset.duration) || 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Hover animations
    setupHoverAnimations() {
        const cards = document.querySelectorAll('.card, .project-card, .service-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(card, { y: -10, duration: 0.3, ease: 'power2.out' });
                } else {
                    card.style.transform = 'translateY(-10px)';
                    card.style.transition = 'transform 0.3s ease-out';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
                } else {
                    card.style.transform = 'translateY(0)';
                }
            });
        });
    }

    // Page transition animations
    animatePageLoad() {
        const elements = document.querySelectorAll('.animate-on-load');
        this.staggerAnimate(elements, { stagger: 0.1, duration: 0.8 });
    }
}
