import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { api, type LeaderboardEntry } from '../services/api';

const LeaderboardStep: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await api.getLeaderboard();
        setLeaderboard(data);
      } catch (err) {
        setError('Failed to load leaderboard');
        console.error('Leaderboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
          Loading leaderboard...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          gutterBottom
          textAlign="center"
        >
          🏆 Leaderboard
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            mb: 3,
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
          }}
        >
          Top performers in rounding to the nearest 10
        </Typography>

        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size={isMobile ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                  <strong>Rank</strong>
                </TableCell>
                <TableCell sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                  <strong>Name</strong>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
                >
                  <strong>{isMobile ? 'Score' : 'Best Score'}</strong>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
                >
                  <strong>Attempts</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((entry, index) => (
                <TableRow key={entry.user_name}>
                  <TableCell
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && `#${index + 1}`}
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.875rem' },
                      maxWidth: { xs: 80, sm: 'none' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {entry.user_name}
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '0.7rem', sm: '0.875rem' },
                        color:
                          entry.best_score === 13
                            ? 'success.main'
                            : entry.best_score >= 11
                            ? 'warning.main'
                            : 'text.primary',
                      }}
                    >
                      {entry.best_score}/13
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
                  >
                    {entry.attempts}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {leaderboard.length === 0 && (
          <Typography
            textAlign="center"
            sx={{
              py: 4,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            No submissions yet. Be the first to complete the worksheet!
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default LeaderboardStep;
