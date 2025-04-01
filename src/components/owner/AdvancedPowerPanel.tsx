
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CornerUpRight, Shield, Wand2, Zap, RotateCw, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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

const AdvancedPowerPanel = () => {
  const { toast } = useToast();
  const [advancedModeEnabled, setAdvancedModeEnabled] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [superAdminAccess, setSuperAdminAccess] = useState(false);
  const [cooldownStatus, setCooldownStatus] = useState<Record<string, boolean>>({});

  const powerActions = [
    {
      id: 'optimize-db',
      name: 'Optimize Database',
      description: 'Run database optimization queries to improve performance',
      icon: <RotateCw className="h-5 w-5" />,
      severity: 'low',
      cooldown: 5000,
      action: () => {
        toast({
          title: "Database Optimization Started",
          description: "Running optimization routines...",
        });
        
        setTimeout(() => {
          toast({
            title: "Database Optimized",
            description: "All tables have been optimized and indexes rebuilt",
          });
        }, 2000);
      }
    },
    {
      id: 'force-logout',
      name: 'Force Logout All Users',
      description: 'Immediately log out all active users from the website',
      icon: <Shield className="h-5 w-5" />,
      severity: 'medium',
      cooldown: 8000,
      action: () => {
        toast({
          title: "Force Logout Initiated",
          description: "All users are being logged out...",
        });
        
        setTimeout(() => {
          toast({
            title: "Force Logout Complete",
            description: "All user sessions have been terminated",
          });
        }, 1500);
      }
    },
    {
      id: 'emergency-lock',
      name: 'Emergency Lockdown',
      description: 'Restrict all access to the website except for owners',
      icon: <AlertTriangle className="h-5 w-5" />,
      severity: 'high',
      cooldown: 10000,
      action: () => {
        toast({
          title: "⚠️ EMERGENCY LOCKDOWN ACTIVATED",
          description: "Website is now in lockdown mode. Only owners can access.",
          variant: "destructive"
        });
      }
    },
    {
      id: 'super-admin',
      name: 'Grant Super Admin Powers',
      description: 'Temporarily elevate all admin accounts to owner-level privileges',
      icon: <Wand2 className="h-5 w-5" />,
      severity: 'extreme',
      cooldown: 15000,
      action: () => {
        setSuperAdminAccess(true);
        toast({
          title: "Super Admin Mode Activated",
          description: "All admins now have owner-level privileges for 5 minutes",
        });
        
        setTimeout(() => {
          setSuperAdminAccess(false);
          toast({
            title: "Super Admin Mode Deactivated",
            description: "Admin privileges have been restored to normal",
          });
        }, 10000); // Reduced for demo purposes
      }
    },
    {
      id: 'system-boost',
      name: 'Boost System Resources',
      description: 'Allocate additional server resources for improved performance',
      icon: <Zap className="h-5 w-5" />,
      severity: 'medium',
      cooldown: 12000,
      action: () => {
        toast({
          title: "System Boost Initiated",
          description: "Allocating additional resources to the server...",
        });
        
        setTimeout(() => {
          toast({
            title: "System Resources Boosted",
            description: "Server performance has been enhanced for the next hour",
          });
        }, 2500);
      }
    },
  ];

  const handlePowerAction = (id: string, action: () => void, cooldown: number) => {
    if (cooldownStatus[id]) return;
    
    // Set cooldown
    setCooldownStatus(prev => ({ ...prev, [id]: true }));
    
    // Execute action
    action();
    
    // Reset cooldown after delay
    setTimeout(() => {
      setCooldownStatus(prev => ({ ...prev, [id]: false }));
    }, cooldown);
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'low': return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/30';
      case 'extreme': return 'bg-red-500/10 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Advanced Owner Powers
        </CardTitle>
        <CardDescription>
          Special administrative controls with extensive capabilities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex justify-between items-center p-3 border rounded-lg bg-muted/30">
          <div>
            <h4 className="font-medium">Advanced Mode</h4>
            <p className="text-sm text-muted-foreground">Enable powerful owner-only tools</p>
          </div>
          <Switch 
            checked={advancedModeEnabled} 
            onCheckedChange={setAdvancedModeEnabled}
          />
        </div>
        
        {advancedModeEnabled && (
          <>
            <div className="flex justify-between items-center p-3 border rounded-lg bg-muted/30">
              <div>
                <h4 className="font-medium">Debug Mode</h4>
                <p className="text-sm text-muted-foreground">Show technical details and logs</p>
              </div>
              <Switch 
                checked={debugMode} 
                onCheckedChange={setDebugMode}
              />
            </div>
            
            <div className="border rounded-lg p-3">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" /> Power Actions
                {superAdminAccess && (
                  <Badge className="ml-2 bg-red-500/20 text-red-500 border border-red-500/30">Super Admin Active</Badge>
                )}
              </h3>
              <div className="grid gap-3">
                {powerActions.map((power) => (
                  <AlertDialog key={power.id}>
                    <AlertDialogTrigger asChild>
                      <button 
                        className={`w-full p-3 border rounded-lg flex items-center justify-between transition-all ${
                          cooldownStatus[power.id] 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-muted/50 hover:border-primary/20'
                        }`}
                        disabled={cooldownStatus[power.id]}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {power.icon}
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium">{power.name}</h4>
                            <p className="text-xs text-muted-foreground">{power.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline" className={getSeverityColor(power.severity)}>
                            {power.severity}
                          </Badge>
                          <CornerUpRight className="h-4 w-4 ml-2 text-muted-foreground" />
                        </div>
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will affect how the website functions and may impact users.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handlePowerAction(power.id, power.action, power.cooldown)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ))}
              </div>
            </div>
            
            {debugMode && (
              <div className="border rounded-lg p-3 font-mono text-xs">
                <h4 className="font-medium text-sm mb-2">System Logs</h4>
                <div className="bg-black/90 text-green-400 p-3 rounded h-32 overflow-y-auto">
                  <p>[{new Date().toISOString()}] Owner session initialized</p>
                  <p>[{new Date().toISOString()}] Advanced mode activated</p>
                  <p>[{new Date().toISOString()}] Running security scan...</p>
                  <p>[{new Date().toISOString()}] Security scan complete: No threats detected</p>
                  <p>[{new Date().toISOString()}] Memory usage: 42%</p>
                  <p>[{new Date().toISOString()}] CPU load: 23%</p>
                  <p>[{new Date().toISOString()}] Active connections: 17</p>
                  {superAdminAccess && (
                    <>
                      <p className="text-yellow-400">[{new Date().toISOString()}] ⚠️ SUPER ADMIN MODE ACTIVE</p>
                      <p className="text-yellow-400">[{new Date().toISOString()}] Extended privileges granted to admin users</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedPowerPanel;
