import { body } from 'express-validator'

export const registerValidation = [
    body("organizationName")
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Organization name is required"),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2 })
        .withMessage("Name must be atleast 2 characters long"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

export const loginValidation = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email"),
        
    body("password")
        .notEmpty()
        .withMessage("Password is required"),
]