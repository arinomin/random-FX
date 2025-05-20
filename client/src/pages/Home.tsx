import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EffectCard } from "@/components/EffectCard";
import { ControlPanel } from "@/components/ControlPanel";
import { InfoPanel } from "@/components/InfoPanel";
import { FxTypeSelector } from "@/components/FxTypeSelector";
import { getEffects } from "@/data/effects";

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
  const [isFXA, setIsFXA] = useState(false);
  const [slots, setSlots] = useState<EffectSlot[]>([
    { id: "A", letter: "A", number: "01", effect: null },
    { id: "B", letter: "B", number: "02", effect: null },
    { id: "C", letter: "C", number: "03", effect: null },
    { id: "D", letter: "D", number: "04", effect: null },
  ]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("READY");
  const [typeSwitching, setTypeSwitching] = useState(false);

  const generateRandomEffects = () => {
    setIsGenerating(true);
    setStatus("PROCESSING");
    
    // Get effects based on current FX type
    const effectsList = getEffects(fxType, fxType === "TRACK" && isFXA);
    
    // Create array of random effects
    const selectedEffects = slots.map(() => {
      const randomIndex = Math.floor(Math.random() * effectsList.length);
      return effectsList[randomIndex];
    });
    
    // Simulate processing delay before starting the sequential animation
    setTimeout(() => {
      // Reset all slots first
      setSlots(slots.map(slot => ({...slot, effect: null})));
      
      // Sequentially confirm each slot from left to right
      slots.forEach((slot, index) => {
        setTimeout(() => {
          setSlots(currentSlots => {
            return currentSlots.map((s, i) => {
              // Only update the current slot in the sequence
              if (i === index) {
                return {
                  ...s,
                  effect: selectedEffects[index]
                };
              }
              return s;
            });
          });
          
          // When last slot is confirmed, complete the process
          if (index === slots.length - 1) {
            setTimeout(() => {
              setStatus("COMPLETE");
              setIsGenerating(false);
              
              // After brief delay, return to ready state
              setTimeout(() => {
                setStatus("READY");
              }, 2000);
            }, 500);
          }
        }, index * 600); // 600ms delay between each slot confirmation
      });
    }, 1000);
  };

  // Handle FX type change with animation
  const handleFxTypeChange = (type: "INPUT" | "TRACK") => {
    setTypeSwitching(true);
    
    // Set isFXA based on fxType
    setIsFXA(type === "TRACK"); 
    
    // Delay the actual type change to allow for animation
    setTimeout(() => {
      setFxType(type);
      setSlots(slots.map(slot => ({...slot, effect: null})));
      setStatus("READY");
      
      // End transition animation
      setTimeout(() => {
        setTypeSwitching(false);
      }, 800);
    }, 600);
  };

  // Card slide animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      x: -1000,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  const cardVariants = {
    hidden: { x: 1000, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    exit: {
      x: -1000,
      opacity: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[#00FF00]/30 py-3 px-3 sm:py-4 sm:px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#00FF00] text-center sm:text-left">
              Random FX for Loopers
            </h1>
          </div>
          <div className="flex items-center text-[#33FF33] text-sm sm:text-base mt-2 sm:mt-0">
            <span className="mr-2 opacity-70">RC505mk2</span>
            <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-[#00CC00] animate-pulse"></div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Digital-style display */}
          <div className="rounded-md bg-black border-2 border-[#1A1A1A] mb-4 sm:mb-6 md:mb-8 overflow-hidden relative">
            <div className="scanline"></div>
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
              <div className="flex flex-col md:flex-row md:justify-between mb-4 md:mb-6 items-start md:items-center">
                <h2 className="text-lg sm:text-xl md:text-2xl text-[#00FF00] mb-2 md:mb-0 font-bold">
                  <span className="opacity-70">// </span>Effect Generator
                </h2>
                <div className="flex flex-wrap items-center text-xs sm:text-sm md:text-base space-x-4 sm:space-x-6">
                  <div className="flex items-center">
                    <span className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-[#00CC00] ${isGenerating ? "animate-pulse" : ""} mr-1 sm:mr-2`}></span>
                    <span className="opacity-70">{status}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1 sm:mr-2 opacity-70">SYSTEM:</span>
                    <span className="text-[#00FF00]">ONLINE</span>
                  </div>
                </div>
              </div>
              
              {/* FX Type Selector */}
              <FxTypeSelector 
                fxType={fxType} 
                onFxTypeChange={handleFxTypeChange} 
              />
              
              {/* Effects Grid with animation */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={fxType}
                  className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8 max-w-[90%] sm:max-w-[95%] mx-auto"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {slots.map((slot, index) => (
                    <motion.div
                      key={`${fxType}-${slot.id}`}
                      variants={cardVariants}
                      custom={index}
                    >
                      <EffectCard
                        slot={slot.letter}
                        slotNumber={slot.number}
                        effectName={slot.effect?.name || "SELECT EFFECT"}
                        effectDescription={slot.effect?.description || ""}
                        isLoading={isGenerating || typeSwitching}
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
      
      <footer className="border-t border-[#00FF00]/30 py-3 sm:py-4 px-3 sm:px-4 md:px-6 text-xs sm:text-sm text-[#33FF33]/70">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <p>Random FX for Loopers v1.0</p>
          </div>
          <div className="mt-2 md:mt-0 flex flex-col sm:flex-row items-center sm:space-x-2">
            <p>RC505mk2 Effect Randomizer Tool</p>
            <span className="hidden sm:inline px-2">|</span>
            <p>Developed by <a href="https://twitter.com/arinomi" target="_blank" rel="noopener noreferrer" className="text-[#00FF00] hover:underline">@arinomi</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
