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
    idle: { scale: 1, y: 0 },
    pressed: { scale: 0.97, y: 4 },
    generating: {
      scale: [1, 1.03, 1],
      y: [0, -2, 0],
      filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const textVariants = {
    idle: { color: "#00FF00", textShadow: "0 0 5px rgba(0, 255, 0, 0.3)" },
    pressed: { color: "#000000", textShadow: "0 0 0px rgba(0, 0, 0, 0)" },
    generating: {
      color: ["#00FF00", "#ffffff", "#00FF00"],
      textShadow: ["0 0 5px rgba(0, 255, 0, 0.7)", "0 0 10px rgba(255, 255, 255, 0.9)", "0 0 5px rgba(0, 255, 0, 0.7)"],
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
        className={`relative bg-[#1A1A1A] hover:bg-[#222222] border-2 border-[#00FF00]/70 rounded-lg py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-10 font-bold text-lg sm:text-xl md:text-2xl transition-all duration-300 focus:outline-none w-full max-w-xs sm:max-w-sm md:max-w-md disabled:cursor-not-allowed overflow-hidden
          ${isPressed ? "bg-[#00FF00] translate-y-1 shadow-inner" : "shadow-[0_0_10px_rgba(0,255,0,0.3),inset_0_0_10px_rgba(0,255,0,0.1)]"}
          before:content-[''] before:absolute before:inset-0 before:border-4 before:border-[#00FF00]/10 before:rounded-md before:scale-105 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300
          after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[6px] after:bg-gradient-to-r after:from-[#00FF00]/80 after:via-[#00FF00]/20 after:to-[#00FF00]/80
        `}
        style={{
          boxShadow: isGenerating ? '0 0 15px rgba(0, 255, 0, 0.5), inset 0 0 10px rgba(0, 255, 0, 0.3)' : '',
          transform: isPressed ? 'translateY(2px)' : '',
        }}
      >
        {/* Background animations for generating state */}
        {isGenerating && (
          <>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF00]/30 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute inset-0 bg-[#00FF00]/5"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 0.6 }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-[#00FF00]"
              initial={{ scaleX: 0, opacity: 0.7 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
          </>
        )}
        
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 relative z-10">
          <motion.div
            animate={isGenerating ? { rotate: 360, scale: [1, 1.2, 1] } : { rotate: 0 }}
            transition={{ 
              duration: 1.5, 
              repeat: isGenerating ? Infinity : 0,
              ease: "linear"
            }}
            className="bg-[#003300] p-2 rounded-full shadow-inner shadow-[#00FF00]/30"
          >
            <FaRandom className="text-lg sm:text-xl md:text-2xl text-[#00FF00]" />
          </motion.div>
          
          <motion.span
            variants={textVariants}
            initial="idle"
            animate={isGenerating ? "generating" : isPressed ? "pressed" : "idle"}
            className="tracking-wider drop-shadow-[0_0_2px_rgba(0,255,0,0.7)] font-extrabold"
            style={{ textShadow: '0 0 5px rgba(0, 255, 0, 0.5)' }}
          >
            {isGenerating ? "GENERATING..." : "GENERATE RANDOM FX"}
          </motion.span>
        </div>
      </motion.button>
    </div>
  );
}
