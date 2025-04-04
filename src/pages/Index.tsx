
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, User } from "lucide-react";
import MainNavbar from "@/components/MainNavbar";

interface IndexProps {
  onLogout?: () => void;
}

const Index: React.FC<IndexProps> = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <MainNavbar onLogout={onLogout} />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">
              Welcome to Taha Barakat's Portfolio
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my work, services, and expertise. Your authenticated access provides you with a personalized experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-xl p-6 border border-primary/10 hover:border-primary/20 transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Admin Access</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Access the admin dashboard to manage content, monitor analytics, and configure system settings.
              </p>
              <Button 
                variant="luxury" 
                className="w-full"
                onClick={() => window.location.href = "/admin/dashboard"}
              >
                Go to Admin Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card rounded-xl p-6 border border-primary/10 hover:border-primary/20 transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Owner Portal</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Access the owner dashboard for advanced control, user management, and exclusive customization options.
              </p>
              <Button 
                variant="elegant" 
                className="w-full"
                onClick={() => window.location.href = "/owner/dashboard"}
              >
                Go to Owner Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </main>
      
      <footer className="py-6 border-t border-border/10 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Taha Barakat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
