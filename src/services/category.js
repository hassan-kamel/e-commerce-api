import slugify from 'slugify';
import Category from '../models/category.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc    List All Categories
 * @route   GET /api/category
 * @access  public
 */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  console.log('categories: ', categories);
  res.status(200).json({ result: categories.length, data: categories });
});
/**
 * @desc    Create New Category
 * @route   POST /api/category
 * @access  private
 */
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
/**
 * @desc    Retrieve Specific Category
 * @route   GET /api/category/:id
 * @access  public
 */
export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) res.status(404).json({ msg: `No category for this id ${id}` });
  res.status(200).json({ data: category });
});
/**
 * @desc    Edit Specific Category
 * @route   PUT /api/category/:id
 * @access  private
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true },
  );
  if (!category) res.status(404).json({ msg: `No category for this id ${id}` });
  res.status(200).json({ data: category });
});
/**
 * @desc    Remove Specific Category
 * @route   Delete /api/category/:id
 * @access  private
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndRemove(id);
  if (!category) res.status(404).json({ msg: `No category for this id ${id}` });
  res.status(201).json({ deleted: category });
});
