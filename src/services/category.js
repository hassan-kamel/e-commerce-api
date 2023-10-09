import Category from '../models/category.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from './factory.js';

/**
 * @desc    List All Categories
 * @route   GET /api/category
 * @access  public
 */
export const getCategories = getAll(Category);
/**
 * @desc    Create New Category
 * @route   POST /api/category
 * @access  private
 */
export const createCategory = createOne(Category);
/**
 * @desc    Retrieve Specific Category
 * @route   GET /api/category/:id
 * @access  public
 */
export const getCategory = getOne(Category);
/**
 * @desc    Edit Specific Category
 * @route   PUT /api/category/:id
 * @access  private
 */
export const updateCategory = updateOne(Category);
/**
 * @desc    Remove Specific Category
 * @route   Delete /api/category/:id
 * @access  private
 */
export const deleteCategory = deleteOne(Category);
