import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export const logControllerError = (controllerName: string, error: unknown) => {
  if (error instanceof Error) {
    logger.error(`Error in ${controllerName}: ${error.message}`, {
      controllerName,
      errorMessage: error.message,
      stackTrace: error.stack
    });
  } else {
    logger.error(`Unknown error in ${controllerName}`, {
      controllerName,
      error
    });
  }
};

export default logger;
