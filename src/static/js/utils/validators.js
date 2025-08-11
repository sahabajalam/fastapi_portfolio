// Form validation utilities
class FormValidator {
    constructor() {
        this.rules = {
            required: (value) => value.trim() !== '',
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            phone: (value) => /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, '')),
            url: (value) => {
                try {
                    new URL(value);
                    return true;
                } catch {
                    return false;
                }
            },
            minLength: (value, min) => value.length >= min,
            maxLength: (value, max) => value.length <= max,
            pattern: (value, regex) => new RegExp(regex).test(value)
        };

        this.messages = {
            required: 'This field is required',
            email: 'Please enter a valid email address',
            phone: 'Please enter a valid phone number',
            url: 'Please enter a valid URL',
            minLength: 'Must be at least {min} characters long',
            maxLength: 'Must be no more than {max} characters long',
            pattern: 'Please match the required format'
        };
    }

    validate(value, rules) {
        const errors = [];

        for (const rule of rules) {
            if (typeof rule === 'string') {
                if (!this.rules[rule](value)) {
                    errors.push(this.messages[rule]);
                }
            } else if (typeof rule === 'object') {
                const { type, params, message } = rule;
                if (!this.rules[type](value, ...params)) {
                    errors.push(message || this.messages[type].replace(/{(\w+)}/g, (match, key) => params[0]));
                }
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    validateForm(formElement) {
        const results = {};
        const inputs = formElement.querySelectorAll('[data-validate]');

        inputs.forEach(input => {
            const rules = JSON.parse(input.dataset.validate || '[]');
            const result = this.validate(input.value, rules);
            results[input.name] = result;

            this.updateFieldUI(input, result);
        });

        const isFormValid = Object.values(results).every(result => result.isValid);

        return {
            isValid: isFormValid,
            results
        };
    }

    updateFieldUI(input, result) {
        const errorElement = input.parentNode.querySelector('.form-error');

        if (result.isValid) {
            input.classList.remove('error');
            input.classList.add('success');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        } else {
            input.classList.remove('success');
            input.classList.add('error');
            if (errorElement) {
                errorElement.textContent = result.errors[0];
                errorElement.style.display = 'block';
            }
        }
    }

    setupRealTimeValidation(formElement) {
        const inputs = formElement.querySelectorAll('[data-validate]');

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                const rules = JSON.parse(input.dataset.validate || '[]');
                const result = this.validate(input.value, rules);
                this.updateFieldUI(input, result);
            });

            input.addEventListener('input', debounce(() => {
                if (input.classList.contains('error')) {
                    const rules = JSON.parse(input.dataset.validate || '[]');
                    const result = this.validate(input.value, rules);
                    this.updateFieldUI(input, result);
                }
            }, 300));
        });
    }
}

// Input utilities
function formatPhoneNumber(value) {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return value;
}

function formatCurrency(value, currency = 'USD') {
    const number = parseFloat(value.replace(/[^\d.-]/g, ''));

    if (isNaN(number)) return value;

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(number);
}

function restrictToNumbers(input) {
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^\d]/g, '');
    });
}

function restrictToAlpha(input) {
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    });
}

function restrictToAlphaNumeric(input) {
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
    });
}

// Character counter
function addCharacterCounter(textarea, maxLength) {
    const counter = createElement('div', 'character-counter');
    textarea.parentNode.appendChild(counter);

    function updateCounter() {
        const remaining = maxLength - textarea.value.length;
        counter.textContent = `${remaining} characters remaining`;
        counter.className = `character-counter ${remaining < 0 ? 'error' : ''}`;
    }

    textarea.addEventListener('input', updateCounter);
    updateCounter();
}

// Auto-resize textarea
function makeTextareaAutoResize(textarea) {
    function resize() {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    textarea.addEventListener('input', resize);
    resize();
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        symbols: /[^a-zA-Z0-9]/.test(password)
    };

    strength = Object.values(checks).filter(Boolean).length;

    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['#ff4757', '#ff6b7a', '#ffa502', '#2ed573', '#20bf6b'];

    return {
        score: strength,
        level: levels[Math.min(strength, 4)],
        color: colors[Math.min(strength, 4)],
        checks
    };
}

function addPasswordStrengthIndicator(passwordInput) {
    const indicator = createElement('div', 'password-strength');
    const bar = createElement('div', 'strength-bar');
    const text = createElement('div', 'strength-text');

    indicator.appendChild(bar);
    indicator.appendChild(text);
    passwordInput.parentNode.appendChild(indicator);

    passwordInput.addEventListener('input', () => {
        const strength = checkPasswordStrength(passwordInput.value);
        bar.style.width = `${(strength.score / 5) * 100}%`;
        bar.style.backgroundColor = strength.color;
        text.textContent = strength.level;
        text.style.color = strength.color;
    });
}

// Export validator class and utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FormValidator,
        formatPhoneNumber,
        formatCurrency,
        restrictToNumbers,
        restrictToAlpha,
        restrictToAlphaNumeric,
        addCharacterCounter,
        makeTextareaAutoResize,
        checkPasswordStrength,
        addPasswordStrengthIndicator
    };
}
