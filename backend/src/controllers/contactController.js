import httpStatus from "http-status";
import Contact from "../models/contactfrom.js";
import { User } from "../models/user.js";
import { sendEmail } from "../utils/emailService.js";


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


export const getContact = async (req, res) => {
  const contact = await Contact.find().sort({ _id: -1 });
  return res.status(202).json(contact);
};

/**
 * Controller: Reply to a contact message
 */
export const replyContact = async (req, res) => {

    const { message, mail, subject, id } = req.body;

    // 1️⃣ Validate input
    if (!message || !mail) {
      return res.status(400).json({ error: "Email and message are required" });
    }

    // 2️⃣ Find contact by ID
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // 3️⃣ Use default subject if not provided
    const emailSubject = subject?.trim() || "Crimatch Response";

    // 4️⃣ Send email
    await sendEmail(mail, emailSubject, message);

    // 5️⃣ Update contact reply status
    contact.replied = true;
    await contact.save();

    return res.status(200).json({ message: "Reply email sent successfully" });
};