// components/ErrorPage.jsx

import UserLayout from "@/layout/clienLayout/UserLayout";
import Link from "next/link";

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
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-200 px-4 relative">
        
        {/* Error Code */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-teal-600 mb-6 select-none">
          {code}
        </h1>

        {/* Message */}
        <p className="text-xl md:text-2xl text-gray-700 mb-8 text-center">
          {message}
        </p>

        {/* Button */}
        <div>
          <Link
            href={buttonLink}
            className="bg-teal-600 text-white px-8 py-3 md:px-10 md:py-4 rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-300 inline-block"
          >
            {buttonText}
          </Link>
        </div>

        {/* Floating Shapes */}
        <div className="absolute w-32 h-32 bg-teal-100 rounded-full top-20 left-10 opacity-50" />
        <div className="absolute w-24 h-24 bg-teal-200 rounded-full bottom-20 right-16 opacity-50" />
      </div>
    </UserLayout>
  );
};

export default ErrorPage;
