import React from 'react';
import {
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Divider,
  Typography,
} from '@mui/material';
import UserNameStep from './UserNameStep';
import InstructionsStep from './InstructionsStep';
import WorksheetStep from './WorksheetStep';
import ResultsStep from './ResultsStep';
import LeaderboardStep from './LeaderboardStep';

interface TabProgressProps {
  steps: string[];
  activeStep: number;
  onStepChange: (step: number) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  canProceed: boolean;
}

const TabProgress: React.FC<TabProgressProps> = ({
  steps,
  activeStep,
  onNext,
  onBack,
  onSubmit,
  canProceed,
}) => (
  <Container
    maxWidth={false}
    sx={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: '#fad7d7',
      overflow: 'hidden',
      px: 0,
      py: 4,
    }}
  >
    <Box
      sx={{
        width: '100%',
        maxWidth: 700,
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'auto',
        px: 3,
        py: 3,
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mb: 4, flex: 1 }}>
        {activeStep === 0 && <UserNameStep />}
        {activeStep === 1 && <InstructionsStep />}
        {activeStep === 2 && <WorksheetStep />}
        {activeStep === 3 && <ResultsStep />}
        {activeStep === 4 && <LeaderboardStep />}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" onClick={onBack} disabled={activeStep === 0}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Start Over
          </Button>
        ) : activeStep === steps.length - 2 ? (
          <Button variant="contained" color="primary" onClick={onNext}>
            View Leaderboard
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={onNext}
            disabled={!canProceed}
          >
            {activeStep === 2 ? 'Calculate Score' : 'Continue'}
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <Typography variant="caption" color="text.secondary">
          © www.mathinenglish.com
        </Typography>
      </Box>
    </Box>
  </Container>
);

export default TabProgress;
