
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import GradientBlobs from "@/components/owner/GradientBlobs";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // For demo purposes - hardcoded credentials
    const correctUsername = "1234";
    const correctPassword = "12345";

    // Simulate a delay for the login process
    setTimeout(() => {
      if (username === correctUsername && password === correctPassword) {
        toast({
          title: "Login Successful",
          description: "Welcome to the application",
        });
        
        // Store authentication in localStorage
        localStorage.setItem("isAuthenticated", "true");
        
        // Call the login success callback
        onLoginSuccess();
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
        
        // Shake animation on failed login
        const card = document.querySelector('.login-card');
        card?.classList.add('animate-shake');
        setTimeout(() => card?.classList.remove('animate-shake'), 500);
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-muted/30 relative overflow-hidden">
      <GradientBlobs />
      
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="login-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border backdrop-blur-md bg-background/80 overflow-hidden relative">
            {/* Animated glow effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 opacity-0"
              animate={{ 
                opacity: [0, 0.5, 0],
                x: ['-100%', '100%']
              }}
              transition={{ 
                duration: 3, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
            
            <CardHeader className="space-y-1 text-center relative">
              <motion.div
                className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(var(--primary), 0.7)",
                    "0 0 0 10px rgba(var(--primary), 0)",
                    "0 0 0 0 rgba(var(--primary), 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <User className="h-8 w-8 text-primary" />
              </motion.div>
              
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription>
                Enter your credentials to continue
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2" htmlFor="username">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    Username
                  </label>
                  <div className="relative group">
                    <motion.div
                      className="absolute -inset-0.5 rounded-md bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                      animate={{ 
                        opacity: activeInput === 'username' ? 0.7 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setActiveInput('username')}
                      onBlur={() => setActiveInput(null)}
                      className="relative bg-background text-foreground border border-input focus-visible:ring-2 focus-visible:ring-offset-2"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2" htmlFor="password">
                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                    Password
                  </label>
                  <div className="relative group">
                    <motion.div
                      className="absolute -inset-0.5 rounded-md bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                      animate={{ 
                        opacity: activeInput === 'password' ? 0.7 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setActiveInput('password')}
                        onBlur={() => setActiveInput(null)}
                        className="pr-10 relative bg-background text-foreground border border-input focus-visible:ring-2 focus-visible:ring-offset-2"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 text-xs text-center text-muted-foreground">
                  <p>Use username: 1234 and password: 12345</p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full relative overflow-hidden group"
                  variant="luxury"
                  disabled={isLoading}
                >
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={isLoading ? { x: '100%', opacity: 0.3 } : { x: '-100%', opacity: 0 }}
                    transition={{ duration: 1, repeat: isLoading ? Infinity : 0, repeatDelay: 0.5 }}
                  />
                  
                  <span className="flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <motion.div
                          className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Logging in...
                      </>
                    ) : (
                      <>
                        <LogIn className="h-4 w-4 mr-1" />
                        Login
                      </>
                    )}
                  </span>
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
