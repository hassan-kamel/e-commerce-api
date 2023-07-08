import slugify from 'slugify';
import Brand from '../models/brand.js';
import asyncHandler from 'express-async-handler';
import ErrorApi from '../utils/error.js';

/**
 * @desc    List All brands
 * @route   GET /api/brand
 * @access  public
 */
export const getBrands = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brands = await Brand.find({}).skip(skip).limit(limit);
  //   console.log('brands: ', brands);
  res.status(200).json({ result: brands.length, page, data: brands });
});
/**
 * @desc    Create New brand
 * @route   POST /api/brand
 * @access  private
 */
export const createBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});
/**
 * @desc    Retrieve Specific brand
 * @route   GET /api/brand/:id
 * @access  public
 */
export const getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ErrorApi(`No brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});
/**
 * @desc    Edit Specific brand
 * @route   PUT /api/brand/:id
 * @access  private
 */
export const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true },
  );
  if (!brand) {
    return next(new ErrorApi(`No brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});
/**
 * @desc    Remove Specific brand
 * @route   Delete /api/brand/:id
 * @access  private
 */
export const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndRemove(id);
  if (!brand) {
    return next(new ErrorApi(`No brand for this id ${id}`, 404));
  }
  res.status(201).json({ deleted: brand });
});
