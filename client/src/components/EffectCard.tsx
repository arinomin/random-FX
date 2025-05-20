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
    <div className="effect-card bg-[#1A1A1A]/80 border border-[#33FF33]/50 rounded transition-all duration-300">
      <div className="border-b border-[#33FF33]/30 flex items-center justify-between py-2 px-3">
        <span className="text-[#00FF00] font-bold">FX {slot}</span>
        <span className="text-xs opacity-70">[SLOT {slotNumber}]</span>
      </div>
      <div className="p-4 h-28 flex flex-col justify-center relative transition-all duration-500">
        <div className="scanline"></div>
        
        {isLoading ? (
          <>
            <p className="text-lg font-semibold text-[#00FF00] animate-pulse text-center">
              SCANNING...
            </p>
            <p className="text-xs mt-2 text-center opacity-70 max-w-[90%] mx-auto">
              Searching effect database
            </p>
          </>
        ) : (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: shouldAnimate ? 1 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="text-lg font-semibold text-[#00FF00] animate-glow text-center"
            >
              {effectName}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: shouldAnimate ? 0.7 : 0 
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-xs mt-2 text-center opacity-70 max-w-[90%] mx-auto"
            >
              {effectDescription}
            </motion.p>
          </>
        )}
      </div>
    </div>
  );
}
