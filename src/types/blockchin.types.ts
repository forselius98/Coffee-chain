import e from "express";

export interface Transaction {
    sender: string;
    recipient: string;
    batchId: string;
    weightKg: number;
}

export interface Block {
    index: number;
    timestamp: number;
    transactions: Transaction[];
    previousHash: string;
    hash: string;
    nonce: number;
}