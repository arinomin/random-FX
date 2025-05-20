import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface EffectCardProps {
  slot: string;
  slotNumber: string;
  effectName: string;
  effectDescription: string;
  isLoading: boolean;
}

export function EffectCard({
  slot,
  slotNumber,
  effectName,
  isLoading,
}: EffectCardProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShouldAnimate(false);
    } else {
      // Slight delay to allow for the loading state to be visible
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, effectName]);

  return (
    <div className="effect-card w-52 h-52 mx-auto rounded-full bg-[#1A1A1A]/80 border-2 border-[#FF0000]/40 transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Rotating border animation */}
      <div className="absolute inset-0 rounded-full border-4 border-transparent" style={{
        backgroundImage: 'linear-gradient(transparent, transparent), linear-gradient(to right, #FF0000, #FF3300)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, border-box',
        animation: 'spin 8s linear infinite'
      }}></div>
      
      {/* FX label at top */}
      <div className="absolute top-0 w-full text-center py-3">
        <span className="text-[#00FF00] font-bold text-2xl">FX {slot}</span>
      </div>
      
      {/* Scanline effect */}
      <div className="scanline absolute top-0 left-0 w-full h-full"></div>
      
      <div className="h-full flex flex-col justify-center items-center px-4 pt-6 transition-all duration-500">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <motion.p 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop" 
              }}
              className="text-3xl font-bold text-[#FF0000] text-center"
            >
              SCANNING...
            </motion.p>
          </div>
        ) : (
          <motion.div 
            className="flex flex-col items-center justify-center" 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: shouldAnimate ? 1 : 0,
              scale: shouldAnimate ? 1 : 0.5 
            }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 200
            }}
          >
            <motion.p
              className="text-3xl font-bold text-[#00FF00] text-center"
              animate={{ 
                textShadow: [
                  '0 0 5px #00FF00, 0 0 10px #00FF00', 
                  '0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00', 
                  '0 0 5px #00FF00, 0 0 10px #00FF00'
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              {effectName}
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
