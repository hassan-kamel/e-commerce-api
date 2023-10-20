import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import User from '../models/user.js';
import { createOne, deleteOne, getAll, getOne } from './factory.js';

/**
 * @desc    List All users
 * @route   GET /api/user
 * @access  private
 */
export const getUsers = getAll(User);
/**
 * @desc    Create New user
 * @route   POST /api/user
 * @access  private
 */
export const createUser = createOne(User);
/**
 * @desc    Retrieve Specific user
 * @route   GET /api/user/:id
 * @access  private
 */
export const getUser = getOne(User);
/**
 * @desc    Edit Specific user
 * @route   PUT /api/user/:id
 * @access  private
 */
export const updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      avatar: req.body.avatar,
      role: req.body.role,
    },
    {
      new: true,
    },
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
/**
 * @desc    Edit Specific user password
 * @route   PUT /api/user/changePassword/:id
 * @access  private
 */
export const changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    },
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
/**
 * @desc    Remove Specific user
 * @route   Delete /api/user/:id
 * @access  private
 */
export const deleteUser = deleteOne(User);
