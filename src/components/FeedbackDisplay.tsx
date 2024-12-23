import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface FeedbackDisplayProps {
  isCorrect: boolean | null;
}

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ isCorrect }) => {
  if (isCorrect === null) return null;

  return (
    <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2">
      <div className={`
        flex items-center justify-center gap-4 px-12 py-6 rounded-2xl
        text-5xl font-bold animate-bounce shadow-xl
        ${isCorrect 
          ? 'bg-green-500 text-white' 
          : 'bg-red-500 text-white'
        }
      `}>
        {isCorrect ? (
          <>
            <CheckCircle className="w-12 h-12" />
            <span>Bravo !</span>
          </>
        ) : (
          <>
            <XCircle className="w-12 h-12" />
            <span>Essaie encore !</span>
          </>
        )}
      </div>
    </div>
  );
};