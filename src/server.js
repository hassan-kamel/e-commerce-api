import express from 'express';
import categoryRouter from './routes/category.js';
import dotenv from 'dotenv';
import { connection } from './config/database.js';

// Configuration
dotenv.config({ path: 'config.env' });
connection();
// Express
const app = express();

// Middleware
app.use(express.json());

// Router
app.use('/api/category', categoryRouter);
app.get('/', (req, res) => {
  res.send('hello world');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
