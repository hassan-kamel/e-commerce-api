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

const router = Router({ mergeParams: true });

router
  .route('/')
  .get(createFilterObj, getSubCategories)
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory);
router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

export default router;
