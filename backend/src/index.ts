import startServer from "src/utils/server/server";

(async () => {
  try {
    const server = await startServer();
    
    // Add error handler for uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      server.close(() => process.exit(1));
    });

  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
})();