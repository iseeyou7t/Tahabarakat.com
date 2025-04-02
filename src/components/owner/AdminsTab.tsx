
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { updateAdminCredentials as updateAuthServiceAdminCredentials } from "@/services/AuthService";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon, EyeOffIcon, UserCog, Shield, Clock, Search, Filter, DownloadIcon, RefreshCw, PlusCircle, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [activeAdmins, setActiveAdmins] = useState(3);
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

  // Sample admin activity logs
  const activityLogs = [
    { time: "Today, 10:23 AM", action: "Admin login", ip: "192.168.1.1", admin: "admin@example.com" },
    { time: "Yesterday, 3:45 PM", action: "Updated website settings", ip: "192.168.1.1", admin: "admin@example.com" },
    { time: "Yesterday, 2:12 PM", action: "Viewed user statistics", ip: "192.168.1.1", admin: "admin@example.com" },
    { time: "3 days ago, 11:05 AM", action: "Admin login", ip: "192.168.1.5", admin: "moderator@example.com" },
    { time: "4 days ago, 9:17 AM", action: "Content update", ip: "192.168.1.8", admin: "moderator@example.com" },
    { time: "5 days ago, 2:45 PM", action: "System backup", ip: "192.168.1.1", admin: "admin@example.com" },
    { time: "1 week ago, 11:32 AM", action: "User account management", ip: "192.168.1.5", admin: "moderator@example.com" },
    { time: "1 week ago, 10:08 AM", action: "Admin login", ip: "192.168.1.1", admin: "admin@example.com" },
  ];

  // Filter logs based on search term
  const filteredLogs = activityLogs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ip.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="credentials" className="w-full">
        <TabsList className="mb-4 w-full sm:w-auto justify-start">
          <TabsTrigger value="credentials" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Credentials</span>
          </TabsTrigger>
          <TabsTrigger value="admins" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            <span>Admin Access</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Activity Log</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="credentials" className="space-y-4">
          <Card className="border-primary/10 shadow-md shadow-primary/5 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Shield className="h-5 w-5" />
                Admin Credentials Management
              </CardTitle>
              <CardDescription>
                Update login credentials for website administrators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Admin Username</label>
                  <div className="relative">
                    <UserCog className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      value={adminCredentials.username} 
                      onChange={(e) => setAdminCredentials({...adminCredentials, username: e.target.value})}
                      className="pl-10 transition-all focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This is the username used to log into the admin panel
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Admin Password</label>
                  <div className="relative">
                    <div className="flex">
                      <Input 
                        type={isAdminPasswordVisible ? "text" : "password"} 
                        value={adminCredentials.password} 
                        onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
                        className="rounded-r-none transition-all focus:ring-2 focus:ring-primary/40 pr-10"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="rounded-l-none"
                        onClick={() => setIsAdminPasswordVisible(!isAdminPasswordVisible)}
                      >
                        {isAdminPasswordVisible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We recommend using a strong, unique password
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleUpdateAdminCredentials} 
                  disabled={isSaving}
                  className="relative overflow-hidden group transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-0 group-hover:opacity-100 animate-shine"></span>
                  {isSaving ? (
                    <span className="flex items-center">
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      Update Admin Credentials
                    </span>
                  )}
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  Changes take effect immediately. All active admin sessions will remain valid.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10 shadow-md shadow-primary/5 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <UserPlus className="h-5 w-5" />
                Additional Admin Management
              </CardTitle>
              <CardDescription>
                Add or remove administrators with customized access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {activeAdmins} Active Admins
                  </Badge>
                </div>
                <Button size="sm" className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  <span>Add New Admin</span>
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-muted/30 transition-colors">
                      <TableCell>admin@example.com</TableCell>
                      <TableCell>
                        <Badge>Super Admin</Badge>
                      </TableCell>
                      <TableCell>Today, 10:23 AM</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Active
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/30 transition-colors">
                      <TableCell>moderator@example.com</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Moderator</Badge>
                      </TableCell>
                      <TableCell>Yesterday, 2:12 PM</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Active
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/30 transition-colors">
                      <TableCell>editor@example.com</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Editor</Badge>
                      </TableCell>
                      <TableCell>3 days ago</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Active
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/30 transition-colors">
                      <TableCell>analyst@example.com</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Analyst</Badge>
                      </TableCell>
                      <TableCell>2 weeks ago</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                          Inactive
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins">
          <Card className="border-primary/10 shadow-md shadow-primary/5 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <UserCog className="h-5 w-5" />
                Admin Access Controls
              </CardTitle>
              <CardDescription>
                Manage permission settings for all administrators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Permission</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[150px]">Level</TableHead>
                      <TableHead className="text-right w-[100px]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">Content Management</TableCell>
                      <TableCell>Edit website content and blog posts</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          All Admins
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch checked={true} onCheckedChange={() => {}} className="data-[state=checked]:bg-primary" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">User Management</TableCell>
                      <TableCell>View and manage website users</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          All Admins
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch checked={true} onCheckedChange={() => {}} className="data-[state=checked]:bg-primary" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">Analytics</TableCell>
                      <TableCell>Access to website analytics and reports</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          All Admins
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch checked={true} onCheckedChange={() => {}} className="data-[state=checked]:bg-primary" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">Settings</TableCell>
                      <TableCell>Change website settings</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          All Admins
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch checked={true} onCheckedChange={() => {}} className="data-[state=checked]:bg-primary" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">System Access</TableCell>
                      <TableCell>Server and database management</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                          Super Admin
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch checked={false} onCheckedChange={() => {}} className="data-[state=checked]:bg-primary" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">API Management</TableCell>
                      <TableCell>Create and manage API keys and access</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                          Super Admin
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch checked={false} onCheckedChange={() => {}} className="data-[state=checked]:bg-primary" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">Billing Access</TableCell>
                      <TableCell>Manage payment methods and billing history</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                          Super Admin
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch checked={true} onCheckedChange={() => {}} className="data-[state=checked]:bg-primary" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card className="border-primary/10 shadow-md shadow-primary/5">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Clock className="h-5 w-5" />
                    Admin Activity Log
                  </CardTitle>
                  <CardDescription>
                    Track all administrator activities on the platform
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <DownloadIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                </div>
              </div>
              <div className="mt-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search logs by action or admin..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] rounded-md">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader className="sticky top-0 bg-card z-10">
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Admin</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead className="text-right">IP Address</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.length > 0 ? (
                        filteredLogs.map((log, index) => (
                          <TableRow key={index} className="hover:bg-muted/30 transition-colors animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                            <TableCell className="font-medium">{log.time}</TableCell>
                            <TableCell>{log.admin}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={
                                log.action.includes("login") ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                log.action.includes("update") ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                                log.action.includes("view") ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                "bg-purple-500/10 text-purple-500 border-purple-500/20"
                              }>
                                {log.action}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-mono text-xs">{log.ip}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                            No matching logs found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminsTab;
