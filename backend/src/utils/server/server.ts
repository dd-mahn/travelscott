import express from "express";
import { connect } from "src/utils/database/db";
import { setupMiddleware } from "src/middlewares/middlewares";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 4080;

// Setup middleware first
setupMiddleware(app);

// Add health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const startServer = () => {
  const server = app.listen(port, () => {
    connect();
    console.log(`Server listening on port ${port}`);
  });

  // Close MongoDB connection when server is closed
  process.on("SIGINT", () => {
    server.close(() => {
      mongoose.connection.close();
    });
  });

  return app;
};

export default startServer;
