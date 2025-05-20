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
      
      // Audio feedback (subtle click)
      try {
        const clickSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUHh4eHh4qKioqKioqPj4+Pj5ISEhISEhIXFxcXFxoaGhoaGhoeHh4eHiIiIiIiIiIlpaWlpaWqqqqqqqqqqq+vr6+vr7KysrKysrK3t7e3t7e6urq6urq6v7+/v7+/v4AAAAATGF2ZgAAAAAAAAAAAAAAAAAAJAAAAAAAAAAAHjOZTf9/AAAAAAAAAAAAAAAAAAAA//tAxAAABTgDAUAAAAKTODc5JAEAAADvoO1Fzg+DAKvf4Tz+nAGBQCAdBwH+cLnCwPg+8PwfB8HgfB8HwfB8HwfB8HwfCAI/5wcEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQAAAABlEZ0KATgsK4IK5KOh4QQYfB8HwfB8HwfB8HwfCAIAj/nA4EAQBAEAQBAEAQBAEA//sQxBIAE7ADtDQEACN8AGujAAAAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQAAAAAJNGdF0ATgsKoELZKOR4QQcPg+D4Pg+D4Pg+D4PggCAI/5wOBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQAAAAA');
        clickSound.volume = 0.2; // Subtle volume
        clickSound.play();
      } catch (e) {
        // Fail silently if audio can't play
      }
      
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
        className="generate-button"
        onClick={handleClick}
        disabled={isGenerating}
        className={`relative bg-[#1A1A1A] hover:bg-[#222222] border-2 border-[#00FF00]/70 rounded-lg py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-10 font-bold text-lg sm:text-xl md:text-2xl transition-all duration-300 focus:outline-none w-full max-w-xs sm:max-w-sm md:max-w-md disabled:cursor-not-allowed overflow-hidden
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
