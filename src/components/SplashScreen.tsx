import React from 'react';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#334ED6] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Brain className="w-32 h-32 text-white filter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-full" />
          </div>
          
          <h1 className="text-6xl font-bold text-white tracking-normal">
            <span className="block text-shadow-lg">Calcul</span>
            <span className="block text-shadow-lg">Magique</span>
          </h1>
        </div>

        <motion.button
          onClick={onStart}
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="transform transition-transform active:scale-95 
            bg-[#189518] hover:bg-[#189518]/90 text-white text-3xl font-bold 
            py-6 px-12 rounded-full shadow-lg hover:shadow-xl 
            border-2 border-white/30"
        >
          Démarrer !
        </motion.button>
      </div>
    </div>
  );
};