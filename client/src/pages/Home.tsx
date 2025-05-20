import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EffectCard } from "@/components/EffectCard";
import { ControlPanel } from "@/components/ControlPanel";
import { InfoPanel } from "@/components/InfoPanel";
import { FxTypeSelector } from "@/components/FxTypeSelector";
import { getEffects } from "@/data/effects";
import { FaRandom } from "react-icons/fa";

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

  const generateRandomEffects = () => {
    setIsGenerating(true);
    setStatus("PROCESSING");
    
    // Get effects based on current FX type
    const effectsList = getEffects(fxType);
    
    // Simulate processing delay
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
        }, 2000);
      }, 500);
    }, 800);
  };

  // Reset effects when FX type changes
  useEffect(() => {
    setSlots(slots.map(slot => ({...slot, effect: null})));
    setStatus("READY");
  }, [fxType]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[#00FF00]/30 py-4 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaRandom className="text-[#00FF00] text-2xl animate-pulse" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00FF00] animate-glow">
              Random FX for Looper
            </h1>
          </div>
          <div className="hidden md:flex items-center text-[#33FF33] text-base">
            <span className="mr-2 opacity-70">RC505mk2</span>
            <div className="h-5 w-5 rounded-full bg-[#00CC00] animate-pulse"></div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Digital-style display */}
          <div className="rounded-md bg-black border-2 border-[#1A1A1A] mb-8 overflow-hidden relative">
            <div className="scanline"></div>
            <div className="p-4 md:p-8">
              <div className="flex flex-col md:flex-row md:justify-between mb-6 items-start md:items-center">
                <h2 className="text-xl md:text-2xl text-[#00FF00] mb-2 md:mb-0 font-bold">
                  <span className="opacity-70">// </span>Effect Combination Generator
                </h2>
                <div className="flex items-center text-base space-x-6">
                  <div className="flex items-center">
                    <span className={`h-3 w-3 rounded-full bg-[#00CC00] ${isGenerating ? "animate-pulse" : ""} mr-2`}></span>
                    <span className="opacity-70">{status}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 opacity-70">SYSTEM:</span>
                    <span className="text-[#00FF00]">ONLINE</span>
                  </div>
                </div>
              </div>
              
              {/* FX Type Selector */}
              <FxTypeSelector 
                fxType={fxType} 
                onFxTypeChange={setFxType} 
              />
              
              {/* Effects Grid - Updated for circular layout */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
                {slots.map((slot) => (
                  <EffectCard
                    key={slot.id}
                    slot={slot.letter}
                    slotNumber={slot.number}
                    effectName={slot.effect?.name || "SELECT EFFECT"}
                    effectDescription={slot.effect?.description || "Generate a combination to see effect"}
                    isLoading={isGenerating}
                  />
                ))}
              </div>
              
              <ControlPanel 
                onGenerateClick={generateRandomEffects}
                isGenerating={isGenerating}
              />
            </div>
          </div>
          
          <InfoPanel />
        </div>
      </main>
      
      <footer className="border-t border-[#00FF00]/30 py-4 px-4 md:px-6 text-sm text-[#33FF33]/70">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <p>Random FX for Looper v1.0</p>
          </div>
          <div className="mt-2 md:mt-0">
            <p>RC505mk2 Effect Randomizer Tool</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
