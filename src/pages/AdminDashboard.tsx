
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
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
  AlertTriangle,
  BarChart2,
  Database,
  FileText,
  Key,
  Lock,
  LogOut,
  MessageSquare,
  Settings,
  Shield,
  Terminal,
  Trash2,
  Users,
  Zap,
  Eye,
  EyeOff,
  Sparkles,
  Plug,
  Code,
  Cpu,
  Network,
  RefreshCw,
  UploadCloud,
  Save,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/utils/animationUtils";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeUsers, setActiveUsers] = useState(5);
  const [websiteTitle, setWebsiteTitle] = useState("Taha Barakat | Personal Portfolio");
  const [isSaving, setIsSaving] = useState(false);
  const [theme, setTheme] = useState("light");
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [lastBackup, setLastBackup] = useState("Never");
  const [securityLevel, setSecurityLevel] = useState("high");
  const [customCSS, setCustomCSS] = useState("");
  const [customJS, setCustomJS] = useState("");
  const [systemLoad, setSystemLoad] = useState(23);
  const [memoryUsage, setMemoryUsage] = useState(45);
  const [diskUsage, setDiskUsage] = useState(38);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [apiKeys, setApiKeys] = useState([
    { name: "Public API", key: "pub_4f8a9c2d7e6b5f3a2c1d", active: true },
    { name: "Admin API", key: "adm_9b8c7d6e5f4a3b2c1d9e", active: true },
  ]);
  const [isPerformingScan, setIsPerformingScan] = useState(false);
  const [databaseBackupSchedule, setDatabaseBackupSchedule] = useState("daily");
  
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
  
  const serverLoadHistory = [
    { time: "00:00", load: 15 },
    { time: "04:00", load: 12 },
    { time: "08:00", load: 25 },
    { time: "12:00", load: 45 },
    { time: "16:00", load: 32 },
    { time: "20:00", load: 26 },
    { time: "Now", load: 23 },
  ];

  const securityEvents = [
    { time: "08:23", event: "Failed login attempt", ip: "192.168.1.35", severity: "medium" },
    { time: "10:45", event: "Admin login successful", ip: "192.168.1.1", severity: "low" },
    { time: "12:12", event: "File permission change", ip: "192.168.1.5", severity: "low" },
    { time: "14:30", event: "Brute force attempt", ip: "203.0.113.12", severity: "high" },
  ];

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem("adminAuthenticated");
    if (adminAuth !== "true") {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
      
      // Show welcome toast
      toast({
        title: "Welcome, Administrator",
        description: "You have full administrative access.",
      });
      
      // Simulate real-time updates for system metrics
      const interval = setInterval(() => {
        setSystemLoad(prev => Math.min(95, Math.max(5, prev + (Math.random() * 6 - 3))));
        setMemoryUsage(prev => Math.min(95, Math.max(5, prev + (Math.random() * 4 - 2))));
        setDiskUsage(prev => Math.min(95, Math.max(5, prev + (Math.random() * 2 - 1))));
        
        // Random variation to active users
        const userVariation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        setActiveUsers(prev => Math.max(1, prev + userVariation));
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [navigate, toast]);

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
  
  const changeAPIKeyStatus = (index: number, status: boolean) => {
    const newApiKeys = [...apiKeys];
    newApiKeys[index].active = status;
    setApiKeys(newApiKeys);
    
    toast({
      title: status ? "API Key Activated" : "API Key Deactivated",
      description: `The ${newApiKeys[index].name} has been ${status ? 'activated' : 'deactivated'}`,
    });
  };
  
  const generateNewAPIKey = () => {
    // Generate a random key
    const randomKey = "api_" + Math.random().toString(36).substring(2, 15);
    
    setApiKeys([...apiKeys, {
      name: "New API Key",
      key: randomKey,
      active: true,
    }]);
    
    toast({
      title: "New API Key Generated",
      description: "A new API key has been created and activated",
    });
  };
  
  const saveCustomCode = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast({
        title: "Custom Code Saved",
        description: "Your custom code has been applied to the website",
      });
      setIsSaving(false);
    }, 1000);
  };
  
  const performSecurityScan = () => {
    setIsPerformingScan(true);
    toast({
      title: "Security Scan Started",
      description: "Scanning your website for vulnerabilities...",
    });
    
    setTimeout(() => {
      setIsPerformingScan(false);
      toast({
        title: "Security Scan Complete",
        description: "No critical vulnerabilities found",
      });
    }, 3000);
  };
  
  const clearCache = () => {
    toast({
      title: "Cache Cleared",
      description: "Website cache has been successfully cleared",
    });
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === "advanced") {
      toast({
        title: "Advanced Tools Accessed",
        description: "You now have access to advanced administrative tools",
      });
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="relative min-h-screen bg-background/80 backdrop-blur-md">
      <AnimatedBackground />
      
      <div className="container mx-auto p-4 md:p-8 space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your website with advanced controls</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Admin
              </Badge>
              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                Online
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </motion.div>
        </header>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="dashboard" className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center">
              <Database className="mr-2 h-4 w-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center bg-primary/10 hover:bg-primary/20">
              <Zap className="mr-2 h-4 w-4 text-primary" />
              Advanced
            </TabsTrigger>
          </TabsList>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Dashboard Tab */}
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
                      Security Status
                    </CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">Secure</div>
                    <p className="text-xs text-muted-foreground">
                      Last scan: 2 hours ago
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
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <RechartsTooltip contentStyle={{ background: 'rgba(20, 20, 30, 0.8)', border: 'none', borderRadius: '4px' }} />
                          <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
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
                        <AreaChart data={pageViewData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                          <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <RechartsTooltip contentStyle={{ background: 'rgba(20, 20, 30, 0.8)', border: 'none', borderRadius: '4px' }} />
                          <Area type="monotone" dataKey="views" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorViews)" />
                        </AreaChart>
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
                            fill="hsl(var(--primary))"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {userTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip contentStyle={{ background: 'rgba(20, 20, 30, 0.8)', border: 'none', borderRadius: '4px' }} />
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
            
            {/* Users Tab */}
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
                                <div className="flex space-x-2">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="destructive" size="sm">Kick</Button>
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
                                  
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
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
              
              <Card>
                <CardHeader>
                  <CardTitle>User Permissions</CardTitle>
                  <CardDescription>
                    Manage access levels and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-2">User Roles</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Administrators</span>
                            <Badge>2 users</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Moderators</span>
                            <Badge>5 users</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Standard Users</span>
                            <Badge>1,238 users</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-2">Access Control</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>User Registration</span>
                            <Switch checked={true} />
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Email Verification</span>
                            <Switch checked={true} />
                          </div>
                          <div className="flex justify-between items-center">
                            <span>2FA for Admins</span>
                            <Switch checked={false} />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">IP Blacklist</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex justify-between items-center border p-2 rounded-md">
                          <span className="text-sm">203.0.113.42</span>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex justify-between items-center border p-2 rounded-md">
                          <span className="text-sm">198.51.100.23</span>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex justify-between items-center border p-2 rounded-md">
                          <span className="text-sm">192.0.2.146</span>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Input placeholder="Enter IP address" />
                        <Button>Add to Blacklist</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
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
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Custom CSS
                    </label>
                    <Textarea 
                      placeholder="Enter custom CSS"
                      value={customCSS}
                      onChange={(e) => setCustomCSS(e.target.value)}
                      className="font-mono text-sm h-32"
                    />
                    <p className="text-xs text-muted-foreground">
                      Add custom CSS to override the default styling
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Custom JavaScript
                    </label>
                    <Textarea 
                      placeholder="Enter custom JavaScript"
                      value={customJS}
                      onChange={(e) => setCustomJS(e.target.value)}
                      className="font-mono text-sm h-32"
                    />
                    <p className="text-xs text-muted-foreground">
                      Add custom JavaScript to enhance functionality
                    </p>
                  </div>
                  
                  <div className="pt-4 flex gap-2">
                    <Button onClick={handleSaveSettings} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Settings"}
                    </Button>
                    <Button variant="outline" onClick={saveCustomCode} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Apply Custom Code"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>API Management</CardTitle>
                  <CardDescription>
                    Manage API keys and access tokens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>API Name</TableHead>
                          <TableHead>Key</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {apiKeys.map((api, index) => (
                          <TableRow key={index}>
                            <TableCell>{api.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <code className="bg-muted p-1 rounded text-xs">{api.key}</code>
                                <Button variant="ghost" size="sm" className="ml-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={api.active ? "default" : "secondary"}>
                                {api.active ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant={api.active ? "outline" : "default"}
                                  onClick={() => changeAPIKeyStatus(index, !api.active)}
                                >
                                  {api.active ? "Deactivate" : "Activate"}
                                </Button>
                                <Button size="sm" variant="destructive">
                                  Revoke
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <Button onClick={generateNewAPIKey}>
                      <Key className="mr-2 h-4 w-4" />
                      Generate New API Key
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* System Tab */}
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
                        <p className="text-sm font-medium">PHP Version</p>
                        <p>8.1.2</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Database</p>
                        <p>MySQL 8.0.27</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Website Version</p>
                        <p>v2.1.3</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">SSL Certificate</p>
                        <div className="flex items-center">
                          <span className="inline-block rounded-full w-2 h-2 bg-green-500 mr-2"></span>
                          <span>Valid (expires in 324 days)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <h3 className="text-sm font-medium">System Load</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>CPU Usage</span>
                            <span>{Math.round(systemLoad)}%</span>
                          </div>
                          <Progress value={systemLoad} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Memory Usage</span>
                            <span>{Math.round(memoryUsage)}%</span>
                          </div>
                          <Progress value={memoryUsage} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Disk Usage</span>
                            <span>{Math.round(diskUsage)}%</span>
                          </div>
                          <Progress value={diskUsage} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex flex-wrap gap-2">
                      <Button onClick={handleBackup}>
                        <Database className="mr-2 h-4 w-4" />
                        Backup Website
                      </Button>
                      <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        View Error Logs
                      </Button>
                      <Button variant="outline" onClick={clearCache}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Clear Cache
                      </Button>
                      <Button variant="outline">
                        <Terminal className="mr-2 h-4 w-4" />
                        Server Console
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
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Security Status</h3>
                        <p className="text-sm text-muted-foreground">
                          Current security level: <span className="font-medium">{securityLevel.charAt(0).toUpperCase() + securityLevel.slice(1)}</span>
                        </p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={performSecurityScan}
                        disabled={isPerformingScan}
                      >
                        {isPerformingScan ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Scanning...
                          </>
                        ) : (
                          <>
                            <Shield className="mr-2 h-4 w-4" />
                            Run Security Scan
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Recent Security Events</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {securityEvents.map((event, index) => (
                          <div 
                            key={index} 
                            className={`p-2 text-xs border-l-2 ${
                              event.severity === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 
                              event.severity === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 
                              'border-green-500 bg-green-50 dark:bg-green-900/20'
                            }`}
                          >
                            <div className="flex justify-between">
                              <span className="font-mono">{event.time}</span>
                              <Badge variant="outline" className="text-xs">
                                {event.severity}
                              </Badge>
                            </div>
                            <p className="mt-1">{event.event} from IP {event.ip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
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
                            <p className="text-sm font-medium">Database Backup Schedule</p>
                            <p className="text-xs text-muted-foreground">Schedule automatic backups of your database</p>
                          </div>
                          <Select defaultValue={databaseBackupSchedule} onValueChange={setDatabaseBackupSchedule}>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Advanced Tab */}
            <TabsContent value="advanced" className="space-y-4 mt-6">
              <Card className="border-2 border-orange-500 bg-orange-500/5">
                <CardHeader>
                  <CardTitle className="text-orange-500 flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Advanced System Controls
                  </CardTitle>
                  <CardDescription>
                    Warning: These tools provide powerful system-level access. Use with caution.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="h-full">
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm">Database Controls</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 pb-3">
                          <Button variant="outline" className="w-full justify-start">
                            <Database className="mr-2 h-4 w-4" />
                            Database Console
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <UploadCloud className="mr-2 h-4 w-4" />
                            Import Database
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="mr-2 h-4 w-4" />
                            Export Database
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" className="w-full justify-start mt-2">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Reset Database
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Database Reset</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action will remove all data and cannot be undone. Are you sure you want to continue?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Reset Database</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </CardContent>
                      </Card>
                      
                      <Card className="h-full">
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm">Server Controls</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 pb-3">
                          <Button variant="outline" className="w-full justify-start">
                            <Terminal className="mr-2 h-4 w-4" />
                            Server Shell
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Cpu className="mr-2 h-4 w-4" />
                            Resource Monitor
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Network className="mr-2 h-4 w-4" />
                            Network Diagnostics
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Restart Services
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="h-full">
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm">Developer Tools</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 pb-3">
                          <Button variant="outline" className="w-full justify-start">
                            <Code className="mr-2 h-4 w-4" />
                            Code Editor
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <FileText className="mr-2 h-4 w-4" />
                            Log Viewer
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Plug className="mr-2 h-4 w-4" />
                            API Tester
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Save className="mr-2 h-4 w-4" />
                            Export Config
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm">Raw Configuration Editor</CardTitle>
                        <CardDescription>
                          Directly edit system configuration files
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Textarea 
                          className="font-mono text-xs h-48"
                          placeholder="{
  'debug_mode': false,
  'cache_timeout': 3600,
  'session_lifetime': 86400,
  'allowed_origins': ['*.example.com'],
  'database': {
    'host': 'localhost',
    'port': 3306,
    'name': 'my_database'
  }
}"
                        />
                        <div className="flex justify-end mt-2">
                          <Button size="sm">
                            Save Configuration
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm">Security Override</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 pb-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">Debug Mode</p>
                              <p className="text-xs text-muted-foreground">Show detailed errors and debug info</p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">Admin Password Override</p>
                              <p className="text-xs text-muted-foreground">Allow password reset without email</p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">Disable Rate Limiting</p>
                              <p className="text-xs text-muted-foreground">Remove API request limits</p>
                            </div>
                            <Switch />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm">Site Management</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 pb-3">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm" className="w-full justify-start">
                                <Lock className="mr-2 h-4 w-4" />
                                Lock Website (Emergency)
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Emergency Site Lockdown</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will immediately prevent all access to the website except for admin users. Continue?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Lock Website</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Users className="mr-2 h-4 w-4" />
                            Force Logout All Users
                          </Button>
                          
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <EyeOff className="mr-2 h-4 w-4" />
                            Hide Admin From Users
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm" className="w-full justify-start">
                                <Sparkles className="mr-2 h-4 w-4" />
                                Factory Reset Website
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Factory Reset</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will reset the entire website to default settings. All content, users, and settings will be lost. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Reset Website</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
