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
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 300);
    onGenerateClick();
  };

  // Animation variants for the button
  const buttonVariants = {
    idle: {
      boxShadow: "0 0 10px rgba(255,0,0,0.5)",
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 0 20px rgba(255,0,0,0.8), 0 0 30px rgba(255,0,0,0.4)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    },
    pressed: {
      scale: 0.98,
      boxShadow: "0 0 5px rgba(255,0,0,0.5)",
      transition: {
        duration: 0.1
      }
    },
    generating: {
      scale: [1, 1.03, 1],
      boxShadow: [
        "0 0 15px rgba(255,0,0,0.5)", 
        "0 0 30px rgba(255,0,0,0.8), 0 0 40px rgba(255,0,0,0.4)", 
        "0 0 15px rgba(255,0,0,0.5)"
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  // Animation variants for the text
  const textVariants = {
    idle: {
      color: "#FF0000",
      textShadow: "0 0 5px rgba(255,0,0,0.8)"
    },
    hover: {
      color: "#FF0000",
      textShadow: "0 0 10px rgba(255,0,0,0.8), 0 0 15px rgba(255,0,0,0.5)",
      transition: {
        duration: 0.3
      }
    },
    generating: {
      color: "#FF0000",
      textShadow: [
        "0 0 5px rgba(255,0,0,0.8)", 
        "0 0 15px rgba(255,0,0,0.8), 0 0 20px rgba(255,0,0,0.5)", 
        "0 0 5px rgba(255,0,0,0.8)"
      ],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  const iconVariants = {
    idle: { rotate: 0 },
    hover: { rotate: [0, 15, -15, 0], transition: { duration: 0.5, repeat: Infinity } },
    generating: { 
      rotate: 360,
      transition: { 
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <motion.button
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="pressed"
        animate={isGenerating ? "generating" : "idle"}
        onClick={handleClick}
        disabled={isGenerating}
        className="cyber-button relative bg-[#1A1A1A] text-[#FF0000] border-2 border-[#FF0000]/70 rounded-lg py-5 px-10 font-bold text-2xl w-full max-w-lg disabled:cursor-not-allowed overflow-hidden"
      >
        {/* Background animation for generating state */}
        {isGenerating && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF0000]/10 to-transparent"
            animate={{
              x: ["100%", "-100%"]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}

        <div className="flex items-center justify-center space-x-4 relative z-10">
          <motion.div
            variants={iconVariants}
            animate={isGenerating ? "generating" : isPressed ? "generating" : "idle"}
            className="text-2xl"
          >
            <FaRandom />
          </motion.div>
          
          <motion.span
            variants={textVariants}
            initial="idle"
            animate={isGenerating ? "generating" : "idle"}
          >
            {isGenerating ? "GENERATING..." : "GENERATE RANDOM FX"}
          </motion.span>
        </div>
      </motion.button>
    </div>
  );
}
