
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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/owner/login" />;
};

export default OwnerRoute;
