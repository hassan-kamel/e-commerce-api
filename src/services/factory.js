import asyncHandler from 'express-async-handler';
import ErrorApi from '../utils/error.js';
import Features from '../utils/Features.js';

export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndRemove(id);
    if (!document) {
      return next(new ErrorApi(`No document for this id ${id}`, 404));
    }
    res.status(201).json({ deleted: document });
  });

export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(new ApiError(`No document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
  });

export const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

export const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

export const getAll = (Model, modelName = '') =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCounts = await Model.countDocuments();
    const features = new Features(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(modelName)
      .fields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResults } = features;
    const documents = await mongooseQuery;

    res.status(200).json({ results: documents.length, paginationResults, data: documents });
  });