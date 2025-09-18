import React from "react";
import { motion } from "framer-motion";
import UserLayout from "@/layout/clienLayout/UserLayout";
import { fadeIn, staggerContainer } from "@/utils/motion"; // import your variants

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. What We Collect",
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Your name, company name, email, and phone number when you sign up</li>
          <li>Information about your business type (e.g., buyer or seller)</li>
          <li>How you use our site (e.g., pages visited, messages sent)</li>
        </ul>
      ),
    },
    {
      title: "2. How We Use It",
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>To create and manage your account</li>
          <li>To connect you with buyers or sellers</li>
          <li>To improve our services and send important updates</li>
        </ul>
      ),
    },
    {
      title: "3. Who Can See Your Info",
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Other users can see your public profile and listings</li>
          <li>We may share info with service providers (like payment or hosting services)</li>
          <li>We do not sell your data</li>
        </ul>
      ),
    },
    {
      title: "4. Your Choices",
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>You can update or delete your account anytime</li>
          <li>You can unsubscribe from emails</li>
          <li>You can contact us if you want your data removed</li>
        </ul>
      ),
    },
    {
      title: "5. Cookies",
      content: (
        <p className="text-gray-700">
          We use cookies to remember your login and improve your experience. You can turn off cookies in your browser settings.
        </p>
      ),
    },
    {
      title: "6. Security",
      content: (
        <p className="text-gray-700">
          We do our best to protect your information, but please remember that no method of transmission over the internet or method of electronic storage is 100% secure. Use the platform at your own risk.
        </p>
      ),
    },
  ];

  return (
    <UserLayout>
      <main className="max-w-3xl mx-auto p-8">
        <motion.h1
          className="text-4xl font-bold text-teal-700 mb-6"
          variants={fadeIn("up", 0)}
          initial="hidden"
          animate="show"
        >
          🔒 Privacy Policy
        </motion.h1>

        <motion.p
          className="text-gray-500 mb-10"
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
        >
          Last updated: 20.07.2025
        </motion.p>

        <motion.div
          variants={staggerContainer(0.3, 0.3)}
          initial="hidden"
          animate="show"
        >
          {sections.map(({ title, content }, idx) => (
            <motion.section
              key={idx}
              className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200"
              variants={fadeIn("up", idx * 0.2 + 0.3)}
            >
              <h2 className="text-xl font-semibold text-teal-600 mb-4">{title}</h2>
              {content}
            </motion.section>
          ))}
        </motion.div>
      </main>
    </UserLayout>
  );
};

export default PrivacyPolicy;
