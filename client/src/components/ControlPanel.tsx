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
    setTimeout(() => setIsPressed(false), 200);
    onGenerateClick();
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        disabled={isGenerating}
        className={`cyber-button bg-[#1A1A1A] hover:bg-[#333333] text-[#00FF00] border border-[#00FF00]/50 rounded py-3 px-6 font-bold transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] focus:outline-none focus:ring-2 focus:ring-[#00FF00]/50 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed ${
          isPressed ? "bg-[#00FF00] text-[#000000]" : ""
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <FaRandom className={isGenerating ? "animate-spin" : ""} />
          <span>{isGenerating ? "GENERATING..." : "GENERATE RANDOM FX"}</span>
        </div>
      </motion.button>
    </div>
  );
}
