// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import destinationRoutes from "src/routes/destination";
// import feedbackRoutes from "src/routes/feedback";

// dotenv.config();

// if (process.env.MONGO_URI === undefined) {
//   console.error("MONGO_URI is not defined in the environment");
//   process.exit(1);
// }

// const dbName = process.env.DB_NAME || "CollectionDB";
// const mongoUri: string = process.env.MONGO_URI;

// mongoose.set("strictQuery", false);

// const connect = async () => {
//   try {
//     await mongoose.connect(mongoUri, { dbName });
//     console.log("Database connected");
//   } catch (error) {
//     console.error("Error connecting to database:", error);
//     process.exit(1);
//   }
// };

// const corsOptions = {
//   origin: true,
//   credentials: true,
// };

// const setupMiddleware = (app) => {
//   app.use(express.json());
//   app.use(cors(corsOptions));
//   app.use(cookieParser());
//   app.use("/api/destinations", destinationRoutes);
//   app.use("/api/feedback", feedbackRoutes);

//   // Error handling middleware
//   app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send("Something broke!");
//   });
// };

// const app = express();
// const port = process.env.PORT;

// const startServer = () => {
//   if (!port) {
//     console.error("PORT is not defined in the environment");
//     process.exit(1);
//   }

//   setupMiddleware(app);

//   const server = app.listen(port, () => {
//     connect();
//     console.log(`Server listening on port ${port}`);
//   });

//   // Close MongoDB connection when server is closed
//   process.on("SIGINT", () => {
//     server.close(() => {
//       mongoose.connection.on("disconnected", () => {
//         console.log("Mongoose connection disconnected");
//       });

//       mongoose.connection.close();
//     });
//   });
// };

// startServer();

import startServer from "./utils/server";

startServer();