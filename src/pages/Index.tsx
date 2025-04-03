
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface IndexProps {
  onLogout?: () => void;
}

const Index: React.FC<IndexProps> = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">
          Welcome to Taha Barakat's Application
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          You have successfully logged in with the correct credentials.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button 
            variant="default"
            className="px-6 w-full sm:w-auto"
            onClick={() => window.location.href = "/admin/dashboard"}
          >
            Go to Admin Dashboard
          </Button>
          
          <Button 
            variant="outline"
            className="px-6 w-full sm:w-auto"
            onClick={() => window.location.href = "/owner/dashboard"}
          >
            Go to Owner Dashboard
          </Button>
          
          {onLogout && (
            <Button 
              onClick={onLogout}
              variant="destructive"
              className="px-6 w-full sm:w-auto"
            >
              Logout
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
