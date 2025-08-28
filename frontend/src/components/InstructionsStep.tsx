import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const InstructionsStep: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          p: { xs: 3, sm: 4 },
          maxWidth: { xs: '100%', sm: 600 },
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
        <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
          Instructions
        </Typography>
        <Divider sx={{ mb: 2, width: '100%' }} />
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
            textAlign: 'center',
          }}
        >
          Round each number to the nearest 10
        </Typography>
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            <strong>Example:</strong> 23 → 20
          </Typography>
          <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            <strong>Example:</strong> 67 → 70
          </Typography>
        </Box>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
        >
          Remember:
        </Typography>
        <Box
          component="ul"
          sx={{
            pl: { xs: 2, sm: 3 },
            fontSize: { xs: '0.85rem', sm: '1rem' },
            textAlign: 'left',
          }}
        >
          <li>If the ones digit is 0-4, round down</li>
          <li>If the ones digit is 5-9, round up</li>
        </Box>
      </Paper>
    </>
  );
};

export default InstructionsStep;
