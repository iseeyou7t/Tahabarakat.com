
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAdmin = localStorage.getItem("adminAuthenticated") === "true";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-lg font-semibold cursor-pointer" onClick={() => scrollToSection("hero")}>
              Taha Barakat
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Contact
            </button>
            <Link to={isAdmin ? "/admin/dashboard" : "/admin/login"} className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center">
              <Shield className="h-3.5 w-3.5 mr-1.5" />
              {isAdmin ? "Admin" : "Admin Login"}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
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
        <div className="md:hidden bg-background/95 backdrop-blur-md">
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
            >
              Contact
            </button>
            <Link
              to={isAdmin ? "/admin/dashboard" : "/admin/login"}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
            >
              <Shield className="h-4 w-4 mr-2" />
              {isAdmin ? "Admin Dashboard" : "Admin Login"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
