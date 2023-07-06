import { Router } from 'express';
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
} from '../services/subCategory.js';
// import {
//   createCategory,
//   deleteCategory,
//   getCategories,
//   getCategory,
//   updateCategory,
// } from '../services/category.js';
// import {
//   createCategoryValidator,
//   deleteCategoryValidator,
//   getCategoryValidator,
//   updateCategoryValidator,
// } from '../validations/category.js';

const router = Router();

router.route('/').get(getSubCategories).post(createSubCategory);
router
  .route('/:id')
  .get(getSubCategory)
  .put(updateSubCategory)
  .delete(deleteSubCategory);

export default router;
