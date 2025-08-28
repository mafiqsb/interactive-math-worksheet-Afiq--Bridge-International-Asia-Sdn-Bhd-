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
          p: { xs: 1.5, sm: 2.5 },
          maxWidth: { xs: 280, sm: 350 },
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
          textAlign="center"
          sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}
        >
          Welcome to the Math Worksheet!
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          textAlign="center"
          sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' }, mb: 1 }}
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
          size="small"
          sx={{
            mb: 1,
            '& .MuiInputBase-input': {
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              padding: { xs: '6px 10px', sm: '8px 12px' },
            },
          }}
        />
        {userName && (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 0.75, sm: 1 },
              bgcolor: '#f5f5f5',
              mt: 0.5,
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Typography sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
              Hello, {userName}! Ready to practice rounding to the nearest 10?
            </Typography>
          </Paper>
        )}
      </Paper>
    </>
  );
};

export default UserNameStep;
