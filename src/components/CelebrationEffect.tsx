import React from 'react';
import { Sparkles } from 'lucide-react';

export const CelebrationEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <Sparkles className="w-16 h-16 text-yellow-500 animate-spin" />
      </div>
      <div className="text-2xl font-bold text-green-500 animate-bounce">
        Bravo !
      </div>
    </div>
  );
};