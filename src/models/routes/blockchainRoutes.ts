import { Router, type Request, type Response } from 'express';
import { Blockchain } from '../Blockchain.js';

const router = Router();
export const blockchain = new Blockchain();

//GET /blockchain - Hämtar hela kedjan och väntande transaktioner
router.get('/blockchain', (req: Request, res: Response) => {
  res.status(200).json({
    chain: blockchain.chain,
    pendingTransactions: blockchain.pendingTransactions
  });
});

// POST /transactions - Validerar och lägger till en ny transaktion
router.post('/transactions', (req: Request, res: Response) => {
  const { sender, recipient, batchId, weightKg } = req.body;

  if (!sender || !recipient || !batchId || typeof weightKg !== 'number') {
    return res.status(400).json({ 
      error: 'Valideringsfel: sender, recipient, batchId och weightKg (nummer) krävs.' 
    });
  }

  blockchain.addTransaction({ sender, recipient, batchId, weightKg });

  res.status(201).json({ 
    message: 'Transaktionen har lagts till i pendingTransactions.' 
  });
});

// POST /mine - Minar ett nytt block med Proof-of-Work
router.post('/mine', (req: Request, res: Response) => {
  if (blockchain.pendingTransactions.length === 0) {
    return res.status(400).json({ 
      error: 'Det finns inga väntande transaktioner att mina.' 
    });
  }

  const newBlock = blockchain.minePendingTransactions();

  res.status(201).json({
    message: 'Nytt block framgångsrikt minat!',
    block: newBlock
  });
});

export default router;