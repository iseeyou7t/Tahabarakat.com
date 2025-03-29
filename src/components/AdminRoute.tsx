
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = localStorage.getItem("adminAuthenticated");
      setIsAuthenticated(adminAuth === "true");
    };
    
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Still checking authentication
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

export default AdminRoute;
