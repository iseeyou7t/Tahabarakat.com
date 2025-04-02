
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PremiumAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Premium particles configuration
    const config = {
      particleCount: Math.min(Math.floor(width / 10), 150),
      particleSize: { min: 1, max: 3 },
      speed: { min: 0.1, max: 0.3 },
      connectionDistance: 150,
      colors: [
        'rgba(141, 119, 245, 0.5)',  // primary purple
        'rgba(220, 206, 255, 0.4)',  // light purple
        'rgba(171, 149, 245, 0.4)',  // medium purple
        'rgba(245, 241, 255, 0.3)',  // very light purple
      ],
      pulseSpeed: 0.008,
      mouseInteraction: true,
      mouseRadius: 120,
      mouseForce: 0.07,
    };
    
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
        
        const speed = Math.random() * (config.speed.max - config.speed.min) + config.speed.min;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.size = Math.random() * (config.particleSize.max - config.particleSize.min) + config.particleSize.min;
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
        
        this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
        this.pulseValue = Math.random();
      }
      
      update() {
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
        
        this.x += this.vx;
        this.y += this.vy;
        
        // Smooth edge handling with slight bounce
        if (this.x < 0 || this.x > width) {
          this.vx *= -0.6;
          this.x = this.x < 0 ? 0 : width;
        }
        
        if (this.y < 0 || this.y > height) {
          this.vy *= -0.6;
          this.y = this.y < 0 ? 0 : height;
        }
        
        // Light gravitational pull back to original position
        const dx = this.originalX - this.x;
        const dy = this.originalY - this.y;
        this.vx += dx * 0.00005;
        this.vy += dy * 0.00005;
        
        // Gentle damping for smooth movement
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
        
        const pulseFactor = 0.3;
        const pulseSize = this.size * (1 + this.pulseValue * pulseFactor);
        
        ctx.save();
        
        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, pulseSize * 2
        );
        
        const colorMatch = this.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
        if (colorMatch) {
          const r = colorMatch[1];
          const g = colorMatch[2];
          const b = colorMatch[3];
          
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.7)`);
          gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.2)`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, pulseSize * 2, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.beginPath();
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
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
            const alpha = 1 - (distance / config.connectionDistance);
            
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            const color1 = particles[i].color.replace(/rgba?\((.+)\)/, '$1').split(',');
            const color2 = particles[j].color.replace(/rgba?\((.+)\)/, '$1').split(',');
            
            gradient.addColorStop(0, `rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, ${alpha * 0.4})`);
            gradient.addColorStop(1, `rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, ${alpha * 0.4})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = Math.min(particles[i].size, particles[j].size) * 0.4 * alpha;
            ctx.beginPath();
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
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      connectParticles();
      requestAnimationFrame(animateParticles);
    }
    
    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Update particle counts and original positions on resize
      particles.length = 0;
      createParticles();
    }
    
    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    }
    
    function handleMouseLeave() {
      mouseActive = false;
    }
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    createParticles();
    animateParticles();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-background via-background/90 to-primary/5"
    />
  );
};

export default PremiumAnimation;
