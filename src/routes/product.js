import { Router } from 'express';

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../services/product.js';
import {
  createProductValidator,
  deleteProductValidator,
  getProductValidator,
  updateProductValidator,
} from '../validations/product.js';

const router = Router();

router.route('/').get(getProducts).post(createProductValidator, createProduct);
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export default router;
