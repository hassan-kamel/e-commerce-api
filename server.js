import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: 'config.env' });

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
