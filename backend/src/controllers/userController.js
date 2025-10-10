import httpStatus from "http-status";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendVerificationEmail, sendVerificationSMS } from "../utils/emailService.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtil.js";
import {
  loginSchema,
  verifyIdentifierSchema,
  resendCodeSchema,
  registerSchema,
} from "../validations/userValidation.js";

dotenv.config();
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "yourRefreshSecret";

// ===================== COMMON FUNCTIONS =====================
const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();


// ===================== REGISTER =====================
export const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });

  const { name, password, identifier } = req.body;
  const isEmail = identifier.includes("@");
  const query = isEmail ? { email: identifier } : { number: identifier };

  const existingUser = await User.findOne(query);
  if (existingUser) return res.status(httpStatus.BAD_REQUEST).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const code = generateVerificationCode();
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  const user = new User({
    name,
    password: hashedPassword,
    verificationCode: code,
    verificationCodeExpires: expires,
    isVerified: false,
    ...(isEmail ? { email: identifier } : { number: identifier }),
  });

  await user.save();

  // Send verification
  if (isEmail) {
    try { await sendVerificationEmail(identifier, code); } catch (err) { console.error(err); }
  } else {
    try { await sendVerificationSMS(identifier, code); } catch (err) { console.error(err); }
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 7*24*60*60*1000
  });

  res.status(httpStatus.OK).json({ message: "Registered successfully", accessToken, user });
};

// ===================== LOGIN =====================
export const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });

  const { identifier, password } = req.body;
  const isEmail = identifier.includes("@");
  const query = isEmail ? { email: identifier } : { number: identifier };

  const user = await User.findOne(query);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid credentials" });
  }

  if (!user.isVerified) {
    return res.status(httpStatus.FORBIDDEN).json({ message: "Account not verified" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 7*24*60*60*1000 });
  res.status(httpStatus.OK).json({ message: "Logged in successfully", accessToken, user });
};

// ===================== FORGET PASSWORD =====================
export const forgetPassword = async (req, res) => {
  const { identifier } = req.body;
  const isEmail = identifier.includes("@");
  const query = isEmail ? { email: identifier } : { number: identifier };

  const user = await User.findOne(query);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Generate 6-digit OTP
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 10 * 60 * 1000); // valid for 10 min

  user.verificationCode = verificationCode;
  user.verificationCodeExpires = expires;
  await user.save();

  // Send via Email or SMS
  try {
  if (isEmail) {
    try { await sendVerificationEmail(identifier, verificationCode); } catch (err) { console.error(err); }
  } else {
    try { await sendVerificationSMS(identifier, verificationCode); } catch (err) { console.error(err); }
  }


    res.status(200).json({ message: "Verification code sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send verification code" });
  }
};
// ===================== RESET PASSWORD =====================
export const resetPassword = async (req, res) => {
  const { identifier, code, newPassword } = req.body;
  const isEmail = identifier.includes("@");
  const query = isEmail ? { email: identifier } : { number: identifier };

  const user = await User.findOne(query);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (
    user.verificationCode !== code ||
    user.verificationCodeExpires < new Date()
  ) {
    return res.status(400).json({ message: "Invalid or expired code" });
  }

  // Hash the new password
  user.password = await bcrypt.hash(newPassword, 10);

  // Clear the verification code
  user.verificationCode = undefined;
  user.verificationCodeExpires = undefined;

  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
};

// ===================== REFRESH TOKEN =====================
export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(httpStatus.UNAUTHORIZED).json({ message: "Refresh token missing" });

  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid refresh token" });
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Save new refresh token in DB
    user.refreshToken = newRefreshToken;
    await user.save();

    // Set refresh token in HttpOnly cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Only send access token to frontend
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid refresh token" });
  }
};

// ===================== VERIFY =====================
export const verifyIdentifier = async (req, res) => {
  const { error } = verifyIdentifierSchema.validate(req.body);
  if (error) return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });

  const { identifier, code } = req.body;
  const isEmail = identifier.includes("@");
  const query = isEmail ? { email: identifier } : { number: identifier };

  const user = await User.findOne(query);
  if (!user) return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
  if (user.verificationCode !== code || Date.now() > user.verificationCodeExpires) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid or expired verification code" });
  }

  user.isVerified = true;
  await user.save();

  res.status(httpStatus.OK).json({ message: "Verification successful" });
};

// ===================== RESEND CODE =====================
export const resendCode = async (req, res) => {
  const { error } = resendCodeSchema.validate(req.body);
  if (error) return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });

  const { identifier } = req.body;
  const isEmail = identifier.includes("@");
  const query = isEmail ? { email: identifier } : { number: identifier };

  const user = await User.findOne(query);
  if (!user) return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });


  const code = generateVerificationCode();
  const expires = new Date(Date.now() + 10*60*1000);
  user.verificationCode = code;
  user.verificationCodeExpires = expires;
  await user.save();

  if (isEmail) { await sendVerificationEmail(identifier, code).catch(console.error); }
  else { await sendVerificationSMS(identifier, code).catch(console.error); }

  res.status(httpStatus.OK).json({ message: "Verification code resent successfully" });
};


// ===================== LOGOUT =====================
export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(200).json({ message: "Already logged out" });

    // Find user with this refresh token
    const user = await User.findOne({ refreshToken: token });
    if (user) {
      user.refreshToken = null; // remove from DB
      await user.save();
    }

    // Clear the cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Logout failed" });
  }
};