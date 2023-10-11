import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'images',
    // format: async (req, file) => 'png', // or any desired format
    public_id: (req, file) =>
      `${req.body.name || req.body.firstName || req.body.title || 'image'}-${Date.now()}`,
  },
});

const upload = multer({ storage });

export const uploadSingleImage = (fieldName) => upload.single(fieldName);

export const uploadMixOfImages = (arrayOfFields) => upload.fields(arrayOfFields);

export const addImageNameToRequestBodyObject = () => (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
  if (req.files) {
    req.body.images = req.files.images.map((file) => file.path);
    req.body.imageCover = req.files.imageCover[0].path;
  }
  next();
};
