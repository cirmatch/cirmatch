import httpStatus from "http-status";
import { User } from "../../models/user.js";
import { makeUserAdminSchema } from "../../validations/userValidation.js";



// Promote user to admin
export const makeUserAdmin = async (req, res) => {
  const { error } = makeUserAdminSchema.validate(req.body);
  if (error) return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });

  const { identifier } = req.body;
  const query = identifier.includes("@") ? { email: identifier } : identifier.length === 24 ? { _id: identifier } : { number: identifier };

  const user = await User.findOne(query);
  if (!user) return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
  if (user.role === "admin") return res.status(httpStatus.OK).json({ message: "User is already an admin" });

  user.role = "admin";
  await user.save();
  res.status(httpStatus.OK).json({ message: "User promoted to admin", userId: user._id });
};

// Get user stats
export const getUserStats = async (req, res) => {
  const now = new Date();
  const lastMonth = new Date(now.setDate(now.getDate() - 30));

  const totalUsers = await User.countDocuments();
  const recentUsers = await User.countDocuments({ createdAt: { $gte: lastMonth } });
  const growthPercent = totalUsers === 0 ? 0 : ((recentUsers / totalUsers) * 100).toFixed(2);

  res.status(httpStatus.OK).json({ totalUsers, recentUsers, growthPercent: `${growthPercent}%` });
};
