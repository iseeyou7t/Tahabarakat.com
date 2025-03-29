
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLink = () => {
  const isAdmin = localStorage.getItem("adminAuthenticated") === "true";
  
  return (
    <Link to={isAdmin ? "/admin/dashboard" : "/admin/login"}>
      <Button variant="outline" size="sm" className="fixed bottom-4 right-4 opacity-30 hover:opacity-100 transition-opacity">
        <Shield className="h-4 w-4 mr-2" />
        {isAdmin ? "Admin Dashboard" : "Admin Login"}
      </Button>
    </Link>
  );
};

export default AdminLink;
