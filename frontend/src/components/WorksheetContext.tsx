import { createContext, useContext } from 'react';

export interface MathQuestion {
  id: number;
  number: number;
  choices: { a: number | string; b: number | string; c: number | string };
  correctChoice: 'a' | 'b' | 'c';
}

export interface WorksheetContextType {
  userName: string;
  setUserName: (name: string) => void;
  answers: Record<number, string>;
  setAnswer: (questionId: number, answer: string) => void;
  score: number | null;
  setScore: (score: number | null) => void;
  resetAnswers: () => void;
  submitToBackend: () => Promise<void>;
  isSubmitting: boolean;
}

export const WorksheetContext = createContext<WorksheetContextType | undefined>(
  undefined
);

export const useWorksheet = () => {
  const context = useContext(WorksheetContext);
  if (!context) {
    throw new Error('useWorksheet must be used within WorksheetProvider');
  }
  return context;
};

export const mathQuestions: MathQuestion[] = [
  { id: 1, number: 17, choices: { a: 10, b: 20, c: 17 }, correctChoice: 'b' },
  { id: 2, number: 75, choices: { a: 70, b: 80, c: 175 }, correctChoice: 'b' },
  { id: 3, number: 64, choices: { a: 64, b: 70, c: 60 }, correctChoice: 'c' },
  { id: 4, number: 98, choices: { a: 80, b: 100, c: 89 }, correctChoice: 'b' },
  { id: 5, number: 94, choices: { a: 100, b: 94, c: 90 }, correctChoice: 'c' },
  {
    id: 6,
    number: 445,
    choices: { a: 450, b: 440, c: 500 },
    correctChoice: 'a',
  },
  { id: 7, number: 45, choices: { a: 50, b: 45, c: 40 }, correctChoice: 'a' },
  { id: 8, number: 19, choices: { a: 20, b: 10, c: 19 }, correctChoice: 'a' },
  { id: 9, number: 0, choices: { a: 10, b: 0, c: 0 }, correctChoice: 'b' },
  {
    id: 10,
    number: 199,
    choices: { a: 190, b: 100, c: 200 },
    correctChoice: 'c',
  },
  {
    id: 11,
    number: 165,
    choices: { a: 160, b: 170, c: 150 },
    correctChoice: 'b',
  },
  {
    id: 12,
    number: 999,
    choices: { a: 990, b: 1000, c: 909 },
    correctChoice: 'b',
  },
  { id: 13, number: 89, choices: { a: 90, b: 100, c: 89 }, correctChoice: 'a' },
];
