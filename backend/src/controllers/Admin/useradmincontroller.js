import httpStatus from "http-status";
import { User } from "../../models/user.js";
import { makeUserAdminSchema } from "../../validations/userValidation.js";

export const getAllUser = async (req, res) => {
  const user = await User.find();
  return res.status(202).json(user);
};

// Promote user to admin
export const changeRole = async (req, res) => {
  const { role, userId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.role = role;
  await user.save();
  res.status(202).json({ message: "User role Chnaged successfully" });
};

// Get user stats
export const getUserStats = async (req, res) => {
  const now = new Date();
  const lastMonth = new Date(now.setDate(now.getDate() - 30));

  const totalUsers = await User.countDocuments();
  const recentUsers = await User.countDocuments({
    createdAt: { $gte: lastMonth },
  });
  const growthPercent =
    totalUsers === 0 ? 0 : ((recentUsers / totalUsers) * 100).toFixed(2);

  res
    .status(httpStatus.OK)
    .json({ totalUsers, recentUsers, growthPercent: `${growthPercent}%` });
};
