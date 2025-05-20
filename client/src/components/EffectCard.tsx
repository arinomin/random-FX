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
    <div className="effect-card w-52 h-52 mx-auto rounded-full bg-[#1A1A1A]/80 border-2 border-[#33FF33]/50 transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 w-full text-center py-3 border-b border-[#33FF33]/30 bg-black/30 backdrop-blur-sm">
        <span className="text-[#00FF00] font-bold text-xl">FX {slot}</span>
      </div>
      
      <div className="scanline absolute top-0 left-0 w-full h-full"></div>
      
      <div className="h-full flex flex-col justify-center items-center px-2 transition-all duration-500">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <p className="text-2xl font-semibold text-[#00FF00] animate-pulse text-center">
              SCANNING...
            </p>
            <p className="text-xs mt-2 text-center opacity-70 max-w-[90%]">
              Searching effect database
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            <motion.p
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: shouldAnimate ? 1 : 0,
                scale: shouldAnimate ? 1 : 0.8,
                y: shouldAnimate ? 0 : 20 
              }}
              transition={{ duration: 0.4, type: "spring" }}
              className="text-2xl font-bold text-[#00FF00] text-center"
            >
              {effectName}
            </motion.p>
          </div>
        )}
      </div>
      
      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 w-full h-1/6 bg-gradient-to-t from-[#00FF00]/10 to-transparent"></div>
    </div>
  );
}
