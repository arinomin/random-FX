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
  effectDescription,
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
    <div className="effect-card w-48 h-48 mx-auto rounded-full bg-[#1A1A1A]/80 border-2 border-[#33FF33]/50 transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_15px_rgba(0,255,0,0.3)]">
      <div className="absolute top-0 w-full text-center py-2 border-b border-[#33FF33]/30 bg-black/30 backdrop-blur-sm">
        <span className="text-[#00FF00] font-bold text-lg">FX {slot}</span>
        <span className="text-xs opacity-70 ml-2">[{slotNumber}]</span>
      </div>
      
      <div className="scanline absolute top-0 left-0 w-full h-full"></div>
      
      <div className="h-full flex flex-col justify-center items-center px-4 pt-6 transition-all duration-500">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-4">
            <p className="text-xl font-semibold text-[#00FF00] animate-pulse text-center mt-2">
              SCANNING...
            </p>
            <p className="text-xs mt-2 text-center opacity-70 max-w-[90%]">
              Searching effect database
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: shouldAnimate ? 1 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="text-xl font-semibold text-[#00FF00] animate-glow text-center mt-2"
            >
              {effectName}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: shouldAnimate ? 0.7 : 0 
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-sm mt-3 text-center opacity-70 max-w-[85%]"
            >
              {effectDescription}
            </motion.p>
          </div>
        )}
      </div>
      
      {/* Bottom circular border accent */}
      <div className="absolute bottom-0 w-full h-1/6 bg-gradient-to-t from-[#00FF00]/10 to-transparent"></div>
    </div>
  );
}
