
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts";

interface UsersTabProps {
  activeUsers: number;
  handleKickUser: (userId: number) => void;
  pageViewData: Array<{ name: string; views: number }>;
}

const UsersTab = ({ activeUsers, handleKickUser, pageViewData }: UsersTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default UsersTab;
