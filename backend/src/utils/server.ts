import express from "express";
import { connect } from "src/utils/db";
import { setupMiddleware } from "src/utils/middleware";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT;

const startServer = () => {
  if (!port) {
    console.error("PORT is not defined in the environment");
    process.exit(1);
  }

  setupMiddleware(app);

  const server = app.listen(port, () => {
    connect();
    console.log(`Server listening on port ${port}`);
  });

  // Close MongoDB connection when server is closed
  process.on("SIGINT", () => {
    server.close(() => {
      mongoose.connection.on("disconnected", () => {
        console.log("Mongoose connection disconnected");
      });

      mongoose.connection.close();
    });
  });
};

export default startServer;
