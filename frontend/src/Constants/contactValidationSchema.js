import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import * as yup from "yup";

// constants/contactFormFields.js
export const contactFormFields = [
  {
    id: "ContactDetail",
    label: "Email/Number",
    type: "text",
    ariaErrorId: "email-error",
  },
  {
    id: "organization",
    label: "Organization/Company Name(If applicable)",
    type: "text",
    ariaErrorId: "subject-error",
  },
  {
    id: "message",
    label: "Message",
    type: "textarea",
    rows: 6,
    ariaErrorId: "message-error",
  },
];

export const contactSchema = yup.object().shape({
  ContactDetail: yup
    .string()
    .required("Email or number is required")
    .test("is-email-or-phone", "Invalid email or phone number", function (value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?\d{10,15}$/; 
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  message: yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
});

export const contactDetails = [
  {
    icon: <FaPhoneAlt className="text-teal-600" />,
    label: "+88 01811-375937",
  },
  {
    icon: <FaEnvelope className="text-teal-600" />,
    label: "cirmatch@gmail.com",
  },
];

export const address = "Mirpur 12, Dhaka, Bangladesh";

export const slideInLeft = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

export const slideInRight = {
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

export const contactFormAnimation = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
};
