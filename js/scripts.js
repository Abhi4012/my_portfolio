const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});


const canvas = document.getElementById("ai-animation");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Particle class representing neural network nodes
class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
        this.directionX = Math.random() * 2 - 1;
        this.directionY = Math.random() * 2 - 1;
    }

    // Draw particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Update particle position
    update() {
        this.x += this.directionX * this.weight;
        this.y += this.directionY * this.weight;

        // Boundary collision detection
        if (this.x < 0 || this.x > canvas.width) this.directionX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.directionY *= -1;
    }
}

// Initialize particles for AI visual effects
function init() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 5 + 1;
        const color = '#00ffa6';
        const weight = Math.random() * 1 + 1;
        particlesArray.push(new Particle(x, y, size, color, weight));
    }
}

// Animate particles, creating an AI effect like a neural network
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animate);
}

// Connect particles to simulate AI connections
function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            const distance = ((particlesArray[a].x - particlesArray[b].x) ** 2 +
                (particlesArray[a].y - particlesArray[b].y) ** 2);

            if (distance < 4000) {
                opacityValue = 1 - distance / 8000;
                ctx.strokeStyle = 'rgba(0, 255, 166,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// AI Holographic Brain
function drawBrain() {
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 150, 0, Math.PI * 2);
    ctx.stroke();
    // Add more complex AI-inspired patterns here
}

// Matrix-style data flow effect
function drawCodeRain() {
    const columns = canvas.width / 20;
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff99';
    ctx.font = '18px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.random() * 128);
        ctx.fillText(text, i * 20, drops[i] * 20);
        if (drops[i] * 20 > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Start the AI animation
function startAIAnimation() {
    init();
    animate();
    drawBrain();
    setInterval(drawCodeRain, 50); // Matrix effect refresh rate
}

// Start the animations
window.addEventListener('load', startAIAnimation);

// Adjust canvas size dynamically
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

