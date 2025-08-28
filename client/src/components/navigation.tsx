import { useState } from "react";
import { Menu, X, MessageCircle, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary" data-testid="brand-logo">
              MoshiDoki
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className="text-foreground hover:text-primary transition-colors"
              data-testid="link-popular"
            >
              Popular
            </a>
            <a 
              href="#" 
              className="text-foreground hover:text-primary transition-colors"
              data-testid="link-community"
            >
              Community
            </a>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-2"
              data-testid="button-chat"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-2"
              data-testid="button-account"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-1"
              data-testid="button-language"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">日本語</span>
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border p-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#" 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-popular-mobile"
              >
                Popular
              </a>
              <a 
                href="#" 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-community-mobile"
              >
                Community
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
