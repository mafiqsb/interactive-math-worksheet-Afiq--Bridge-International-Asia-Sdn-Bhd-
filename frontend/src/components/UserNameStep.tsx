import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useWorksheet } from './WorksheetContext';

const UserNameStep: React.FC = () => {
  const { userName, setUserName } = useWorksheet();
  const [tempName, setTempName] = useState(userName);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          p: { xs: 3, sm: 4 },
          maxWidth: { xs: '100%', sm: 480 },
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
          variant={isMobile ? 'h6' : 'h5'}
          gutterBottom
          textAlign="center"
        >
          Welcome to the Math Worksheet!
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          textAlign="center"
          sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
        >
          Please enter your name to get started:
        </Typography>
        <TextField
          fullWidth
          value={tempName}
          onChange={(e) => {
            setTempName(e.target.value);
            setUserName(e.target.value);
          }}
          placeholder="Enter your name..."
          autoFocus={!isMobile}
          size={isMobile ? 'medium' : 'medium'}
          sx={{
            mb: 2,
            '& .MuiInputBase-input': {
              fontSize: { xs: '1rem', sm: '1rem' },
              padding: { xs: '12px 14px', sm: '16.5px 14px' },
            },
          }}
        />
        {userName && (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.5, sm: 2 },
              bgcolor: '#f5f5f5',
              mt: 2,
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              Hello, {userName}! Ready to practice rounding to the nearest 10?
            </Typography>
          </Paper>
        )}
      </Paper>
    </>
  );
};

export default UserNameStep;
