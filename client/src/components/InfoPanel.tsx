import { FaInfoCircle } from "react-icons/fa";

export function InfoPanel() {
  return (
    <div className="rounded-md bg-[#1A1A1A]/50 border-2 border-[#33FF33]/30 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
      <div className="border-b border-[#33FF33]/30 pb-2 sm:pb-3 mb-3 sm:mb-4">
        <h3 className="text-[#00FF00] font-bold flex items-center text-base sm:text-lg">
          <FaInfoCircle className="mr-2 text-lg sm:text-xl" />
          <span>ABOUT THIS TOOL</span>
        </h3>
      </div>
      <div className="text-sm sm:text-base space-y-2 sm:space-y-3">
        <p>
          <span className="text-[#00FF00] opacity-70">// </span>
          This tool generates random effect combinations for the RC505mk2 loop station.
        </p>
        <p>
          <span className="text-[#00FF00] opacity-70">// </span>
          It randomly assigns effects to FX A through FX D channels, allowing for simultaneous layering.
        </p>
        <p>
          <span className="text-[#00FF00] opacity-70">// </span>
          Select between INPUT FX or TRACK FX to determine which effect types are included in randomization.
        </p>
        <p>
          <span className="text-[#00FF00] opacity-70">// </span>
          Click GENERATE to create new combinations and experiment with your loop station.
        </p>
      </div>
    </div>
  );
}
