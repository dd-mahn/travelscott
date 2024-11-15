import request from 'supertest';
import startServer from 'src/utils/server/server';

jest.mock('src/utils/database/db', () => ({
  connect: jest.fn()
}));

describe('Server', () => {
  let app;

  beforeEach(() => {
    app = startServer();
  });

  it('should setup basic middleware and respond to health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
