import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import db from './db';
import { submitBlock, getLastBlock } from './blockchain';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get("/blocks", async (req, res) => {
  const lastBlock = await getLastBlock();
  res.status(200).json(lastBlock);
});

// Add a new block
app.post("/blocks", async (req, res) => {
  const blockData = req.body;

  try {
    await submitBlock(blockData);
    res.status(200).json({ status: "OK" });
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Block submission failed" });
  }
});

app.get('/data', async (req, res) => {
    try {
        const data = await db.executeQuery('SELECT * FROM your_table_name');
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
