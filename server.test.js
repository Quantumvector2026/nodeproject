import request from 'supertest';
import app from './server';

describe('IndusBank API Endpoints', () => {
  
  test('GET / should return bank info and status', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.bank).toBe('IndusBank');
    expect(res.body.status).toBe('ONLINE');
  });

  test('GET /api/rates should return current interest rates', async () => {
    const res = await request(app).get('/api/rates');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('savings');
    expect(res.body).toHaveProperty('fixedDeposit');
    expect(res.body).toHaveProperty('homeLoan');
  });
});
