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
    <div className="cyber-selector w-full max-w-md mx-auto mb-6 flex flex-col">
      <div className="text-center mb-2">
        <span className="text-[#00FF00] opacity-70 text-lg">// </span>
        <span className="text-lg font-bold">SELECT FX TYPE</span>
      </div>
      
      <div className="bg-black/40 backdrop-blur-sm border-2 border-[#33FF33]/40 rounded-lg p-1 flex relative overflow-hidden">
        {/* Animated background for selected state */}
        <motion.div 
          className="absolute top-0 bottom-0 bg-[#00FF00]/10 rounded-md z-0"
          initial={{ 
            left: fxType === "INPUT" ? "0%" : "50%", 
            width: "50%" 
          }}
          animate={{ 
            left: fxType === "INPUT" ? "0%" : "50%",
            width: "50%"
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Scan line effect */}
        <div className="absolute top-0 left-0 w-full h-full scanline"></div>
        
        {/* INPUT FX Button */}
        <button
          onClick={() => handleSelect("INPUT")}
          className={`flex-1 py-3 px-4 text-center relative z-10 transition-all duration-300 rounded ${
            fxType === "INPUT" 
              ? "text-[#00FF00] font-bold" 
              : "text-[#00FF00]/60 hover:text-[#00FF00]/80"
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold tracking-wider">INPUT FX</span>
            {fxType === "INPUT" && (
              <motion.div 
                className="w-12 h-0.5 bg-[#00FF00] mt-1"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        </button>
        
        {/* TRACK FX Button */}
        <button
          onClick={() => handleSelect("TRACK")}
          className={`flex-1 py-3 px-4 text-center relative z-10 transition-all duration-300 rounded ${
            fxType === "TRACK" 
              ? "text-[#00FF00] font-bold" 
              : "text-[#00FF00]/60 hover:text-[#00FF00]/80"
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold tracking-wider">TRACK FX</span>
            {fxType === "TRACK" && (
              <motion.div 
                className="w-12 h-0.5 bg-[#00FF00] mt-1"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        </button>
      </div>
      
      <div className="text-center text-sm mt-2 text-[#33FF33]/70">
        {fxType === "INPUT" ? 
          "Standard effects for input processing" : 
          "Includes beat-based effects for track manipulation"}
      </div>
    </div>
  );
}