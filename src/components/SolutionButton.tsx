import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { Exercise } from '../types';
import { SolutionModal } from './SolutionModal';
import { speechManager } from '../utils/speech';
import { getSolutionExplanation } from '../utils/solutions';

interface SolutionButtonProps {
  exercise: Exercise;
}

export const SolutionButton: React.FC<SolutionButtonProps> = ({ exercise }) => {
  const [showSolution, setShowSolution] = useState(false);

  const handleShowSolution = () => {
    setShowSolution(true);
    const explanation = getSolutionExplanation(exercise);
    speechManager.speak(explanation);
  };

  return (
    <>
      <button
        onClick={handleShowSolution}
        className="macos-button px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform"
        aria-label="Voir la solution"
      >
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <span className="text-gray-700 font-medium">Solution</span>
      </button>

      {showSolution && (
        <SolutionModal
          exercise={exercise}
          onClose={() => setShowSolution(false)}
        />
      )}
    </>
  );
}