import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import blockchainRouter from './routes/blockchain.route';
import { errorMiddleware } from './utils/error.util';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use("/", blockchainRouter);
app.use(errorMiddleware);

// Start app
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
