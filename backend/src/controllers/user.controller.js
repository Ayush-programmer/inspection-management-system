import * as userService from '../services/user.service.js';

export const createUserController = async (req, res, next) => {
    try {
        const result = await userService.createUserService(req.body, req.user);
        return res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const getAllUsersController = async (req, res, next) => {
    try {
        const result = await userService.getUsersService(req.user);
        return res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const getUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await userService.getUserService(id, req.user);
        return res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};