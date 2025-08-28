const API_BASE_URL = 'http://localhost:3001/api/worksheet';

export interface SubmissionData {
  userName: string;
  answers: Record<number, string>;
  score: number;
  totalQuestions: number;
}

export interface LeaderboardEntry {
  user_name: string;
  best_score: number;
  attempts: number;
}

export const api = {
  async submitWorksheet(data: SubmissionData) {
    try {

      const response = await fetch(`${API_BASE_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'cors',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Fetch error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(
          'Cannot connect to server. Make sure the backend is running on port 3001.'
        );
      }
      throw error;
    }
  },

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {

      const response = await fetch(`${API_BASE_URL}/leaderboard`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Leaderboard error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Leaderboard fetch error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(
          'Cannot connect to server. Make sure the backend is running on port 3001.'
        );
      }
      throw error;
    }
  },

  async getSubmissions(userName?: string) {
    const url = userName
      ? `${API_BASE_URL}/submissions/${encodeURIComponent(userName)}`
      : `${API_BASE_URL}/submissions`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};
