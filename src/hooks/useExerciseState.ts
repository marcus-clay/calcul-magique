import { useState } from 'react';
import { Exercise, Progress, DifficultyLevel } from '../types';
import { getRandomExercise } from '../utils/exerciseGenerator';
import { soundManager } from '../utils/soundManager';

const initialProgress = (level: DifficultyLevel): Progress => ({
  correctAnswers: 0,
  totalAttempts: 0,
  averageTime: 0,
  level,
  currentStreak: 0,
  bestStreak: 0,
});

export function useExerciseState(initialLevel: DifficultyLevel) {
  const [exercise, setExercise] = useState<Exercise>(getRandomExercise(initialLevel));
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [progress, setProgress] = useState<Progress>(initialProgress(initialLevel));
  const [showCelebration, setShowCelebration] = useState(false);
  const [startTime] = useState(Date.now());

  const handleAnswer = (value: string) => {
    setUserAnswer(value);
    setIsCorrect(null);
  };

  const handleConfirm = () => {
    const numericAnswer = parseFloat(userAnswer);
    
    if (!isNaN(numericAnswer)) {
      const correct = numericAnswer === exercise.missing;
      setIsCorrect(correct);

      if (correct) {
        handleCorrectAnswer();
      } else {
        handleIncorrectAnswer();
      }
    }
  };

  const handleCorrectAnswer = () => {
    soundManager.playSuccess();
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;
    
    setProgress(prev => {
      const newStreak = prev.currentStreak + 1;
      return {
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
        totalAttempts: prev.totalAttempts + 1,
        averageTime: (prev.averageTime * prev.totalAttempts + timeTaken) / (prev.totalAttempts + 1),
        currentStreak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        level: shouldLevelUp(prev) ? getNextLevel(prev.level) : prev.level,
      };
    });

    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      setExercise(getRandomExercise(progress.level));
      setUserAnswer('');
      setIsCorrect(null);
    }, 1500);
  };

  const handleIncorrectAnswer = () => {
    soundManager.playError();
    setProgress(prev => ({
      ...prev,
      totalAttempts: prev.totalAttempts + 1,
      currentStreak: 0
    }));
  };

  return {
    exercise,
    userAnswer,
    isCorrect,
    progress,
    showCelebration,
    handleAnswer,
    handleConfirm,
    startTime,
  };
}

function shouldLevelUp(progress: Progress): boolean {
  return progress.correctAnswers > 0 && progress.correctAnswers % 5 === 0;
}

function getNextLevel(currentLevel: DifficultyLevel): DifficultyLevel {
  const levels: DifficultyLevel[] = ['easy', 'intermediate', 'hard', 'expert'];
  const currentIndex = levels.indexOf(currentLevel);
  return levels[Math.min(currentIndex + 1, levels.length - 1)];
}