import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors(), express.json());

const PORT = process.env.PORT || 4000;
app.get('/health', (_req, res) => res.send({ status: 'ok' }));

app.listen(PORT, () => 
  console.log(`🚀 API running on http://localhost:${PORT}`)
);