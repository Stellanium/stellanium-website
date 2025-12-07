// STELLANIUM - Scroll Animations & Counter Effects

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initCounters();
        this.initNavbarScroll();
    }

    // Scroll-triggered animations (AOS-like)
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);

        // Observe all elements with data-aos attribute
        document.querySelectorAll('[data-aos]').forEach(element => {
            observer.observe(element);
        });
    }

    // Animated counters for stats
    initCounters() {
        const counterElements = document.querySelectorAll('[data-count]');
        const duration = 2000; // 2 seconds

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target, duration);
                    entry.target.classList.add('counted');
                }
            });
        }, observerOptions);

        counterElements.forEach(element => {
            observer.observe(element);
        });
    }

    animateCounter(element, duration) {
        const target = parseInt(element.getAttribute('data-count'));
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if (target > 1000) {
                    element.textContent = '€' + Math.floor(current).toLocaleString();
                } else {
                    element.textContent = Math.floor(current) + '%';
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target > 1000) {
                    element.textContent = '€' + target.toLocaleString();
                } else {
                    element.textContent = target + '%';
                }
            }
        };

        updateCounter();
    }

    // Navbar scroll effect
    initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }
}

// Mini chart animation (optional enhancement)
class MiniChart {
    constructor() {
        const canvas = document.getElementById('miniChart');
        if (!canvas) return;

        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.init();
    }

    init() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = 200;
        this.drawChart();
    }

    drawChart() {
        const data = [30, 45, 35, 55, 48, 60, 58, 70, 65, 75, 72, 85];
        const padding = 20;
        const width = this.canvas.width - padding * 2;
        const height = this.canvas.height - padding * 2;
        const step = width / (data.length - 1);

        // Gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(57, 255, 20, 0.5)');
        gradient.addColorStop(1, 'rgba(57, 255, 20, 0.0)');

        // Draw area
        this.ctx.beginPath();
        this.ctx.moveTo(padding, height + padding);

        data.forEach((value, index) => {
            const x = padding + index * step;
            const y = height + padding - (value / 100) * height;
            this.ctx.lineTo(x, y);
        });

        this.ctx.lineTo(padding + (data.length - 1) * step, height + padding);
        this.ctx.closePath();
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Draw line
        this.ctx.beginPath();
        data.forEach((value, index) => {
            const x = padding + index * step;
            const y = height + padding - (value / 100) * height;
            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });
        this.ctx.strokeStyle = '#39FF14';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Draw points
        data.forEach((value, index) => {
            const x = padding + index * step;
            const y = height + padding - (value / 100) * height;

            this.ctx.beginPath();
            this.ctx.arc(x, y, 4, 0, Math.PI * 2);
            this.ctx.fillStyle = '#39FF14';
            this.ctx.fill();
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = 'rgba(57, 255, 20, 0.8)';
        });
        this.ctx.shadowBlur = 0;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    new MiniChart();
});
