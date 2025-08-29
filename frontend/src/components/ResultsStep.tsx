import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useWorksheet, mathQuestions } from './WorksheetContext';

const ResultsStep: React.FC = () => {
  const { userName, answers, score, resetAnswers } = useWorksheet();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        p: { xs: 0.5, sm: 2 },
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
          p: { xs: 1, sm: 2 },
          textAlign: 'center',
          maxWidth: 650,
          width: '100%',
          boxShadow: 'none',
        }}
      >
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          gutterBottom
          sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
        >
          Results for {userName}
        </Typography>
        <Box
          sx={{
            width: { xs: 60, sm: 80 },
            height: { xs: 60, sm: 80 },
            borderRadius: '50%',
            border: { xs: 3, sm: 4 },
            borderStyle: 'solid',
            borderColor: getScoreColor(score!),
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 1.5,
          }}
        >
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{
              color: getScoreColor(score!),
              fontWeight: 700,
              fontSize: { xs: '1rem', sm: '1.5rem' },
            }}
          >
            {score}/12
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: getScoreColor(score!),
            mb: 1.5,
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
          }}
        >
          {getScoreMessage(score!)}
        </Typography>
        <Divider sx={{ my: 1.5 }} />
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
        >
          Your Answers:
        </Typography>
        <Box sx={{ mt: 1 }}>
          {mathQuestions.map((question) => {
            const userChoice = answers[question.id];
            const isCorrect = userChoice === question.correctChoice;
            return (
              <Paper
                key={question.id}
                elevation={0}
                sx={{
                  p: { xs: 0.75, sm: 1 },
                  mb: 0.75,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: { xs: 0.5, sm: 1 },
                  bgcolor: isCorrect ? '#e8f5e9' : '#ffebee',
                  border: '1px solid',
                  borderColor: isCorrect ? 'success.main' : 'error.main',
                  boxShadow: 'none',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography
                    sx={{
                      minWidth: 24,
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    }}
                  >
                    {question.id}.
                  </Typography>
                  <Typography
                    sx={{
                      minWidth: 40,
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    }}
                  >
                    {question.number}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: { xs: 0.25, sm: 1 },
                    flex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    }}
                  >
                    {userChoice
                      ? `${userChoice}. ${
                          question.choices[userChoice as 'a' | 'b' | 'c']
                        }`
                      : '—'}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '0.6rem', sm: '0.7rem' },
                    }}
                  >
                    ({question.correctChoice}.{' '}
                    {question.choices[question.correctChoice]})
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: isCorrect ? 'success.main' : 'error.main',
                      fontSize: { xs: '0.6rem', sm: '0.7rem' },
                    }}
                  >
                    {isCorrect ? 'Right' : 'Wrong'}
                  </Typography>
                </Box>
              </Paper>
            );
          })}
        </Box>
        <Button
          variant="contained"
          color="success"
          onClick={resetAnswers}
          size="small"
          sx={{
            mt: 2,
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
            px: { xs: 1, sm: 2 },
            py: { xs: 0.5, sm: 0.75 },
          }}
        >
          Try Again
        </Button>
      </Paper>
    </Container>
  );
};

export default ResultsStep;
