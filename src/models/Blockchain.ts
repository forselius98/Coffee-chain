import crypto from 'crypto';
import { Block, Transaction } from '../types/blockchain.types';
export class Blockchain {
  public chain: Block[];
  public pendingTransactions: Transaction[];
  public difficulty: number;

  constructor() {
    this.pendingTransactions = [];
    
   
    this.difficulty = process.env.NODE_ENV === 'test' ? 1 : 3;

  
    this.chain = [this.createGenesisBlock()];
  }

  private createGenesisBlock(): Block {
    return {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      previousHash: '0',
      nonce: 0,
      hash: 'genesis-hash'
    };
  }


  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public addTransaction(transaction: Transaction): void {
    this.pendingTransactions.push(transaction);
  }

  public calculateHash(
    index: number,
    previousHash: string,
    transactions: Transaction[],
    nonce: number
  ): string {
    const dataString = index + previousHash + JSON.stringify(transactions) + nonce;
    return crypto.createHash('sha256').update(dataString).digest('hex');
  }

  public minePendingTransactions(): Block {
    const latestBlock = this.getLatestBlock();

    const newBlock: Block = {
      index: this.chain.length,
      timestamp: Date.now(),
      transactions: [...this.pendingTransactions],
      previousHash: latestBlock.hash,
      nonce: 0,
      hash: ''
    };

    const target = '0'.repeat(this.difficulty);

 // PROOF-OF-WORK LOOP
    while (!newBlock.hash.startsWith(target)) {
      newBlock.nonce++;
      newBlock.hash = this.calculateHash(
        newBlock.index,
        newBlock.previousHash,
        newBlock.transactions,
        newBlock.nonce
      );
    }

    // Lägg till det minade blocket i kedjan
    this.chain.push(newBlock);

    // Töm poolen med väntande transaktioner för nästa parti
    this.pendingTransactions = [];

    return newBlock;
  }
}