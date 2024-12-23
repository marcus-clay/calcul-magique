import React from 'react';
import { Brain } from 'lucide-react';
import { Exercise } from '../types';
import { getHint } from '../utils/hints';
import { motion, AnimatePresence } from 'framer-motion';

interface HintModalProps {
  exercise: Exercise;
  onClose: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({ exercise, onClose }) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20,
            bounce: 0.5
          }}
          className="macos-window rounded-2xl p-6 max-w-md w-full mx-4 relative"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>

          <div className="mt-4 space-y-4">
            <h3 className="text-2xl font-semibold text-center text-gray-900">
              Indice
            </h3>

            <div className="p-4 bg-purple-50 rounded-xl">
              <p className="text-gray-700 whitespace-pre-line">
                {getHint(exercise)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};