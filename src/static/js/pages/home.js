// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar-link-anchor');
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.navbar-mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.navbar-links');
    const navbarLogo = document.querySelector('.navbar-logo');

    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            document.querySelectorAll('.navbar-link').forEach(item => {
                item.classList.remove('active');
            });

            // Add active class to clicked link
            this.closest('.navbar-link').classList.add('active');

            // Scroll to section
            const targetSection = this.getAttribute('data-section');
            const section = document.getElementById(targetSection);
            if (section) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = section.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Logo click handler
    if (navbarLogo) {
        console.log('Logo element found, attaching click handler');
        navbarLogo.addEventListener('click', function (e) {
            console.log('Logo clicked!');
            e.preventDefault();

            // Remove active class from all navigation links
            document.querySelectorAll('.navbar-link').forEach(item => {
                item.classList.remove('active');
            });

            // Add active class to Home link
            const homeLink = document.querySelector('[data-section="home"]');
            if (homeLink) {
                homeLink.closest('.navbar-link').classList.add('active');
                console.log('Home link activated');
            }

            // Scroll to home section
            const homeSection = document.getElementById('home');
            if (homeSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = homeSection.offsetTop - navbarHeight;
                console.log(`Scrolling to position: ${targetPosition}`);
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.error('Home section not found');
            }
        });
    } else {
        console.error('Navbar logo not found');
    }

    // Navbar scroll effect and active link detection with throttling
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

                // Update active navigation link based on scroll position
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Function to update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = ['home', 'about', 'blog', 'projects'];
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const scrollPosition = window.scrollY + navbarHeight + 100; // Add offset for better detection

        let currentSection = 'home'; // Default to home

        // Find which section is currently in view
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

        // Special case: if we're near the bottom of the page, activate the last section
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            currentSection = sections[sections.length - 1];
        }

        // Update active classes
        document.querySelectorAll('.navbar-link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[data-section="${currentSection}"]`);
        if (activeLink) {
            activeLink.closest('.navbar-link').classList.add('active');
        }
    }

    // Initial call to set the correct active link on page load
    updateActiveNavLink();

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            navLinksContainer.classList.toggle('mobile-open');
            mobileToggle.classList.toggle('active');
        });
    }

    // Inspiring Quote Section Effects
    initInspiringQuoteEffects();
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

// Smooth scroll to blog section
function scrollToBlog() {
    document.getElementById('blog').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}
