import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import categoryRouter from './routes/category.js';
import supCategoryRouter from './routes/subCategory.js';
import brandRouter from './routes/brand.js';
import productRouter from './routes/product.js';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import { connection } from './config/database.js';
import ErrorApi from './utils/error.js';
import globalError from './middleware/error.js';

// Configuration
dotenv.config({ path: '.env' });
connection();
// Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Router
app.use('/api/category', categoryRouter);
app.use('/api/subcategory', supCategoryRouter);
app.use('/api/brand', brandRouter);
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('hello world');
});
app.all('*', (req, res, next) => {
  next(new ErrorApi(`Can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

// Port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
