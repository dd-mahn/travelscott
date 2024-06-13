import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import destinationRoutes from 'src/routes/destination';
import feedbackRoutes from 'src/routes/feedback';
import blogRoutes from 'src/routes/blog';

export const corsOptions = {
  origin: true,
  credentials: true,
};

export const setupMiddleware = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use('/api/destinations', destinationRoutes);
  app.use('/api/feedback', feedbackRoutes);
  app.use('/api/blogs', blogRoutes);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
};