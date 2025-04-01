
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Database, FileText, AlertTriangle, ShieldCheck } from "lucide-react";

interface ServerStatus {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

interface SystemTabProps {
  serverStatus: ServerStatus;
  lastBackup: string;
  handleBackup: () => void;
  securityLevel: string;
  resetSecuritySettings: () => void;
  backupSchedule: string;
  toggleBackupSchedule: (schedule: string) => void;
}

const SystemTab = ({
  serverStatus,
  lastBackup,
  handleBackup,
  securityLevel,
  resetSecuritySettings,
  backupSchedule,
  toggleBackupSchedule
}: SystemTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default SystemTab;
