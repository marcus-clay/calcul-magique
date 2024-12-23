import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, X } from 'lucide-react';

interface SolutionModalProps {
  table: number;
  multiplier: number;
  onClose: () => void;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({ 
  table, 
  multiplier, 
  onClose 
}) => {
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
          <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
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
            Solution détaillée
          </h3>

          <div className="text-4xl font-medium text-center space-x-4 p-4 bg-gray-50 rounded-xl">
            <span>{table}</span>
            <span className="text-purple-600">×</span>
            <span>{multiplier}</span>
            <span className="text-purple-600">=</span>
            <span className="text-green-600">{table * multiplier}</span>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-semibold text-blue-800 mb-2">🎯 Méthode</h4>
              <p className="text-blue-700">
                Pour calculer {table} × {multiplier}, on peut additionner {table} avec lui-même {multiplier} fois :
              </p>
              <div className="mt-2 p-2 bg-white rounded-lg text-blue-800">
                {Array.from({ length: multiplier }, (_, i) => (
                  <span key={i}>{table}{i < multiplier - 1 ? ' + ' : ' = ' + (table * multiplier)}</span>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl">
              <h4 className="font-semibold text-purple-800 mb-2">🤔 Autre approche</h4>
              <p className="text-purple-700">
                On peut aussi décomposer {multiplier} en nombres plus simples :
                <br />
                {table} × {multiplier} = {table} × ({Math.floor(multiplier/2)} + {multiplier - Math.floor(multiplier/2)})
                <br />
                = ({table} × {Math.floor(multiplier/2)}) + ({table} × {multiplier - Math.floor(multiplier/2)})
                <br />
                = {table * Math.floor(multiplier/2)} + {table * (multiplier - Math.floor(multiplier/2))}
                <br />
                = {table * multiplier}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};