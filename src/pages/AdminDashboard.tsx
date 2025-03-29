
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { LogOut, Settings, Shield, User } from "lucide-react";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeUsers, setActiveUsers] = useState(5);
  const [websiteTitle, setWebsiteTitle] = useState("Taha Barakat | Personal Portfolio");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem("adminAuthenticated");
    if (adminAuth !== "true") {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin dashboard",
    });
    navigate("/admin/login");
  };

  const handleKickUser = (userId: number) => {
    setActiveUsers(activeUsers - 1);
    toast({
      title: "User Kicked",
      description: `User ID: ${userId} has been kicked from the website`,
    });
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      document.title = websiteTitle;
      toast({
        title: "Settings Saved",
        description: "Your website settings have been updated",
      });
      setIsSaving(false);
    }, 1000);
  };

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your website settings and users</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </header>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">Website Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeUsers}</div>
                <p className="text-xs text-muted-foreground">
                  Currently browsing the website
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Admin Access
                </CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Enabled</div>
                <p className="text-xs text-muted-foreground">
                  Full administrator privileges
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Website Status
                </CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Online</div>
                <p className="text-xs text-muted-foreground">
                  All systems operational
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Admin Overview</CardTitle>
              <CardDescription>
                Welcome to your website administration panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Use this dashboard to manage your website settings, monitor user activity, and make updates to your content.
              </p>
              <p>
                For security purposes, remember to log out when you're done and never share your admin credentials.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Monitor and manage users currently on your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 p-4 font-medium">
                    <div>User ID</div>
                    <div>IP Address</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  {activeUsers > 0 ? (
                    Array.from({ length: activeUsers }).map((_, index) => (
                      <div key={index} className="grid grid-cols-4 p-4 border-t">
                        <div>#{index + 1}</div>
                        <div>192.168.{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}</div>
                        <div>
                          <span className="inline-block rounded-full w-2 h-2 bg-green-500 mr-2"></span>
                          Active
                        </div>
                        <div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">Kick User</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will immediately disconnect the user from your website.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleKickUser(index + 1)}>
                                  Kick User
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 border-t text-center text-muted-foreground">
                      No active users
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Settings</CardTitle>
              <CardDescription>
                Customize your website appearance and functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="website-title">
                  Website Title
                </label>
                <Input
                  id="website-title"
                  value={websiteTitle}
                  onChange={(e) => setWebsiteTitle(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  This appears in browser tabs and search results
                </p>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
