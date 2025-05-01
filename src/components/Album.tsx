import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as musicMetadata from 'music-metadata-browser';

interface Track {
  id: number;
  name: string;
  performers: string;
  filePath: string;
}

const Album: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<number | null>(1); // Default to first track
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const trackListRef = useRef<HTMLDivElement>(null);
  const creditsRef = useRef<HTMLDivElement>(null);

  // Handle wheel event to prevent slide switching when scrolling within containers
  const handleWheel = useCallback((e: WheelEvent) => {
    // Check if event target is inside a scrollable container
    const isTrackListContainer = trackListRef.current?.contains(e.target as Node);
    const isCreditsContainer = creditsRef.current?.contains(e.target as Node);
    
    if (isTrackListContainer || isCreditsContainer) {
      const container = isTrackListContainer ? trackListRef.current : creditsRef.current;
      if (!container) return;
      
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1; // -1 for rounding errors
      
      // If at the top and scrolling up, or at the bottom and scrolling down, 
      // allow the event to bubble up (which will trigger slide change)
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        return;
      }
      
      // Otherwise prevent default and handle the scroll manually
      e.preventDefault();
      e.stopPropagation();
      container.scrollTop += e.deltaY;
    }
  }, []);
  
  // Set up wheel event listener
  useEffect(() => {
    // Must use capture phase to intercept events before they reach the slider component
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, [handleWheel]);

  useEffect(() => {
    // Use mock data directly without trying to load MP3 tags
    const mockTracks = [
      { id: 1, name: 'hC INTRO', performers: 'FRANCHISE2, yukibleeding', filePath: '/fr2_tracks/1.mp3' },
      { id: 2, name: 'WORLD', performers: 'FRANCHISE2, modestmorty', filePath: '/fr2_tracks/2.mp3' },
      { id: 3, name: 'CARTOON', performers: 'FRANCHISE2, childchewer, komit', filePath: '/fr2_tracks/3.mp3' },
      { id: 4, name: 'GULIVER', performers: 'FRANCHISE2, modestmorty, childchewer', filePath: '/fr2_tracks/4.mp3' },
      { id: 5, name: 'NEWDAY', performers: 'FRANCHISE2, zmny, ayoluvme', filePath: '/fr2_tracks/5.mp3' },
      { id: 6, name: 'CUTOFF', performers: 'FRANCHISE2, childchewer, zmny', filePath: '/fr2_tracks/6.mp3' },
      { id: 7, name: 'POWERBANK', performers: 'FRANCHISE2, spadegocrazy, Mike Hokku', filePath: '/fr2_tracks/7.mp3' },
      { id: 8, name: 'SPEND', performers: 'FRANCHISE2, zmny, nexmend', filePath: '/fr2_tracks/8.mp3' },
      { id: 9, name: 'СИМПТОМЫ', performers: 'FRANCHISE2, modestmorty, kanbuu, CHETVERTIY, Mike Hokku', filePath: '/fr2_tracks/9.mp3' },
    ];
    
    setTracks(mockTracks);
  }, []);

  // Audio playback functionality
  useEffect(() => {
    // Create an audio element
    const audio = new Audio();
    audioRef.current = audio;
    
    // Set up event listeners
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleTrackEnd);
    
    // Clean up on unmount
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleTrackEnd);
    };
  }, []);
  
  // Update audio source when selected track changes
  useEffect(() => {
    if (audioRef.current && selectedTrack) {
      const track = tracks.find(t => t.id === selectedTrack);
      if (track) {
        audioRef.current.src = track.filePath;
        if (isPlaying) {
          audioRef.current.play().catch(err => console.error('Error playing audio:', err));
        }
      }
    }
  }, [selectedTrack, tracks]);
  
  // Update playback state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error('Error playing audio:', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  const updateProgress = () => {
    if (audioRef.current) {
      const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isNaN(percentage) ? 0 : percentage);
    }
  };
  
  const handleTrackEnd = () => {
    nextTrack();
  };
  
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      // Get the position of the click relative to the progress bar
      const rect = progressBarRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const width = rect.width;
      
      // Calculate the percentage of the click position
      const percentage = (offsetX / width) * 100;
      
      // Calculate the corresponding time in the audio
      const newTime = (percentage / 100) * audioRef.current.duration;
      
      // Set the audio time
      audioRef.current.currentTime = newTime;
      
      // Update the progress
      setProgress(percentage);
    }
  };

  const formatTrackNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  const handleTrackSelect = (id: number) => {
    setSelectedTrack(id);
    setIsPlaying(true);
    // Track selection will trigger the useEffect to play it
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (selectedTrack && selectedTrack < tracks.length) {
      setSelectedTrack(selectedTrack + 1);
    } else if (tracks.length > 0) {
      setSelectedTrack(1); // Go to first track if at the end
    }
  };

  const prevTrack = () => {
    if (selectedTrack && selectedTrack > 1) {
      setSelectedTrack(selectedTrack - 1);
    } else if (tracks.length > 0) {
      setSelectedTrack(tracks.length); // Go to last track if at the beginning
    }
  };

  // Find the currently selected track object
  const currentTrack = selectedTrack 
    ? tracks.find(track => track.id === selectedTrack) 
    : tracks.length > 0 ? tracks[0] : null;

  return (
    <section className="w-full h-full px-[30px] py-20 relative" style={{ minHeight: 'calc(100vh - 84px)' }}>
      {/* Franchise2 text */}
      <motion.div 
        style={{ 
          fontFamily: 'Arial',
          fontSize: '128px',
          fontStyle: 'italic',
          position: 'absolute',
          top: '30px',
          left: '30px'
        }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="franchise2-heading"
      >
        Franchise2
      </motion.div>

      {/* Franchise3 link */}
      <motion.div 
        style={{ 
          fontFamily: 'Arial',
          fontSize: '36px',
          fontStyle: 'italic',
          color: '#686868',
          position: 'absolute',
          top: '30px',
          right: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: 10 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.2,
          type: "spring", 
          stiffness: 300 
        }}
      >
        <span style={{ 
          borderBottom: '1px solid #686868'
        }}>
          Franchise3
        </span>
        <span>&gt;</span>
      </motion.div>

      {/* Album text */}
      <motion.div 
        style={{ 
          fontFamily: 'Arial',
          fontWeight: 'bold',
          fontSize: '128px',
          position: 'absolute',
          bottom: '30px',
          right: '30px'
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Album
      </motion.div>

      {/* Track List Container */}
      <motion.div 
        className="absolute left-[30px] overflow-auto"
        style={{
          top: '180px', // Position below the Franchise2 heading
          bottom: '260px', // Make room for the player at bottom
          maxWidth: '640px', // Width should match approximately "Franchise2" text width
          padding: '20px 20px 20px 0',
          scrollbarWidth: 'none', // Hide default scrollbar
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        ref={trackListRef}
      >
        {/* Custom scrollbar */}
        <div 
          style={{
            position: 'absolute',
            right: '4px',
            top: '4px',
            bottom: '4px',
            width: '3px',
            backgroundColor: 'black',
            opacity: 0.2,
            borderRadius: '3px',
          }}
        />
        <div 
          style={{
            position: 'absolute',
            right: '4px',
            top: '4px',
            bottom: '4px',
            width: '8px',
            backgroundColor: 'black',
            opacity: 0.1,
            borderRadius: '4px',
          }}
        />

        {/* Track list */}
        <div style={{ paddingRight: '20px' }}>
          {loadingError && (
            <div style={{ color: 'red', padding: '20px', fontFamily: 'Arial' }}>
              Error loading tracks: {loadingError}. Using mock data instead.
            </div>
          )}
          {tracks.map((track) => (
            <div 
              key={track.id}
              className="flex py-3 cursor-pointer"
              style={{
                transition: 'background-color 0.3s ease',
                backgroundColor: selectedTrack === track.id ? 'black' : 'transparent',
                padding: '0 12px',
                marginBottom: '50px' // Add 50px spacing between tracks
              }}
              onClick={() => handleTrackSelect(track.id)}
            >
              <div style={{ 
                fontFamily: 'Arial', 
                fontSize: '20px', 
                color: selectedTrack === track.id ? 'white' : 'gray', 
                width: '50px'
              }}>
                {formatTrackNumber(track.id)}
              </div>
              <div style={{ 
                fontFamily: 'Arial', 
                fontSize: '20px', 
                color: selectedTrack === track.id ? 'white' : 'black', 
                marginLeft: '46px', 
                flex: 1,
                fontWeight: selectedTrack === track.id ? 'bold' : 'normal',
              }}>
                {track.name}
              </div>
              <div style={{ 
                fontFamily: 'Arial', 
                fontSize: '20px', 
                color: selectedTrack === track.id ? 'white' : 'gray', 
                textAlign: 'right',
                paddingLeft: '20px',
              }}>
                {track.performers}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Credits Text */}
      <motion.div
        className="absolute overflow-auto"
        style={{
          top: '180px',
          left: 'calc(640px + 50px)', // To the right of track list with 50px indentation
          maxWidth: '500px',
          height: 'calc(100% - 440px)', // Match height of track list
          padding: '20px 0',
          scrollbarWidth: 'none', // Hide default scrollbar
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        ref={creditsRef}
      >
        {/* Custom scrollbar */}
        <div 
          style={{
            position: 'absolute',
            right: '4px',
            top: '4px',
            bottom: '4px',
            width: '3px',
            backgroundColor: 'black',
            opacity: 0.2,
            borderRadius: '3px',
          }}
        />
        <div 
          style={{
            position: 'absolute',
            right: '4px',
            top: '4px',
            bottom: '4px',
            width: '8px',
            backgroundColor: 'black',
            opacity: 0.1,
            borderRadius: '4px',
          }}
        />
        
        <div style={{ paddingRight: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold', marginBottom: '5px' }}>
              Executive producers:
            </div>
            <div style={{ fontFamily: 'Arial', fontSize: '20px' }}>
              childchewer, Mike Hokku, komit
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold', marginBottom: '5px' }}>
              Created by
            </div>
            <div style={{ fontFamily: 'Arial', fontSize: '20px' }}>
              yukibleeding, modestmorty, childchewer, komit, zmny, ayoluvme, spadegocrazy, Mike Hokku, nexmend, kanbuu, CHETVERTIY, AIICA
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold', marginBottom: '5px' }}>
              Produced by
            </div>
            <div style={{ fontFamily: 'Arial', fontSize: '20px' }}>
              moonkillah, zmny, starw3y, modestmorty, evelost, serene, Mike Hokku, akira, madkonory, vsplesk, postvox, umiso, whynadarami
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold', marginBottom: '5px' }}>
              Transitions and sound design by
            </div>
            <div style={{ fontFamily: 'Arial', fontSize: '20px' }}>
              madkonory, whynadarami
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold', marginBottom: '5px' }}>
              Cover art by
            </div>
            <div style={{ fontFamily: 'Arial', fontSize: '20px' }}>
              myriq & phliphone
            </div>
          </div>
          
          <div style={{ fontFamily: 'Arial', fontSize: '20px', fontStyle: 'italic', marginTop: '30px' }}>
            <a href="https://music.apple.com/album/franchise2/1" style={{ color: 'black', marginRight: '10px' }}>Apple Music</a> / 
            <a href="https://open.spotify.com/album/franchise2" style={{ color: 'black', margin: '0 10px' }}>Spotify</a> / 
            <a href="https://vk.com/music/album/franchise2" style={{ color: 'black', margin: '0 10px' }}>VK</a> / 
            <a href="https://genius.com/albums/franchise2" style={{ color: 'black', marginLeft: '10px' }}>GENIUS</a>
          </div>
        </div>
      </motion.div>

      {/* Player Component */}
      <motion.div
        className="absolute left-[30px]"
        style={{
          bottom: '30px',
          width: '640px', // Match Franchise2 text width
          padding: '20px 0',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {/* Always show the player, with default track if none selected */}
        {tracks.length > 0 && (
          <>
            {/* Track Name */}
            <div 
              style={{ 
                fontFamily: 'Arial', 
                fontSize: '32px', 
                fontWeight: 'bold',
                marginBottom: '4px' 
              }}
            >
              {currentTrack ? currentTrack.name : 'CUTOFF'}
            </div>
            
            {/* Performers */}
            <div 
              style={{ 
                fontFamily: 'Arial', 
                fontSize: '20px', 
                fontStyle: 'italic',
                color: 'gray',
                marginBottom: '20px' 
              }}
            >
              {currentTrack ? currentTrack.performers : 'FRANCHISE2, childchewer, zmny'}
            </div>
            
            {/* Timeline/Progress Bar */}
            <div 
              ref={progressBarRef}
              style={{ position: 'relative', height: '15px', marginBottom: '30px', cursor: 'pointer' }}
              onClick={handleTimelineClick}
            >
              {/* Thicker background line */}
              <div 
                style={{ 
                  position: 'absolute',
                  top: '6px',
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '2px'
                }}
              />
              
              {/* Thinner foreground line (progress) */}
              <div 
                style={{ 
                  position: 'absolute',
                  top: '6px',
                  left: 0,
                  width: `${progress}%`, // Dynamic based on actual playback progress
                  height: '3px',
                  backgroundColor: 'black',
                  borderRadius: '2px'
                }}
              />
            </div>
            
            {/* Player Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              {/* Previous Button */}
              <motion.button 
                onClick={prevTrack} 
                style={{ 
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '10px'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '20px', height: '20px', position: 'relative' }}>
                    <div style={{ 
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      width: '3px', 
                      height: '20px', 
                      backgroundColor: 'black',
                      transform: 'translateX(4px)'
                    }}></div>
                    <div style={{ 
                      position: 'absolute',
                      left: '7px',
                      top: '0',
                      width: '0', 
                      height: '0', 
                      borderTop: '10px solid transparent',
                      borderRight: '15px solid black',
                      borderBottom: '10px solid transparent',
                      transform: 'translateX(-2px)'
                    }}></div>
                  </div>
                  <div style={{ width: '20px', height: '20px', position: 'relative', marginLeft: '-8px' }}>
                    <div style={{ 
                      position: 'absolute',
                      left: '7px',
                      top: '0',
                      width: '0', 
                      height: '0', 
                      borderTop: '10px solid transparent',
                      borderRight: '15px solid black',
                      borderBottom: '10px solid transparent',
                      transform: 'translateX(-2px)'
                    }}></div>
                  </div>
                </div>
              </motion.button>
              
              {/* Play/Pause Button */}
              <motion.button 
                onClick={togglePlayPause} 
                style={{ 
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '10px'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
              >
                {isPlaying ? (
                  // Pause Icon
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '5px', height: '24px', backgroundColor: 'black' }}></div>
                    <div style={{ width: '5px', height: '24px', backgroundColor: 'black' }}></div>
                  </div>
                ) : (
                  // Play Icon
                  <div style={{ 
                    width: '0', 
                    height: '0', 
                    borderTop: '12px solid transparent',
                    borderLeft: '20px solid black',
                    borderBottom: '12px solid transparent'
                  }}></div>
                )}
              </motion.button>
              
              {/* Next Button - Fixed spacing */}
              <motion.button 
                onClick={nextTrack} 
                style={{ 
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '10px'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                  <div style={{ width: '20px', height: '20px', position: 'relative' }}>
                    <div style={{ 
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      width: '0', 
                      height: '0', 
                      borderTop: '10px solid transparent',
                      borderLeft: '15px solid black',
                      borderBottom: '10px solid transparent'
                    }}></div>
                  </div>
                  <div style={{ width: '20px', height: '20px', position: 'relative' }}>
                    <div style={{ 
                      position: 'absolute',
                      right: '0',
                      top: '0',
                      width: '3px', 
                      height: '20px', 
                      backgroundColor: 'black'
                    }}></div>
                    <div style={{ 
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      width: '0', 
                      height: '0', 
                      borderTop: '10px solid transparent',
                      borderLeft: '15px solid black',
                      borderBottom: '10px solid transparent'
                    }}></div>
                  </div>
                </div>
              </motion.button>
            </div>
          </>
        )}
        
        {/* Hidden audio element for playback */}
        <audio ref={audioRef} style={{ display: 'none' }} />
      </motion.div>
    </section>
  );
};

export default Album; 