import { motion } from "framer-motion";

export default function ContactHeader() {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <h1 className="text-4xl font-bold text-teal-600 mb-4">
        Get In Touch With Us
      </h1>
      <p className="text-lg">
        For more information about our product & services, please feel free
        to drop us an email. Our staff will always be there to help you.
      </p>
    </motion.div>
  );
}
