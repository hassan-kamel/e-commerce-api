import slugify from 'slugify';
import Category from '../models/category.js';
import asyncHandler from 'express-async-handler';
import ErrorApi from '../utils/error.js';

/**
 * @desc    List All Categories
 * @route   GET /api/category
 * @access  public
 */
export const getCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  console.log('categories: ', categories);
  res.status(200).json({ result: categories.length, page, data: categories });
});
/**
 * @desc    Create New Category
 * @route   POST /api/category
 * @access  private
 */
export const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
/**
 * @desc    Retrieve Specific Category
 * @route   GET /api/category/:id
 * @access  public
 */
export const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ErrorApi(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});
/**
 * @desc    Edit Specific Category
 * @route   PUT /api/category/:id
 * @access  private
 */
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true },
  );
  if (!category) {
    return next(new ErrorApi(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});
/**
 * @desc    Remove Specific Category
 * @route   Delete /api/category/:id
 * @access  private
 */
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndRemove(id);
  if (!category) {
    return next(new ErrorApi(`No category for this id ${id}`, 404));
  }
  res.status(201).json({ deleted: category });
});
