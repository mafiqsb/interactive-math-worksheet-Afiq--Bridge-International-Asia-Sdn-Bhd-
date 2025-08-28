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
  useMediaQuery,
  useTheme,
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
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
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
        px: { xs: 1, sm: 3 },
        py: { xs: 2, sm: 4 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: 700 },
          minHeight: { xs: '95vh', sm: '80vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'auto',
          px: { xs: 1, sm: 3 },
          py: { xs: 2, sm: 3 },
          bgcolor: 'white',
          borderRadius: { xs: 1, sm: 2 },
          boxShadow: 2,
        }}
      >
        {isMobile ? (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Step {activeStep + 1} of {steps.length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              {steps.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: index <= activeStep ? 'primary.main' : 'grey.300',
                    mx: 0.5,
                    transition: 'background-color 0.3s',
                  }}
                />
              ))}
            </Box>
            <Typography variant="h6" textAlign="center" color="primary.main">
              {steps[activeStep]}
            </Typography>
          </Box>
        ) : (
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        <Box sx={{ mb: { xs: 2, sm: 4 }, flex: 1 }}>
          {activeStep === 0 && <UserNameStep />}
          {activeStep === 1 && <InstructionsStep />}
          {activeStep === 2 && <WorksheetStep />}
          {activeStep === 3 && <ResultsStep />}
          {activeStep === 4 && <LeaderboardStep />}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            gap: { xs: 1, sm: 2 },
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Button
            variant="outlined"
            onClick={onBack}
            disabled={activeStep === 0}
            fullWidth={isMobile}
            size={isMobile ? 'large' : 'medium'}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              fullWidth={isMobile}
              size={isMobile ? 'large' : 'medium'}
            >
              Start Over
            </Button>
          ) : activeStep === steps.length - 2 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={onNext}
              fullWidth={isMobile}
              size={isMobile ? 'large' : 'medium'}
            >
              View Leaderboard
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={onNext}
              disabled={!canProceed}
              fullWidth={isMobile}
              size={isMobile ? 'large' : 'medium'}
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
};

export default TabProgress;
