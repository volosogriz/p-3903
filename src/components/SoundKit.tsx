import React from 'react';
import CustomVideoPlayer from './CustomVideoPlayer';
import { motion } from 'framer-motion';

const SoundKit: React.FC = () => {
  return (
    <section className="w-full h-full px-[30px] py-20 overflow-auto" style={{ letterSpacing: '-0.05em' }}>
      {/* Left side with main title */}
      <div className="grid grid-cols-2 h-full">
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ 
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: '150px',
            lineHeight: '1',
            marginBottom: '24px'
          }}>
            Sound<br />kit
          </h1>
          <motion.div 
            className="flex gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ 
              fontFamily: 'Arial',
              fontWeight: 'bold',
              fontSize: '20px'
            }}>
              09 April, 2025
            </div>
            <div style={{ 
              fontFamily: 'Arial',
              fontWeight: 'bold',
              fontSize: '20px'
            }}>
              100 creators
            </div>
            <div style={{ 
              fontFamily: 'Arial',
              fontWeight: 'bold',
              fontSize: '20px'
            }}>
              Franchise3
            </div>
          </motion.div>

          {/* Custom Video Player */}
          <motion.div 
            className="max-w-[600px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <CustomVideoPlayer />
          </motion.div>
        </motion.div>

        {/* Right side with project details */}
        <motion.div
          className="overflow-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="grid grid-cols-[157px_1fr] items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div style={{ 
              fontFamily: 'Arial',
              fontSize: '16px',
              color: '#797979'
            }}>
              Project:
            </div>
            <div style={{ 
              fontFamily: 'Arial',
              fontSize: '16px'
            }}>
              Franchise3 Soundkit 2025
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-[157px_1fr] items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ 
              marginBottom: '26px',
              marginTop: '10px'
            }}
          >
            <div style={{ 
              fontFamily: 'Arial',
              fontSize: '16px',
              color: '#797979'
            }}>
              Made by:
            </div>
            <div>
              <div style={{ 
                fontFamily: 'Arial',
                fontSize: '16px',
                background: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                paddingBottom: '0px',
                lineHeight: 1.2
              }}>
                aiica, aise, akira, akiso21, an empty, ayoinsane, anyproblems, ayoluvme, ayoMails, baam, baikoglory, besray, chefverliy, clowdy, cyberpl4gg, damladee, desxw, dimewell, elekcher, eleve, etake, flensoo, flowwey, gleero, gnightfreaky, gussep, Gusbxd, H3, hxllactm, insofaze, internalboi, iwmm, JamoX, jesil, jjroee, k8, kanbuu, keynaddy, killmelxterr, krayzzzen, lfey9, lilllmadeit, lumiqs, lvsh0p3, madkonory, maflum, Metanciaa, modestmorty, mcremilly, 1mork, moshi, myway, nexmend, optist, 1omgphil, Panika, probellhoroshiy, reiwaaa, seizugodxx, shelovesdelufi, shynegokrazy, spadegokrazy, stanw3y, tacov, umiso, uniqueshooter1, vexego, veplesk, w8me, wasseven, weiss, 98wakeup, wakeuguwe, whynotdarami, whyper, whyucsel, wires, wlszwn, worldprize, xemwho, xprintl, xrealzloy
              </div>
              <div style={{ 
                fontFamily: 'Arial',
                fontSize: '16px',
                marginTop: '8px'
              }}>
                <a href="#" className="underline">All creators</a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="h-[2px] bg-black w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />

          <motion.div 
            className="grid grid-cols-[157px_1fr] items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              marginBottom: '26px',
              marginTop: '26px'
            }}
          >
            <div style={{ 
              fontFamily: 'Arial',
              fontSize: '16px',
              color: '#797979'
            }}>
              Drums:
            </div>
            <div className="grid grid-cols-[157px_50px] gap-y-[0px]" style={{ fontFamily: 'Arial', fontSize: '16px'}}>
              <div>808</div><div>x75</div>
              <div>Snare</div><div>x100</div>
              <div>Hi-hat</div><div>x90</div>
              <div>Perc</div><div>x70</div>
              <div>Kick</div><div>x12</div>
              <div>fx</div><div>x60</div>
              <div>Drum loop</div><div>x30</div>
              <div>Vocal loop</div><div>x20</div>
              <div>Mixer preset</div><div>x35</div>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-[157px_1fr] items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{
              marginBottom: '26px',
              marginTop: '26px'
            }}
          >
            <div style={{ 
              fontFamily: 'Arial',
              fontSize: '16px',
              color: '#797979'
            }}>
              Presets:
            </div>
            <div className="grid grid-cols-[157px_50px] gap-y-[0px]" style={{ fontFamily: 'Arial', fontSize: '16px' }}>
              <div>Serum 2</div><div>x25</div>
              <div>Autochroma</div><div>x76</div>
              <div>Falcon</div><div>x15</div>
              <div>Digitalis</div><div>x73</div>
              <div>Hive</div><div>x35</div>
              <div>Infiltrator</div><div>x23</div>
            </div>
          </motion.div>

          <motion.div 
            className="h-[2px] bg-black w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          />

          {/* GET and Signature section */}
          <motion.div
            className="flex justify-between items-end mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            {/* Left side - GET */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div style={{ 
                fontFamily: 'Arial Black, Arial',
                fontSize: '40px',
                fontWeight: '900',
                position: 'relative',
                top: '10px'
              }}>
                GET
              </div>
              {/* GET underline */}
              <div style={{
                position: 'absolute',
                bottom: 'calc(-14.5% + 4px)',
                left: 0,
                width: '100%',
                height: '7px',
                backgroundColor: 'black'
              }} />
            </motion.div>

            {/* Right side - Signature */}
            <motion.div 
              className="flex flex-col items-end"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative" style={{ width: '321.31px', height: '194.94px', marginBottom: '-65px'}}>
                <img 
                  src="/signature.svg" 
                  alt="Signature" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    position: 'absolute',
                    bottom: 0
                  }}
                />
              </div>
              <div className="flex items-end gap-2">
                <div style={{ 
                  fontFamily: 'Arial',
                  fontSize: '20px',
                  lineHeight: 1
                }}>
                  Signature:
                </div>
                <div style={{
                  width: '300px',
                  height: '2px',
                  backgroundColor: 'black',
                  marginBottom: '3px'
                }} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SoundKit; 