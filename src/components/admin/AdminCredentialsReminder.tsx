
import React from "react";
import { motion } from "framer-motion";

const AdminCredentialsReminder = () => {
  return (
    <motion.div 
      className="mt-4 text-center text-sm text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <p>Default admin: tahabarakat / taha1234</p>
    </motion.div>
  );
};

export default AdminCredentialsReminder;
