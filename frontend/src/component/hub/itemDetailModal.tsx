import { motion } from "framer-motion";
import type { DetailModalProps } from "../../type/infoType";

const DetailModal = ({ onClose, item }: DetailModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        className="bg-background dark:bg-zinc-900 rounded-2xl p-8 w-[90%] max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-blue-950 dark:text-white text-2xl font-bold mb-3">
          {item.name}
        </h2>
        <p className="text-slate-600 dark:text-neutral-400 text-sm mb-6">
          {item.description}
        </p>
        {item.issuer && (
          <p className="text-slate-400 text-xs mb-6">발급기관: {item.issuer}</p>
        )}
        <div className="flex justify-end">
            <button
            onClick={onClose}
            className="mt-2 px-5 py-2 bg-sky-700 text-white rounded-full text-sm "
            >
            닫기
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailModal;