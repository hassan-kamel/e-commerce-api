import SubCategory from '../models/subCategory.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from './factory.js';

/**
 * @desc    List All Sub Categories
 * @route   GET /api/subcategory
 * @access  public
 */
export const getSubCategories = getAll(SubCategory);

/**
 * @desc    Create New Category
 * @route   POST /api/category
 * @access  private
 */
export const createSubCategory = createOne(SubCategory);
/**
 * @desc    Retrieve Specific Category
 * @route   GET /api/category/:id
 * @access  public
 */
export const getSubCategory = getOne(SubCategory);
/**
 * @desc    Edit Specific Category
 * @route   PUT /api/category/:id
 * @access  private
 */
export const updateSubCategory = updateOne(SubCategory);
/**
 * @desc    Remove Specific Category
 * @route   Delete /api/category/:id
 * @access  private
 */
export const deleteSubCategory = deleteOne(SubCategory);

// Nested route
/**
 * @desc    Middleware for creation Sub Categories belongs to Category ID
 * @route   Post /api/v1/categories/:categoryId/subcategories/
 * @access  private
 */
export const setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
/**
 * @desc    Middleware for filtration Sub Categories bases on Category ID
 * @route   GET /api/v1/categories/:categoryId/subcategories/
 * @access  public
 */
export const createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};
