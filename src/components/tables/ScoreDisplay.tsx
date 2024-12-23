import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: {
    correct: number;
    total: number;
  };
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const percentage = score.total > 0 
    ? Math.round((score.correct / score.total) * 100)
    : 0;

  return (
    <div className="flex justify-center gap-4">
      <div className="px-6 py-3 bg-green-100 rounded-xl flex items-center gap-2">
        <Trophy className="w-5 h-5 text-green-600" />
        <span className="text-green-700 font-medium">
          {score.correct} réussites
        </span>
      </div>
      <div className="px-6 py-3 bg-blue-100 rounded-xl">
        <span className="text-blue-700 font-medium">
          {percentage}% de réussite
        </span>
      </div>
    </div>
  );
};