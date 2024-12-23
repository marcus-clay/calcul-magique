import React from 'react';
import { Brain } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="macos-window px-6 py-4 rounded-xl shadow-md flex items-center gap-3 mx-auto">
      <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
        <Brain className="w-8 h-8 text-purple-600" />
      </div>
      <h1 className="text-2xl font-semibold text-gray-900">
        Calcul Magique
      </h1>
    </div>
  );
};