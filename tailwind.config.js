/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/templates/**/*.html",
        "./src/static/js/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    green: '#00b96b',
                    cyan: '#0088cc',
                    DEFAULT: '#00b96b'
                },
                secondary: {
                    cyan: '#0088cc',
                    DEFAULT: '#0088cc'
                },
                text: {
                    primary: '#1a1a1a',
                    secondary: '#4a4a4a',
                    tertiary: '#6a6a6a',
                    accent: '#00b96b',
                    white: '#ffffff'
                },
                bg: {
                    primary: '#ffffff',
                    secondary: 'rgba(248, 248, 248, 0.98)',
                    card: 'rgba(255, 255, 255, 0.9)'
                },
                border: {
                    accent: 'rgba(0, 185, 107, 0.2)',
                    'accent-strong': 'rgba(0, 185, 107, 0.3)',
                    subtle: 'rgba(0, 185, 107, 0.1)'
                }
            },
            fontFamily: {
                system: ['system-ui', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif']
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem'
            },
            borderRadius: {
                'sm': '8px',
                'md': '12px',
                'lg': '20px',
                'xl': '24px'
            },
            boxShadow: {
                'sm': '0 4px 20px rgba(0, 0, 0, 0.08)',
                'lg': '0 20px 40px rgba(0, 0, 0, 0.12)',
                'glow-accent': '0 10px 30px rgba(0, 185, 107, 0.15)',
                'glow-button': '0 8px 25px rgba(0, 185, 107, 0.2)'
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'ripple': 'ripple 0.6s ease-out',
                'fade-in': 'fadeIn 0.6s ease forwards',
                'slide-in-left': 'slideInLeft 0.6s ease forwards',
                'slide-in-right': 'slideInRight 0.6s ease forwards'
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-50px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(50px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(180deg)' }
                },
                ripple: {
                    'to': { transform: 'scale(4)', opacity: '0' }
                }
            },
            screens: {
                'xs': '480px',
                '3xl': '1600px'
            }
        }
    },
    plugins: []
}
