import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EffectCard } from "@/components/EffectCard";
import { ControlPanel } from "@/components/ControlPanel";
import { InfoPanel } from "@/components/InfoPanel";
import { FxTypeSelector } from "@/components/FxTypeSelector";
import { getEffects } from "@/data/effects";
import { FaRandom, FaTwitter } from "react-icons/fa";

interface EffectSlot {
  id: string;
  letter: string;
  number: string;
  effect: {
    id: number;
    name: string;
    description: string;
  } | null;
}

export default function Home() {
  const [fxType, setFxType] = useState<"INPUT" | "TRACK">("INPUT");
  const [slots, setSlots] = useState<EffectSlot[]>([
    { id: "A", letter: "A", number: "01", effect: null },
    { id: "B", letter: "B", number: "02", effect: null },
    { id: "C", letter: "C", number: "03", effect: null },
    { id: "D", letter: "D", number: "04", effect: null },
  ]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("READY");
  const [isChangingFxType, setIsChangingFxType] = useState(false);
  const [direction, setDirection] = useState<"right" | "left">("right");

  const generateRandomEffects = () => {
    setIsGenerating(true);
    setStatus("PROCESSING");
    
    // Get effects based on current FX type
    const effectsList = getEffects(fxType);
    
    // Simulate processing delay with more dramatic animations
    setTimeout(() => {
      const newSlots = slots.map(slot => {
        const randomIndex = Math.floor(Math.random() * effectsList.length);
        return {
          ...slot,
          effect: effectsList[randomIndex]
        };
      });
      
      setSlots(newSlots);
      
      setTimeout(() => {
        setStatus("COMPLETE");
        setIsGenerating(false);
        
        // After brief delay, return to ready state
        setTimeout(() => {
          setStatus("READY");
        }, 1500);
      }, 300);
    }, 600);
  };

  // Handle FX type change with animation
  const handleFxTypeChange = (type: "INPUT" | "TRACK") => {
    if (type === fxType) return;
    
    setDirection(type === "INPUT" ? "left" : "right");
    setIsChangingFxType(true);
    
    setTimeout(() => {
      setFxType(type);
      setSlots(slots.map(slot => ({...slot, effect: null})));
      setStatus("READY");
      
      setTimeout(() => {
        setIsChangingFxType(false);
      }, 100);
    }, 300);
  };

  // Animation variants for page transitions
  const containerVariants = {
    hidden: (direction: "left" | "right") => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 20,
        mass: 1,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 20,
        mass: 1
      }
    })
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100 } 
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[#00FF00]/30 py-5 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00FF00]">
              ランダムFXジェネレーター
            </h1>
          </div>
          <div className="hidden md:flex items-center text-[#33FF33] text-lg">
            <span className="mr-2 opacity-80">RC505mk2</span>
            <div className="h-6 w-6 rounded-full bg-[#00CC00] animate-pulse"></div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Digital-style display */}
          <div className="rounded-md bg-black border-2 border-[#00FF00]/40 mb-8 overflow-hidden relative shadow-[0_0_20px_rgba(0,255,0,0.2)]">
            <div className="scanline"></div>
            <div className="p-4 md:p-8">
              <div className="flex flex-col md:flex-row md:justify-between mb-8 items-start md:items-center">
                <h2 className="text-2xl md:text-3xl text-[#00FF00] mb-2 md:mb-0 font-bold">
                  <span className="opacity-70">// </span>エフェクト組み合わせジェネレーター
                </h2>
                <div className="flex items-center text-lg space-x-6">
                  <div className="flex items-center">
                    <span className={`h-4 w-4 rounded-full bg-[#00CC00] ${isGenerating ? "animate-pulse" : ""} mr-2`}></span>
                    <span className="opacity-70">{status === "READY" ? "準備完了" : status === "PROCESSING" ? "処理中" : status === "COMPLETE" ? "完了" : status}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 opacity-70">システム:</span>
                    <span className="text-[#00FF00]">オンライン</span>
                  </div>
                </div>
              </div>
              
              {/* FX Type Selector */}
              <FxTypeSelector 
                fxType={fxType} 
                onFxTypeChange={handleFxTypeChange} 
              />
              
              {/* Effects Grid with Animation */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={fxType}
                  className="grid grid-cols-2 xl:grid-cols-4 gap-8 mb-10 mt-10"
                  custom={direction}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {slots.map((slot, index) => (
                    <motion.div
                      key={slot.id}
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <EffectCard
                        slot={slot.letter}
                        slotNumber={slot.number}
                        effectName={slot.effect?.name || "SELECT EFFECT"}
                        effectDescription={""}
                        isLoading={isGenerating || isChangingFxType}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
              
              <ControlPanel 
                onGenerateClick={generateRandomEffects}
                isGenerating={isGenerating}
              />
            </div>
          </div>
          
          <InfoPanel />
        </div>
      </main>
      
      <footer className="border-t border-[#FF0000]/30 py-5 px-4 md:px-6 text-base text-[#33FF33]/70">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <p>Random FX for Looper v1.0</p>
          </div>
          <div className="mt-2 md:mt-0 flex items-center">
            <p className="mr-2">Developed by arinomi</p>
            <a 
              href="https://twitter.com/arinomi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#00FF00] hover:text-[#FF0000] transition-colors duration-300"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
