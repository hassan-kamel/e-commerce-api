import { Router } from 'express';
import {
  changeUserPassword,
  createUser,
  deleteLoggedUserData,
  deleteUser,
  getLoggedUserData,
  getUser,
  getUsers,
  updateLoggedUserData,
  updateLoggedUserPassword,
  updateUser,
} from '../services/user.js';
import {
  changeUserPasswordValidator,
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateLoggedUserValidator,
  updateUserValidator,
} from '../validations/user.js';
import { addImageNameToRequestBodyObject, uploadSingleImage } from '../middleware/uploadImage.js';
import { allowedTo, protect } from '../services/auth.js';

const router = Router();

router.use(protect);

router.get('/getMe', getLoggedUserData, getUser);
router.put('/changeMyPassword', updateLoggedUserPassword);
router.put('/updateMe', updateLoggedUserValidator, updateLoggedUserData);
router.delete('/deleteMe', deleteLoggedUserData);

// Admin
router.use(allowedTo('admin', 'manager'));

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
