
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface OwnerRouteProps {
  children: ReactNode;
}

const OwnerRoute = ({ children }: OwnerRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const checkAuth = () => {
      const ownerAuth = localStorage.getItem("ownerAuthenticated");
      
      // Simulate loading progress for visual effect
      const timer = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsAuthenticated(ownerAuth === "true");
            return 100;
          }
          return prev + 5;
        });
      }, 40);
      
      return () => clearInterval(timer);
    };
    
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Enhanced loading animation
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/30">
        <div className="w-full max-w-md mx-auto p-8 relative">
          <div className="text-center mb-8">
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative z-10 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            </div>
            
            <p className="mt-8 text-2xl font-bold">Owner Dashboard</p>
            <p className="mt-2 text-muted-foreground">Verifying credentials...</p>
            
            <div className="w-full bg-muted/50 rounded-full h-2.5 mt-6 overflow-hidden">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Loading system components ({loadingProgress}%)
            </p>
          </div>
          
          <div className="space-y-2 text-xs text-muted-foreground font-mono">
            {loadingProgress > 10 && <p>✓ Authenticating user</p>}
            {loadingProgress > 30 && <p>✓ Loading system modules</p>}
            {loadingProgress > 50 && <p>✓ Initializing dashboard</p>}
            {loadingProgress > 70 && <p>✓ Loading configuration</p>}
            {loadingProgress > 85 && <p>✓ Preparing interface</p>}
            {loadingProgress === 100 && (
              <p className="text-primary font-bold">✓ All systems ready!</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/owner/login" />;
};

export default OwnerRoute;
