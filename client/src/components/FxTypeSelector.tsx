import { useState } from "react";
import { motion } from "framer-motion";

interface FxTypeSelectorProps {
  fxType: "INPUT" | "TRACK";
  onFxTypeChange: (type: "INPUT" | "TRACK") => void;
}

export function FxTypeSelector({ fxType, onFxTypeChange }: FxTypeSelectorProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelect = (type: "INPUT" | "TRACK") => {
    if (type !== fxType) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
      onFxTypeChange(type);
    }
  };

  return (
    <div className="cyber-selector w-full max-w-lg mx-auto mb-8 flex flex-col">
      <div className="text-center mb-3">
        <span className="text-[#FF0000] opacity-80 text-2xl">// </span>
        <span className="text-2xl font-bold">SELECT FX TYPE</span>
      </div>
      
      <div className="bg-black/40 backdrop-blur-sm border-2 border-[#FF0000]/40 rounded-lg p-2 flex relative overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.2)]">
        {/* Animated background for selected state */}
        <motion.div 
          className="absolute top-0 bottom-0 bg-[#1A1A1A] rounded-md z-0"
          initial={{ 
            left: fxType === "INPUT" ? "0%" : "50%", 
            width: "50%" 
          }}
          animate={{ 
            left: fxType === "INPUT" ? "0%" : "50%",
            width: "50%",
            boxShadow: ["0 0 10px #FF0000", "0 0 20px #FF0000, 0 0 30px #FF0000", "0 0 10px #FF0000"]
          }}
          transition={{ 
            duration: 0.3,
            boxShadow: { 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse" 
            } 
          }}
        />
        
        {/* Scan line effect */}
        <div className="absolute top-0 left-0 w-full h-full scanline"></div>
        
        {/* INPUT FX Button */}
        <button
          onClick={() => handleSelect("INPUT")}
          className={`flex-1 py-4 px-4 text-center relative z-10 transition-all duration-300 rounded ${
            fxType === "INPUT" 
              ? "text-[#FF0000] font-bold" 
              : "text-[#00FF00]/70 hover:text-[#00FF00]"
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold tracking-wider">INPUT FX</span>
            {fxType === "INPUT" && (
              <motion.div 
                className="w-16 h-0.5 bg-[#FF0000] mt-2"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        </button>
        
        {/* TRACK FX Button */}
        <button
          onClick={() => handleSelect("TRACK")}
          className={`flex-1 py-4 px-4 text-center relative z-10 transition-all duration-300 rounded ${
            fxType === "TRACK" 
              ? "text-[#FF0000] font-bold" 
              : "text-[#00FF00]/70 hover:text-[#00FF00]"
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold tracking-wider">TRACK FX</span>
            {fxType === "TRACK" && (
              <motion.div 
                className="w-16 h-0.5 bg-[#FF0000] mt-2"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        </button>
      </div>
      
      <div className="text-center text-base mt-3 text-[#33FF33]/80">
        {fxType === "INPUT" ? 
          "Standard effects for input processing" : 
          "Includes beat-based effects for track manipulation"}
      </div>
    </div>
  );
}