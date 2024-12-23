import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MainMenu } from './components/MainMenu';
import { LevelSelection } from './components/LevelSelection';
import { Game } from './components/Game';
import { MultiplicationTables } from './components/MultiplicationTables';
import { DifficultyLevel, AppScreen } from './types';
import './styles/animations.css';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('menu');
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>('easy');

  const renderScreen = () => {
    switch (screen) {
      case 'menu':
        return (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MainMenu 
              onSelectCalculator={() => setScreen('calculator')}
              onSelectTables={() => setScreen('tables')}
            />
          </motion.div>
        );
      case 'calculator':
        return (
          <motion.div
            key="calculator"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <LevelSelection
              onSelectLevel={(level) => {
                setSelectedLevel(level);
                setScreen('game');
              }}
              onBack={() => setScreen('menu')}
            />
          </motion.div>
        );
      case 'tables':
        return (
          <motion.div
            key="tables"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <MultiplicationTables onBack={() => setScreen('menu')} />
          </motion.div>
        );
      case 'game':
        return (
          <motion.div
            key="game"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <Game 
              initialLevel={selectedLevel} 
              onBack={() => setScreen('calculator')}
            />
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderScreen()}
    </AnimatePresence>
  );
}