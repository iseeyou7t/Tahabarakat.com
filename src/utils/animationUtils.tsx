
import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for staggered children
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

// Animated background component
export const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10" />
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-primary/5"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: [0.5, 1, 0.8, 1.2, 0.8], 
            opacity: [0, 0.2, 0.3, 0.2, 0], 
            x: [0, Math.random() * 40 - 20],
            y: [0, Math.random() * 40 - 20]
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

// Particle effect component for login pages
export const ParticleEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10">
      {Array.from({ length: 50 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

// Glowing border for input fields
export const GlowingInput: React.FC<{
  children: React.ReactNode;
  isActive?: boolean;
}> = ({ children, isActive = false }) => {
  return (
    <motion.div
      className="relative"
      animate={{
        boxShadow: isActive 
          ? "0 0 15px 2px rgba(var(--primary), 0.3)" 
          : "0 0 0px 0px rgba(var(--primary), 0)"
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

// Success confetti effect
export const SuccessConfetti: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {Array.from({ length: 100 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-sm w-2 h-2"
          style={{
            backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
            top: "-10%",
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["0vh", "120vh"],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1)]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeIn"
          }}
        />
      ))}
    </div>
  );
};

// Typing animation component
export const TypewriterText: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className }) => {
  const characters = text.split("");
  
  return (
    <div className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05, duration: 0.1 }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};
