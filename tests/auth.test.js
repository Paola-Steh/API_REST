const request = require('supertest');
const app = require('../src/app');
const { connect, closeDatabase, clearDatabase } = require('./setup');

beforeAll(async () => { await connect(); });
afterEach(async () => { await clearDatabase(); });
afterAll(async () => { await closeDatabase(); });

test('register and login', async () => {
  const user = { name: 'Ana', email: 'ana@example.com', password: 'password123' };
  const r1 = await request(app).post('/api/v1/auth/register').send(user);
  expect(r1.statusCode).toBe(201);
  expect(r1.body.success).toBe(true);
  expect(r1.body.data.token).toBeDefined();

  const r2 = await request(app).post('/api/v1/auth/login').send({ email: user.email, password: user.password });
  expect(r2.statusCode).toBe(200);
  expect(r2.body.success).toBe(true);
  expect(r2.body.data.token).toBeDefined();
});

