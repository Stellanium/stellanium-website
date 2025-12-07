// STELLANIUM - Main Interactive Features

class Stellanium {
    constructor() {
        this.init();
    }

    init() {
        this.initSmoothScroll();
        this.initMobileMenu();
        this.initFormHandling();
        this.initGlitchEffects();
    }

    // Smooth scroll for navigation links
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offset = 80; // Navbar height
                    const targetPosition = target.offsetTop - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });
    }

    // Mobile menu toggle
    initMobileMenu() {
        const toggle = document.querySelector('.mobile-toggle');
        const menu = document.querySelector('.nav-menu');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    closeMobileMenu() {
        const toggle = document.querySelector('.mobile-toggle');
        const menu = document.querySelector('.nav-menu');

        if (menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }

    // Contact form handling
    initFormHandling() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: form.querySelector('#name').value,
                email: form.querySelector('#email').value,
                company: form.querySelector('#company').value,
                message: form.querySelector('#message').value
            };

            // Show loading state
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            button.innerHTML = '<span>Sending...</span>';
            button.disabled = true;

            try {
                // Simulate sending (replace with actual API call)
                await this.sendFormData(formData);

                // Success
                button.innerHTML = '<span>✓ Sent!</span>';
                button.style.background = 'linear-gradient(135deg, #39FF14, #00FF00)';

                // Reset form
                form.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);

                // Show success message
                this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');

            } catch (error) {
                // Error
                button.innerHTML = '<span>× Error</span>';
                button.style.background = 'linear-gradient(135deg, #FF5F56, #FF0000)';

                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);

                this.showNotification('Failed to send message. Please try again.', 'error');
            }
        });
    }

    async sendFormData(data) {
        // Simulate API call (replace with real endpoint)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // For now, just log to console
                console.log('Form data:', data);

                // Simulate success (90% success rate for demo)
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : '×'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(57, 255, 20, 0.2)' : 'rgba(255, 95, 86, 0.2)'};
            border: 2px solid ${type === 'success' ? '#39FF14' : '#FF5F56'};
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        `;

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Glitch effect on hover (subtle)
    initGlitchEffects() {
        const glitchElements = document.querySelectorAll('.hero-title, .logo-text');

        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.applyGlitch(element);
            });
        });
    }

    applyGlitch(element) {
        const originalText = element.textContent;
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        let iteration = 0;

        const interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');

            if (iteration >= originalText.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);
    }
}

// Parallax scroll effect
class ParallaxController {
    constructor() {
        this.initParallax();
    }

    initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            // Hero parallax
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }

            // Globe parallax
            const globe = document.querySelector('.globe-container');
            if (globe) {
                globe.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
            }
        });
    }
}

// Cursor trail effect (optional - premium touch)
class CursorTrail {
    constructor() {
        this.trails = [];
        this.maxTrails = 10;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.createTrail(e.clientX, e.clientY);
        });
    }

    createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, rgba(57, 255, 20, 0.6), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%);
            animation: trailFade 0.8s ease-out forwards;
        `;

        document.body.appendChild(trail);

        setTimeout(() => trail.remove(), 800);
    }
}

// Easter egg: Konami code
class EasterEgg {
    constructor() {
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.konamiIndex = 0;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.konamiCode[this.konamiIndex]) {
                this.konamiIndex++;
                if (this.konamiIndex === this.konamiCode.length) {
                    this.activate();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });
    }

    activate() {
        // Matrix rain effect
        alert('🚀 STELLANIUM ACTIVATED! 🌟\n\nUnstoppable · Responsible · Sustainable\n\n"Reach the top, bring everyone with us"');

        // Add extra particle burst
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createBurstParticle();
            }, i * 10);
        }
    }

    createBurstParticle() {
        const particle = document.createElement('div');
        const colors = ['#39FF14', '#00D9FF', '#FFD700'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: 50%;
            top: 50%;
            box-shadow: 0 0 20px ${color};
            animation: burst 2s ease-out forwards;
        `;

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    @keyframes trailFade {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    }
    @keyframes burst {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% {
            transform: translate(
                calc(-50% + ${Math.random() * 400 - 200}px),
                calc(-50% + ${Math.random() * 400 - 200}px)
            ) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Stellanium();
    new ParallaxController();
    new CursorTrail();
    new EasterEgg();
});

// Console branding
console.log('%c🚀 STELLANIUM', 'font-size: 40px; font-weight: 900; background: linear-gradient(135deg, #39FF14, #00D9FF, #FFD700); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cReach the top, bring everyone with us.', 'font-size: 14px; color: #39FF14;');
console.log('%cUnstoppable · Responsible · Sustainable', 'font-size: 12px; color: #00D9FF;');
console.log('%c\nTry the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 10px; color: #FFD700;');
