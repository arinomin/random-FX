// ===== Effects Data =====
const inputEffects = [
  { id: 1, name: "LPF" },
  { id: 2, name: "BPF" },
  { id: 3, name: "HPF" },
  { id: 4, name: "PHASER" },
  { id: 5, name: "FLANGER" },
  { id: 6, name: "SYNTH" },
  { id: 7, name: "LO-FI" },
  { id: 8, name: "RADIO" },
  { id: 9, name: "RINGMOD" },
  { id: 10, name: "G2B" },
  { id: 11, name: "SUSTAINER" },
  { id: 12, name: "AUTO RIFF" },
  { id: 13, name: "SLOW GEAR" },
  { id: 14, name: "TRANSPOSE" },
  { id: 15, name: "PITCH BEND" },
  { id: 16, name: "ROBOT" },
  { id: 17, name: "ELECTRIC" },
  { id: 18, name: "HRM MANUAL" },
  { id: 19, name: "HRM AUTO(M)" },
  { id: 20, name: "VOCODER" },
  { id: 21, name: "OSC VOC(M)" },
  { id: 22, name: "OSC BOT" },
  { id: 23, name: "PREAMP" },
  { id: 24, name: "DIST" },
  { id: 25, name: "DYNAMICS" },
  { id: 26, name: "EQ" },
  { id: 27, name: "ISOLATOR" },
  { id: 28, name: "OCTAVE" },
  { id: 29, name: "AUTO PAN" },
  { id: 30, name: "MANUAL PAN" },
  { id: 31, name: "STEREO ENHANCE" },
  { id: 32, name: "TREMOLO" },
  { id: 33, name: "VIBRATO" },
  { id: 34, name: "PATTERN SLICER" },
  { id: 35, name: "STEP SLICER" },
  { id: 36, name: "DELAY" },
  { id: 37, name: "PANNING DELAY" },
  { id: 38, name: "REVERSE DELAY" },
  { id: 39, name: "MOD DELAY" },
  { id: 40, name: "TYPE ECHO 1" },
  { id: 41, name: "TYPE ECHO 2" },
  { id: 42, name: "GNR DELAY" },
  { id: 43, name: "WARP" },
  { id: 44, name: "TWIST" },
  { id: 45, name: "ROLL 1" },
  { id: 46, name: "ROLL 2" },
  { id: 47, name: "FREEZE" },
  { id: 48, name: "CHORUS" },
  { id: 49, name: "REVERB" },
  { id: 50, name: "GATE REVERB" },
  { id: 51, name: "REVERSE REVERB" }
];

const trackFxOnly = [
  { id: 52, name: "BEAT SCATTER" },
  { id: 53, name: "BEAT REPEAT" },
  { id: 54, name: "BEAT SHIFT" },
  { id: 55, name: "VINYL FLICK" }
];

// ===== State =====
let currentMode = "INPUT";
let isGenerating = false;
let isAnimating = false;

// ===== DOM Elements =====
const inputBtn = document.getElementById("inputBtn");
const trackBtn = document.getElementById("trackBtn");
const modeSlider = document.getElementById("modeSlider");
const generateBtn = document.getElementById("generateBtn");
const btnText = document.getElementById("btnText");

const slots = ["A", "B", "C", "D"];
const effectCards = document.querySelectorAll(".effect-card");
const effectTexts = {
  A: document.querySelector("#effectA .effect-text"),
  B: document.querySelector("#effectB .effect-text"),
  C: document.querySelector("#effectC .effect-text"),
  D: document.querySelector("#effectD .effect-text")
};

// ===== Helper Functions =====
function getEffects(mode, isFXA = false) {
  if (mode === "TRACK" && isFXA) {
    return [...inputEffects, ...trackFxOnly];
  }
  return inputEffects;
}

function getRandomEffect(mode, isFXA = false) {
  const effects = getEffects(mode, isFXA);
  return effects[Math.floor(Math.random() * effects.length)];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ===== Mode Toggle =====
function handleModeChange(mode) {
  if (mode === currentMode || isAnimating || isGenerating) return;

  isAnimating = true;

  // Update button states
  inputBtn.classList.toggle("active", mode === "INPUT");
  trackBtn.classList.toggle("active", mode === "TRACK");
  modeSlider.classList.toggle("track", mode === "TRACK");

  // Animate cards out
  effectCards.forEach((card, i) => {
    setTimeout(() => card.classList.add("slide-out"), i * 50);
  });

  // Update state and animate back
  setTimeout(() => {
    currentMode = mode;

    // Reset effect displays
    slots.forEach(slot => {
      effectTexts[slot].textContent = "—";
      effectTexts[slot].classList.remove("revealed");
    });

    // Remove slide-out and add slide-in
    effectCards.forEach(card => {
      card.classList.remove("slide-out", "active");
    });

    setTimeout(() => {
      effectCards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add("slide-in");
          setTimeout(() => card.classList.remove("slide-in"), 500);
        }, i * 80);
      });

      setTimeout(() => { isAnimating = false; }, 600);
    }, 100);
  }, 400);
}

inputBtn.addEventListener("click", () => handleModeChange("INPUT"));
trackBtn.addEventListener("click", () => handleModeChange("TRACK"));

// ===== Generate Random Effects =====
async function generateRandomEffects() {
  if (isGenerating || isAnimating) return;

  isGenerating = true;
  generateBtn.classList.add("generating");
  generateBtn.disabled = true;
  btnText.textContent = "GENERATING...";

  // Pre-generate all effects
  const selectedEffects = slots.map((slot, i) => {
    const isFXA = slot === "A";
    return getRandomEffect(currentMode, currentMode === "TRACK" && isFXA);
  });

  // Set all to generating state
  effectCards.forEach(card => card.classList.add("generating"));
  slots.forEach(slot => {
    effectTexts[slot].textContent = "...";
    effectTexts[slot].classList.add("generating");
  });

  // Sequentially reveal each effect
  for (let i = 0; i < slots.length; i++) {
    await sleep(400);

    const slot = slots[i];
    const effect = selectedEffects[i];
    const card = effectCards[i];
    const text = effectTexts[slot];

    // Reveal this effect
    card.classList.remove("generating");
    card.classList.add("active");
    text.classList.remove("generating");
    text.textContent = effect.name;
    text.classList.add("revealed");

    // Remove animation class after it plays
    setTimeout(() => text.classList.remove("revealed"), 500);
  }

  // Complete
  await sleep(300);
  generateBtn.classList.remove("generating");
  generateBtn.disabled = false;
  btnText.textContent = "RANDOMIZE";
  isGenerating = false;
}

generateBtn.addEventListener("click", generateRandomEffects);

// ===== Initial State =====
document.addEventListener("DOMContentLoaded", () => {
  // Staggered entrance animation for cards
  effectCards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100 + i * 100);
  });
});
