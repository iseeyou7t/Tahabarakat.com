
import React from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  className?: string;
}

const TypewriterTextEffect: React.FC<TypewriterTextProps> = ({ text, className }) => {
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

export default TypewriterTextEffect;
