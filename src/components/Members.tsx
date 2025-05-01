import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// List of all member nicknames
const membersList = [
  "goddamnblz", "@hotshot1218", "@ostatki_supa", "кьё", "@kyodotcom", "PanikA", 
  "vexego / @vexego", "azzieru (azzy)", "@neykaneyka", "jorcee", "@zelenyivodorosl", 
  "@woqrtldnzz", "@kobasenpai", "modestmorty", "@prodbyyot1ss", "@moremilly", 
  "ayoMalis", "an empty", "@sepaloid", "ELEKCHER", "lfeyi9", "prodbyxnighttt", 
  "@sexflaagraiseix", "t.me/madebyyanogi", "https://t.me/nikijols", "Gussep (@gussepbeats)", 
  "waijells", "JamoX / @jamoxmusic", "@hoppyboyxd", "damladee", "omgphil", 
  "@whyjuzo", "wakeupjuwe", "@aiseworkshop", "whynadarami", "@reiiwaaa", "whiiite knight", 
  "https://t.me/shelovesxlihxn", "gleero @gleeroo", "seizugodxx", "@kevolav", "@ayoluvme", 
  "@probelhoroshiy", "mar3arty", "@beeray888", "erousty", "sqshvax", "addicted2hugs", 
  "mike hokku", "skorowernus РБД КЛАН", "@ayoinsane", "woidzero", "Codewise", "sagi", 
  "jeisli / @jeisli_air", "rm1t @backontrakk1", "krsv (тг/инст krsvgod)", "yua", "YUA16 (WHO?)", 
  "komit", "@squeeslgood", "@trippylone", "Metanoiaa", "@gnightfreakyyy", "ДРИМКАСТ @dreamcassst", 
  "ayo.preesty @x3gng", "@qoftatg", "zmny", "cweт", "@moshiluv", "@girlibeenlosingcontrol", 
  "MAFLUM", "@dimewwell", "2eight / serene", "@spadegokrazy", "spadegocrazy", "anyproblems", 
  "@anyproblemsbeats", "@banglienn", "@lostinmyselfws", "SYCHOZ / @sychoz", "https://t.me/lvsth0pe", 
  "baam", "speesh", "phlphn", "myriq", "@Gustxxl", "@livedummy", "@babycakeoff", "@xtraacid", 
  "CywkaComing", "Fechief", "only0nedusty", "@fechief", "Architector", "YEAHEYE РБД КЛАН", 
  "balbescrew", "energynickie", "@energynickie", "kanbuu", "postvox", "@samyystranyy", "@w8mee", 
  "@metanoiarc", "flowwey", "@ones2k", "whoisrulled", "Ô3", "Ximora", "вакси", "guttedsean", 
  "stella", "lapkens"
];

// At the top of Members.tsx or in a separate file
export interface MemberProfile {
  nickname: string;
  description: string;
  telegram?: string;
  instagram?: string;
  veteran?: 'Fr1' | 'Fr2';
  contributions: { category: string; presets?: number; samples?: number }[];
  points: number;
  // photo?: string; // for future use
}

export const memberProfiles: Record<string, MemberProfile> = {
  ayomalis: {
    nickname: 'ayoMalis',
    description: 'Здесь могла быть ваша реклама',
    telegram: 'https://t.me/ayomalis',
    instagram: 'https://instagram.com/ayomalis',
    veteran: 'Fr2',
    contributions: [
      { category: 'digitalis', presets: 2 },
      { category: 'the prince', presets: 8 }
    ],
    points: 24,
  },
  // ...other members
};

