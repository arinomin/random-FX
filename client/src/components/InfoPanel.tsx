import { FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export function InfoPanel() {
  return (
    <div className="rounded-md bg-[#1A1A1A]/50 border-2 border-[#00FF00]/30 p-4 md:p-6 mb-6 shadow-[0_0_15px_rgba(0,255,0,0.15)]">
      <div className="border-b border-[#00FF00]/30 pb-3 mb-4">
        <h3 className="text-[#00FF00] font-bold flex items-center text-xl">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
          >
            <FaInfoCircle className="mr-3 text-2xl" />
          </motion.div>
          <span>このツールについて</span>
        </h3>
      </div>
      <div className="text-lg space-y-4">
        <p>
          <span className="text-[#00FF00] opacity-70">// </span>
          このツールはRC505mk2ループステーション用のランダムなエフェクトの組み合わせを生成します。
        </p>
        <p>
          <span className="text-[#00FF00] opacity-70">// </span>
          FX AからFX Dチャンネルにエフェクトをランダムに割り当て、同時に複数のエフェクトを重ねることができます。
        </p>
        <p>
          <span className="text-[#00FF00] opacity-70">// </span>
          INPUT FXまたはTRACK FXを選択して、ランダム化に含めるエフェクトタイプを決定します。
        </p>
        <p>
          <span className="text-[#00FF00] opacity-70">// </span>
          GENERATEをクリックして新しい組み合わせを作り、ループステーションで実験してみましょう。
        </p>
      </div>
    </div>
  );
}
