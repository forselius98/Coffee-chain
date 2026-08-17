import express from 'express';
import blockchainRoutes from './models/routes/blockchainRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', blockchainRoutes);

export default app;