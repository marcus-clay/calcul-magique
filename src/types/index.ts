export type DifficultyLevel = 'easy' | 'intermediate' | 'hard' | 'expert';
export type Operation = '+' | '-' | '*' | '/';
export type AppScreen = 'menu' | 'calculator' | 'tables' | 'level' | 'game';

export interface Exercise {
  expression: string;
  missing: number;
  level: DifficultyLevel;
}

export interface Progress {
  correctAnswers: number;
  totalAttempts: number;
  averageTime: number;
  level: DifficultyLevel;
  currentStreak: number;
  bestStreak: number;
}