import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'User required'],
      minlength: [3, 'Too short category name'],
    },
    email: {
      type: String,
      required: [true, 'email required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      minlength: [6, 'Too short Password '],
    },

    passwordChangedAt: Date,

    slug: {
      type: String,
      lowercase: true,
    },
    avatar: String,
    phone: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true },
);

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', schema);
export default User;
