import request from 'supertest';
import startServer, { app } from 'src/utils/server/server';
import mongoose from 'mongoose';

jest.mock('src/utils/database/db', () => ({
  connect: jest.fn()
}));

describe('Server', () => {
  let server;

  beforeEach(async () => {
    server = await startServer();
  });

  afterEach(() => {
    server.close();
    mongoose.connection.close();
  });

  it('should setup basic middleware and respond to health check', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('should listen on configured port', () => {
    expect(server.address().port).toBe(Number(process.env.PORT) || 4080);
  });
});
