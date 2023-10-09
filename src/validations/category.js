import { check } from 'express-validator';
import validation from '../middleware/validate.js';
import slugify from 'slugify';

export const getCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validation,
];

export const createCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ max: 32, min: 3 })
    .withMessage('Category name length must be 3-32 chars')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validation,
];

export const updateCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  check('name')
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ max: 32, min: 3 })
    .withMessage('Category name length must be 3-32 chars')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validation,
];

export const deleteCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validation,
];
