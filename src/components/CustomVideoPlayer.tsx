import React, { useRef, useState } from 'react';

const CustomVideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayButtonVisible, setIsPlayButtonVisible] = useState(true);
  const [nextButtonStates, setNextButtonStates] = useState([1, 1, 1]); // [triangle1, triangle2, line]
  const [prevButtonStates, setPrevButtonStates] = useState([1, 1, 1]); // [line, triangle1, triangle2]

  const handlePlayPause = () => {
    if (videoRef.current) {
      setIsPlayButtonVisible(false);
      setTimeout(() => {
        if (isPlaying) {
          videoRef.current?.pause();
        } else {
          videoRef.current?.play();
        }
        setIsPlaying(!isPlaying);
        setTimeout(() => {
          setIsPlayButtonVisible(true);
        }, 150);
      }, 150);
    }
  };

  const animateNextButton = () => {
    // Sequential animation for next button
    const sequence = [
      [0.5, 1, 1],    // First triangle fades
      [0.5, 0.5, 1],  // Second triangle fades
      [1, 0.5, 1],    // First triangle returns
      [1, 1, 0.5],    // Line fades
      [1, 1, 1]       // All return to normal
    ];

    sequence.forEach((state, index) => {
      setTimeout(() => {
        setNextButtonStates(state);
      }, index * 100);
    });
  };

  const animatePrevButton = () => {
    // Sequential animation for prev button (reverse order)
    const sequence = [
      [1, 1, 0.5],    // Last triangle fades
      [1, 0.5, 0.5],  // Second triangle fades
      [1, 0.5, 1],    // Last triangle returns
      [0.5, 1, 1],    // Line fades
      [1, 1, 1]       // All return to normal
    ];

    sequence.forEach((state, index) => {
      setTimeout(() => {
        setPrevButtonStates(state);
      }, index * 100);
    });
  };

  return (
    <div className="flex flex-col">
      <div className="relative">
        <video
          ref={videoRef}
          src="/cutoff.mp4"
          className="w-full bg-[#F3F3F3]"
          style={{ aspectRatio: '16/9' }}
        />
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div style={{ 
              fontFamily: 'Arial',
              fontSize: '48px',
              color: 'white'
            }}>
              Превью кита
            </div>
          </div>
        )}
      </div>

      {/* Track info */}
      <div className="mt-1" style={{ 
        fontFamily: 'Arial',
        fontSize: '11px',
        paddingLeft: '4px'
      }}>
        beat name by @nickname @nickname @nickname
      </div>

      {/* Custom controls */}
      <div className="flex items-center justify-between mt-4">
        {/* Previous button */}
        <button 
          className="focus:outline-none flex items-center h-[27px]"
          onClick={animatePrevButton}
        >
          {/* Vertical line */}
          <div 
            className="w-[7px] h-[27px] bg-black transition-opacity duration-100" 
            style={{ opacity: prevButtonStates[0] }}
          />
          {/* Two triangles */}
          <div className="flex" style={{ marginLeft: '-1px' }}>
            <svg 
              width="27" 
              height="27" 
              viewBox="0 0 27 27" 
              fill="none" 
              style={{ transform: 'rotate(-90deg)', opacity: prevButtonStates[1] }}
              className="transition-opacity duration-100"
            >
              <path d="M13.5 0L27 27H0L13.5 0Z" fill="black"/>
            </svg>
            <svg 
              width="27" 
              height="27" 
              viewBox="0 0 27 27" 
              fill="none" 
              style={{ marginLeft: '-1px', transform: 'rotate(-90deg)', opacity: prevButtonStates[2] }}
              className="transition-opacity duration-100"
            >
              <path d="M13.5 0L27 27H0L13.5 0Z" fill="black"/>
            </svg>
          </div>
        </button>

        {/* Play/Pause button */}
        <button 
          onClick={handlePlayPause} 
          className="focus:outline-none w-[27px] h-[27px] flex items-center justify-center relative"
        >
          <div className={`transition-opacity duration-150 ${isPlayButtonVisible ? 'opacity-100' : 'opacity-0'}`}>
            {isPlaying ? (
              // Pause state
              <div className="flex gap-[3px]">
                <div className="w-[8px] h-[27px] bg-black" />
                <div className="w-[8px] h-[27px] bg-black" />
              </div>
            ) : (
              // Play state
              <svg width="27" height="27" viewBox="0 0 27 27" fill="none" style={{ transform: 'rotate(90deg)' }}>
                <path d="M13.5 0L27 27H0L13.5 0Z" fill="black"/>
              </svg>
            )}
          </div>
        </button>

        {/* Next button */}
        <button 
          className="focus:outline-none flex items-center h-[27px]"
          onClick={animateNextButton}
        >
          {/* Two triangles */}
          <div className="flex">
            <svg 
              width="27" 
              height="27" 
              viewBox="0 0 27 27" 
              fill="none" 
              style={{ transform: 'rotate(90deg)', opacity: nextButtonStates[0] }}
              className="transition-opacity duration-100"
            >
              <path d="M13.5 0L27 27H0L13.5 0Z" fill="black"/>
            </svg>
            <svg 
              width="27" 
              height="27" 
              viewBox="0 0 27 27" 
              fill="none" 
              style={{ marginLeft: '-1px', transform: 'rotate(90deg)', opacity: nextButtonStates[1] }}
              className="transition-opacity duration-100"
            >
              <path d="M13.5 0L27 27H0L13.5 0Z" fill="black"/>
            </svg>
          </div>
          {/* Vertical line */}
          <div 
            className="w-[7px] h-[27px] bg-black transition-opacity duration-100" 
            style={{ marginLeft: '-1px', opacity: nextButtonStates[2] }}
          />
        </button>
      </div>
    </div>
  );
};

export default CustomVideoPlayer; 