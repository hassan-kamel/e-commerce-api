import { check } from 'express-validator';
import validation from '../middleware/validate.js';

export const getBrandValidator = [
  check('id').isMongoId().withMessage('Invalid brand id format'),
  validation,
];

export const createBrandValidator = [
  check('name')
    .notEmpty()
    .withMessage('Brand name is required')
    .isLength({ max: 32, min: 3 })
    .withMessage('Brand name length must be 3-32 chars'),
  validation,
];

export const updateBrandValidator = [
  check('id').isMongoId().withMessage('Invalid brand id format'),
  check('name')
    .notEmpty()
    .withMessage('Brand name is required')
    .isLength({ max: 32, min: 3 })
    .withMessage('Brand name length must be 3-32 chars'),
  validation,
];

export const deleteBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand id format'),
  validation,
];
