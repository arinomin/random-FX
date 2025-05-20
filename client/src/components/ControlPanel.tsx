import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaRandom } from "react-icons/fa";

interface ControlPanelProps {
  onGenerateClick: () => void;
  isGenerating: boolean;
}

export function ControlPanel({ onGenerateClick, isGenerating }: ControlPanelProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!isGenerating) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 500);
      onGenerateClick();
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    pressed: { scale: 0.95 },
    generating: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const textVariants = {
    idle: { color: "#00FF00" },
    pressed: { color: "#000000" },
    generating: {
      color: ["#00FF00", "#ffffff", "#00FF00"],
      transition: {
        duration: 0.8,
        repeat: Infinity
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.button
        variants={buttonVariants}
        initial="idle"
        animate={isGenerating ? "generating" : isPressed ? "pressed" : "idle"}
        whileTap="pressed"
        onClick={handleClick}
        disabled={isGenerating}
        className={`relative bg-[#1A1A1A] hover:bg-[#333333] border-2 border-[#00FF00]/50 rounded-lg py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-10 font-bold text-lg sm:text-xl md:text-2xl transition-colors duration-300 focus:outline-none w-full max-w-xs sm:max-w-sm md:max-w-md disabled:cursor-not-allowed overflow-hidden ${
          isPressed ? "bg-[#00FF00]" : ""
        }`}
      >
        {/* Background animation for generating state */}
        {isGenerating && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF00]/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
        
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 relative z-10">
          <motion.div
            animate={isGenerating ? { rotate: 360 } : { rotate: 0 }}
            transition={{ 
              duration: 1.5, 
              repeat: isGenerating ? Infinity : 0,
              ease: "linear"
            }}
          >
            <FaRandom className="text-lg sm:text-xl md:text-2xl" />
          </motion.div>
          
          <motion.span
            variants={textVariants}
            initial="idle"
            animate={isGenerating ? "generating" : isPressed ? "pressed" : "idle"}
          >
            {isGenerating ? "GENERATING..." : "GENERATE RANDOM FX"}
          </motion.span>
        </div>
      </motion.button>
    </div>
  );
}
