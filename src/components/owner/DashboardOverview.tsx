
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, Server, ShieldAlert } from "lucide-react";

interface ServerStatusProps {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

interface DashboardOverviewProps {
  activeUsers: number;
  serverStatus: ServerStatusProps;
  securityLevel: string;
}

const DashboardOverview = ({ activeUsers, serverStatus, securityLevel }: DashboardOverviewProps) => {
  return (
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
  );
};

export default DashboardOverview;
