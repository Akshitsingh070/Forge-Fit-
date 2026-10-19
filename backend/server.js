import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './src/config/db.js';
import { initStorage } from './src/services/storageService.js';
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js';

// Route imports
import authRoutes from './src/routes/authRoutes.js';
import profileRoutes from './src/routes/profileRoutes.js';
import assessmentRoutes from './src/routes/assessmentRoutes.js';
import workoutPlanRoutes from './src/routes/workoutPlanRoutes.js';
import workoutRoutes from './src/routes/workoutRoutes.js';
import sessionRoutes from './src/routes/sessionRoutes.js';
import progressRoutes from './src/routes/progressRoutes.js';
import exerciseRoutes from './src/routes/exerciseRoutes.js';
import recommendationRoutes from './src/routes/recommendationRoutes.js';
import nutritionRoutes from './src/routes/nutritionRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.path}`);
    next();
  });
}

// Health & System Info endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'ForgeFit AI Engine v2.4',
    timestamp: new Date().toISOString(),
    database: getDBStatus(),
    aiEngine: process.env.GEMINI_API_KEY ? 'Google Gemini Live' : 'ForgeFit Bio-Adaptive Neural Engine',
  });
});

// API Routes mounting
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/workout-plan', workoutPlanRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/workout-session', sessionRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/nutrition', nutritionRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Initialize persistence & start server
const startServer = async () => {
  await connectDB();
  await initStorage();

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`⚡ ForgeFit AI Production Server running on port ${PORT}`);
    console.log(`⚡ Health: http://localhost:${PORT}/api/health`);
    console.log(`=======================================================`);
  });
};

startServer();
