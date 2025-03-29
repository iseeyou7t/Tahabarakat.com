
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  BarChart2,
  Database,
  FileText,
  LogOut,
  MessageSquare,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeUsers, setActiveUsers] = useState(5);
  const [websiteTitle, setWebsiteTitle] = useState("Taha Barakat | Personal Portfolio");
  const [isSaving, setIsSaving] = useState(false);
  const [theme, setTheme] = useState("light");
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [lastBackup, setLastBackup] = useState("Never");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample data for charts
  const visitData = [
    { name: "Mon", visits: 120 },
    { name: "Tue", visits: 150 },
    { name: "Wed", visits: 180 },
    { name: "Thu", visits: 145 },
    { name: "Fri", visits: 190 },
    { name: "Sat", visits: 80 },
    { name: "Sun", visits: 70 },
  ];

  const userTypeData = [
    { name: "New Users", value: 350 },
    { name: "Returning", value: 650 },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  const pageViewData = [
    { name: "Home", views: 420 },
    { name: "About", views: 180 },
    { name: "Services", views: 240 },
    { name: "Contact", views: 150 },
  ];

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

  const handleBackup = () => {
    toast({
      title: "Backup Started",
      description: "Creating a backup of your website data...",
    });
    
    setTimeout(() => {
      const now = new Date();
      setLastBackup(now.toLocaleString());
      toast({
        title: "Backup Complete",
        description: "Website data has been successfully backed up",
      });
    }, 2000);
  };

  const toggleMaintenanceMode = () => {
    setMaintenanceMode(!maintenanceMode);
    toast({
      title: maintenanceMode ? "Maintenance Mode Disabled" : "Maintenance Mode Enabled",
      description: maintenanceMode 
        ? "Your website is now accessible to the public" 
        : "Your website is now in maintenance mode and only accessible to admins",
    });
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">
            <BarChart2 className="mr-2 h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Website Settings
          </TabsTrigger>
          <TabsTrigger value="system">
            <Database className="mr-2 h-4 w-4" />
            System
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
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
                  Total Visits
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,024</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Messages
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  3 unread messages
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
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Website Traffic</CardTitle>
                <CardDescription>
                  Daily visitor count for the past week
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={visitData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="visits" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Page Views</CardTitle>
                <CardDescription>
                  Most visited pages on your site
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pageViewData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="views" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Types</CardTitle>
                <CardDescription>
                  Distribution of new vs returning visitors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {userTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest actions on your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New contact form submission</p>
                      <p className="text-xs text-muted-foreground">10 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">User ID #3 visited Services page</p>
                      <p className="text-xs text-muted-foreground">25 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-orange-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Website settings updated</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Admin login from IP 192.168.1.1</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">404 error on /blog/article-123</p>
                      <p className="text-xs text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeUsers > 0 ? (
                      Array.from({ length: activeUsers }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>#{index + 1}</TableCell>
                          <TableCell>192.168.{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}</TableCell>
                          <TableCell>{['USA', 'Canada', 'UK', 'Germany', 'France'][Math.floor(Math.random() * 5)]}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="inline-block rounded-full w-2 h-2 bg-green-500 mr-2"></span>
                              Active
                            </div>
                          </TableCell>
                          <TableCell>{['Browsing About', 'Viewing Services', 'On Homepage', 'Contact Form', 'Gallery'][Math.floor(Math.random() * 5)]}</TableCell>
                          <TableCell>
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
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No active users
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
              <CardDescription>
                Overview of user activity and engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Total Registered Users</p>
                  <div className="text-3xl font-bold">1,245</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Average Time on Site</p>
                  <div className="text-3xl font-bold">3:24</div>
                  <p className="text-xs text-muted-foreground">Minutes:Seconds</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Bounce Rate</p>
                  <div className="text-3xl font-bold">24.8%</div>
                  <p className="text-xs text-muted-foreground">-2.3% from last month</p>
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
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="theme-select">
                  Website Theme
                </label>
                <div className="flex space-x-2">
                  <Button 
                    variant={theme === "light" ? "default" : "outline"} 
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </Button>
                  <Button 
                    variant={theme === "dark" ? "default" : "outline"} 
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </Button>
                  <Button 
                    variant={theme === "system" ? "default" : "outline"} 
                    onClick={() => setTheme("system")}
                  >
                    System
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Select the default color theme for your website
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Analytics Tracking
                </label>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={analyticsEnabled ? "default" : "outline"} 
                    onClick={() => setAnalyticsEnabled(true)}
                  >
                    Enabled
                  </Button>
                  <Button 
                    variant={!analyticsEnabled ? "default" : "outline"} 
                    onClick={() => setAnalyticsEnabled(false)}
                  >
                    Disabled
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enable or disable website analytics tracking
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Maintenance Mode
                </label>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={maintenanceMode ? "default" : "outline"} 
                    onClick={toggleMaintenanceMode}
                  >
                    {maintenanceMode ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  When enabled, only administrators can access the website
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
        
        <TabsContent value="system" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                Technical details about your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Server Status</p>
                    <div className="flex items-center">
                      <span className="inline-block rounded-full w-2 h-2 bg-green-500 mr-2"></span>
                      <span>Operational</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Last Backup</p>
                    <p>{lastBackup}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Server Load</p>
                    <p>23% (Normal)</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Website Version</p>
                    <p>v1.2.5</p>
                  </div>
                </div>
                
                <div className="pt-4 flex space-x-4">
                  <Button onClick={handleBackup}>
                    <Database className="mr-2 h-4 w-4" />
                    Backup Website
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View Error Logs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage security settings for your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Two-Factor Authentication</p>
                        <p className="text-xs text-muted-foreground">Require a verification code in addition to password</p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">IP Restriction</p>
                        <p className="text-xs text-muted-foreground">Limit admin access to specific IP addresses</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Security Audit Log</p>
                        <p className="text-xs text-muted-foreground">Track all security-related events</p>
                      </div>
                      <Button variant="outline" size="sm">View Log</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
