import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import config from "src/config/config";
import destinationRoutes from "src/routes/destination";
import feedbackRoutes from "src/routes/feedback";
import blogRoutes from "src/routes/blog";
import countryRoutes from "src/routes/country";
import subscribeRoutes from "src/routes/subscribe";
import authRoutes from "src/routes/auth";
import { errorHandler } from "src/middlewares/errorHandler";
import mongoose from "mongoose";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Export CORS options
export const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://travelscott.vercel.app', 'https://staging-travelscott.vercel.app', 'https://railway.app', 'healthcheck.railway.com', 'http://localhost:5173', 'http://localhost:4173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:4173']
    : '*', // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

export const setupMiddleware = (app) => {
  // Basic Helmet security headers first
  app.use(helmet({
    contentSecurityPolicy: false // Temporarily disable CSP
  }));
  app.use(limiter);
  
  // CORS setup next
  app.options('*', cors(corsOptions)); // Handle preflight requests
  app.use(cors(corsOptions));
  
  // Request parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  
  app.use(cookieParser());
  
  // Routes
  app.use("/api/destinations", destinationRoutes);
  app.use("/api/feedback", feedbackRoutes);
  app.use("/api/blogs", blogRoutes);
  app.use("/api/countries", countryRoutes);
  app.use("/api/subscribe", subscribeRoutes);
  app.use("/api/auth", authRoutes);

  app.use(errorHandler);

  app.disable('x-powered-by');
  // Apply CSP after CORS if needed, with adjusted settings
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:5173", "http://localhost:4173"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  }));

  app.get('/api/health', async (req, res) => {
    try {
      const dbState = mongoose.connection.readyState;
      if (dbState === 1) {
        res.status(200).json({ 
          status: 'healthy', 
          database: 'connected',
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(503).json({ 
          status: 'unhealthy', 
          database: 'disconnected',
          dbState,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error: any) {
      res.status(503).json({ 
        status: 'unhealthy', 
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });
};
