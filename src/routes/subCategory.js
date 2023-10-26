import { Router } from 'express';
import {
  createFilterObj,
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSubCategory,
  setCategoryIdToBody,
  updateSubCategory,
} from '../services/subCategory.js';
import {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
} from '../validations/subCategory.js';
import { allowedTo, protect } from '../services/auth.js';

const router = Router({ mergeParams: true });

router
  .route('/')
  .get(createFilterObj, getSubCategories)
  .post(
    protect,
    allowedTo('admin'),
    setCategoryIdToBody,
    createSubCategoryValidator,
    createSubCategory,
  );
router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategory)
  .put(protect, allowedTo('admin'), updateSubCategoryValidator, updateSubCategory)
  .delete(protect, allowedTo('admin'), deleteSubCategoryValidator, deleteSubCategory);

export default router;
