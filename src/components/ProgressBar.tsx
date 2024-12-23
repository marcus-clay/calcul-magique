import React from 'react';
import { Progress } from '../types';
import { Trophy, Star, Clock } from 'lucide-react';

interface ProgressBarProps {
  progress: Progress;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const percentage = Math.round((progress.correctAnswers / progress.totalAttempts) * 100) || 0;

  return (
    <div className="macos-window rounded-xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-medium text-gray-900">Score: {progress.correctAnswers}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <span className="font-medium text-gray-900">
            Temps moyen: {progress.averageTime.toFixed(1)}s
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-purple-500" />
          <span className="font-medium text-gray-900">Niveau {progress.level}</span>
        </div>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};