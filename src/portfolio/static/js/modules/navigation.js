// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar-link-anchor');
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.navbar-mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.navbar-links');

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

    // CTA button click
    const ctaButton = document.querySelector('.navbar-cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function (e) {
            e.preventDefault();
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = contactSection.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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
