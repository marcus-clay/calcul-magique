import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, X } from 'lucide-react';

interface HintModalProps {
  table: number;
  multiplier: number;
  onClose: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({ table, multiplier, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative"
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mt-4 space-y-6">
          <h3 className="text-2xl font-semibold text-center text-gray-900">
            Indice
          </h3>

          <div className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-xl">
              <p className="text-amber-800">
                Pour calculer {table} × {multiplier}, tu peux :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 text-amber-700">
                <li>Additionner {table} avec lui-même {multiplier} fois</li>
                <li>Utiliser les résultats précédents de la table de {table}</li>
                <li>Décomposer {multiplier} en plus petits nombres</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-blue-800">
                Par exemple : {table} × {multiplier} c'est comme
                {Array.from({ length: multiplier }, (_, i) => (
                  <span key={i}> {table}{i < multiplier - 1 ? ' +' : ''}</span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};