import { check } from 'express-validator';
import validation from '../middleware/validate.js';

export const getSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subCategory id format'),
  validation,
];

export const createSubCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('SubCategory name is required')
    .isLength({ max: 32, min: 3 })
    .withMessage('SubCategory name length must be 3-32 chars'),
  check('category')
    .notEmpty()
    .withMessage('subCategory must be belong to category')
    .isMongoId()
    .withMessage('Invalid Category id format'),
  validation,
];

export const updateSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subCategory id format'),
  check('name')
    .notEmpty()
    .withMessage('SubCategory name is required')
    .isLength({ max: 32, min: 3 })
    .withMessage('SubCategory name length must be 3-32 chars'),
  check('category')
    .notEmpty()
    .withMessage('subCategory must be belong to category')
    .isMongoId()
    .withMessage('Invalid Category id format'),
  validation,
];

export const deleteSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subCategory id format'),
  validation,
];
