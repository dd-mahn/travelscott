import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import destinationRoutes from "src/routes/destination";
import feedbackRoutes from "src/routes/feedback";
import blogRoutes from "src/routes/blog";
import countryRoutes from "src/routes/country";
import subscribeRoutes from "src/routes/subscribe";
import { errorHandler } from "src/middlewares/errorHandler";

export const corsOptions = {
  origin: true,
  credentials: true,
};

export const setupMiddleware = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use("/api/destinations", destinationRoutes);
  app.use("/api/feedback", feedbackRoutes);
  app.use("/api/blogs", blogRoutes);
  app.use("/api/countries", countryRoutes);
  app.use("/api/subscribe", subscribeRoutes);

  // Error handling middleware
  app.use(errorHandler);
};
