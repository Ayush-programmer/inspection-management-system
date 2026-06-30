import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    info: {
        logo: String,
        description: String,
        address: String,
        phone: String,
        website: String,
    },
}, {
    timestamps: true,
});

const Organization = mongoose.model(
    "Organization",
    organizationSchema
);

export default Organization;