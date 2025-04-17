
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="w-full py-6 bg-white">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="logo">
          <Link to="/">
            <img 
              src="/lovable-uploads/0b7d79ef-399e-4fd1-aaab-891cce4520ea.png" 
              alt="Franchise Logo" 
              className="h-14"
            />
          </Link>
        </div>
        
        <nav>
          <ul className="flex items-center space-x-8">
            {/* Menu items with Arial font and -8% letter spacing */}
            <li>
              <Link 
                to="/" 
                className={cn(
                  "font-['Arial'] tracking-tighter text-black font-medium",
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
                  "font-['Arial'] tracking-tighter text-gray-400 font-medium",
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
                  "font-['Arial'] tracking-tighter text-gray-400 font-medium",
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
                  "font-['Arial'] tracking-tighter text-gray-400 font-medium",
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
                  "font-['Arial'] tracking-tighter text-gray-400 font-medium",
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
              "font-['Arial'] tracking-tighter underline font-medium",
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
