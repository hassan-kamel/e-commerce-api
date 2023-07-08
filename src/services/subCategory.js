import slugify from 'slugify';
import SubCategory from '../models/subCategory.js';
import asyncHandler from 'express-async-handler';
import ErrorApi from '../utils/error.js';

/**
 * @desc    List All Sub Categories
 * @route   GET /api/subcategory
 * @access  public
 */
export const getSubCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const filterObject = { category: req.params.categoryId } || {};
  console.log('filterObject: ', filterObject);
  const subCategories = await SubCategory.find(filterObject)
    .skip(skip)
    .limit(limit);
  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

/**
 * @desc    Create New Category
 * @route   POST /api/category
 * @access  private
 */
export const createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});
/**
 * @desc    Retrieve Specific Category
 * @route   GET /api/category/:id
 * @access  public
 */
export const getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    return next(new ErrorApi(`No subCategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});
/**
 * @desc    Edit Specific Category
 * @route   PUT /api/category/:id
 * @access  private
 */
export const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategory.findByIdAndUpdate(
    id,
    { name, slug: slugify(name), category },
    { new: true },
  );
  if (!subCategory) {
    return next(new ErrorApi(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategories });
});
/**
 * @desc    Remove Specific Category
 * @route   Delete /api/category/:id
 * @access  private
 */
export const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndRemove(id);
  if (!subCategory) {
    return next(new ErrorApi(`No category for this id ${id}`, 404));
  }
  res.status(204).json({ deleted: subCategory });
});
