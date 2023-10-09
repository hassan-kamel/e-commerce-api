import Brand from '../models/brand.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from './factory.js';

/**
 * @desc    List All brands
 * @route   GET /api/brand
 * @access  public
 */
export const getBrands = getAll(Brand);
/**
 * @desc    Create New brand
 * @route   POST /api/brand
 * @access  private
 */
export const createBrand = createOne(Brand);
/**
 * @desc    Retrieve Specific brand
 * @route   GET /api/brand/:id
 * @access  public
 */
export const getBrand = getOne(Brand);
/**
 * @desc    Edit Specific brand
 * @route   PUT /api/brand/:id
 * @access  private
 */
export const updateBrand = updateOne(Brand);
/**
 * @desc    Remove Specific brand
 * @route   Delete /api/brand/:id
 * @access  private
 */
export const deleteBrand = deleteOne(Brand);
