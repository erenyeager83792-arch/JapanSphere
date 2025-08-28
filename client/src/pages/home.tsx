import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { SearchInterface } from "@/components/search-interface";
import { WeatherWidget } from "@/components/weather-widget";
import { TrendingSection } from "@/components/trending-section";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Clock, X, AlertCircle } from "lucide-react";

// GSAP animations will be added via useEffect
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update Japan time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Load GSAP dynamically
    const loadGSAP = async () => {
      if (typeof window !== 'undefined') {
        try {
          // Load GSAP from CDN
          const gsapScript = document.createElement('script');
          gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
          gsapScript.onload = () => {
            // Load ScrollTrigger plugin
            const scrollScript = document.createElement('script');
            scrollScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            scrollScript.onload = initializeAnimations;
            document.head.appendChild(scrollScript);
          };
          document.head.appendChild(gsapScript);
        } catch (error) {
          console.warn('GSAP loading failed, continuing without animations:', error);
        }
      }
    };

    const initializeAnimations = () => {
      if (window.gsap) {
        const { gsap } = window;
        
        // Register ScrollTrigger
        if (window.ScrollTrigger) {
          gsap.registerPlugin(window.ScrollTrigger);
        }
        
        // Enhanced page load animation sequence
        const tl = gsap.timeline();
        
        // Animated background parallax
        gsap.to('[data-parallax="background"]', {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: '[data-parallax="background"]',
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        // Floating animation for cards
        gsap.to('.glass-effect', {
          y: -10,
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.3
        });

        // Main animation timeline with smoother easing
        tl.from('[data-animate="slideDown"]', {
          duration: 1,
          y: -60,
          opacity: 0,
          ease: "elastic.out(1, 0.5)"
        })
        .from('[data-animate="fadeIn"]', {
          duration: 1.2,
          opacity: 0,
          scale: 0.9,
          ease: "back.out(1.7)"
        }, "-=0.6")
        .from('[data-animate="fadeInUp"]', {
          duration: 1.4,
          y: 80,
          opacity: 0,
          stagger: 0.3,
          ease: "back.out(1.4)"
        }, "-=0.8")
        .from('[data-animate="slideInLeft"]', {
          duration: 1.2,
          x: -120,
          opacity: 0,
          stagger: 0.25,
          ease: "back.out(1.2)"
        }, "-=1.0")
        .from('[data-animate="slideInRight"]', {
          duration: 1.2,
          x: 120,
          opacity: 0,
          ease: "back.out(1.2)"
        }, "-=0.8");

        // Interactive hover animations
        const cards = document.querySelectorAll('.trending-card, .glass-effect');
        cards.forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          });
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }
    };

    loadGSAP();
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Format Japan time
  const japanTime = currentTime.toLocaleString('en-US', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const japanDate = currentTime.toLocaleDateString('en-US', {
    timeZone: 'Asia/Tokyo',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="dark min-h-screen">
      {/* Japan Time Display */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-3 px-4 text-sm relative" data-animate="slideDown">
        <div className="flex items-center justify-center space-x-3">
          <Clock className="h-4 w-4" />
          <span className="font-medium">Japan Time:</span>
          <span className="font-mono text-base">{japanTime}</span>
          <span className="text-white/80">•</span>
          <span className="text-white/90">{japanDate}</span>
        </div>
      </div>
      
      {/* Navigation */}
      <div data-animate="fadeIn">
        <Navigation />
      </div>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Mount Fuji Background */}
          <div className="absolute inset-0 z-0">
            <div 
              className="hero-bg absolute inset-0"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
              data-parallax="background"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
          </div>
          
          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* Left Sidebar - Weather Widget */}
            <div className="lg:col-span-1 order-2 lg:order-1" data-animate="slideInLeft">
              <WeatherWidget />
              
              {/* Market Index Widget */}
              <div className="glass-effect rounded-xl p-6" data-animate="slideInLeft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-green-400 flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    Market Index
                  </h3>
                </div>
                
                <div className="flex items-center">
                  <span className="text-green-400 text-xl mr-3">¥</span>
                  <div>
                    <div className="text-xl font-bold text-red-400" data-testid="text-market-value">
                      NaN
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid="text-market-change">
                      +0.2%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              {/* Hero Title */}
              <div className="text-center mb-12" data-animate="fadeInUp">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                  What would you like to know about{" "}
                  <span className="text-primary">Japan?</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Your Ultimate AI Guide to Japan's Pop Culture & History
                </p>
              </div>
              
              {/* Search Interface */}
              <div data-animate="fadeInUp">
                <SearchInterface />
              </div>
            </div>
            
            {/* Right Sidebar - Trending */}
            <div className="lg:col-span-1 order-3" data-animate="slideInRight">
              <TrendingSection />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
