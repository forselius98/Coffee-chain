const newBlock = {
  index: this.chain.length,
  timestamp: Date.now(),
  transactions: [...this.pendingTransactions],
  previousHash: this.getLatestBlock().hash,
  nonce: 0,
  hash: ""
};