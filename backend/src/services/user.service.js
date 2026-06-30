import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";
import sanitizeUser from "../utils/sanitize-user.js";

export const createUserService = async (data, currentUser) => {
    const { name, email, password, role } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
    }
    const organization = await Organization.findById(currentUser.organizationId);
    if (!organization) {
        const error = new Error("Organization not found");
        error.statusCode = 404;
        throw error;
    }
    if (role === 'admin') {
        const isOwner = organization.ownerId.toString() === currentUser.userId;
        if (!isOwner) {
            const error = new Error("Only owner can create admins");
            error.statusCode = 403;
            throw error;
        }
    }
    const user = await User.create({
        name,
        email,
        password,
        role,
        organizationId: organization._id,
        createdBy: currentUser.userId,
    });
    return sanitizeUser(user);
};

export const getUsersService = async (currentUser) => {
    const users = await User.find({
        organizationId: currentUser.organizationId
    }).populate("createdBy", "name email").sort({ createdAt: -1 });
    return users.map(user => sanitizeUser(user));
};

export const getUserService = async (id, currentUser) => {
    const user = await User.findOne({
        _id: id,
        organizationId: currentUser.organizationId
    }).populate("createdBy", "name email");
    return sanitizeUser(user);
};