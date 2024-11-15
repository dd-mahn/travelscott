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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

export const setupMiddleware = (app) => {
  // Security middleware
  app.use(helmet());
  app.use(limiter);
  
  // Request parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  
  // CORS setup
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? config.security.allowedOrigins 
      : ['http://localhost:5173', 'http://localhost:4173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
  
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
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  }));

  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
  });
};
