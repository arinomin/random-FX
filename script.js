// ===== Effects Data =====
const inputEffects = [
  { id: 1, name: "LPF", description: "Low Pass Filter" },
  { id: 2, name: "BPF", description: "Band Pass Filter" },
  { id: 3, name: "HPF", description: "High Pass Filter" },
  { id: 4, name: "PHASER", description: "Creates a swooshing, phasing effect" },
  { id: 5, name: "FLANGER", description: "Creates a swirling, jet-like effect" },
  { id: 6, name: "SYNTH", description: "Synthesizer effect" },
  { id: 7, name: "LO-FI", description: "Reduces audio quality for effect" },
  { id: 8, name: "RADIO", description: "Radio transmission simulation" },
  { id: 9, name: "RINGMOD", description: "Ring modulation effect" },
  { id: 10, name: "G2B", description: "Guitar to Bass effect" },
  { id: 11, name: "SUSTAINER", description: "Sustains the sound" },
  { id: 12, name: "AUTO RIFF", description: "Automatic riff generation" },
  { id: 13, name: "SLOW GEAR", description: "Gradually swells in volume" },
  { id: 14, name: "TRANSPOSE", description: "Changes the pitch" },
  { id: 15, name: "PITCH BEND", description: "Bends the pitch up or down" },
  { id: 16, name: "ROBOT", description: "Creates robotic vocal effects" },
  { id: 17, name: "ELECTRIC", description: "Electric instrument simulation" },
  { id: 18, name: "HRM MANUAL", description: "Manual harmonizer" },
  { id: 19, name: "HRM AUTO(M)", description: "Automatic harmonizer" },
  { id: 20, name: "VOCODER", description: "Speech synthesis effect" },
  { id: 21, name: "OSC VOC(M)", description: "Oscillator vocoder" },
  { id: 22, name: "OSC BOT", description: "Oscillator robot" },
  { id: 23, name: "PREAMP", description: "Preamplifier simulation" },
  { id: 24, name: "DIST", description: "Distortion effect" },
  { id: 25, name: "DYNAMICS", description: "Dynamic range processor" },
  { id: 26, name: "EQ", description: "Equalizer" },
  { id: 27, name: "ISOLATOR", description: "Isolates specific frequency bands" },
  { id: 28, name: "OCTAVE", description: "Adds notes one octave up/down" },
  { id: 29, name: "AUTO PAN", description: "Automatic panning effect" },
  { id: 30, name: "MANUAL PAN", description: "Manual panning control" },
  { id: 31, name: "STEREO ENHANCE", description: "Enhances stereo width" },
  { id: 32, name: "TREMOLO", description: "Cyclical volume modulation" },
  { id: 33, name: "VIBRATO", description: "Pitch modulation effect" },
  { id: 34, name: "PATTERN SLICER", description: "Pattern-based audio slicer" },
  { id: 35, name: "STEP SLICER", description: "Step-sequenced audio slicer" },
  { id: 36, name: "DELAY", description: "Creates echoes of the input signal" },
  { id: 37, name: "PANNING DELAY", description: "Delay with panning effect" },
  { id: 38, name: "REVERSE DELAY", description: "Backwards delay effect" },
  { id: 39, name: "MOD DELAY", description: "Modulated delay effect" },
  { id: 40, name: "TYPE ECHO 1", description: "Tape echo simulation type 1" },
  { id: 41, name: "TYPE ECHO 2", description: "Tape echo simulation type 2" },
  { id: 42, name: "GNR DELAY", description: "Granular delay effect" },
  { id: 43, name: "WARP", description: "Warping time effect" },
  { id: 44, name: "TWIST", description: "Twisting audio effect" },
  { id: 45, name: "ROLL 1", description: "Audio roll effect type 1" },
  { id: 46, name: "ROLL 2", description: "Audio roll effect type 2" },
  { id: 47, name: "FREEZE", description: "Freezes the audio" },
  { id: 48, name: "CHORUS", description: "Creates a rich, shimmering sound" },
  { id: 49, name: "REVERB", description: "Adds space and ambience" },
  { id: 50, name: "GATE REVERB", description: "Gated reverb effect" },
  { id: 51, name: "REVERSE REVERB", description: "Backwards reverb effect" }
];

const trackFxOnly = [
  { id: 52, name: "BEAT SCATTER", description: "Rearranges beat segments" },
  { id: 53, name: "BEAT REPEAT", description: "Repeats sections of audio" },
  { id: 54, name: "BEAT SHIFT", description: "Shifts beat timing" },
  { id: 55, name: "VINYL FLICK", description: "Vinyl record scratch effect" }
];

// ===== State =====
let fxType = "INPUT";
let isGenerating = false;
let isAnimating = false;

