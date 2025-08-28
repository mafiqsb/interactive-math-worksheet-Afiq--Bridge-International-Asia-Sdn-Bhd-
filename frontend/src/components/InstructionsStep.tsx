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
          p: { xs: 1.5, sm: 2.5 },
          maxWidth: { xs: 280, sm: 400 },
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
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          gutterBottom
          sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}
        >
          Instructions
        </Typography>
        <Divider sx={{ mb: 1, width: '100%' }} />
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          Round each number to the nearest 10
        </Typography>
        <Box sx={{ mb: 1, textAlign: 'center' }}>
          <Typography sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
            <strong>Example:</strong> 23 → 20
          </Typography>
          <Typography sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
            <strong>Example:</strong> 67 → 70
          </Typography>
        </Box>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' }, fontWeight: 600 }}
        >
          Remember:
        </Typography>
        <Box
          component="ul"
          sx={{
            pl: { xs: 1, sm: 1.5 },
            fontSize: { xs: '0.65rem', sm: '0.75rem' },
            textAlign: 'left',
            m: 0,
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
