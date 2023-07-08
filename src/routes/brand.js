import { Router } from 'express';
import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} from '../services/brand.js';
import {
  createBrandValidator,
  deleteBrandValidator,
  getBrandValidator,
  updateBrandValidator,
} from '../validations/brand.js';

const router = Router();

router.route('/').get(getBrands).post(createBrandValidator, createBrand);
router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

export default router;
