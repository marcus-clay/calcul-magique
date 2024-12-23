import { DifficultyLevel } from '../types';

export interface NumberRange {
  min: number;
  max: number;
  digits: 1 | 2 | 3;
}

export const NUMBER_RANGES: Record<DifficultyLevel, NumberRange> = {
  easy: {
    min: 1,
    max: 20,
    digits: 1
  },
  intermediate: {
    min: 10,
    max: 99,
    digits: 2
  },
  hard: {
    min: 100,
    max: 999,
    digits: 3
  },
  expert: {
    min: 100,
    max: 999,
    digits: 3
  }
};