import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: 'config.env' });

mongoose.connect(process.env.DB_URI).then((conn) => {
  console.log({ connection: conn.connection.host });
});
const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
