
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
              src="/lovable-uploads/86f8da39-04b3-4665-97c2-5f536599fe04.png" 
              alt="Franchise Logo" 
              className="h-[128.14px] w-[541.23px] object-contain"
              style={{ maxWidth: '541.23px', maxHeight: '128.14px' }}
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
