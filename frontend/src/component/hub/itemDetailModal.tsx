import { motion } from "framer-motion";
import type { DetailModalProps } from "../../type/HubType";

import { X } from "lucide-react";


const DetailModal = ({ onClose, item }: DetailModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 "
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        className="bg-background dark:bg-zinc-900 rounded-2xl p-8 w-[90%] max-w-md shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors absolute right-6.5 top-6 ">
            <X size={22} strokeWidth={2} />
        </button>
        <h2 className="text-blue-950 dark:text-white text-2xl font-bold mb-3 mt-1">
          {item.name}
        </h2>

        <p className="text-slate-700 dark:text-neutral-400 text-sm mb-6 px-1">
          {item.description}
        </p>

        {item.issuer && (
          <p className="text-slate-600/80 text-xs mb-6 mt-8">발급기관: {item.issuer}</p>
        )}

        {item.subItems && item.subItems.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 mt-8 ">
            {item.subItems.map((sub) => (
              <span
                key={sub}
                className="px-1.5 py-1.5 rounded-md bg-indigo-100  dark:bg-indigo-900/40 text-blue-950 dark:text-indigo-200 text-xs font-medium"
              >
                # {sub}
              </span>
            ))}
          </div>
        )}
        
        
        
      </motion.div>
    </div>
  );
};

export default DetailModal;