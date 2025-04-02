
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
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
};

export default GradientBlobs;
