import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";
import sanitizeUser from "../utils/sanitize-user.js";
import generateToken from "../utils/generate-token.js";

export const registerService = async (data) => {
    const {
        organizationName, name, email, password
    } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
    }

    const organization = await Organization.create({
        name: organizationName,
    });

    const user = await User.create({
        name,
        email,
        password,
        role: "admin",
        organizationId: organization._id,
    });

    organization.ownerId = user._id;

    await organization.save();

    const token = generateToken(user);

    return {
        token,
        organization,
        user: sanitizeUser(user),
    };
};

export const loginService = async (data) => {
    const { email, password } = data;
    const user = await User.findOne({
        email
    }).select("+password");

    if (!user) {
        const error = new Error("Invalid email or password");

        error.statusCode = 401;

        throw error;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(user);

    return {
        token,
        user: sanitizeUser(user),
    };
};