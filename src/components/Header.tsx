import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [logoWidth, setLogoWidth] = useState(541.23);
  const [logoHeight, setLogoHeight] = useState(128.14);
  
  const originalWidth = 541.23;
  const originalHeight = 128.14;
  const targetWidth = 295;
  const targetHeight = 69.85;
  
  const scrollThreshold = 200;

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      if (position <= scrollThreshold) {
        const scaleFactor = position / scrollThreshold;
        const newWidth = originalWidth - (originalWidth - targetWidth) * scaleFactor;
        const newHeight = originalHeight - (originalHeight - targetHeight) * scaleFactor;
        
        setLogoWidth(newWidth);
        setLogoHeight(newHeight);
      } else {
        setLogoWidth(targetWidth);
        setLogoHeight(targetHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full py-6 bg-white z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="logo transition-all duration-200 ease-out">
          <Link to="/">
            <img 
              src="/lovable-uploads/86f8da39-04b3-4665-97c2-5f536599fe04.png" 
              alt="Franchise Logo" 
              className="object-contain"
              style={{ 
                width: `${logoWidth}px`, 
                height: `${logoHeight}px`,
                maxWidth: `${logoWidth}px`, 
                maxHeight: `${logoHeight}px`,
                transition: 'width 0.2s ease-out, height 0.2s ease-out'
              }}
            />
          </Link>
        </div>
        
        <nav>
          <ul className="flex items-center space-x-8">
            <li>
              <Link 
                to="/" 
                className={cn(
                  "font-['Arial'] font-bold tracking-tighter text-black",
                  "hover:text-gray-700 transition-colors",
                  "text-base"
                )}
                style={{ letterSpacing: "-0.08em" }}
              >
                Main,
              </Link>
            </li>
            <li>
              <Link 
                to="/sound-kit" 
                className={cn(
                  "font-['Arial'] font-bold tracking-tighter text-gray-400",
                  "hover:text-gray-700 transition-colors",
                  "text-base"
                )}
                style={{ letterSpacing: "-0.08em" }}
              >
                Sound Kit,
              </Link>
            </li>
            <li>
              <Link 
                to="/album" 
                className={cn(
                  "font-['Arial'] font-bold tracking-tighter text-gray-400",
                  "hover:text-gray-700 transition-colors",
                  "text-base"
                )}
                style={{ letterSpacing: "-0.08em" }}
              >
                Album,
              </Link>
            </li>
            <li>
              <Link 
                to="/merch" 
                className={cn(
                  "font-['Arial'] font-bold tracking-tighter text-gray-400",
                  "hover:text-gray-700 transition-colors",
                  "text-base"
                )}
                style={{ letterSpacing: "-0.08em" }}
              >
                Merch,
              </Link>
            </li>
            <li>
              <Link 
                to="/members" 
                className={cn(
                  "font-['Arial'] font-bold tracking-tighter text-gray-400",
                  "hover:text-gray-700 transition-colors",
                  "text-base"
                )}
                style={{ letterSpacing: "-0.08em" }}
              >
                Members
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="telegram-link">
          <Link 
            to="/telegram" 
            className={cn(
              "font-['Arial'] font-bold tracking-tighter underline",
              "hover:text-gray-700 transition-colors",
              "text-base"
            )}
            style={{ letterSpacing: "-0.08em" }}
          >
            Our Telegram
          </Link>
        </div>
      </div>
    </header>
  );
}
