import { motion } from "framer-motion";
import { FaMapMarkerAlt} from "react-icons/fa";
import { socialLinks } from "@/Constants/footerConstants";
import { address, contactDetails, slideInLeft, slideInRight } from "@/Constants/contactValidationSchema";

export default function ContactInfoCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <motion.div
        className="bg-white shadow-md rounded-xl p-6"
        initial={slideInLeft.initial}
        animate={slideInLeft.animate}
      >
        <h4 className="text-xl font-semibold text-teal-600 flex items-center gap-2 mb-4">
          <FaMapMarkerAlt className="text-teal-600" />
          Address
        </h4>
        <p>{address}</p>
        <div className="flex mt-6 gap-4">
          {socialLinks.map(({ icon, href }, idx) => (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-teal-600 hover:text-white transition-colors"
            >
              {icon}
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="bg-white shadow-md rounded-xl p-6"
        initial={slideInRight.initial}
        animate={slideInRight.animate}
      >
        <h4 className="text-xl font-semibold text-teal-600 mb-4">
          Contact Detail
        </h4>
        {contactDetails.map(({ icon, label }, index) => (
          <p key={index} className="flex items-center gap-2 mb-2">
            {icon}
            {label}
          </p>
        ))}
      </motion.div>
    </div>
  );
}
