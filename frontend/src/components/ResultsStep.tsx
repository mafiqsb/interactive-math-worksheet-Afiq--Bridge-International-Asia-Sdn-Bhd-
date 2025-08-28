import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
} from '@mui/material';
import { useWorksheet, mathQuestions } from './WorksheetContext';

const ResultsStep: React.FC = () => {
  const { userName, answers, score, resetAnswers } = useWorksheet();

  const getScoreColor = (score: number) => {
    if (score >= 11) return 'success.main';
    if (score >= 8) return 'warning.main';
    return 'error.main';
  };

  const getScoreMessage = (score: number) => {
    if (score === 13) return 'Perfect! Outstanding work!';
    if (score >= 11) return 'Excellent job!';
    if (score >= 8) return 'Good work! Keep practicing!';
    return 'Keep trying! You can do better!';
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        p: 4,
        width: '100%',
        mx: 'auto',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: 700,
          width: '100%',
          boxShadow: 'none',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Results for {userName}
        </Typography>
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: 6,
            borderStyle: 'solid',
            borderColor: getScoreColor(score!),
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: getScoreColor(score!), fontWeight: 700 }}
          >
            {score}/13
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ color: getScoreColor(score!), mb: 2 }}
        >
          {getScoreMessage(score!)}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Your Answers:
        </Typography>
        <Box sx={{ mt: 2 }}>
          {mathQuestions.map((question) => {
            const userChoice = answers[question.id];
            const isCorrect = userChoice === question.correctChoice;
            return (
              <Paper
                key={question.id}
                elevation={0}
                sx={{
                  p: 2,
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  bgcolor: isCorrect ? '#e8f5e9' : '#ffebee',
                  border: '1px solid',
                  borderColor: isCorrect ? 'success.main' : 'error.main',
                  boxShadow: 'none',
                }}
              >
                <Typography sx={{ minWidth: 32 }}>{question.id}.</Typography>
                <Typography sx={{ minWidth: 60 }}>{question.number}</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {userChoice
                    ? `${userChoice}. ${
                        question.choices[userChoice as 'a' | 'b' | 'c']
                      }`
                    : '—'}
                </Typography>
                <Typography
                  sx={{ color: 'text.secondary', fontSize: '0.9rem' }}
                >
                  ({question.correctChoice}.{' '}
                  {question.choices[question.correctChoice]})
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: isCorrect ? 'success.main' : 'error.main',
                    fontSize: '0.8rem',
                  }}
                >
                  {isCorrect ? 'Right' : 'Wrong'}
                </Typography>
              </Paper>
            );
          })}
        </Box>
        <Button
          variant="contained"
          color="success"
          onClick={resetAnswers}
          sx={{ mt: 3 }}
        >
          Try Again
        </Button>
      </Paper>
    </Container>
  );
};

export default ResultsStep;
