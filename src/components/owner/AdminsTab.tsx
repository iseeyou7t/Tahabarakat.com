
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { updateAdminCredentials as updateAuthServiceAdminCredentials } from "@/services/AuthService";
import { useToast } from "@/hooks/use-toast";

interface AdminCredentials {
  username: string;
  password: string;
}

interface AdminsTabProps {
  adminCredentials: AdminCredentials;
  setAdminCredentials: (credentials: AdminCredentials) => void;
  updateAdminCredentials: () => void;
  isSaving: boolean;
}

const AdminsTab = ({ 
  adminCredentials, 
  setAdminCredentials, 
  updateAdminCredentials, 
  isSaving 
}: AdminsTabProps) => {
  const [isAdminPasswordVisible, setIsAdminPasswordVisible] = useState(false);
  const { toast } = useToast();

  // Handle validation before calling the parent updateAdminCredentials function
  const handleUpdateAdminCredentials = () => {
    // Validate input
    if (!adminCredentials.username || !adminCredentials.password) {
      toast({
        title: "Validation Error",
        description: "Username and password cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    // Call the parent update function
    updateAdminCredentials();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Management</CardTitle>
        <CardDescription>
          Control access for website administrators
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Update Admin Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Admin Username</label>
              <Input 
                value={adminCredentials.username} 
                onChange={(e) => setAdminCredentials({...adminCredentials, username: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Admin Password</label>
              <div className="flex">
                <Input 
                  type={isAdminPasswordVisible ? "text" : "password"} 
                  value={adminCredentials.password} 
                  onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
                  className="rounded-r-none"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="rounded-l-none"
                  onClick={() => setIsAdminPasswordVisible(!isAdminPasswordVisible)}
                >
                  {isAdminPasswordVisible ? "Hide" : "Show"}
                </Button>
              </div>
            </div>
          </div>
          <Button onClick={handleUpdateAdminCredentials} disabled={isSaving}>
            {isSaving ? "Updating..." : "Update Admin Credentials"}
          </Button>
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-4">Admin Access Controls</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Permission</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Content Management</TableCell>
                <TableCell>Edit website content and blog posts</TableCell>
                <TableCell>
                  <Switch checked={true} onCheckedChange={() => {}} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>User Management</TableCell>
                <TableCell>View and manage website users</TableCell>
                <TableCell>
                  <Switch checked={true} onCheckedChange={() => {}} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Analytics</TableCell>
                <TableCell>Access to website analytics and reports</TableCell>
                <TableCell>
                  <Switch checked={true} onCheckedChange={() => {}} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Settings</TableCell>
                <TableCell>Change website settings</TableCell>
                <TableCell>
                  <Switch checked={true} onCheckedChange={() => {}} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>System Access</TableCell>
                <TableCell>Server and database management</TableCell>
                <TableCell>
                  <Switch checked={false} onCheckedChange={() => {}} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-4">Admin Activity Log</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Today, 10:23 AM</TableCell>
                <TableCell>Admin login</TableCell>
                <TableCell>192.168.1.1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Yesterday, 3:45 PM</TableCell>
                <TableCell>Updated website settings</TableCell>
                <TableCell>192.168.1.1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Yesterday, 2:12 PM</TableCell>
                <TableCell>Viewed user statistics</TableCell>
                <TableCell>192.168.1.1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3 days ago, 11:05 AM</TableCell>
                <TableCell>Admin login</TableCell>
                <TableCell>192.168.1.5</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminsTab;
