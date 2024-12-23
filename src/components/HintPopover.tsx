import React, { useState } from 'react';
import { Exercise } from '../types';
import { HelpCircle } from 'lucide-react';
import { SolutionButton } from './SolutionButton';
import { HintModal } from './HintModal';

interface HintPopoverProps {
  exercise: Exercise;
}

export const HintPopover: React.FC<HintPopoverProps> = ({ exercise }) => {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setShowHint(true)}
        className="macos-button px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform"
        aria-label="Afficher l'indice"
      >
        <HelpCircle className="w-5 h-5 text-amber-500" />
        <span className="text-gray-700 font-medium">Indice</span>
      </button>

      <SolutionButton exercise={exercise} />

      {showHint && <HintModal exercise={exercise} onClose={() => setShowHint(false)} />}
    </div>
  );
};