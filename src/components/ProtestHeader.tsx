import React from 'react';
import handmadeImage from '../assets/Handmade.png';
import { motion } from 'framer-motion';

interface ProtestHeaderProps {
  isFirstSlide?: boolean;
}

const ProtestHeader: React.FC<ProtestHeaderProps> = ({ isFirstSlide = false }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between" style={{ 
      height: 'calc(100vh - 84px)',
      padding: '0 30px',
      boxSizing: 'border-box'
    }}>
      {/* Main title - centered vertically and horizontally */}
      <motion.div 
        className="flex-1 flex items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ boxSizing: 'border-box' }}
      >
        <h1 className="text-[clamp(32px,3.16vw,48px)] text-center" style={{ 
          fontFamily: 'Arial',
          fontWeight: 'bold',
        }}>
          Protest and provocation.
        </h1>
      </motion.div>

      {/* Bottom section - positioned at the bottom */}
      <motion.div 
        className="flex justify-between items-end pb-[30px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ boxSizing: 'border-box' }}
      >
        {/* Left - Back link */}
        <motion.div 
          className="text-[clamp(14px,1.05vw,16px)]" 
          style={{ 
            fontFamily: 'Arial',
            cursor: 'pointer'
          }}
          whileHover={{ x: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          ← Подробнее
        </motion.div>

        {/* Middle - Text blocks */}
        <div className="flex gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-[clamp(20px,1.58vw,24px)] mb-4" style={{ 
              fontFamily: 'Arial',
              fontWeight: 'bold',
            }}>
              We made
            </h2>
            <div className="text-[clamp(14px,1.05vw,16px)]" style={{ 
              fontFamily: 'Arial',
              lineHeight: '1.5'
            }}>
              Альбом<br />
              Саундкит<br />
              Мерч<br />
              Сайт
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-[clamp(20px,1.58vw,24px)] mb-4" style={{ 
              fontFamily: 'Arial',
              fontWeight: 'bold',
            }}>
              Franchise
            </h2>
            <div className="text-[clamp(14px,1.05vw,16px)]" style={{ 
              fontFamily: 'Arial',
              maxWidth: 'clamp(300px,26.3vw,400px)',
              lineHeight: '1.5'
            }}>
              Сезонный медиапроект, созданный в целях развития музыкальной культуры в России и роста каждого участника как творческой и командной единицы.
            </div>
          </motion.div>
        </div>

        {/* Right - Handmade image */}
        <motion.img 
          src={handmadeImage} 
          alt="Handmade" 
          className="h-auto"
          style={{
            width: isFirstSlide ? 'clamp(82px,7.17vw,109px)' : '158px',
            height: isFirstSlide ? 'auto' : '37px',
            aspectRatio: isFirstSlide ? '109/73' : '158/37',
            transition: 'all 0.5s ease'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
      </motion.div>
    </div>
  );
};

export default ProtestHeader;