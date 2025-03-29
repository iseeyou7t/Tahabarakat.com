import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

// This component is no longer used in the main layout as it's integrated into the navbar
// Keeping it for reference or in case it needs to be used elsewhere
const AdminLink = () => {
  const isAdmin = localStorage.getItem("adminAuthenticated") === "true";
  
  return (
    <Link to={isAdmin ? "/admin/dashboard" : "/admin/login"}>
      <Button variant="outline" size="sm" className="fixed top-4 right-4 z-50 opacity-70 hover:opacity-100 transition-opacity">
        <Shield className="h-4 w-4 mr-2" />
        {isAdmin ? "Admin Dashboard" : "Admin Login"}
      </Button>
    </Link>
  );
};

export default AdminLink;
