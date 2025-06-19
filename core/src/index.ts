import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import blockchainRouter from './routes/blockchain.route';
import { errorMiddleware } from './utils/error.util';
import cors from "cors";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 7123;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/", blockchainRouter);
app.use(errorMiddleware);

// Start app
app.listen(port, () => {
  console.log(`Blockchain core is running http://localhost:${port}`);
});
