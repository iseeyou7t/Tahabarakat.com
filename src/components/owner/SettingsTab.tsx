
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Code, KeyRound } from "lucide-react";

interface ApiKey {
  name: string;
  key: string;
  active: boolean;
}

interface SettingsTabProps {
  websiteTitle: string;
  setWebsiteTitle: (title: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  analyticsEnabled: boolean;
  setAnalyticsEnabled: (enabled: boolean) => void;
  maintenanceMode: boolean;
  toggleMaintenanceMode: () => void;
  apiKeys: ApiKey[];
  updateAPIKey: (index: number, active: boolean) => void;
  customCSS: string;
  setCustomCSS: (css: string) => void;
  customJS: string;
  setCustomJS: (js: string) => void;
  handleSaveSettings: () => void;
  saveCustomCode: () => void;
  isSaving: boolean;
}

const SettingsTab = ({
  websiteTitle,
  setWebsiteTitle,
  theme,
  setTheme,
  analyticsEnabled,
  setAnalyticsEnabled,
  maintenanceMode,
  toggleMaintenanceMode,
  apiKeys,
  updateAPIKey,
  customCSS,
  setCustomCSS,
  customJS,
  setCustomJS,
  handleSaveSettings,
  saveCustomCode,
  isSaving
}: SettingsTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default SettingsTab;
