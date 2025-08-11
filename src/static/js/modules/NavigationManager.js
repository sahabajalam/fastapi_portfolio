class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveLinks();
        this.setupScrollToTop();
        this.setupLogoHandler();
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                hamburger.setAttribute('aria-expanded',
                    mobileMenu.classList.contains('active'));
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });

            // Close mobile menu when clicking on a link
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                });
            });
        }
    }

    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerOffset = document.querySelector('.navbar')?.offsetHeight || 0;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.mobile-menu');
                    if (mobileMenu) {
                        mobileMenu.classList.remove('active');
                    }
                }
            });
        });
    }

    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link, .navbar-link');

        if (sections.length === 0) return;

        // Create intersection observer for better performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentSection = entry.target.id;

                    // Remove active class from all nav links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });

                    // Add active class to the corresponding nav link
                    const activeNavLink = document.querySelector(`[data-section="${currentSection}"]`) ||
                        document.querySelector(`[href="#${currentSection}"]`);
                    if (activeNavLink) {
                        const parentLink = activeNavLink.closest('.nav-link, .mobile-menu-link, .navbar-link');
                        if (parentLink) {
                            parentLink.classList.add('active');
                        }
                    }
                }
            });
        }, {
            threshold: 0.3, // Trigger when 30% of the section is visible
            rootMargin: '-20% 0px -20% 0px' // Adjust the detection area
        });

        // Observe all sections
        sections.forEach(section => observer.observe(section));

        // Fallback scroll-based detection for edge cases
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateActiveNavOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateActiveNavOnScroll() {
        const sections = ['home', 'about', 'blog', 'projects'];
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const scrollPosition = window.scrollY + navbarHeight + 50;

        let currentSection = 'home';

        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = sectionId;
                    break;
                }
            }
        }

        // Update active state
        this.updateActiveLink(currentSection);
    }

    setupScrollToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');

        if (backToTopBtn) {
            window.addEventListener('scroll', throttle(() => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }, 100));

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    setupLogoHandler() {
        const navbarLogo = document.querySelector('.navbar-logo');

        if (navbarLogo) {
            navbarLogo.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all navigation links
                const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link, .navbar-link');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to Home link
                const homeLink = document.querySelector('[data-section="home"], [href="#home"]');
                if (homeLink) {
                    const parentLink = homeLink.closest('.nav-link, .mobile-menu-link, .navbar-link');
                    if (parentLink) {
                        parentLink.classList.add('active');
                    }
                }

                // Navigate to home section
                this.navigateToSection('home');
            });
        }
    }

    // Method to programmatically navigate to a section
    navigateToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            const headerOffset = document.querySelector('.navbar')?.offsetHeight || 0;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Method to update active navigation state
    updateActiveLink(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
}
