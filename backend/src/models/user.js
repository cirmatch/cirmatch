import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      unique: true,
      trim: true,
      sparse: true,
      lowercase: true,
    },
    number: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    refreshToken: { type: String, default: null },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    verificationCode: String,
    verificationCodeExpires: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    message:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact', 
    },
    reviewedPost:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    }]
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);