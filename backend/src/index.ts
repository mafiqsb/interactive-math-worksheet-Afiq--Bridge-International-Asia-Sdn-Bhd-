import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './database';
import worksheetRoutes from './routes/worksheet';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS to allow frontend requests
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
console.log('Environment variables check:');
console.log(
  'POSTGRES_URL_NON_POOLING:',
  process.env.POSTGRES_URL_NON_POOLING ? 'Set' : 'Missing'
);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Initialize database
try {
  initializeDatabase();
} catch (error) {
  console.error('Database initialization failed:', error);
}

// Routes
app.use('/api/worksheet', worksheetRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Math Worksheet API is running!',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

// Error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
