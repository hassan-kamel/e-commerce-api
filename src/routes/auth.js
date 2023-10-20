import { Router } from 'express';
import { signupValidator, loginValidator } from '../validations/auth.js';

import {
  signup,
  login,
  //   forgotPassword,
  //   verifyPassResetCode,
  //   resetPassword,
} from '../services/auth.js';

const router = Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
// router.post('/forgotPassword', forgotPassword);
// router.post('/verifyResetCode', verifyPassResetCode);
// router.put('/resetPassword', resetPassword);

export default router;
