
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";

interface NavbarProps {
  onLogout?: () => void;
}

const MainNavbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-lg font-bold">
              <span className="text-primary">Taha</span> Barakat
            </a>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </a>
            <a href="#portfolio" className="text-sm font-medium hover:text-primary transition-colors">
              Portfolio
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
            
            {onLogout && (
              <Button variant="outline" size="sm" onClick={onLogout} className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {onLogout && (
              <Button variant="outline" size="sm" onClick={onLogout} className="mr-2">
                <LogOut className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/40 animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <a href="#about" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="#services" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Services
            </a>
            <a href="#portfolio" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Portfolio
            </a>
            <a href="#contact" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNavbar;
