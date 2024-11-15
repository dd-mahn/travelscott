// Mock config before any imports
jest.mock('src/config/config', () => ({
  default: {
    dbUri: 'mongodb://localhost:27017/test'
  }
}));

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, dbName } from 'src/utils/database/db';

describe.skip('Database Connection', () => {
  let mongoServer: MongoMemoryServer;
  const originalEnv = process.env;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env = { ...originalEnv };
    process.env.MONGO_URI = mongoServer.getUri();
  });

  afterAll(async () => {
    process.env = originalEnv;
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('should connect to test database', async () => {
    await connect();
    expect(mongoose.connection.readyState).toBe(1);
    expect(mongoose.connection.name).toBe(dbName);
  });

  it('should handle connection errors', async () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    const invalidUri = 'mongodb://invalid:27017';
    process.env.MONGO_URI = invalidUri;
    
    await connect();

    expect(mockExit).toHaveBeenCalledWith(1);
    mockExit.mockRestore();
  });
});
