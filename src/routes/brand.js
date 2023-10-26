import { Router } from 'express';
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from '../services/brand.js';
import {
  createBrandValidator,
  deleteBrandValidator,
  getBrandValidator,
  updateBrandValidator,
} from '../validations/brand.js';
import { addImageNameToRequestBodyObject, uploadSingleImage } from '../middleware/uploadImage.js';
import { allowedTo, protect } from '../services/auth.js';

const router = Router();

router
  .route('/')
  .get(getBrands)
  .post(
    protect,
    allowedTo('admin'),
    uploadSingleImage('image'),
    addImageNameToRequestBodyObject(),
    createBrandValidator,
    createBrand,
  );
router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(
    protect,
    allowedTo('admin'),
    uploadSingleImage('image'),
    addImageNameToRequestBodyObject(),
    updateBrandValidator,
    updateBrand,
  )
  .delete(protect, allowedTo('admin'), deleteBrandValidator, deleteBrand);

export default router;
