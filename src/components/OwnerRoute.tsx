
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Shield, Lock, Server, Database, Key, Fingerprint, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface OwnerRouteProps {
  children: ReactNode;
}

const OwnerRoute = ({ children }: OwnerRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [securityChecksDone, setSecurityChecksDone] = useState(0);

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
          return prev + (Math.random() * 3 + 1); // Random increment for more realistic loading
        });
      }, 80);
      
      // Simulate security checks
      const securityTimer = setInterval(() => {
        setSecurityChecksDone(prev => {
          if (prev >= 6) {
            clearInterval(securityTimer);
            return 6;
          }
          return prev + 1;
        });
      }, 600);
      
      return () => {
        clearInterval(timer);
        clearInterval(securityTimer);
      };
    };
    
    checkAuth();
  }, []);

  const getSecurityCheckIcon = (checkNumber: number) => {
    if (checkNumber <= securityChecksDone) {
      switch (checkNumber) {
        case 1: return <Shield className="h-5 w-5 text-green-500" />;
        case 2: return <Lock className="h-5 w-5 text-green-500" />;
        case 3: return <Server className="h-5 w-5 text-green-500" />;
        case 4: return <Database className="h-5 w-5 text-green-500" />;
        case 5: return <Key className="h-5 w-5 text-green-500" />;
        case 6: return <Fingerprint className="h-5 w-5 text-green-500" />;
        default: return null;
      }
    } else {
      switch (checkNumber) {
        case 1: return <Shield className="h-5 w-5 text-muted-foreground" />;
        case 2: return <Lock className="h-5 w-5 text-muted-foreground" />;
        case 3: return <Server className="h-5 w-5 text-muted-foreground" />;
        case 4: return <Database className="h-5 w-5 text-muted-foreground" />;
        case 5: return <Key className="h-5 w-5 text-muted-foreground" />;
        case 6: return <Fingerprint className="h-5 w-5 text-muted-foreground" />;
        default: return null;
      }
    }
  };

  const getSecurityCheckText = (checkNumber: number) => {
    switch (checkNumber) {
      case 1: return "Verifying user credentials";
      case 2: return "Establishing secure connection";
      case 3: return "Loading system modules";
      case 4: return "Connecting to secure database";
      case 5: return "Validating access keys";
      case 6: return "Biometric verification";
      default: return "";
    }
  };

  if (isAuthenticated === null) {
    // Enhanced loading animation with security checks
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/30">
        <div className="w-full max-w-md mx-auto p-8 relative">
          <div className="text-center mb-8">
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative z-10 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            </div>
            
            <p className="mt-8 text-2xl font-bold">Owner Command Center</p>
            <p className="mt-2 text-muted-foreground">Advanced security verification in progress...</p>
            
            <div className="w-full bg-muted/50 rounded-full h-2.5 mt-6 overflow-hidden">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Loading secure systems ({Math.floor(loadingProgress)}%)
            </p>
          </div>
          
          <div className="space-y-4 text-xs font-mono">
            {Array.from({ length: 6 }).map((_, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 transition-opacity duration-300 ${
                  index + 1 <= securityChecksDone ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div className="w-5">
                  {getSecurityCheckIcon(index + 1)}
                </div>
                <div className="flex-1">
                  {getSecurityCheckText(index + 1)}
                </div>
                <div className="w-5">
                  {index + 1 <= securityChecksDone && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                </div>
              </div>
            ))}
          </div>
          
          {loadingProgress >= 95 && (
            <div className="mt-8 text-center animate-pulse">
              <p className="text-primary font-bold text-sm">Access verification complete</p>
              <p className="text-xs text-muted-foreground">Entering secure environment...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/owner/login" />;
};

export default OwnerRoute;
