import { useState } from "react";
import { Menu, X, MessageCircle, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const handlePopularClick = () => {
    toast({
      title: "Popular Content",
      description: "Discover the most popular Japan topics, trending anime, cultural highlights, and viral content from the community.",
    });
    // Scroll to trending section
    const trendingSection = document.querySelector('[data-testid="trending-section"]');
    if (trendingSection) {
      trendingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCommunityClick = () => {
    toast({
      title: "Community Features",
      description: "Connect with fellow Japan enthusiasts, share experiences, and join discussions about Japanese culture, anime, and travel.",
    });
  };

  const handleChatClick = () => {
    toast({
      title: "AI Chat Assistant",
      description: "Start a conversation with our Japan expert AI! Ask anything about culture, language, travel, or anime.",
    });
  };

  const handleAccountClick = () => {
    toast({
      title: "Account Features",
      description: "Sign in to save your favorite searches, bookmark articles, and personalize your Japan discovery experience.",
    });
  };

  const handleLanguageClick = () => {
    toast({
      title: "Language Settings",
      description: "Switch between English and Japanese language modes. Currently viewing in English.",
    });
  };

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
            <button 
              onClick={handlePopularClick}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
              data-testid="link-popular"
            >
              Popular
            </button>
            <button 
              onClick={handleCommunityClick}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
              data-testid="link-community"
            >
              Community
            </button>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleChatClick}
              className="flex items-center space-x-2"
              data-testid="button-chat"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleAccountClick}
              className="flex items-center space-x-2"
              data-testid="button-account"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLanguageClick}
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
              <button 
                onClick={handlePopularClick}
                className="text-foreground hover:text-primary transition-colors cursor-pointer text-left"
                data-testid="link-popular-mobile"
              >
                Popular
              </button>
              <button 
                onClick={handleCommunityClick}
                className="text-foreground hover:text-primary transition-colors cursor-pointer text-left"
                data-testid="link-community-mobile"
              >
                Community
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
