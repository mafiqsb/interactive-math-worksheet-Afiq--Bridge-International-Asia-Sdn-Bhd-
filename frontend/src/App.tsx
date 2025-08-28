import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TabProgress from './components/TabProgress';
import {
  WorksheetContext,
  type WorksheetContextType,
  mathQuestions,
} from './components/WorksheetContext';
import { api } from './services/api';

const App: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [answers, setAnswersState] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    'Enter Name',
    'Instructions',
    'Worksheet',
    'Results',
    'Leaderboard',
  ];

  const setAnswer = (questionId: number, answer: string) => {
    setAnswersState((prev) => ({ ...prev, [questionId]: answer }));
  };

  const resetAnswers = () => {
    setAnswersState({});
    setScore(null);
    setActiveStep(0);
    setUserName('');
  };

  const calculateScore = async () => {
    let correctCount = 0;
    mathQuestions.forEach((question) => {
      if (answers[question.id] === question.correctChoice) {
        correctCount++;
      }
    });
    setScore(correctCount);

    if (userName.trim()) {
      try {
        setIsSubmitting(true);
        await api.submitWorksheet({
          userName: userName.trim(),
          answers,
          score: correctCount,
          totalQuestions: mathQuestions.length,
        });
      } catch (error) {
        console.error('Failed to save submission:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return userName.trim().length > 0;
      case 1:
        return true;
      case 2:
        return Object.keys(answers).length === mathQuestions.length;
      case 3:
        return true;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (activeStep === 2) {
      if (!userName.trim()) {
        alert('Please enter your name first!');
        setActiveStep(0);
        return;
      }
      await calculateScore();
    }
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    resetAnswers();
  };

  const submitToBackend = async (): Promise<void> => {
    if (!userName.trim() || score === null) return;

    try {
      setIsSubmitting(true);
      await api.submitWorksheet({
        userName: userName.trim(),
        answers,
        score,
        totalQuestions: mathQuestions.length,
      });
    } catch (error) {
      console.error('Failed to submit to backend:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const contextValue: WorksheetContextType = {
    userName,
    setUserName,
    answers,
    setAnswer,
    score,
    setScore,
    resetAnswers,
    submitToBackend,
    isSubmitting,
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#e57373',
        contrastText: '#fff',
      },
      secondary: {
        main: '#fad7d7',
      },
    },
    components: {
      MuiRadio: {
        styleOverrides: {
          root: {
            color: '#e57373',
            '&.Mui-checked': {
              color: '#e57373',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            backgroundColor: '#e57373',
            color: '#fff',
            fontSize: '0.875rem',
            padding: '8px 16px',
            '&:hover': {
              backgroundColor: '#d06262',
            },
          },
          outlined: {
            borderColor: '#e57373',
            color: '#e57373',
            fontSize: '0.875rem',
            padding: '8px 16px',
            '&:hover': {
              borderColor: '#d06262',
              backgroundColor: '#fad7d7',
              color: '#d06262',
            },
          },
        },
      },
      MuiStepIcon: {
        styleOverrides: {
          root: {
            color: '#fad7d7',
            '&.Mui-active': {
              color: '#e57373',
            },
            '&.Mui-completed': {
              color: '#e57373',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <WorksheetContext.Provider value={contextValue}>
        <TabProgress
          steps={steps}
          activeStep={activeStep}
          onStepChange={setActiveStep}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={handleSubmit}
          canProceed={canProceed()}
        />
      </WorksheetContext.Provider>
    </ThemeProvider>
  );
};

export default App;
