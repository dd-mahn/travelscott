import express from "express";
import { connect } from "src/utils/database/db";
import { setupMiddleware } from "src/middlewares/middlewares";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 4080;

// Setup middleware first
setupMiddleware(app);

const startServer = async () => {
  try {
    // Connect to database first
    await connect();
    
    const server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    // Close MongoDB connection when server is closed
    process.on("SIGINT", () => {
      server.close(() => {
        mongoose.connection.close();
      });
    });

    return app;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

export default startServer;