// Main component
const Members: React.FC = () => {
  // Define the visible section of the wheel (13 items)
  const visibleAngles = [72, 60, 48, 36, 24, 12, 0, 348, 336, 324, 312, 300, 288];
  const totalVisibleMembers = visibleAngles.length;
  
  // State for tracking current index and rotation
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const targetRotation = useRef(0);
  const prevTouch = useRef<number | null>(null);
  
  // Get current visible members based on the index
  const getVisibleMembers = () => {
    const visibleMembers = [];
    
    for (let i = 0; i < totalVisibleMembers; i++) {
      const memberIndex = (currentIndex + i) % membersList.length;
      visibleMembers.push({
        name: membersList[memberIndex],
        angle: visibleAngles[i] - 90,
        isSelected: i === 6 // Index 6 corresponds to angle 0 (middle)
      });
    }
    
    return visibleMembers;
  };
  
  // Handle wheel rotation and member selection with slide prevention
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const delta = e.deltaY;
    const direction = delta > 0 ? 1 : -1;
    
    // Update index and trigger animation
    if (!isAnimating.current) {
      isAnimating.current = true;
      
      // Update current index
      setCurrentIndex(prevIndex => {
        // Calculate new index with wrapping
        let newIndex = prevIndex + direction;
        if (newIndex < 0) newIndex = membersList.length - 1;
        if (newIndex >= membersList.length) newIndex = 0;
        return newIndex;
      });
      
      // Animate rotation
      const newRotation = rotation + (direction * 12); // 12 degrees per step
      targetRotation.current = newRotation;
      animateRotation();
    }
  }, [rotation]);
  
  // Animation function
  const animateRotation = () => {
    const animate = () => {
      setRotation(prevRotation => {
        const diff = targetRotation.current - prevRotation;
        
        if (Math.abs(diff) < 0.5) {
          isAnimating.current = false;
          return targetRotation.current;
        }
        
        return prevRotation + diff * 0.2; // Easing
      });
      
      if (isAnimating.current) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };
  
  // Handle touch events for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    prevTouch.current = e.touches[0].clientY;
    e.preventDefault();
  }, []);
  
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (prevTouch.current === null) return;
    
    const deltaY = prevTouch.current - e.touches[0].clientY;
    prevTouch.current = e.touches[0].clientY;
    
    if (Math.abs(deltaY) > 5 && !isAnimating.current) {
      const direction = deltaY > 0 ? 1 : -1;
      
      // Update current index
      setCurrentIndex(prevIndex => {
        // Calculate new index with wrapping
        let newIndex = prevIndex + direction;
        if (newIndex < 0) newIndex = membersList.length - 1;
        if (newIndex >= membersList.length) newIndex = 0;
        return newIndex;
      });
      
      // Animate rotation
      const newRotation = rotation + (direction * 12); // 12 degrees per step
      targetRotation.current = newRotation;
      isAnimating.current = true;
      animateRotation();
    }
    
    e.preventDefault();
    e.stopPropagation();
  }, [rotation]);
  
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    prevTouch.current = null;
    e.preventDefault();
  }, []);
  
  // Set up event listeners
  useEffect(() => {
    const wheelElement = wheelRef.current;
    if (wheelElement) {
      wheelElement.addEventListener('wheel', handleWheel, { passive: false });
      wheelElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      wheelElement.addEventListener('touchmove', handleTouchMove, { passive: false });
      wheelElement.addEventListener('touchend', handleTouchEnd, { passive: false });
      
      return () => {
        wheelElement.removeEventListener('wheel', handleWheel);
        wheelElement.removeEventListener('touchstart', handleTouchStart);
        wheelElement.removeEventListener('touchmove', handleTouchMove);
        wheelElement.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, rotation]);
  
  // Get currently selected member
  const selectedMember = membersList[currentIndex];
  const visibleMembers = getVisibleMembers();
  
  const selectedProfile = memberProfiles[selectedMember];

  return (
    <section className="w-full h-full relative" style={{ minHeight: 'calc(100vh - 84px)' }}>
      {/* Members title */}
      <motion.div 
        style={{ 
          fontFamily: 'Arial',
          fontSize: '128px',
          fontWeight: 'bold',
          position: 'absolute',
          top: '30px',
          left: '30px'
        }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        Members
      </motion.div>
      
      {/* "All participants" link at the bottom left */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <span style={{
          fontFamily: 'Arial',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          ← Все участники
        </span>
      </motion.div>
      
      {/* Selected member display on the left side */}
      {selectedProfile ? (
        <div style={{ display: 'flex', alignItems: 'flex-start', marginLeft: 30, marginTop: 30 }}>
          {/* Gray square */}
          <div style={{
            width: 185, height: 185, background: '#ddd', borderRadius: 8, flexShrink: 0
          }} />
          {/* Right content */}
          <div style={{ marginLeft: 30, flex: 1 }}>
            {/* Nickname */}
            <div style={{
              fontFamily: 'Arial', fontWeight: 400, fontSize: 40, color: '#000'
            }}>
              {selectedProfile.nickname}
            </div>
            {/* Description */}
            <div style={{
              fontFamily: 'Arial', fontWeight: 400, fontSize: 24, color: '#888', marginTop: 8
            }}>
              {selectedProfile.description}
            </div>
            {/* Socials */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              {selectedProfile.telegram && (
                <a href={selectedProfile.telegram} target="_blank" rel="noopener noreferrer">
                  <img src="/telegram.png" width={20} height={20} alt="Telegram" />
                </a>
              )}
              {selectedProfile.instagram && (
                <a href={selectedProfile.instagram} target="_blank" rel="noopener noreferrer">
                  <img src="/instagram.png" width={20} height={20} alt="Instagram" />
                </a>
              )}
            </div>
            {/* Veteran */}
            {selectedProfile.veteran && (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                <img src="/star.png" width={20} height={20} alt="Veteran" style={{ marginRight: 8 }} />
                <span style={{
                  fontFamily: 'Arial', fontWeight: 400, fontSize: 24, color: '#000'
                }}>
                  {selectedProfile.veteran} Ветеран
                </span>
              </div>
            )}
            {/* Contributions */}
            <div style={{ marginTop: 24, color: '#888', fontFamily: 'Arial', fontSize: 20 }}>
              {selectedProfile.contributions.map((c, i) => (
                <div key={i}>
                  {c.category} - 
                  {c.presets ? ` ${c.presets} пресетов` : ''}
                  {c.samples ? ` / ${c.samples} сэмплов` : ''}
                </div>
              ))}
            </div>
            {/* Points */}
            <div style={{
              marginTop: 12, color: '#000', fontFamily: 'Arial', fontSize: 20
            }}>
              {selectedProfile.points} балла Fr3
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginLeft: 30, marginTop: 30, fontFamily: 'Arial', fontSize: 32, color: '#888' }}>
          Нет профиля для этого участника
        </div>
      )}
      
      {/* Wheel container positioned at the right edge of the screen */}
      <div 
        ref={wheelRef}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '60%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          cursor: 'grab',
          zIndex: 5,
          overflow: 'hidden'
        }}
      >
        {/* Partial wheel showing only the visible portion */}
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            right: '-200px', // Half of the width to position center at the right edge
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          {visibleMembers.map((item, index) => {
            // Convert angle to radians for positioning
            const angleRad = (item.angle * Math.PI) / 180;
            const radius = 200;
            const x = radius * Math.sin(angleRad);
            const y = -radius * Math.cos(angleRad); // Negative to flip coordinate system
            
            // Adjust y positions for different nickname angles
            const adjustedY = index === 6 ? y - 10 : (index < 6 ? y - 20 : y + 40);
            
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x}px, ${adjustedY}px) rotate(${item.angle + 90}deg) translateX(-100%)`,
                  transformOrigin: '0% 50%',
                  fontFamily: 'Arial',
                  fontSize: item.isSelected ? '56px' : '36px',
                  fontWeight: item.isSelected ? 'bold' : 'normal',
                  opacity: item.isSelected ? 1 : 0.7,
                  pointerEvents: 'none',
                  transition: 'font-size 0.3s ease, opacity 0.3s ease, font-weight 0.3s ease',
                  whiteSpace: 'nowrap',
                  textAlign: 'left'
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Members;