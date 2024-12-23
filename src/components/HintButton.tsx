import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Exercise } from '../types';
import { getHint } from '../utils/hints';

interface HintButtonProps {
  exercise: Exercise;
}

export const HintButton: React.FC<HintButtonProps> = ({ exercise }) => {
  const [showHint, setShowHint] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowHint(!showHint)}
        className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
        aria-label="Afficher l'indice"
      >
        <HelpCircle className="w-6 h-6" />
      </button>
      
      {showHint && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 p-3 bg-white rounded-lg shadow-lg text-sm text-gray-700 border border-blue-100">
          {getHint(exercise)}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-blue-100"></div>
        </div>
      )}
    </div>
  );
};