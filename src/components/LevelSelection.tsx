import React from 'react';
import { DifficultyLevel } from '../types';
import { Brain, Sparkles, Zap, Trophy, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface LevelCardProps {
  level: DifficultyLevel;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: (level: DifficultyLevel) => void;
  index: number;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, title, description, icon, onClick, index }) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    onClick={() => onClick(level)}
    whileHover={{ 
      scale: 1.05,
      transition: { duration: 0.2 }
    }}
    className="group relative bg-white rounded-2xl p-6 
      shadow-lg hover:shadow-2xl transform transition-all duration-300
      hover:z-10 overflow-hidden"
  >
    {/* Bordure animée */}
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-violet-400 to-rose-400 
      opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
      style={{ padding: '2px', borderRadius: '1rem' }}>
      <div className="h-full w-full bg-white rounded-xl" />
    </div>

    <div className="relative flex flex-col items-center text-center space-y-4">
      <motion.div 
        className="p-4 rounded-full bg-gradient-to-br from-white to-gray-50"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-bold text-[#111111]">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.button>
);

interface LevelSelectionProps {
  onSelectLevel: (level: DifficultyLevel) => void;
  onBack: () => void;
}

export const LevelSelection: React.FC<LevelSelectionProps> = ({ onSelectLevel, onBack }) => {
  const levels = [
    {
      level: 'easy' as DifficultyLevel,
      title: 'Facile',
      description: 'Nombres de 1 à 20',
      icon: <Brain className="w-12 h-12 text-emerald-400" />
    },
    {
      level: 'intermediate' as DifficultyLevel,
      title: 'Intermédiaire',
      description: 'Nombres de 10 à 99',
      icon: <Sparkles className="w-12 h-12 text-violet-400" />
    },
    {
      level: 'hard' as DifficultyLevel,
      title: 'Difficile',
      description: 'Nombres de 100 à 999',
      icon: <Zap className="w-12 h-12 text-amber-400" />
    },
    {
      level: 'expert' as DifficultyLevel,
      title: 'Expert',
      description: 'Opérations complexes',
      icon: <Trophy className="w-12 h-12 text-rose-400" />
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#334ED6] p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour au menu</span>
          </button>
        </div>

        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-bold text-center text-white mb-12 tracking-wider text-shadow-lg"
        >
          Choisis ton niveau
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {levels.map((level, index) => (
            <LevelCard
              key={level.level}
              {...level}
              onClick={onSelectLevel}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};