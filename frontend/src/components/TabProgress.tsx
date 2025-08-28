import React from 'react';
import {
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
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
        px: { xs: 0.5, sm: 2 },
        py: { xs: 1, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: 650 },
          minHeight: { xs: '98vh', sm: '85vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'auto',
          px: { xs: 0.5, sm: 2 },
          py: { xs: 1, sm: 2 },
          bgcolor: 'white',
          borderRadius: { xs: 0, sm: 2 },
          boxShadow: { xs: 0, sm: 2 },
        }}
      >
        {isMobile ? (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0.5 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontSize="0.7rem"
              >
                Step {activeStep + 1} of {steps.length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
              {steps.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: index <= activeStep ? 'primary.main' : 'grey.300',
                    mx: 0.3,
                    transition: 'background-color 0.3s',
                  }}
                />
              ))}
            </Box>
            <Typography
              variant="subtitle2"
              textAlign="center"
              color="primary.main"
              fontSize="0.9rem"
            >
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

        <Box sx={{ mb: { xs: 1, sm: 3 }, flex: 1 }}>
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
            mt: 1,
            gap: { xs: 0.5, sm: 1 },
            flexDirection: { xs: 'row', sm: 'row' },
          }}
        >
          <Button
            variant="outlined"
            onClick={onBack}
            disabled={activeStep === 0}
            size="small"
            sx={{
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 0.75 },
              flex: { xs: 1, sm: 'none' },
              mr: { xs: 0.5, sm: 0 },
            }}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              size="small"
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                px: { xs: 1, sm: 2 },
                py: { xs: 0.5, sm: 0.75 },
                flex: { xs: 1, sm: 'none' },
              }}
            >
              Start Over
            </Button>
          ) : activeStep === steps.length - 2 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={onNext}
              size="small"
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                px: { xs: 1, sm: 2 },
                py: { xs: 0.5, sm: 0.75 },
                flex: { xs: 1, sm: 'none' },
              }}
            >
              {isMobile ? 'Leaderboard' : 'View Leaderboard'}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={onNext}
              disabled={!canProceed}
              size="small"
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                px: { xs: 1, sm: 2 },
                py: { xs: 0.5, sm: 0.75 },
                flex: { xs: 1, sm: 'none' },
              }}
            >
              {activeStep === 2
                ? isMobile
                  ? 'Score'
                  : 'Calculate Score'
                : 'Continue'}
            </Button>
          )}
        </Box>
        <Box sx={{ textAlign: 'center', width: '100%', mt: 1 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            fontSize="0.6rem"
          >
            © www.mathinenglish.com
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default TabProgress;
