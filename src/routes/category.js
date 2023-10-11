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

const router = Router();

router.use('/:categoryId/subcategory', subCategoryRouter);

router
  .route('/')
  .get(getCategories)
  .post(
    uploadSingleImage('image'),
    addImageNameToRequestBodyObject(),
    createCategoryValidator,
    createCategory,
  );
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(
    uploadSingleImage('image'),
    addImageNameToRequestBodyObject(),
    updateCategoryValidator,
    updateCategory,
  )
  .delete(deleteCategoryValidator, deleteCategory);

export default router;
