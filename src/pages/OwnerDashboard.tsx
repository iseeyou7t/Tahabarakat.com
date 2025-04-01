
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BarChart2,
  Users,
  ShieldAlert,
  Settings,
  Server,
  Zap,
} from "lucide-react";

// Import refactored components
import {
  DashboardHeader,
  DashboardOverview,
  DashboardCharts,
  UsersTab,
  AdminsTab,
  SettingsTab,
  SystemTab
} from "@/components/owner";
import AdvancedPowerPanel from "@/components/owner/AdvancedPowerPanel";

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
      <DashboardHeader handleLogout={handleLogout} />

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
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
          <TabsTrigger value="power" className="bg-primary/10 hover:bg-primary/20">
            <Zap className="mr-2 h-4 w-4 text-primary" />
            Powers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4 mt-6">
          <DashboardOverview 
            activeUsers={activeUsers} 
            serverStatus={serverStatus} 
            securityLevel={securityLevel} 
          />
          
          <DashboardCharts 
            visitData={visitData}
            userTypeData={userTypeData}
            serverLoadHistory={serverLoadHistory}
            securityEvents={securityEvents}
          />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4 mt-6">
          <UsersTab 
            activeUsers={activeUsers}
            handleKickUser={handleKickUser}
            pageViewData={pageViewData}
          />
        </TabsContent>
        
        <TabsContent value="admins" className="space-y-4 mt-6">
          <AdminsTab
            adminCredentials={adminCredentials}
            setAdminCredentials={setAdminCredentials}
            updateAdminCredentials={updateAdminCredentials}
            isSaving={isSaving}
          />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 mt-6">
          <SettingsTab
            websiteTitle={websiteTitle}
            setWebsiteTitle={setWebsiteTitle}
            theme={theme}
            setTheme={setTheme}
            analyticsEnabled={analyticsEnabled}
            setAnalyticsEnabled={setAnalyticsEnabled}
            maintenanceMode={maintenanceMode}
            toggleMaintenanceMode={toggleMaintenanceMode}
            apiKeys={apiKeys}
            updateAPIKey={updateAPIKey}
            customCSS={customCSS}
            setCustomCSS={setCustomCSS}
            customJS={customJS}
            setCustomJS={setCustomJS}
            handleSaveSettings={handleSaveSettings}
            saveCustomCode={saveCustomCode}
            isSaving={isSaving}
          />
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4 mt-6">
          <SystemTab
            serverStatus={serverStatus}
            lastBackup={lastBackup}
            handleBackup={handleBackup}
            securityLevel={securityLevel}
            resetSecuritySettings={resetSecuritySettings}
            backupSchedule={backupSchedule}
            toggleBackupSchedule={toggleBackupSchedule}
          />
        </TabsContent>
        
        <TabsContent value="power" className="space-y-4 mt-6">
          <AdvancedPowerPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OwnerDashboard;
