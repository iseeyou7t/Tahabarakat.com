
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

    const particlesArray: Particle[] = [];
    const maxParticles = 50;
    
    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.directionX = (Math.random() * 2) - 1;
        this.directionY = (Math.random() * 2) - 1;
        this.size = Math.random() * 3 + 1;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`;
      }
      
      update() {
        if (this.x > width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        
        if (this.y > height || this.y < 0) {
          this.directionY = -this.directionY;
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    function createParticles() {
      for (let i = 0; i < maxParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    function connectParticles() {
      if (!ctx) return;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance/1000})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    function animateParticles() {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      connectParticles();
      requestAnimationFrame(animateParticles);
    }
    
    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particlesArray.length = 0;
      createParticles();
    }
    
    window.addEventListener('resize', handleResize);
    createParticles();
    animateParticles();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-40"
    />
  );
};

export default AnimatedBackground;
