// Projects Section Component
class Projects {
    constructor() {
        this.init();
    }

    init() {
        this.setupProjectCards();
        this.setupFiltering();
    }

    setupProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    // If not clicking on a link, show project details
                    this.showProjectDetails(card);
                }
            });
        });
    }

    setupFiltering() {
        const filterButtons = document.querySelectorAll('.project-filter');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterProjects(button.dataset.category);
                this.updateActiveFilter(button);
            });
        });
    }

    filterProjects(category) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    updateActiveFilter(activeButton) {
        const filterButtons = document.querySelectorAll('.project-filter');
        filterButtons.forEach(button => button.classList.remove('active'));
        activeButton.classList.add('active');
    }

    showProjectDetails(card) {
        // Implementation for showing project details in a modal or expanded view
        console.log('Show project details for:', card);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Projects();
});
