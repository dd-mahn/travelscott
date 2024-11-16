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
    
    const server = app.listen(port as number, '0.0.0.0', () => {
      console.log(`Server listening on port ${port} on all interfaces`);
    });

    // Add health check logging
    app.use((req, res, next) => {
      if (req.path === '/api/health') {
        console.log('Health check requested');
      }
      next();
    });

    // Improved error handling
    server.on('error', (error: Error) => {
      console.error('Server error:', error);
      process.exit(1);
    });

    // Close MongoDB connection when server is closed
    process.on("SIGINT", () => {
      server.close(() => {
        mongoose.connection.close();
      });
    });

    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

export { app };
export default startServer;
