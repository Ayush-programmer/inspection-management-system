import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },
    role: {
        type: String,
        enum: ["admin", "inspector"],
        required: true,
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    profile: {
        type: {
            profilePic: String,
            phone: {
                type: String,
                match: /^[6-9]\d{9}$/,
            },
            employeeId: {
                type: String,
                trim: true,
                maxlength: 50,
            },
            designation: String,
            dateOfBirth: Date,
            gender: {
                type: String,
                enum: ["male", "female", "other"],
            }
        },
        default: {}
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

const User = mongoose.model(
    "User",
    userSchema
);

export default User;