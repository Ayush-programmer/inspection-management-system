import { Router } from "express";
import * as authController from '../controllers/auth.controller.js';
import { loginValidation, registerValidation } from "../validations/auth.validation.js";
import validateRequest from "../middlewares/validation.middleware.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/register', registerValidation, validateRequest,
    authController.registerController);

router.post('/login',
    loginValidation,
    validateRequest,
    authController.loginController
);

router.get('/me', authenticate, authController.meController);

export default router;