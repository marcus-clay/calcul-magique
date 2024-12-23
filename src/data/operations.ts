import { DifficultyLevel, Operation } from '../types';

export interface OperationData {
  expression: string;
  missing: number;
  level: DifficultyLevel;
}

export const operations: OperationData[] = [
  // Niveau 1 : Facile
  {
    expression: '3 + _ = 8',
    missing: 5,
    level: 'easy'
  },
  {
    expression: '7 - _ = 4',
    missing: 3,
    level: 'easy'
  },
  {
    expression: '6 + _ = 12',
    missing: 6,
    level: 'easy'
  },
  // ... autres opérations niveau 1

  // Niveau 2 : Intermédiaire
  {
    expression: '45 + _ = 78',
    missing: 33,
    level: 'intermediate'
  },
  {
    expression: '82 - _ = 40',
    missing: 42,
    level: 'intermediate'
  },
  // ... autres opérations niveau 2

  // Niveau 3 : Difficile
  {
    expression: '15 x _ = 90',
    missing: 6,
    level: 'hard'
  },
  {
    expression: '125 ÷ _ = 25',
    missing: 5,
    level: 'hard'
  },
  // ... autres opérations niveau 3

  // Niveau 4 : Expert
  {
    expression: '12.5 + _ = 20.5',
    missing: 8.0,
    level: 'expert'
  },
  {
    expression: '50.5 - _ = 12.3',
    missing: 38.2,
    level: 'expert'
  }
  // ... autres opérations niveau 4
];