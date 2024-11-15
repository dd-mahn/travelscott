import dotenv from 'dotenv';

// Mock dotenv first, before other imports
jest.mock('dotenv', () => ({
  config: jest.fn().mockReturnValue({ parsed: {} })
}));

// Mock AWS SDK
const mockUpdateFn = jest.fn();
const mockS3Constructor = jest.fn();

jest.mock('aws-sdk', () => ({
  config: {
    update: mockUpdateFn
  },
  S3: mockS3Constructor
}));

describe('AWS Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    
    process.env.AWS_ACCESS_KEY_ID = 'test-access-key';
    process.env.AWS_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.AWS_REGION = 'test-region';

    // Clear mock calls
    mockUpdateFn.mockClear();
    mockS3Constructor.mockClear();
    (dotenv.config as jest.Mock).mockClear();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should configure AWS with environment variables', () => {
    require('./aws');

    expect(mockUpdateFn).toHaveBeenCalledWith({
      accessKeyId: 'test-access-key',
      secretAccessKey: 'test-secret-key',
      region: 'test-region'
    });
  });

  it('should initialize S3 instance', () => {
    require('./aws');
    expect(mockS3Constructor).toHaveBeenCalled();
  });
  
  it('should handle missing environment variables', () => {
    delete process.env.AWS_ACCESS_KEY_ID;
    delete process.env.AWS_SECRET_ACCESS_KEY;
    delete process.env.AWS_REGION;

    require('./aws');

    expect(mockUpdateFn).toHaveBeenCalledWith({
      accessKeyId: undefined,
      secretAccessKey: undefined,
      region: undefined
    });
  });
});
