import { json } from 'express';

export default class Features {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  /**
   *
   * @Filter
   */
  filter() {
    const queryStringObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
    excludeFields.map((field) => delete queryStringObj[field]);
    // Apply filtration using [gte - gt - lte - lt]
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
  }

  /**
   *
   * @sort
   */
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
    }

    return this;
  }

  /**
   *
   * @Fields
   */
  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select('-__v');
    }

    return this;
  }

  /**
   *
   * @Search
   */
  search(model) {
    if (this.queryString.keyword) {
      const keyword = this.queryString.keyword;
      const query = {};
      if (model === 'product') {
        query.$or = [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ];
      } else {
        query.$or = [{ name: { $regex: keyword, $options: 'i' } }];
      }

      this.mongooseQuery = this.mongooseQuery.find(query);
    }

    return this;
  }

  /**
   *
   * @Paginate
   */
  paginate(collectionLength) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(collectionLength / limit);

    // next page
    if (endIndex < collectionLength) pagination.next = page + 1;
    // prev page
    if (skip > 0) pagination.prev = page - 1;

    this.paginationResults = pagination;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    return this;
  }
}
