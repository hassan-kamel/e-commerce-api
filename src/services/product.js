import Product from '../models/product.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from './factory.js';

/**
 * @desc    List All Products
 * @route   GET /api/Product
 * @access  public
 */
export const getProducts = getAll(Product, 'product');
/**
 * @desc    Create New Product
 * @route   POST /api/Product
 * @access  private
 */
export const createProduct = createOne(Product);
/**
 * @desc    Retrieve Specific Product
 * @route   GET /api/Product/:id
 * @access  public
 */
export const getProduct = getOne(Product);
/**
 * @desc    Edit Specific Product
 * @route   PUT /api/Product/:id
 * @access  private
 */
export const updateProduct = updateOne(Product);
/**
 * @desc    Remove Specific Product
 * @route   Delete /api/Product/:id
 * @access  private
 */
export const deleteProduct = deleteOne(Product);
