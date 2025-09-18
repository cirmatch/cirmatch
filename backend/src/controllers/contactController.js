import httpStatus from "http-status";
import Contact from "../models/contactfrom.js";
import { User } from "../models/user.js";


export const contactInfo = async (req, res) => {
  const { ContactDetail, organization, message } = req.body;

  if (!ContactDetail || !message) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Missing required fields" });
  }

  let userId = null;

  if (req.user ) {
    const user = await User.findById(req.user._id);
    if (user) {
      userId = req.user._id;
    }
  }

  const newItem = new Contact({
    ContactDetail,
    organization,
    message,
    ...(userId && { user: userId }), 
  });

  await newItem.save();

  res.status(httpStatus.CREATED).json({
    message: "Comment done successfully",
  });
};
