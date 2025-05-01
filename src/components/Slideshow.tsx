import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideshowProps {
  children: React.ReactNode[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  isFirstSlide: boolean;
}

export function Slideshow({ children, currentSlide, onSlideChange, isFirstSlide }: SlideshowProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        onSlideChange((currentSlide + 1) % children.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        onSlideChange((currentSlide - 1 + children.length) % children.length);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      
      if (e.deltaY > 0) {
        onSlideChange((currentSlide + 1) % children.length);
      } else if (e.deltaY < 0) {
        onSlideChange((currentSlide - 1 + children.length) % children.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSlide, children.length, onSlideChange, isAnimating]);

  return (
    <div className="relative w-full" style={{ 
      height: 'calc(100vh - 84px)',
      position: 'fixed',
      top: '84px',
      left: 0,
      right: 0,
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          onAnimationStart={() => setIsAnimating(true)}
          onAnimationComplete={() => setIsAnimating(false)}
          className="absolute inset-0"
          style={{ boxSizing: 'border-box' }}
        >
          {React.cloneElement(children[currentSlide] as React.ReactElement, { isFirstSlide: currentSlide === 0 })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 