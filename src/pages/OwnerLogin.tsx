
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { authenticateOwner } from "@/services/AuthService";
import { Shield, Lock, Fingerprint, Eye, EyeOff, UserCog, LogIn, User, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PremiumAnimation from "@/components/owner/PremiumAnimation";
import GradientBlobs from "@/components/owner/GradientBlobs";
import { TypewriterText, containerVariants, itemVariants } from "@/utils/animationUtils";

const OwnerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [securityCode, setSecurityCode] = useState("");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [fingerScanComplete, setFingerScanComplete] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Reset animation when component loads
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.documentElement.style.setProperty('--animate-duration', '0.5s');
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  // Simulate fingerprint scanning animation
  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setFingerScanComplete(prev => {
          const newValue = prev + (1 + Math.random() * 2);
          return newValue >= 100 ? 100 : newValue;
        });
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (step === 1) {
      // Simulate API call delay with enhanced animation
      setTimeout(() => {
        const isAuthenticated = authenticateOwner({ username, password });
        
        if (isAuthenticated) {
          setStep(2);
          setFingerScanComplete(0);
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
          
          // Shake animation on failed login
          const card = document.querySelector('.login-card');
          card?.classList.add('animate-shake');
          setTimeout(() => card?.classList.remove('animate-shake'), 500);
        }
        
        setIsLoading(false);
      }, 1500);
    } else {
      // Simulate second factor authentication with enhanced animation
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
          
          // Shake animation on failed verification
          const card = document.querySelector('.login-card');
          card?.classList.add('animate-shake');
          setTimeout(() => card?.classList.remove('animate-shake'), 500);
        }
        
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden">
      <PremiumAnimation />
      <GradientBlobs />
      
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: step === 1 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: step === 1 ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            className="login-card"
          >
            <Card className="border border-white/20 glass-card shadow-xl overflow-hidden relative backdrop-blur-md bg-gradient-to-br from-background/80 to-secondary/10">
              {/* Animated border glow */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0"
                  animate={{
                    boxShadow: [
                      "0 0 0 1px rgba(var(--primary), 0.3)",
                      "0 0 10px 2px rgba(var(--primary), 0.6)",
                      "0 0 0 1px rgba(var(--primary), 0.3)"
                    ],
                    opacity: 1
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 mix-blend-overlay pointer-events-none" />
              
              <CardHeader className="space-y-1 text-center pb-2">
                <motion.div 
                  className="flex justify-center mb-3"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1
                  }}
                >
                  {step === 1 ? (
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/20 blur-lg"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.div className="frosted-glass p-4 rounded-full relative z-10 shadow-lg">
                        <Shield className="h-12 w-12 text-primary" />
                      </motion.div>
                    </div>
                  ) : (
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/20 blur-lg"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <motion.div 
                        className="frosted-glass p-4 rounded-full relative z-10 shadow-lg"
                        animate={{ 
                          boxShadow: fingerScanComplete >= 100 
                            ? ["0 0 0 0 rgba(var(--primary), 0.7)", "0 0 20px 10px rgba(var(--primary), 0)", "0 0 0 0 rgba(var(--primary), 0)"] 
                            : "none"
                        }}
                        transition={{ duration: 2, repeat: fingerScanComplete >= 100 ? Infinity : 0, repeatDelay: 0.5 }}
                      >
                        <Fingerprint className={`h-12 w-12 ${fingerScanComplete >= 100 ? "text-green-500" : "text-primary"} transition-colors duration-300`} />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
                
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants}>
                    <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">
                      {step === 1 ? "OWNER AUTHENTICATION" : "SECURITY VERIFICATION"}
                    </CardTitle>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <CardDescription className="text-foreground/80 mt-2">
                      <TypewriterText
                        text={
                          step === 1
                            ? "Enter your credentials to access the control center"
                            : "Enter the 6-digit security code to complete verification"
                        }
                        className="inline-block"
                      />
                    </CardDescription>
                  </motion.div>
                </motion.div>
              </CardHeader>
              
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4 px-6">
                  <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    {step === 1 ? (
                      <>
                        <motion.div className="space-y-2" variants={itemVariants}>
                          <label className="text-sm font-medium flex items-center gap-2" htmlFor="username">
                            <User className="h-3.5 w-3.5 text-primary" />
                            Owner Username
                          </label>
                          <div className="relative group">
                            <motion.div
                              className="absolute -inset-0.5 rounded-md bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 group-hover:opacity-30 transition-opacity"
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
                              className="relative bg-background/40 backdrop-blur-sm border-primary/20 focus-visible:ring-primary/50 shadow-sm"
                              required
                            />
                          </div>
                        </motion.div>
                        
                        <motion.div className="space-y-2" variants={itemVariants}>
                          <label className="text-sm font-medium flex items-center gap-2" htmlFor="password">
                            <Lock className="h-3.5 w-3.5 text-primary" />
                            Owner Password
                          </label>
                          <div className="relative group">
                            <motion.div
                              className="absolute -inset-0.5 rounded-md bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 group-hover:opacity-30 transition-opacity"
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
                                className="pr-10 relative bg-background/40 backdrop-blur-sm border-primary/20 focus-visible:ring-primary/50 shadow-sm"
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
                      </>
                    ) : (
                      <motion.div className="space-y-2" variants={itemVariants}>
                        <label className="text-sm font-medium flex items-center gap-2" htmlFor="securityCode">
                          <Lock className="h-4 w-4 text-primary" />
                          Security Code
                        </label>
                        
                        <div className="relative">
                          <motion.div
                            className="absolute -inset-0.5 rounded-md bg-gradient-to-r from-primary/50 to-accent/50 opacity-0"
                            initial={false}
                            animate={{ 
                              opacity: activeInput === 'securityCode' ? 0.7 : 0 
                            }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          <div className="flex items-center space-x-2 relative">
                            <Lock className="h-5 w-5 text-primary" />
                            <Input
                              id="securityCode"
                              type="text"
                              placeholder="Enter 6-digit code"
                              value={securityCode}
                              onChange={(e) => setSecurityCode(e.target.value.slice(0, 6))}
                              onFocus={() => setActiveInput('securityCode')}
                              onBlur={() => setActiveInput(null)}
                              required
                              maxLength={6}
                              className="font-mono text-center text-lg tracking-widest border-primary/20 bg-background/40 backdrop-blur-sm focus-visible:ring-primary/50 shadow-sm"
                            />
                          </div>
                        </div>
                        
                        {/* Fingerprint scanner progress */}
                        <motion.div 
                          className="mt-6 relative h-2 bg-muted rounded-full overflow-hidden shadow-inner"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <motion.div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full"
                            style={{ width: `${fingerScanComplete}%` }}
                            initial={{ width: "0%" }}
                            animate={{ width: `${fingerScanComplete}%` }}
                            transition={{ type: "spring", stiffness: 50, damping: 15 }}
                          />
                        </motion.div>
                        
                        <div className="text-xs text-center text-muted-foreground mt-2">
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={fingerScanComplete >= 100 ? "complete" : "scanning"}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {fingerScanComplete >= 100 
                                ? "Biometric verification complete" 
                                : "Scanning biometric data..."}
                            </motion.p>
                          </AnimatePresence>
                        </div>
                        
                        <motion.p 
                          className="text-xs text-muted-foreground text-center mt-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          For demo purposes, enter any 6 digits
                        </motion.p>
                      </motion.div>
                    )}
                    
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
                        to="/admin/login"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        Admin Login
                      </Link>
                    </motion.div>
                  </motion.div>
                </CardContent>
                
                <CardFooter className="px-6 pb-6">
                  <motion.div className="w-full" variants={itemVariants}>
                    <Button
                      type="submit"
                      className="w-full relative overflow-hidden button-glow"
                      disabled={isLoading || (step === 2 && fingerScanComplete < 100)}
                      variant="premium"
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
                              className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            {step === 1 ? "Authenticating..." : "Verifying..."}
                          </>
                        ) : (
                          <>
                            {step === 1 ? (
                              <>
                                <UserCog className="h-4 w-4 mr-1" />
                                Authenticate <ChevronRight className="h-3 w-3 ml-1" />
                              </>
                            ) : (
                              <>
                                <LogIn className="h-4 w-4 mr-1" />
                                Complete Verification
                              </>
                            )}
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          className="mt-4 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p>Default owner: owner / owner123</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OwnerLogin;
