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

    // CTA button click
    const ctaButton = document.querySelector('.navbar-cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function (e) {
            // Since there's no contact section, let's scroll to the projects section (last section)
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = projectsSection.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
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

        // Debug logging
        console.log(`Current section: ${currentSection}, Scroll position: ${window.scrollY}`);

        // Update active classes
        document.querySelectorAll('.navbar-link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[data-section="${currentSection}"]`);
        if (activeLink) {
            activeLink.closest('.navbar-link').classList.add('active');
            console.log(`Activated ${currentSection} nav link`);
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
});

// Smooth scroll helper functions
function scrollToBlog() {
    document.getElementById('blog').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToProjects() {
    document.getElementById('projects').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToAbout() {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = section.offsetTop - navbarHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}
