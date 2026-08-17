import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Blockchain API Integrationstester', () => {
  it('GET /blockchain ska returnera status 200 och hela kedjan', async () => {
    const res = await request(app).get('/blockchain');

    expect(res.status).toBe(200);
    expect(res.body.chain).toBeDefined();
    expect(res.body.chain.length).toBeGreaterThanOrEqual(1); // Innehåller minst Genesis-block
  });

  it('POST /transactions ska validera och lägga till transaktionen i pending', async () => {
    const transaction = {
      sender: 'Gård Eko-Kaffe',
      recipient: 'Stockholm Rosteri',
      batchId: 'BATCH-88',
      weightKg: 500
    };

    const res = await request(app)
      .post('/transactions')
      .send(transaction);

    expect(res.status).toBe(201);
    expect(res.body.message).toContain('pendingTransactions');

    // Bekräfta via GET
    const chainRes = await request(app).get('/blockchain');
    expect(chainRes.body.pendingTransactions).toHaveLength(1);
  });

  it('POST /mine ska genomföra PoW och skapa ett nytt block', async () => {
    const res = await request(app).post('/mine');

    expect(res.status).toBe(201);
    expect(res.body.block).toBeDefined();
    expect(res.body.block.transactions).toHaveLength(1);

    // Kontrollera att pending poolen tömdes
    const chainRes = await request(app).get('/blockchain');
    expect(chainRes.body.pendingTransactions).toHaveLength(0);
  });
});