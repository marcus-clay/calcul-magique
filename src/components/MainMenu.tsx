import React from 'react';
import { Brain, Calculator, Table } from 'lucide-react';
import { motion } from 'framer-motion';

interface MainMenuProps {
  onSelectCalculator: () => void;
  onSelectTables: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onSelectCalculator, onSelectTables }) => {
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-[#334ED6] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-12">
        <div className="flex flex-col items-center">
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative mb-4"
          >
            <Brain className="w-32 h-32 text-white filter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </motion.div>
          
          <h1 className="text-6xl font-bold text-white mb-8 tracking-wider">
            <span className="block text-shadow-lg">Calcul</span>
            <span className="block text-shadow-lg">Magique</span>
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onSelectCalculator}
            className="flex items-center gap-4 bg-[#189518] hover:bg-[#189518]/90 
              text-white text-2xl font-bold py-6 px-8 rounded-xl shadow-lg 
              hover:shadow-xl border-2 border-white/30 transition-colors"
          >
            <Calculator className="w-8 h-8" />
            <span>Calculateur Magique</span>
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onSelectTables}
            className="flex items-center gap-4 bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 
              text-white text-2xl font-bold py-6 px-8 rounded-xl shadow-lg 
              hover:shadow-xl border-2 border-white/30 transition-colors"
          >
            <Table className="w-8 h-8" />
            <span>Tables de Multiplication</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};