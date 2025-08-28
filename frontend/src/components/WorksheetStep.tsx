import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useWorksheet, mathQuestions } from './WorksheetContext';

const WorksheetStep: React.FC = () => {
  const { answers, setAnswer } = useWorksheet();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        boxShadow: 'none',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 1, sm: 2 },
          maxWidth: 650,
          width: '100%',
          boxShadow: 'none',
          bgcolor: 'white',
        }}
      >
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          gutterBottom
          fontSize={isMobile ? '1rem' : '1.25rem'}
        >
          Round to the nearest 10
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            mb: { xs: 1, sm: 1.5 },
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
          Circle the correct answers below:
        </Typography>
        <Box sx={{ mt: 1 }}>
          {mathQuestions.map((question) => (
            <Paper
              key={question.id}
              elevation={0}
              sx={{
                p: { xs: 1, sm: 1.5 },
                mb: { xs: 1, sm: 1.5 },
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: { xs: 0.5, sm: 1 },
                bgcolor: 'white',
                border: '1px solid #fad7d7',
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  mb: { xs: 0.5, sm: 0 },
                }}
              >
                <Typography
                  sx={{
                    minWidth: 24,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  {question.id}.
                </Typography>
                <Typography
                  sx={{
                    minWidth: 40,
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  {question.number}
                </Typography>
                <Typography
                  sx={{ mx: 0.5, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  =
                </Typography>
              </Box>
              <RadioGroup
                row={!isMobile}
                value={answers[question.id] || ''}
                onChange={(e) => setAnswer(question.id, e.target.value)}
                name={`q${question.id}`}
                sx={{
                  bgcolor: 'white',
                  borderRadius: 1,
                  px: 0.5,
                  width: '100%',
                  '& .MuiFormControlLabel-root': {
                    mr: { xs: 0, sm: 1 },
                    mb: { xs: 0.25, sm: 0 },
                  },
                }}
              >
                {(['a', 'b', 'c'] as const).map((choiceKey) => (
                  <FormControlLabel
                    key={choiceKey}
                    value={choiceKey}
                    control={<Radio size="small" />}
                    label={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            color: 'primary.main',
                            fontSize: { xs: '0.7rem', sm: '0.8rem' },
                          }}
                        >
                          {choiceKey}.
                        </Typography>
                        <Typography
                          sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
                        >
                          {question.choices[choiceKey]}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </Paper>
          ))}
        </Box>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          sx={{
            mt: 1,
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
            px: { xs: 1, sm: 2 },
            py: { xs: 0.5, sm: 0.75 },
          }}
          onClick={() => {
            Object.keys(answers).forEach((qid) => setAnswer(Number(qid), ''));
          }}
        >
          Clear Answers
        </Button>
      </Paper>
    </Container>
  );
};

export default WorksheetStep;
