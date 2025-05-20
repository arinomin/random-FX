// INPUT FX effects
export const inputEffects = [
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

// Additional TRACK FX effects
export const trackFxOnly = [
  { id: 52, name: "BEAT SCATTER", description: "Rearranges beat segments" },
  { id: 53, name: "BEAT REPEAT", description: "Repeats sections of audio" },
  { id: 54, name: "BEAT SHIFT", description: "Shifts beat timing" },
  { id: 55, name: "VINYL FLICK", description: "Vinyl record scratch effect" }
];

// Combined effects list for TRACK FX selection
export const getEffects = (fxType: "INPUT" | "TRACK") => {
  return fxType === "INPUT" ? inputEffects : [...inputEffects, ...trackFxOnly];
};
