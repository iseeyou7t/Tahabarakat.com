
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  BarChart2,
  Database,
  FileText,
  KeyRound,
  Lock,
  LogOut,
  MessageSquare,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Users,
  UserCog,
  Code,
  Server,
  Globe,
  AlertTriangle,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const OwnerDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeUsers, setActiveUsers] = useState(12);
  const [websiteTitle, setWebsiteTitle] = useState("Taha Barakat | Personal Portfolio");
  const [isSaving, setIsSaving] = useState(false);
  const [theme, setTheme] = useState("light");
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [lastBackup, setLastBackup] = useState("Never");
  const [adminCredentials, setAdminCredentials] = useState({
    username: "tahabarakat",
    password: "taha1234",
  });
  const [isAdminPasswordVisible, setIsAdminPasswordVisible] = useState(false);
  const [serverStatus, setServerStatus] = useState({
    cpu: 23,
    memory: 45,
    disk: 38,
    network: 15,
  });
  const [securityLevel, setSecurityLevel] = useState("high");
  const [apiKeys, setApiKeys] = useState([
    { name: "Public API", key: "pub_4f8a9c2d7e6b5f3a2c1d", active: true },
    { name: "Admin API", key: "adm_9b8c7d6e5f4a3b2c1d9e", active: true },
    { name: "Analytics API", key: "anl_2a3b4c5d6e7f8g9h0i1j", active: false },
  ]);
  const [customCSS, setCustomCSS] = useState("");
  const [customJS, setCustomJS] = useState("");
  const [backupSchedule, setBackupSchedule] = useState("daily");
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
    { name: "Premium", value: 230 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const pageViewData = [
    { name: "Home", views: 420 },
    { name: "About", views: 180 },
    { name: "Services", views: 240 },
    { name: "Contact", views: 150 },
    { name: "Admin", views: 45 },
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
    { time: "18:05", event: "New API key generated", ip: "192.168.1.1", severity: "low" },
  ];

  useEffect(() => {
    // Check if owner is authenticated
    const ownerAuth = localStorage.getItem("ownerAuthenticated");
    if (ownerAuth !== "true") {
      navigate("/owner/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("ownerAuthenticated");
    toast({
      title: "Logged Out",
      description: "You have been logged out of the owner dashboard",
    });
    navigate("/owner/login");
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

  const toggleBackupSchedule = (schedule: string) => {
    setBackupSchedule(schedule);
    toast({
      title: "Backup Schedule Updated",
      description: `Backups will now run ${schedule}`,
    });
  };

  const updateAdminCredentials = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("adminCredentials", JSON.stringify(adminCredentials));
      toast({
        title: "Admin Credentials Updated",
        description: "The admin login credentials have been changed",
      });
      setIsSaving(false);
    }, 1000);
  };

  const updateAPIKey = (index: number, active: boolean) => {
    const newApiKeys = [...apiKeys];
    newApiKeys[index].active = active;
    setApiKeys(newApiKeys);
    
    toast({
      title: active ? "API Key Activated" : "API Key Deactivated",
      description: `The ${newApiKeys[index].name} key has been ${active ? 'activated' : 'deactivated'}`,
    });
  };

  const saveCustomCode = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast({
        title: "Custom Code Saved",
        description: "Your custom CSS and JavaScript have been applied to the website",
      });
      setIsSaving(false);
    }, 1000);
  };

  const resetSecuritySettings = () => {
    setSecurityLevel("high");
    toast({
      title: "Security Settings Reset",
      description: "All security settings have been restored to defaults",
    });
  };

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
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

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">
            <BarChart2 className="mr-2 h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="admins">
            <ShieldAlert className="mr-2 h-4 w-4" />
            Admins
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="system">
            <Server className="mr-2 h-4 w-4" />
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
                <div className="text-2xl font-bold">2,845</div>
                <p className="text-xs text-muted-foreground">
                  +18% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Server Status
                </CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Optimal</div>
                <p className="text-xs text-muted-foreground">
                  {serverStatus.cpu}% CPU, {serverStatus.memory}% Memory
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Security Level
                </CardTitle>
                <ShieldAlert className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{securityLevel}</div>
                <p className="text-xs text-muted-foreground">
                  Last updated 2 hours ago
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Website Traffic</CardTitle>
                <CardDescription>
                  Visitor trends over the past week
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={visitData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Area type="monotone" dataKey="visits" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Server Load</CardTitle>
                <CardDescription>
                  Performance metrics over the past 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={serverLoadHistory} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <RechartsTooltip />
                      <Line type="monotone" dataKey="load" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>
                  Breakdown of user types across the platform
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
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Security Events</CardTitle>
                <CardDescription>
                  Recent security-related activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityEvents.map((event, index) => (
                    <div className="flex items-center" key={index}>
                      <div className={`mr-2 h-2 w-2 rounded-full ${
                        event.severity === "high" 
                          ? "bg-red-500" 
                          : event.severity === "medium" 
                            ? "bg-orange-500" 
                            : "bg-green-500"
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{event.event}</p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{event.time}</span>
                          <span>IP: {event.ip}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
              <CardDescription>
                Real-time user activity on your website
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
                      <TableHead>Time on Site</TableHead>
                      <TableHead>Current Page</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeUsers > 0 ? (
                      Array.from({ length: activeUsers }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>#{index + 1}</TableCell>
                          <TableCell>192.168.{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}</TableCell>
                          <TableCell>{['USA', 'Canada', 'UK', 'Germany', 'France', 'Japan', 'Australia'][Math.floor(Math.random() * 7)]}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="inline-block rounded-full w-2 h-2 bg-green-500 mr-2"></span>
                              Active
                            </div>
                          </TableCell>
                          <TableCell>{Math.floor(Math.random() * 60) + 1}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}</TableCell>
                          <TableCell>{['Home', 'About', 'Services', 'Contact', 'Gallery', 'Products', 'Blog'][Math.floor(Math.random() * 7)]}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">View</Button>
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
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          No active users
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
                <CardDescription>
                  Comprehensive user metrics and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Total Registered Users</p>
                    <div className="text-3xl font-bold">3,842</div>
                    <p className="text-xs text-muted-foreground">+253 this month</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Average Session Duration</p>
                    <div className="text-3xl font-bold">4:26</div>
                    <p className="text-xs text-muted-foreground">+0:42 from last month</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Bounce Rate</p>
                    <div className="text-3xl font-bold">24.8%</div>
                    <p className="text-xs text-muted-foreground">-2.3% from last month</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Conversion Rate</p>
                    <div className="text-3xl font-bold">3.6%</div>
                    <p className="text-xs text-muted-foreground">+0.8% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Page Performance</CardTitle>
                <CardDescription>
                  Most viewed pages on your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pageViewData} layout="vertical" margin={{ top: 10, right: 10, left: 50, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <RechartsTooltip />
                      <Bar dataKey="views" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="admins" className="space-y-4 mt-6">
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
                <Button onClick={updateAdminCredentials} disabled={isSaving}>
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
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
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
            
            <Card>
              <CardHeader>
                <CardTitle>API Management</CardTitle>
                <CardDescription>
                  Control API keys and access tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map((api, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{api.name}</p>
                          <div className="flex items-center">
                            <code className="bg-muted p-1 text-xs rounded">{api.key.substring(0, 8)}...</code>
                            <Button variant="ghost" size="sm" className="h-6 px-2 ml-2">
                              Copy
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              Regenerate
                            </Button>
                          </div>
                        </div>
                        <Switch 
                          checked={api.active} 
                          onCheckedChange={(checked) => updateAPIKey(index, checked)}
                        />
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    <KeyRound className="mr-2 h-4 w-4" />
                    Generate New API Key
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Custom Code</CardTitle>
              <CardDescription>
                Add custom CSS and JavaScript to your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Custom CSS
                </label>
                <Textarea
                  value={customCSS}
                  onChange={(e) => setCustomCSS(e.target.value)}
                  placeholder="/* Add your custom CSS here */"
                  className="font-mono text-sm h-40"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Custom JavaScript
                </label>
                <Textarea
                  value={customJS}
                  onChange={(e) => setCustomJS(e.target.value)}
                  placeholder="// Add your custom JavaScript here"
                  className="font-mono text-sm h-40"
                />
              </div>
              
              <div className="pt-2">
                <Button onClick={saveCustomCode} disabled={isSaving}>
                  <Code className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Custom Code"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>
                  Technical details about your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                      <p>{serverStatus.cpu}% (Normal)</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Website Version</p>
                      <p>v2.0.5</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Database Size</p>
                      <p>256 MB</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Uptime</p>
                      <p>99.98%</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium">CPU Usage</p>
                        <p className="text-sm">{serverStatus.cpu}%</p>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${serverStatus.cpu}%` }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium">Memory Usage</p>
                        <p className="text-sm">{serverStatus.memory}%</p>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${serverStatus.memory}%` }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium">Disk Usage</p>
                        <p className="text-sm">{serverStatus.disk}%</p>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${serverStatus.disk}%` }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-x-4">
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
                <CardTitle>Backup & Restore</CardTitle>
                <CardDescription>
                  Manage website backups and restore points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Automated Backup Schedule
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={backupSchedule === "hourly" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => toggleBackupSchedule("hourly")}
                      >
                        Hourly
                      </Button>
                      <Button 
                        variant={backupSchedule === "daily" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => toggleBackupSchedule("daily")}
                      >
                        Daily
                      </Button>
                      <Button 
                        variant={backupSchedule === "weekly" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => toggleBackupSchedule("weekly")}
                      >
                        Weekly
                      </Button>
                      <Button 
                        variant={backupSchedule === "monthly" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => toggleBackupSchedule("monthly")}
                      >
                        Monthly
                      </Button>
                      <Button 
                        variant={backupSchedule === "disabled" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => toggleBackupSchedule("disabled")}
                      >
                        Disabled
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-sm font-medium mb-2">Recent Backups</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>2023-06-15 08:00 AM</TableCell>
                          <TableCell>856 MB</TableCell>
                          <TableCell>Automatic</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Restore</Button>
                              <Button variant="outline" size="sm">Download</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-06-14 08:00 AM</TableCell>
                          <TableCell>845 MB</TableCell>
                          <TableCell>Automatic</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Restore</Button>
                              <Button variant="outline" size="sm">Download</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-06-13 02:45 PM</TableCell>
                          <TableCell>840 MB</TableCell>
                          <TableCell>Manual</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Restore</Button>
                              <Button variant="outline" size="sm">Download</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Advanced security settings and controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">SSL Certificate</p>
                        <p className="text-xs text-muted-foreground">Your website is secured with SSL (expires in 60 days)</p>
                      </div>
                      <Button variant="outline" size="sm">Renew</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Firewall Protection</p>
                        <p className="text-xs text-muted-foreground">Advanced firewall is active and protecting your site</p>
                      </div>
                      <Switch checked={true} onCheckedChange={() => {}} />
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">DDoS Protection</p>
                        <p className="text-xs text-muted-foreground">Protection against distributed denial of service attacks</p>
                      </div>
                      <Switch checked={true} onCheckedChange={() => {}} />
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Brute Force Protection</p>
                        <p className="text-xs text-muted-foreground">Block IP addresses after 5 failed login attempts</p>
                      </div>
                      <Switch checked={true} onCheckedChange={() => {}} />
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Malware Scanning</p>
                        <p className="text-xs text-muted-foreground">Daily scanning for malicious code</p>
                      </div>
                      <Switch checked={true} onCheckedChange={() => {}} />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button variant="outline" onClick={resetSecuritySettings}>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Reset Security Settings
                  </Button>
                  <Button>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Run Security Scan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OwnerDashboard;
