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
import { uploadMixOfImages, addImageNameToRequestBodyObject } from '../middleware/uploadImage.js';
import { allowedTo, protect } from '../services/auth.js';

const router = Router();

router
  .route('/')
  .get(getProducts)
  .post(
    protect,
    allowedTo('admin'),
    uploadMixOfImages([
      {
        name: 'imageCover',
        maxCount: 1,
      },
      {
        name: 'images',
        maxCount: 5,
      },
    ]),
    addImageNameToRequestBodyObject(),
    createProductValidator,
    createProduct,
  );
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(
    protect,
    allowedTo('admin'),
    uploadMixOfImages([
      {
        name: 'imageCover',
        maxCount: 1,
      },
      {
        name: 'images',
        maxCount: 5,
      },
    ]),
    addImageNameToRequestBodyObject(),
    updateProductValidator,
    updateProduct,
  )
  .delete(protect, allowedTo('admin'), deleteProductValidator, deleteProduct);

export default router;
