import { describe, it, expect } from 'vitest';
import { Blockchain } from '../models/Blockchain';

describe('Blockchain Unit Tests (PoW)', () => {
  it('Bör byta ett block med en hash som matchar svårighetsgraden', () => {
    const blockchain = new Blockchain();
    
// En test-transaktion
    blockchain.addTransaction({
      sender: 'Farm A',
      recipient: 'Roaster B',
      batchId: 'BATCH-123',
      weightKg: 100
    });

    const newBlock = blockchain.minePendingTransactions();

    expect(newBlock.hash.startsWith('0')).toBe(true);
    expect(newBlock.previousHash).toBe(blockchain.chain[0].hash);
  });
});