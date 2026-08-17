import express from 'express';
import blockchainRoutes from './models/routes/blockchainRoutes.ts';

const app = express();

app.use(express.json());
app.use('/api', blockchainRoutes);

export default app;