import { FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export function InfoPanel() {
  return (
    <div className="rounded-md bg-[#1A1A1A]/50 border-2 border-[#FF0000]/30 p-4 md:p-6 mb-6 shadow-[0_0_15px_rgba(255,0,0,0.15)]">
      <div className="border-b border-[#FF0000]/30 pb-3 mb-4">
        <h3 className="text-[#FF0000] font-bold flex items-center text-xl">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
          >
            <FaInfoCircle className="mr-3 text-2xl" />
          </motion.div>
          <span>ABOUT THIS TOOL</span>
        </h3>
      </div>
      <div className="text-lg space-y-4">
        <p>
          <span className="text-[#FF0000] opacity-70">// </span>
          This tool generates random effect combinations for the RC505mk2 loop station.
        </p>
        <p>
          <span className="text-[#FF0000] opacity-70">// </span>
          It randomly assigns effects to FX A through FX D channels, allowing for simultaneous layering.
        </p>
        <p>
          <span className="text-[#FF0000] opacity-70">// </span>
          Select between INPUT FX or TRACK FX to determine which effect types are included in randomization.
        </p>
        <p>
          <span className="text-[#FF0000] opacity-70">// </span>
          Click GENERATE to create new combinations and experiment with your loop station.
        </p>
      </div>
    </div>
  );
}
