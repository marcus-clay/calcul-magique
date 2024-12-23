import React from 'react';
import { Brain } from 'lucide-react';
import { Exercise } from '../types';
import { getSolutionExplanation } from '../utils/solutions';
import { parseExpression } from '../utils/exerciseGenerator';
import { motion } from 'framer-motion';

interface SolutionModalProps {
  exercise: Exercise;
  onClose: () => void;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({ exercise, onClose }) => {
  const { firstNumber, operation, result } = parseExpression(exercise.expression);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative"
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

        <div className="mt-4 space-y-6">
          <h3 className="text-2xl font-semibold text-center text-gray-900">
            Explications
          </h3>
          
          {/* Opération */}
          <div className="text-4xl font-medium text-center space-x-4 p-4 bg-gray-50 rounded-xl">
            <span>{firstNumber}</span>
            <span className="text-purple-600">{operation}</span>
            <span className="text-green-600">{exercise.missing}</span>
            <span className="text-purple-600">=</span>
            <span>{result}</span>
          </div>

          {/* Étapes de résolution */}
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-semibold text-blue-800 mb-2">🎯 Objectif</h4>
              <p className="text-blue-700">
                Trouver le nombre qui, {operation === '+' ? 'ajouté à' : 
                                      operation === '-' ? 'soustrait de' :
                                      operation === 'x' ? 'multiplié par' :
                                      'divisant'} {firstNumber}, donne {result}.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl">
              <h4 className="font-semibold text-purple-800 mb-2">🤔 Raisonnement</h4>
              <p className="text-purple-700 whitespace-pre-line">
                {getSolutionExplanation(exercise)}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <h4 className="font-semibold text-green-800 mb-2">✨ Vérification</h4>
              <p className="text-green-700">
                {firstNumber} {operation} {exercise.missing} = {result}
                <br />
                Le calcul est juste !
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};