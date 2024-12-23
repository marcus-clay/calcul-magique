import React, { KeyboardEvent } from 'react';
import { Exercise } from '../types';
import { parseExpression, formatNumber } from '../utils/exerciseGenerator';
import { ConfirmButton } from './ConfirmButton';

interface ExerciseDisplayProps {
  exercise: Exercise;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  onConfirm: () => void;
  isCorrect: boolean | null;
}

export const ExerciseDisplay: React.FC<ExerciseDisplayProps> = ({
  exercise,
  userAnswer,
  onAnswerChange,
  onConfirm,
  isCorrect,
}) => {
  const { firstNumber, operation, result } = parseExpression(exercise.expression);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userAnswer && isCorrect === null) {
      onConfirm();
    }
  };

  return (
    <div className="space-y-8">      
      <div className="flex items-center justify-center space-x-8 p-8">
        <span className="text-7xl font-medium text-gray-900">{formatNumber(firstNumber)}</span>
        <span className="text-6xl text-purple-600 font-medium">{operation}</span>
        <input
          type="number"
          step="0.1"
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-40 h-24 text-6xl text-center rounded-xl border-2 border-purple-200 
            bg-white/50 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400
            transition-all duration-200 backdrop-blur-sm shadow-inner"
        />
        <span className="text-6xl text-purple-600 font-medium">=</span>
        <span className="text-7xl font-medium text-gray-900">{formatNumber(result)}</span>
      </div>
      
      <div className="flex justify-center">
        <ConfirmButton 
          onConfirm={onConfirm} 
          disabled={!userAnswer || isCorrect !== null}
        />
      </div>
    </div>
  );
};