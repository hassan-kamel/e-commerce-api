import { Router } from 'express';
import {
  changeUserPassword,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../services/user.js';
import {
  changeUserPasswordValidator,
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateUserValidator,
} from '../validations/user.js';
import { addImageNameToRequestBodyObject, uploadSingleImage } from '../middleware/uploadImage.js';

const router = Router();

router.put('/changePassword/:id', changeUserPasswordValidator, changeUserPassword);

router
  .route('/')
  .get(getUsers)
  .post(
    uploadSingleImage('avatar'),
    addImageNameToRequestBodyObject('avatar'),
    createUserValidator,
    createUser,
  );

router
  .route('/:id')
  .get(getUserValidator, getUser)
  .put(
    uploadSingleImage('avatar'),
    addImageNameToRequestBodyObject('avatar'),
    updateUserValidator,
    updateUser,
  )
  .delete(deleteUserValidator, deleteUser);

export default router;
