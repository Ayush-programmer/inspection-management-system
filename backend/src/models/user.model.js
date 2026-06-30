import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    next();
});

userSchema.methods.comparePassword =
    async function (candidatePassword) {
        return bcrypt.compare(
            candidatePassword,
            this.password
        );
    };

const User = mongoose.model(
    "User",
    userSchema
);

export default User;