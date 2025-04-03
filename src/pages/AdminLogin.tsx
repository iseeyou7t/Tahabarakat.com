
import { useEffect } from "react";
import { motion } from "framer-motion";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminLoginBackground from "@/components/admin/AdminLoginBackground";
import AdminCredentialsReminder from "@/components/admin/AdminCredentialsReminder";

const AdminLogin = () => {
  // Reset animation when component loads
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.documentElement.style.setProperty('--animate-duration', '0.5s');
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-muted/30 relative overflow-hidden">
      <AdminLoginBackground />
      
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <AdminLoginForm />
        <AdminCredentialsReminder />
      </motion.div>
    </div>
  );
};

export default AdminLogin;
