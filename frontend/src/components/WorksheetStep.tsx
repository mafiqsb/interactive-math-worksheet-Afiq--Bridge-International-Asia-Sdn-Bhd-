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
} from '@mui/material';
import { useWorksheet, mathQuestions } from './WorksheetContext';


const WorksheetStep: React.FC = () => {
  const { answers, setAnswer } = useWorksheet();

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
        boxShadow: 'none',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          maxWidth: 700,
          width: '100%',
          boxShadow: 'none',
          bgcolor: 'white',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Round to the nearest 10
        </Typography>
        <Typography variant="body2" gutterBottom>
          Circle the correct answers below:
        </Typography>
        <Box sx={{ mt: 2 }}>
          {mathQuestions.map((question) => (
            <Paper
              key={question.id}
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: 'white',
                border: '2px solid #fad7d7',
                borderRadius: 2,
              }}
            >
              <Typography sx={{ minWidth: 32 }}>{question.id}.</Typography>
              <Typography sx={{ minWidth: 60, fontWeight: 600 }}>
                {question.number}
              </Typography>
              <Typography sx={{ mx: 1 }}>=</Typography>
              <RadioGroup
                row
                value={answers[question.id] || ''}
                onChange={(e) => setAnswer(question.id, e.target.value)}
                name={`q${question.id}`}
                sx={{
                  bgcolor: 'white',
                  borderRadius: 2,
                  px: 1,
                }}
              >
                {(['a', 'b', 'c'] as const).map((choiceKey) => (
                  <FormControlLabel
                    key={choiceKey}
                    value={choiceKey}
                    control={<Radio />}
                    label={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Typography
                          sx={{ fontWeight: 'bold', color: 'primary.main' }}
                        >
                          {choiceKey}.
                        </Typography>
                        <Typography>{question.choices[choiceKey]}</Typography>
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
          sx={{ mt: 2 }}
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