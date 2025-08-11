class ContactForm {
    constructor(formSelector = '#contact-form') {
        this.form = document.querySelector(formSelector);
        this.init();
    }

    init() {
        if (!this.form) return;

        this.setupEventListeners();
        this.setupValidation();
        this.setupFieldEffects();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    setupValidation() {
        this.validators = {
            name: (value) => {
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                return null;
            },
            email: (value) => {
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return null;
            },
            subject: (value) => {
                if (!value.trim()) return 'Subject is required';
                if (value.trim().length < 5) return 'Subject must be at least 5 characters';
                return null;
            },
            message: (value) => {
                if (!value.trim()) return 'Message is required';
                if (value.trim().length < 10) return 'Message must be at least 10 characters';
                if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
                return null;
            }
        };
    }

    setupFieldEffects() {
        const inputs = this.form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            // Floating label effect
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Initialize focused state for pre-filled inputs
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }

    validateField(field) {
        const fieldName = field.name;
        const validator = this.validators[fieldName];

        if (!validator) return true;

        const error = validator(field.value);

        if (error) {
            this.showFieldError(field, error);
            return false;
        } else {
            this.clearFieldError(field);
            return true;
        }
    }

    showFieldError(field, message) {
        field.parentElement.classList.add('error');

        let errorElement = field.parentElement.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            field.parentElement.appendChild(errorElement);
        }

        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.parentElement.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit() {
        if (!this.validateForm()) {
            this.showMessage('Please fix the errors above', 'error');
            return;
        }

        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const result = await response.json();

            this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();

            // Reset focused states
            const fieldGroups = this.form.querySelectorAll('.form-group');
            fieldGroups.forEach(group => group.classList.remove('focused'));

        } catch (error) {
            console.error('Error sending message:', error);
            this.showMessage('Failed to send message. Please try again later.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    showMessage(text, type = 'info') {
        // Remove existing message
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const message = document.createElement('div');
        message.className = `form-message form-message--${type}`;
        message.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${text}
        `;

        // Insert message at the top of the form
        this.form.insertBefore(message, this.form.firstChild);

        // Animate message
        if (window.animationEngine) {
            window.animationEngine.animateElement(message);
        }

        // Auto-remove success messages
        if (type === 'success') {
            setTimeout(() => {
                if (message.parentNode) {
                    message.remove();
                }
            }, 5000);
        }
    }

    // Method to pre-fill form (useful for contact links with subject)
    prefillForm(data) {
        Object.keys(data).forEach(key => {
            const field = this.form.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = data[key];
                field.parentElement.classList.add('focused');
            }
        });
    }

    // Method to reset form
    resetForm() {
        this.form.reset();
        const fieldGroups = this.form.querySelectorAll('.form-group');
        fieldGroups.forEach(group => {
            group.classList.remove('focused', 'error');
        });

        const errorElements = this.form.querySelectorAll('.field-error');
        errorElements.forEach(error => error.remove());

        const messageElement = this.form.querySelector('.form-message');
        if (messageElement) {
            messageElement.remove();
        }
    }
}
