import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import shuffleIcon from "@/components/ui/Randomizer.png";

interface ControlPanelProps {
  onGenerateClick: () => void;
  isGenerating: boolean;
}

export function ControlPanel({ onGenerateClick, isGenerating }: ControlPanelProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!isGenerating) {
      setIsPressed(true);

      // Create ripple effect
      const button = document.querySelector('.generate-button');
      if (button) {
        const ripple = document.createElement('span');
        ripple.className = 'absolute rounded-full bg-white/30 animate-ripple';

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;

        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      }

      // Audio functionality removed

      setTimeout(() => setIsPressed(false), 400);
      onGenerateClick();
    }
  };

  const buttonVariants = {
    idle: { 
      scale: 1, 
      y: 0,
      boxShadow: "0 0 10px rgba(0, 255, 0, 0.3), inset 0 0 10px rgba(0, 255, 0, 0.1)"
    },
    pressed: { 
      scale: 0.95, 
      y: 6,
      boxShadow: "0 0 5px rgba(0, 255, 0, 0.2), inset 0 0 15px rgba(0, 255, 0, 0.3)"
    },
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
    idle: { 
      color: "#00FF00", 
      textShadow: "0 0 5px rgba(0, 255, 0, 0.3)" 
    },
    pressed: { 
      color: "#000000", 
      textShadow: "0 0 3px rgba(0, 0, 0, 0.5)",
      scale: 0.95,
      transition: { 
        duration: 0.1, 
        type: "spring", 
        stiffness: 500 
      }
    },
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
        className={`generate-button relative bg-[#1A1A1A] hover:bg-[#222222] border-2 border-[#00FF00]/70 rounded-lg py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-10 font-bold text-lg sm:text-xl md:text-2xl transition-all duration-300 focus:outline-none w-full max-w-xs sm:max-w-sm md:max-w-md disabled:cursor-not-allowed overflow-hidden
          ${isPressed ? "bg-[#00FF00]/90 translate-y-3 shadow-inner" : "shadow-[0_0_10px_rgba(0,255,0,0.3),inset_0_0_10px_rgba(0,255,0,0.1)]"}
          before:content-[''] before:absolute before:inset-0 before:border-4 before:border-[#00FF00]/10 before:rounded-md before:scale-105 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300
          after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[6px] after:bg-gradient-to-r after:from-[#00FF00]/80 after:via-[#00FF00]/20 after:to-[#00FF00]/80
        `}
        style={{
          boxShadow: isGenerating 
            ? '0 0 15px rgba(0, 255, 0, 0.5), inset 0 0 10px rgba(0, 255, 0, 0.3)' 
            : isPressed 
              ? '0 0 5px rgba(0, 255, 0, 0.2), inset 0 0 15px rgba(0, 255, 0, 0.4)' 
              : '',
          transform: isPressed ? 'translateY(3px) scale(0.97)' : '',
          transition: 'all 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)'
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
            className="bg-[#000000] p-0 rounded-full shadow-inner shadow-[#00FF00]/30 w-10 h-10 flex items-center justify-center overflow-hidden"
          >
            <img src={shuffleIcon} alt="Shuffle" className="w-full h-full object-contain" />
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