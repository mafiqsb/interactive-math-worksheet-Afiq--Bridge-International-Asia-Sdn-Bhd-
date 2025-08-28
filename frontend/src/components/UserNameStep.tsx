import React, { useState } from 'react';
import { Paper, Typography, TextField } from '@mui/material';
import { useWorksheet } from './WorksheetContext';

const UserNameStep: React.FC = () => {
  const { userName, setUserName } = useWorksheet();
  const [tempName, setTempName] = useState(userName);

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          maxWidth: 480,
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
          Welcome to the Math Worksheet!
        </Typography>
        <Typography variant="body1" gutterBottom>
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
          autoFocus
          sx={{ mb: 2 }}
        />
        {userName && (
          <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', mt: 2 }}>
            <Typography>
              Hello, {userName}! Ready to practice rounding to the nearest 10?
            </Typography>
          </Paper>
        )}
      </Paper>
    </>
  );
};

export default UserNameStep;
