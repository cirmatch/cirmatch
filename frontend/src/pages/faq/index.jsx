import React, { useState } from "react";
import UserLayout from "@/layout/clienLayout/UserLayout";

const faqs = [
  {
    question: "What is Cirmatch?",
    answer:
      "Cirmatch is an online B2B marketplace that connects businesses involved in the circular economy — especially buyers and sellers of recyclable plastic materials.",
  },
  {
    question: "Who can use Cirmatch?",
    answer:
      "Cirmatch is for businesses such as plastic recyclers, waste collectors, manufacturers using recycled materials, and traders of plastic waste.",
  },
  {
    question: "Is Cirmatch free to use?",
    answer:
      "Basic registration is free. We may charge a small fee for a successful transaction we facilitate.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Click “Register” on the homepage, fill out your business and contact details, and verify your email. Once approved, you can start listing or browsing materials.",
  },
  {
    question: "How do I list a product or material?",
    answer: (
      <>
        After logging in:
        <ol className="list-decimal ml-5 mt-2">
          <li>Go to your dashboard</li>
          <li>Click “Add Listing”</li>
          <li>Fill in the material type, quantity, price, and location</li>
          <li>Upload a photo (optional) and submit</li>
        </ol>
      </>
    ),
  },
  {
    question: "Are users verified?",
    answer:
      "We encourage users to verify their business information. After successful order placement, we verify customers' details for transparency.",
  },
  {
    question: "What materials are allowed on the platform?",
    answer: (
      <>
        Currently, we focus on:
        <ul className="list-disc ml-5 mt-2">
          <li>Recyclable plastics (e.g., PET, HDPE, LDPE, PP, Watage Poly, PVC, etc.)</li>
          <li>Processed materials (flakes, pellets, regrinds)</li>
        </ul>
        We may expand in the future based on demand.
      </>
    ),
  },
  {
    question: "Can I use the platform on mobile?",
    answer: "Yes! Cirmatch is mobile-friendly. You can use it on any device with a modern browser.",
  },
  {
    question: "Where is Cirmatch based?",
    answer:
      "Cirmatch is based in Dhaka, Bangladesh, but open to businesses from other regions as well.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <UserLayout>
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-teal-700">Frequently Asked Questions</h1>
        <div className="border border-gray-200 rounded-md divide-y divide-gray-200 shadow-sm">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white">
              <button
                onClick={() => toggle(i)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-teal-600 transform transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openIndex === i && (
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className="px-6 pb-6 text-gray-700 bg-teal-50"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </UserLayout>
  );
};

export default FAQ;
