import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'interactive-math-worksheet-afiq-bri.vercel.app',
      /\.vercel\.app$/,
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

console.log('Starting server...');

// Initialize database
async function startServer() {
  try {
    const { initializeDatabase } = await import('./database');
    await initializeDatabase();
  } catch (error) {
    console.error('Database initialization failed:', error);
  }

  const worksheetRoutes = await import('./routes/worksheet');
  app.use('/api/worksheet', worksheetRoutes.default);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

export default app;
