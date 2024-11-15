import startServer from "src/utils/server/server";

(async () => {
  try {
    await startServer();
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
})();