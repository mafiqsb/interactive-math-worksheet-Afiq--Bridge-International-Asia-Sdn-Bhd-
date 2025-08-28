import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';

// Component
const InstructionsStep: React.FC = () => (
  <>
    <Paper
      elevation={2}
      sx={{
        p: 4,
        maxWidth: 600,
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
      <Typography variant="h5" gutterBottom>
        Instructions
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle1" gutterBottom>
        Round each number to the nearest 10
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography>
          <strong>Example:</strong> 23 → 20
        </Typography>
        <Typography>
          <strong>Example:</strong> 67 → 70
        </Typography>
      </Box>
      <Typography variant="subtitle2" gutterBottom>
        Remember:
      </Typography>
      <ul>
        <li>If the ones digit is 0-4, round down</li>
        <li>If the ones digit is 5-9, round up</li>
      </ul>
    </Paper>
  </>
);

export default InstructionsStep;