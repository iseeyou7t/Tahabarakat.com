
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface OwnerRouteProps {
  children: ReactNode;
}

const OwnerRoute = ({ children }: OwnerRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const ownerAuth = localStorage.getItem("ownerAuthenticated");
      setIsAuthenticated(ownerAuth === "true");
    };
    
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Still checking authentication
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/owner/login" />;
};

export default OwnerRoute;
