import { Router } from "express";
import * as userController from '../controllers/user.controller.js';
import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import { createUserValidation } from "../validations/user.validation.js";
import validateRequest from "../middlewares/validation.middleware.js";


const router = Router();

router.post('/', authenticate, authorize("admin"), createUserValidation, validateRequest, userController.createUserController);

router.get('/', authenticate, authorize("admin"), userController.getAllUsersController);

router.get('/:id', authenticate, authorize("admin"), userController.getUserController);

router.patch('/:id', authenticate, authorize("admin"), userController.updateUser);

export default router;