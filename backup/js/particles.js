// STELLANIUM - Particle Field Animation
// Matrix + Global network visualization

class ParticleField {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: null, y: null, radius: 150 };

        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const numParticles = Math.floor((this.canvas.width * this.canvas.height) / 15000);

        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(57, 255, 20, ',    // Matrix green
            'rgba(0, 217, 255, ',    // Cyber blue
            'rgba(255, 215, 0, '     // Gold
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouse.radius) {
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                particle.x -= dx * force * 0.03;
                particle.y -= dy * force * 0.03;
            }
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + particle.opacity + ')';
            this.ctx.fill();

            // Glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color + '0.8)';
        });
        this.ctx.shadowBlur = 0;
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.2;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(57, 255, 20, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.updateParticles();
        this.drawConnections();
        this.drawParticles();

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ParticleField();
});
