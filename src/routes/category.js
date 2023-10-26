import { Router } from 'express';

import subCategoryRouter from './subCategory.js';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../services/category.js';
import {
  createCategoryValidator,
  deleteCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
} from '../validations/category.js';
import { addImageNameToRequestBodyObject, uploadSingleImage } from '../middleware/uploadImage.js';
import { allowedTo, protect } from '../services/auth.js';

const router = Router();

router.use('/:categoryId/subcategory', subCategoryRouter);

router
  .route('/')
  .get(getCategories)
  .post(
    protect,
    allowedTo('admin'),
    uploadSingleImage('image'),
    addImageNameToRequestBodyObject(),
    createCategoryValidator,
    createCategory,
  );
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(
    protect,
    allowedTo('admin'),
    uploadSingleImage('image'),
    addImageNameToRequestBodyObject(),
    updateCategoryValidator,
    updateCategory,
  )
  .delete(protect, allowedTo('admin'), deleteCategoryValidator, deleteCategory);

export default router;
