// src/constants/footerConstants.js
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
export const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Terms and Condition", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Contact Us", href: "/contact" },
  ],
  Genarel: [
    { name: "How it Works", href: "works" },
    { name: "FAQ", href: "/faq" },
    { name: "BLOG", href: "/blog"},
  ]
};

export const socialLinks = [
  { icon: <FaFacebookF className="w-5 h-5" />, href: "https://www.facebook.com/cirmatchdotcom" },
  { icon: <FaLinkedinIn className="w-5 h-5" />, href: "https://www.linkedin.com/company/cirmatchdotcom" },
  { icon: <IoLogoWhatsapp className="w-5 h-5" />, href: "https://wa.me/8801811375937"}
];
