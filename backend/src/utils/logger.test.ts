import logger, { logControllerError } from 'src/utils/logger';

// Mock winston
jest.mock('winston', () => ({
  format: {
    timestamp: jest.fn(() => ''),
    json: jest.fn(() => ''),
    combine: jest.fn(),
    colorize: jest.fn(),
    simple: jest.fn(),
  },
  transports: {
    File: jest.fn(),
    Console: jest.fn(),
  },
  createLogger: jest.fn(() => ({
    error: jest.fn(),
    add: jest.fn(),
  })),
}));

describe('Logger', () => {
  describe('logControllerError', () => {
    beforeEach(() => {
      // Clear mock calls between tests
      jest.clearAllMocks();
    });

    it('should log Error instances with stack trace', () => {
      const testError = new Error('Test error message');
      const controllerName = 'TestController';

      logControllerError(controllerName, testError);

      expect(logger.error).toHaveBeenCalledWith(
        'Error in TestController: Test error message',
        {
          controllerName,
          errorMessage: testError.message,
          stackTrace: testError.stack,
        }
      );
    });

    it('should log unknown errors', () => {
      const testError = { custom: 'error' };
      const controllerName = 'TestController';

      logControllerError(controllerName, testError);

      expect(logger.error).toHaveBeenCalledWith(
        'Unknown error in TestController',
        {
          controllerName,
          error: testError,
        }
      );
    });
  });
});
