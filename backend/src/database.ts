import { createClient } from '@vercel/postgres';
import Database from 'better-sqlite3';

const isLocal = !process.env.POSTGRES_URL_NON_POOLING && !process.env.VERCEL;
let client: any;
let db: Database.Database | null = null;

if (isLocal) {
  // Use SQLite for local development
  db = new Database('dev.db');
} else {
  // Use Vercel Postgres for production
  client = createClient({
    connectionString:
      process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL,
  });
}

export interface UserSubmission {
  id?: number;
  user_name: string;
  answers: Record<number, string>;
  score: number;
  total_questions: number;
  submitted_at?: Date;
}

export async function initializeDatabase() {
  try {
    if (isLocal && db) {
      // SQLite setup
      db.exec(`
        CREATE TABLE IF NOT EXISTS submissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_name TEXT NOT NULL,
          answers TEXT NOT NULL,
          score INTEGER NOT NULL,
          total_questions INTEGER NOT NULL,
          submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Local SQLite database initialized successfully');
    } else if (client) {
      // PostgreSQL setup
      await client.connect();
      await client.sql`
        CREATE TABLE IF NOT EXISTS submissions (
          id SERIAL PRIMARY KEY,
          user_name VARCHAR(255) NOT NULL,
          answers JSONB NOT NULL,
          score INTEGER NOT NULL,
          total_questions INTEGER NOT NULL,
          submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      console.log('PostgreSQL database initialized successfully');
    }
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

export async function saveSubmission(submission: UserSubmission) {
  try {
    if (isLocal && db) {
      const stmt = db.prepare(`
        INSERT INTO submissions (user_name, answers, score, total_questions)
        VALUES (?, ?, ?, ?)
      `);
      const result = stmt.run(
        submission.user_name,
        JSON.stringify(submission.answers),
        submission.score,
        submission.total_questions
      );
      return { id: result.lastInsertRowid, ...submission };
    } else if (client) {
      const result = await client.sql`
        INSERT INTO submissions (user_name, answers, score, total_questions)
        VALUES (${submission.user_name}, ${JSON.stringify(
        submission.answers
      )}, ${submission.score}, ${submission.total_questions})
        RETURNING *
      `;
      return result.rows[0];
    }
  } catch (error) {
    console.error('Error saving submission:', error);
    throw error;
  }
}

export async function getSubmissions(userName?: string) {
  try {
    if (isLocal && db) {
      const query = userName
        ? `SELECT * FROM submissions WHERE user_name = ? ORDER BY submitted_at DESC`
        : `SELECT * FROM submissions ORDER BY submitted_at DESC`;

      const stmt = userName ? db.prepare(query) : db.prepare(query);
      const rows = userName ? stmt.all(userName) : stmt.all();

      return (rows as Record<string, any>[]).map((row) => ({
        ...row,
        answers: JSON.parse(row.answers as string),
      }));
    } else if (client) {
      if (userName) {
        const result = await client.sql`
          SELECT * FROM submissions 
          WHERE user_name = ${userName}
          ORDER BY submitted_at DESC
        `;
        return result.rows;
      } else {
        const result = await client.sql`
          SELECT * FROM submissions 
          ORDER BY submitted_at DESC
        `;
        return result.rows;
      }
    }
    return [];
  } catch (error) {
    console.error('Error getting submissions:', error);
    throw error;
  }
}

export async function getLeaderboard() {
  try {
    if (isLocal && db) {
      const stmt = db.prepare(`
        SELECT 
          user_name,
          MAX(score) as best_score,
          COUNT(*) as attempts
        FROM submissions
        GROUP BY user_name
        ORDER BY best_score DESC, attempts ASC
        LIMIT 10
      `);
      return stmt.all();
    } else if (client) {
      const result = await client.sql`
        SELECT 
          user_name,
          MAX(score) as best_score,
          COUNT(*) as attempts
        FROM submissions
        GROUP BY user_name
        ORDER BY best_score DESC, attempts ASC
        LIMIT 10
      `;
      return result.rows;
    }
    return [];
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    throw error;
  }
}
