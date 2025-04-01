
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  handleLogout: () => void;
}

const DashboardHeader = ({ handleLogout }: DashboardHeaderProps) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Owner Dashboard</h1>
        <p className="text-muted-foreground">Complete control over your website</p>
      </div>
      <div className="flex gap-2">
        <Link to="/admin/dashboard">
          <Button variant="outline">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Admin Dashboard
          </Button>
        </Link>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
