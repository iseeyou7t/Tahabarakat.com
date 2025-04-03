
import { motion } from 'framer-motion';

const GradientBlobs = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Large gradient blobs that move slowly */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full opacity-30 blur-[120px]"
        style={{ 
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)'
        }}
        animate={{
          x: [0, 20, -10, 5, 0],
          y: [0, -20, 10, -5, 0],
          scale: [1, 1.05, 0.95, 1.02, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full opacity-20 blur-[150px]"
        style={{ 
          background: 'linear-gradient(225deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)'
        }}
        animate={{
          x: [0, -30, 20, -10, 0],
          y: [0, 20, -15, 10, 0],
          scale: [1, 0.95, 1.05, 0.98, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-[30%] -right-[5%] w-[30%] h-[30%] rounded-full opacity-15 blur-[100px]"
        style={{ 
          background: 'linear-gradient(90deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)'
        }}
        animate={{
          x: [0, 20, -30, 10, 0],
          y: [0, -10, 20, -5, 0],
          scale: [1, 1.1, 0.9, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div
        className="absolute -bottom-[5%] left-[20%] w-[40%] h-[40%] rounded-full opacity-10 blur-[130px]"
        style={{ 
          background: 'linear-gradient(45deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)'
        }}
        animate={{
          x: [0, -15, 25, -5, 0],
          y: [0, 15, -10, 5, 0],
          scale: [1, 0.9, 1.1, 0.95, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Adding subtle star/particle effects */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Adding subtle motion lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute bg-gradient-to-r from-primary/5 to-accent/5"
          style={{
            height: `${Math.random() * 150 + 50}px`,
            width: "1px",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            height: ["0px", `${Math.random() * 150 + 100}px`, "0px"],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
};

export default GradientBlobs;