// ===== DOM Elements =====
const inputBtn = document.getElementById("inputBtn");
const trackBtn = document.getElementById("trackBtn");
const selectorBg = document.getElementById("selectorBg");
const selectorDesc = document.getElementById("selectorDesc");
const generateBtn = document.getElementById("generateBtn");
const btnLabel = document.getElementById("btnLabel");
const statusLed = document.getElementById("statusLed");
const statusText = document.getElementById("statusText");
const effectElements = {
  A: document.getElementById("effectA"),
  B: document.getElementById("effectB"),
  C: document.getElementById("effectC"),
  D: document.getElementById("effectD")
};
const effectCards = document.querySelectorAll(".effect-card");

// ===== Helper Functions =====
function getEffects(type, isFXA = false) {
  if (type === "TRACK" && isFXA) {
    return [...inputEffects, ...trackFxOnly];
  }
  return inputEffects;
}

function getRandomEffect(type, isFXA = false) {
  const effects = getEffects(type, isFXA);
  const randomIndex = Math.floor(Math.random() * effects.length);
  return effects[randomIndex];
}

function setStatus(status) {
  statusText.textContent = status;
  if (status === "PROCESSING") {
    statusLed.classList.add("generating");
  } else {
    statusLed.classList.remove("generating");
  }
}

function createRipple(event, button) {
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = "50%";
  ripple.style.top = "50%";
  
  button.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
}

// ===== FX Type Selector =====
function handleFxTypeChange(type) {
  if (type === fxType || isAnimating || isGenerating) return;
  
  isAnimating = true;
  
  // Update button states
  inputBtn.classList.toggle("active", type === "INPUT");
  trackBtn.classList.toggle("active", type === "TRACK");
  inputBtn.disabled = true;
  trackBtn.disabled = true;
  
  // Animate selector background
  selectorBg.classList.toggle("track", type === "TRACK");
  
  // Animate cards out
  effectCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("slide-out");
    }, index * 50);
  });
  
  // After cards slide out, update state and slide in
  setTimeout(() => {
    fxType = type;
    
    // Update description
    selectorDesc.textContent = type === "INPUT" 
      ? "Standard effects for input processing"
      : "Includes beat-based effects for track manipulation";
    
    // Reset effect names
    Object.values(effectElements).forEach(el => {
      el.textContent = "SELECT EFFECT";
      el.classList.remove("scanning", "confirmed");
    });
    
    // Remove slide-out and prepare for slide-in
    effectCards.forEach(card => {
      card.classList.remove("slide-out");
    });
    
    // Slide cards in
    setTimeout(() => {
      effectCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("slide-in");
          setTimeout(() => {
            card.classList.remove("slide-in");
          }, 600);
        }, index * 100);
      });
      
      // Re-enable buttons
      setTimeout(() => {
        inputBtn.disabled = false;
        trackBtn.disabled = false;
        isAnimating = false;
      }, 800);
    }, 100);
  }, 600);
}

inputBtn.addEventListener("click", () => handleFxTypeChange("INPUT"));
trackBtn.addEventListener("click", () => handleFxTypeChange("TRACK"));

// ===== Generate Random Effects =====
function generateRandomEffects() {
  if (isGenerating || isAnimating) return;
  
  isGenerating = true;
  setStatus("PROCESSING");
  
  // Add generating class to button
  generateBtn.classList.add("generating");
  btnLabel.textContent = "GENERATING...";
  generateBtn.disabled = true;
  
  // Create ripple effect
  createRipple(null, generateBtn);
  
  // Pre-generate random effects for each slot
  const slots = ["A", "B", "C", "D"];
  const selectedEffects = slots.map((slot, index) => {
    const isFXA = slot === "A";
    return getRandomEffect(fxType, fxType === "TRACK" && isFXA);
  });
  
  // Start scanning animation
  setTimeout(() => {
    // Set all slots to scanning state
    slots.forEach(slot => {
      effectElements[slot].textContent = "SCANNING...";
      effectElements[slot].classList.add("scanning");
      effectElements[slot].classList.remove("confirmed");
    });
    
    // Sequentially confirm each slot
    slots.forEach((slot, index) => {
      setTimeout(() => {
        const el = effectElements[slot];
        el.classList.remove("scanning");
        el.textContent = selectedEffects[index].name;
        el.classList.add("confirmed");
        
        // When last slot is confirmed
        if (index === slots.length - 1) {
          setTimeout(() => {
            setStatus("COMPLETE");
            generateBtn.classList.remove("generating");
            btnLabel.textContent = "GENERATE RANDOM FX";
            generateBtn.disabled = false;
            isGenerating = false;
            
            // Return to ready state
            setTimeout(() => {
              setStatus("READY");
            }, 2000);
          }, 500);
        }
      }, index * 600);
    });
  }, 1000);
}

generateBtn.addEventListener("click", generateRandomEffects);

// ===== Initial Animation =====
document.addEventListener("DOMContentLoaded", () => {
  // Initial slide-in animation for cards
  effectCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateX(500px)";
    
    setTimeout(() => {
      card.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
      card.style.opacity = "1";
      card.style.transform = "translateX(0)";
    }, 100 + index * 100);
  });
});
