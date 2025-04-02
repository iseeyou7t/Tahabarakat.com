
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, UserCog, Search, Bell, Sun, Moon, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const isAdmin = localStorage.getItem("adminAuthenticated") === "true";
  const isOwner = localStorage.getItem("ownerAuthenticated") === "true";
  const { toast } = useToast();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
    
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} Mode Activated`,
      description: `Switched to ${newTheme} theme`,
    });
  };

  useEffect(() => {
    // Set initial theme
    const isDark = document.documentElement.classList.contains('light') === false;
    setTheme(isDark ? 'dark' : 'light');
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const getAdminLink = () => {
    if (isOwner) return "/owner/dashboard";
    if (isAdmin) return "/admin/dashboard";
    return "/admin/login";
  };

  const getAdminText = () => {
    if (isOwner) return "Owner Dashboard";
    if (isAdmin) return "Admin Dashboard";
    return "Admin Login";
  };

  const getAdminIcon = () => {
    if (isOwner) return <UserCog className="h-3.5 w-3.5 mr-1.5" />;
    return <Shield className="h-3.5 w-3.5 mr-1.5" />;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span 
              className="text-lg font-semibold cursor-pointer flex items-center gap-1 group" 
              onClick={() => scrollToSection("hero")}
            >
              <span className="relative overflow-hidden">
                <span className="transition-transform duration-300 text-primary font-bold inline-block group-hover:scale-110">Taha</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></span>
              </span>
              <span>Barakat</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors"
            >
              Contact
            </button>
            <Link 
              to={getAdminLink()} 
              className="text-sm font-medium px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors flex items-center"
            >
              {getAdminIcon()}
              {getAdminText()}
            </Link>
            {!isOwner && isAdmin && (
              <Link 
                to="/owner/login" 
                className="text-sm font-medium px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors flex items-center"
              >
                <UserCog className="h-3.5 w-3.5 mr-1.5" />
                Owner Login
              </Link>
            )}
            {!isOwner && !isAdmin && (
              <Link 
                to="/owner/login" 
                className="text-sm font-medium px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors flex items-center"
              >
                <UserCog className="h-3.5 w-3.5 mr-1.5" />
                Owner Login
              </Link>
            )}
            
            <div className="px-3 py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                    <Search className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center px-2 py-2">
                    <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-transparent border-none outline-none w-full text-sm"
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="px-3 py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-0 right-0 block w-2 h-2 bg-primary rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="p-2 font-medium border-b">Notifications</div>
                  <div className="py-2">
                    <DropdownMenuItem className="flex flex-col items-start">
                      <div className="font-medium text-xs">System Update</div>
                      <div className="text-xs text-muted-foreground">New features available</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start">
                      <div className="font-medium text-xs">Welcome!</div>
                      <div className="text-xs text-muted-foreground">Thanks for visiting our site</div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-8 h-8"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-8 h-8"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-foreground"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/40 animate-fade-in">
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 rounded-md transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 rounded-md transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 rounded-md transition-colors"
            >
              Contact
            </button>
            <Link
              to={getAdminLink()}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 rounded-md transition-colors"
            >
              {isOwner ? <UserCog className="h-4 w-4 mr-2" /> : <Shield className="h-4 w-4 mr-2" />}
              {getAdminText()}
            </Link>
            {!isOwner && (
              <Link
                to="/owner/login"
                className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 rounded-md transition-colors"
              >
                <UserCog className="h-4 w-4 mr-2" />
                Owner Login
              </Link>
            )}
            
            <div className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-foreground/80">
              <Search className="h-4 w-4 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none w-full"
              />
            </div>
            
            <div className="flex items-center justify-between w-full text-left px-3 py-2 text-base font-medium text-foreground/80">
              <div className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                <span>Notifications</span>
              </div>
              <span className="bg-primary text-xs rounded-full px-2 py-0.5">2</span>
            </div>
            
            <div className="flex items-center justify-between w-full text-left px-3 py-2 text-base font-medium text-foreground/80">
              <div className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                <span>Settings</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
