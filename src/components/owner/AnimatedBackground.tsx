
import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Advanced particle configuration
    const config = {
      particleCount: 100,
      particleSize: { min: 1, max: 4 },
      speed: { min: 0.2, max: 0.8 },
      connectionDistance: 150,
      colors: [
        'rgba(66, 135, 245, 0.5)',  // blue
        'rgba(245, 66, 184, 0.4)',  // magenta
        'rgba(66, 245, 211, 0.4)',  // teal
        'rgba(245, 196, 66, 0.3)',  // yellow
      ],
      pulseSpeed: 0.01,
      mouseInteraction: true,
      mouseRadius: 120,
      mouseForce: 0.1,
      fadeInDuration: 1000, // ms
    };
    
    let opacity = 0;
    let fadeInStart = Date.now();
    let mouseX = 0;
    let mouseY = 0;
    let mouseActive = false;

    class Particle {
      x: number;
      y: number;
      originalX: number;
      originalY: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      pulseDirection: number;
      pulseValue: number;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.originalX = this.x;
        this.originalY = this.y;
        
        // Random velocity
        const speed = Math.random() * (config.speed.max - config.speed.min) + config.speed.min;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        // Random size
        this.size = Math.random() * (config.particleSize.max - config.particleSize.min) + config.particleSize.min;
        
        // Random color from config
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
        
        // Pulse effect
        this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
        this.pulseValue = Math.random();
      }
      
      update() {
        // Apply mouse interaction
        if (config.mouseInteraction && mouseActive) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < config.mouseRadius) {
            const force = (config.mouseRadius - distance) / config.mouseRadius * config.mouseForce;
            this.vx += (dx / distance) * force;
            this.vy += (dy / distance) * force;
          }
        }
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges with slight damping
        if (this.x < 0 || this.x > width) {
          this.vx *= -0.9;
          this.x = this.x < 0 ? 0 : width;
        }
        
        if (this.y < 0 || this.y > height) {
          this.vy *= -0.9;
          this.y = this.y < 0 ? 0 : height;
        }
        
        // Apply some gravitational pull back to original position (creates a swarm effect)
        const dx = this.originalX - this.x;
        const dy = this.originalY - this.y;
        this.vx += dx * 0.0001;
        this.vy += dy * 0.0001;
        
        // Damping
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        // Pulse size effect
        this.pulseValue += config.pulseSpeed * this.pulseDirection;
        if (this.pulseValue > 1 || this.pulseValue < 0) {
          this.pulseDirection *= -1;
        }
      }
      
      draw() {
        if (!ctx) return;
        
        // Apply pulse effect to size
        const pulseFactor = 0.3; // How much to pulse
        const pulseSize = this.size * (1 + this.pulseValue * pulseFactor);
        
        // Draw particle with glow
        ctx.save();
        ctx.beginPath();
        
        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, pulseSize * 2
        );
        
        // Extract RGB values for creating the gradient
        const colorMatch = this.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
        if (colorMatch) {
          const r = colorMatch[1];
          const g = colorMatch[2];
          const b = colorMatch[3];
          
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.8)`);
          gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.3)`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.arc(this.x, this.y, pulseSize * 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw the core of the particle
          ctx.beginPath();
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
          ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
    }
    
    const particles: Particle[] = [];
    
    function createParticles() {
      for (let i = 0; i < config.particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    function connectParticles() {
      if (!ctx) return;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < config.connectionDistance) {
            // Calculate opacity based on distance
            const alpha = 1 - (distance / config.connectionDistance);
            ctx.beginPath();
            
            // Create gradient line
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            // Extract colors from both particles
            const color1 = particles[i].color.replace(/rgba?\((.+)\)/, '$1').split(',');
            const color2 = particles[j].color.replace(/rgba?\((.+)\)/, '$1').split(',');
            
            gradient.addColorStop(0, `rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, ${alpha * 0.5})`);
            gradient.addColorStop(1, `rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, ${alpha * 0.5})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = Math.min(particles[i].size, particles[j].size) * 0.5 * alpha;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    function animateParticles() {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, width, height);
      
      // Apply fade-in effect during initialization
      if (Date.now() - fadeInStart < config.fadeInDuration) {
        opacity = (Date.now() - fadeInStart) / config.fadeInDuration;
      } else {
        opacity = 1;
      }
      
      ctx.globalAlpha = opacity;
      
      // Update and draw all particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      // Connect particles with lines
      connectParticles();
      
      // Request next frame
      requestAnimationFrame(animateParticles);
    }
    
    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Update particle original positions on resize
      particles.forEach(particle => {
        particle.originalX = Math.random() * width;
        particle.originalY = Math.random() * height;
      });
    }
    
    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    }
    
    function handleMouseLeave() {
      mouseActive = false;
    }
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Initialize
    createParticles();
    animateParticles();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"
    />
  );
};

export default AnimatedBackground;
