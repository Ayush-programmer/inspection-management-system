import { body } from "express-validator";

export const createUserValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2 })
        .withMessage("Name should atleast have length 2"),
    body('email')
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 characters long"),
    body("role")
        .isString()
        .withMessage("Role must be a valid string")
        .isIn(['admin', 'inspector'])
        .withMessage("Role must be from the following : admin or inspector")
];