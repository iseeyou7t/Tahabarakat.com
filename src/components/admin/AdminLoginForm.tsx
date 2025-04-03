
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogIn, Eye, EyeOff, User, Lock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authenticateAdmin } from "@/services/AuthService";
import { containerVariants, itemVariants } from "@/utils/animationUtils";

const AdminLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Visual delay for more impressive animation
    setTimeout(() => {
      const isAuthenticated = authenticateAdmin({ username, password });
      
      if (isAuthenticated) {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
        navigate("/admin/dashboard");
      } else {
        setLoginAttempts(prev => prev + 1);
        toast({
          title: "Login Failed",
          description: loginAttempts >= 2 
            ? "Multiple failed attempts detected. Please verify credentials." 
            : "Invalid username or password",
          variant: "destructive",
        });
        
        // Shake animation effect on failed login
        const card = document.querySelector('.login-card');
        card?.classList.add('animate-shake');
        setTimeout(() => card?.classList.remove('animate-shake'), 500);
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div 
      className="login-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="border-2 backdrop-blur-md bg-background/80 overflow-hidden relative">
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
            <Shield className="h-8 w-8 text-primary" />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </motion.div>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <motion.div className="space-y-2" variants={itemVariants}>
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
            </motion.div>
            
            <motion.div className="space-y-2" variants={itemVariants}>
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
            </motion.div>
            
            <motion.div
              className="flex items-center justify-between pt-2"
              variants={itemVariants}
            >
              <Link
                to="/"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Return to home
              </Link>
              <Link
                to="/owner/login"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Owner Login
              </Link>
            </motion.div>
          </CardContent>
          
          <CardFooter>
            <motion.div className="w-full" variants={itemVariants}>
              <Button
                type="submit"
                className="w-full relative overflow-hidden group"
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
            </motion.div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};

export default AdminLoginForm;
