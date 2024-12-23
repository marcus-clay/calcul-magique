import React from 'react';
import { ExerciseDisplay } from './ExerciseDisplay';
import { ProgressBar } from './ProgressBar';
import { Header } from './Header';
import { HintPopover } from './HintPopover';
import { CelebrationEffect } from './CelebrationEffect';
import { FeedbackDisplay } from './FeedbackDisplay';
import { useExerciseState } from '../hooks/useExerciseState';
import { DifficultyLevel } from '../types';
import { ArrowLeft } from 'lucide-react';

interface GameProps {
  initialLevel: DifficultyLevel;
  onBack?: () => void;
}

export const Game: React.FC<GameProps> = ({ initialLevel, onBack }) => {
  const {
    exercise,
    userAnswer,
    isCorrect,
    progress,
    showCelebration,
    handleAnswer,
    handleConfirm,
  } = useExerciseState(initialLevel);

  return (
    <div className="min-h-screen bg-[#334ED6] p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-[#189518] hover:bg-[#189518]/90 rounded-lg transition-all duration-200 text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour aux niveaux</span>
          </button>
          <Header />
        </div>

        <ProgressBar progress={progress} />

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {exercise.expression.includes('x') ? 'Multiplication' : 
               exercise.expression.includes('+') ? 'Addition' :
               exercise.expression.includes('-') ? 'Soustraction' :
               'Division'}
            </h2>
            <HintPopover exercise={exercise} />
          </div>
          
          <div className="bg-white rounded-xl p-6">
            <ExerciseDisplay
              exercise={exercise}
              userAnswer={userAnswer}
              onAnswerChange={handleAnswer}
              onConfirm={handleConfirm}
              isCorrect={isCorrect}
            />
          </div>
          
          {showCelebration && <CelebrationEffect />}
        </div>

        <FeedbackDisplay isCorrect={isCorrect} />
      </div>
    </div>
  );
};