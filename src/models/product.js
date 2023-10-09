import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product name is required'],
      unique: [true, 'Product must be unique'],
      minlength: [3, 'Too short Product name'],
      maxlength: [128, 'Too long Product name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    imageCover: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [20, 'Too short product description'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      trim: true,
      max: [99999999, 'Too long product price'],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    images: [String],
  },
  { timestamps: true },
);

schema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name -_id',
  });
  next();
});

const Product = mongoose.model('Product', schema);
export default Product;
