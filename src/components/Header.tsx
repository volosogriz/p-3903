import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isFirstSlide: boolean;
}

export function Header({ isFirstSlide }: HeaderProps) {
  const originalWidth = 541.23;
  const originalHeight = 128.14;
  const targetWidth = 158;
  const targetHeight = 37;

  return (
    <header 
      className="fixed top-0 left-0 w-full py-6 z-50"
      style={{
        background: 'linear-gradient(to bottom, white 0%, rgba(255, 255, 255, 0) 100%)'
      }}
    >
      <div className="px-[30px] flex justify-between items-center">
        <div className="logo">
          <Link to="/">
            <img 
              src="/lovable-uploads/86f8da39-04b3-4665-97c2-5f536599fe04.png" 
              alt="Franchise Logo" 
              className="object-contain transition-all duration-500 ease-in-out"
              style={{ 
                width: isFirstSlide ? `${originalWidth}px` : `${targetWidth}px`,
                height: isFirstSlide ? `${originalHeight}px` : `${targetHeight}px`,
                maxWidth: isFirstSlide ? `${originalWidth}px` : `${targetWidth}px`,
                maxHeight: isFirstSlide ? `${originalHeight}px` : `${targetHeight}px`
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
