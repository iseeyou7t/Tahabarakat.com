
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { authenticateOwner } from "@/services/AuthService";
import { Shield, Lock, Fingerprint } from "lucide-react";

const OwnerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [securityCode, setSecurityCode] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (step === 1) {
      // Simulate API call delay
      setTimeout(() => {
        const isAuthenticated = authenticateOwner({ username, password });
        
        if (isAuthenticated) {
          setStep(2);
          toast({
            title: "First Authentication Successful",
            description: "Please complete the second security step",
          });
        } else {
          toast({
            title: "Authentication Failed",
            description: "Invalid owner credentials",
            variant: "destructive",
          });
        }
        
        setIsLoading(false);
      }, 1500);
    } else {
      // Simulate second factor authentication
      setTimeout(() => {
        // For demo purposes, any 6-digit code works
        if (securityCode.length === 6 && /^\d+$/.test(securityCode)) {
          toast({
            title: "Owner Authentication Complete",
            description: "Welcome to the owner command center",
          });
          navigate("/owner/dashboard");
        } else {
          toast({
            title: "Security Code Invalid",
            description: "Please enter a valid 6-digit security code",
            variant: "destructive",
          });
        }
        
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background/80 to-primary/5">
      <div className="w-full max-w-md">
        <Card className="border-2 backdrop-blur-sm bg-background/90">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              {step === 1 ? (
                <Shield className="h-12 w-12 text-primary" />
              ) : (
                <Fingerprint className="h-12 w-12 text-primary animate-pulse" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold">
              {step === 1 ? "Owner Authentication" : "Security Verification"}
            </CardTitle>
            <CardDescription>
              {step === 1 
                ? "Enter your credentials to access the owner dashboard" 
                : "Enter the 6-digit security code to complete verification"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="username">Owner Username</label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="password">Owner Password</label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-primary/20"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="securityCode">Security Code</label>
                  <div className="flex items-center space-x-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <Input
                      id="securityCode"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={securityCode}
                      onChange={(e) => setSecurityCode(e.target.value.slice(0, 6))}
                      required
                      maxLength={6}
                      className="font-mono text-center text-lg tracking-widest"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    For demo purposes, enter any 6 digits
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                variant={step === 1 ? "default" : "outline"}
              >
                {isLoading 
                  ? (step === 1 ? "Authenticating..." : "Verifying...") 
                  : (step === 1 ? "Authenticate" : "Complete Verification")}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Default owner: owner / owner123</p>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;
