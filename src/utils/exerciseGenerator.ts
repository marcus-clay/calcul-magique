import { DifficultyLevel, Exercise, Operation } from '../types';
import { NUMBER_RANGES } from './numberRanges';

const OPERATIONS: Record<DifficultyLevel, Operation[]> = {
  easy: ['+', '-'],
  intermediate: ['+', '-', '*'],
  hard: ['+', '-', '*', '/'],
  expert: ['+', '-', '*', '/']
};

function generateNumbers(level: DifficultyLevel, operation: Operation): [number, number] {
  const range = NUMBER_RANGES[level];
  let num1: number, num2: number;

  const getRandomNumber = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

  switch (operation) {
    case '+':
      if (range.digits === 1) {
        num1 = getRandomNumber(1, 10);
        num2 = getRandomNumber(1, 10);
      } else if (range.digits === 2) {
        num1 = getRandomNumber(10, 50);
        num2 = getRandomNumber(10, 50);
      } else {
        num1 = getRandomNumber(100, 500);
        num2 = getRandomNumber(100, 500);
      }
      break;

    case '-':
      if (range.digits === 1) {
        num2 = getRandomNumber(1, 10);
        num1 = getRandomNumber(num2, 20);
      } else if (range.digits === 2) {
        num2 = getRandomNumber(10, 50);
        num1 = getRandomNumber(num2, 99);
      } else {
        num2 = getRandomNumber(100, 500);
        num1 = getRandomNumber(num2, 999);
      }
      break;

    case '*':
      if (range.digits === 1) {
        num1 = getRandomNumber(2, 10);
        num2 = getRandomNumber(2, 5);
      } else if (range.digits === 2) {
        num1 = getRandomNumber(10, 20);
        num2 = getRandomNumber(2, 10);
      } else {
        num1 = getRandomNumber(20, 50);
        num2 = getRandomNumber(2, 20);
      }
      break;

    case '/':
      if (range.digits === 1) {
        num2 = getRandomNumber(2, 5);
        num1 = num2 * getRandomNumber(2, 5);
      } else if (range.digits === 2) {
        num2 = getRandomNumber(2, 10);
        num1 = num2 * getRandomNumber(5, 10);
      } else {
        num2 = getRandomNumber(2, 20);
        num1 = num2 * getRandomNumber(10, 20);
      }
      break;

    default:
      num1 = num2 = 0;
  }

  return [num1, num2];
}

export function getRandomExercise(level: DifficultyLevel): Exercise {
  const operations = OPERATIONS[level];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  const [num1, num2] = generateNumbers(level, operation);
  
  let result: number;
  let expression: string;
  let missing: number;

  switch (operation) {
    case '+':
      result = num1 + num2;
      expression = `${num1} + _ = ${result}`;
      missing = num2;
      break;

    case '-':
      result = num1 - num2;
      expression = `${num1} - _ = ${result}`;
      missing = num2;
      break;

    case '*':
      result = num1 * num2;
      expression = `${num1} x _ = ${result}`;
      missing = num2;
      break;

    case '/':
      result = num1 / num2;
      expression = `${num1} ÷ _ = ${result}`;
      missing = num2;
      break;

    default:
      throw new Error('Invalid operation');
  }

  return {
    expression,
    missing,
    level
  };
}

export const parseExpression = (expression: string): {
  firstNumber: number;
  operation: string;
  result: number;
} => {
  const parts = expression.split(/([+\-x÷=])/);
  return {
    firstNumber: parseFloat(parts[0].trim()),
    operation: parts[1].trim(),
    result: parseFloat(parts[4].trim())
  };
};

export const formatNumber = (num: number): string => {
  return Number.isInteger(num) ? num.toString() : num.toFixed(1);
};