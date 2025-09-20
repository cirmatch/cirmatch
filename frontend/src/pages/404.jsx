// components/ErrorPage.jsx

import UserLayout from "@/layout/clienLayout/UserLayout";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Reusable Error Page Component
 * Props:
 * - code: error code (default: "404")
 * - title: error title (default: "Page Not Found")
 * - message: detailed error message
 * - buttonText: text for action button (default: "Go Back Home")
 * - buttonLink: link for the action button (default: "/")
 */
const ErrorPage = ({
  code = "404",
  message = "Oops! The page you’re looking for doesn’t exist.",
  buttonText = "Go Back Home",
  buttonLink = "/",
}) => {
  return (
    <UserLayout>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-200 px-4">
        
        {/* Animated Error Code */}
        <motion.h1
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-8xl md:text-9xl font-extrabold text-teal-600 mb-6 select-none"
        >
          {code}
        </motion.h1>

        {/* Animated Message */}
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl md:text-2xl text-gray-700 mb-8 text-center"
        >
          {message} 
        </motion.p>

        {/* Animated Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95, rotate: -1 }}
        >
          <Link
            href={buttonLink}
            className="bg-teal-600 text-white px-8 py-3 md:px-10 md:py-4 rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-300"
          >
            {buttonText}
          </Link>
        </motion.div>

        {/* Floating Shapes */}
        <motion.div
          className="absolute w-32 h-32 bg-teal-100 rounded-full top-20 left-10 opacity-50"
          animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-24 h-24 bg-teal-200 rounded-full bottom-20 right-16 opacity-50"
          animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </UserLayout>
  );
};

export default ErrorPage;
