import mongoose, { Schema } from "mongoose";
import { User } from "./user.js";

const reviewSchema = new Schema({
    comment: {
        type: String,
        trim: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},{ timestamps: true });


reviewSchema.index({ author: 1, productId: 1 }, { unique: true });

export const Review = mongoose.model("Review", reviewSchema);
