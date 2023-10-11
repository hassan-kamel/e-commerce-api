import { Router } from 'express';
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from '../services/brand.js';
import {
  createBrandValidator,
  deleteBrandValidator,
  getBrandValidator,
  updateBrandValidator,
} from '../validations/brand.js';
import { addImageNameToRequestBodyObject, uploadSingleImage } from '../middleware/uploadImage.js';

const router = Router();

router
  .route('/')
  .get(getBrands)
  .post(
    uploadSingleImage('image'),
    addImageNameToRequestBodyObject(),
    createBrandValidator,
    createBrand,
  );
router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(
    uploadSingleImage('image'),
    addImageNameToRequestBodyObject(),
    updateBrandValidator,
    updateBrand,
  )
  .delete(deleteBrandValidator, deleteBrand);

export default router;
