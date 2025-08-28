import express from 'express';
import { saveSubmission, getSubmissions, getLeaderboard } from '../database';

const router = express.Router();

// Submit worksheet answers
router.post('/submit', async (req, res) => {
  try {
    console.log('Received submission request');
    console.log('Request body:', req.body);

    const { userName, answers, score, totalQuestions } = req.body;

    if (!userName || !answers || score === undefined || !totalQuestions) {
      console.log('Missing required fields');
      return res.status(400).json({
        error:
          'Missing required fields: userName, answers, score, totalQuestions',
      });
    }

    console.log('Saving submission for user:', userName);
    const submission = await saveSubmission({
      user_name: userName,
      answers,
      score,
      total_questions: totalQuestions,
    });

    console.log('Submission saved successfully:', submission);
    res.json({
      message: 'Submission saved successfully',
      submission,
    });
  } catch (error) {
    console.error('Submit error:', error);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// Get user's submission history
router.get('/submissions/:userName', async (req, res) => {
  try {
    const { userName } = req.params;
    const submissions = await getSubmissions(userName);
    res.json(submissions);
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ error: 'Failed to get submissions' });
  }
});

// Get all submissions (admin)
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await getSubmissions();
    res.json(submissions);
  } catch (error) {
    console.error('Get all submissions error:', error);
    res.status(500).json({ error: 'Failed to get submissions' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    console.log('Received leaderboard request');
    const leaderboard = await getLeaderboard();
    console.log('Leaderboard data:', leaderboard);
    res.json(leaderboard);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ error: 'Failed to get leaderboard' });
  }
});

export default router;
