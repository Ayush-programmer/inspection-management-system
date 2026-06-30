import * as authService from "../services/auth.service.js";

export const registerController = async (req, res, next) => {
    try {
        const result = await authService.registerService(req.body);
        return res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const loginController = async (req, res, next) => {
    try {
        const result = await authService.loginService(req.body);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const meController = async (req, res) => {
    return res.status(200).json({
        success: true,
        data: req.user,
    });
};