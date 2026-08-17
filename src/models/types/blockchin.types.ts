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
    nonce: number;
    hash: string;
}
