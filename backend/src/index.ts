import { env, allowedOrigins } from './config/env';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { rateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import portfolioRoutes from './routes/portfolio.routes';
import publicRoutes from './routes/public.routes';
import prisma from './config/prisma';

const app = express();

// Security & compression
app.use(helmet());
app.use(compression());

// CORS
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Body parsing — 10mb limit for base64 photo uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined'));

// Rate limiting
app.use(rateLimiter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/public', publicRoutes);

// Error handler — must be last
app.use(errorHandler);

// Start server
async function start() {
  try {
    await prisma.$connect();
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }

  app.listen(env.PORT, () => {
    console.log(`
========================================
  FolioForge API
  Port:        ${env.PORT}
  Environment: ${env.NODE_ENV}
  Database:    connected
  Routes:
    POST   /api/auth/register
    POST   /api/auth/login
    POST   /api/auth/refresh
    GET    /api/auth/me
    GET    /api/portfolio
    POST   /api/portfolio
    PUT    /api/portfolio
    PATCH  /api/portfolio
    POST   /api/portfolio/publish
    POST   /api/portfolio/unpublish
    DELETE /api/portfolio
    GET    /api/portfolio/pdf
    GET    /api/public/portfolio/:slug
    GET    /api/health
========================================`);
  });
}

start();
