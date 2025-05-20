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
    <div className="flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 border-t border-[#33FF33]/30 mt-3 md:mt-4">
      <div className="text-[#33FF33]/70 text-xs md:text-base mb-3 md:mb-0">
        <p>Click GENERATE to get a random combination of effects</p>
      </div>
      <button
        onClick={onGenerateClick}
        disabled={isGenerating}
        className={`flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-md font-bold text-sm md:text-base transition-all duration-300 ${
          isGenerating
            ? "bg-[#001800] text-[#008800] cursor-not-allowed"
            : "bg-[#00FF00]/20 text-[#00FF00] hover:bg-[#00FF00]/30 border border-[#00FF00]/50"
        }`}
      >
        <FaRandom className={`${isGenerating ? "animate-spin" : ""} text-sm md:text-base`} />
        <span>{isGenerating ? "GENERATING..." : "GENERATE"}</span>
      </button>
    </div>
  );
}