import React from "react";
import UserLayout from "@/layout/clienLayout/UserLayout";

const HowItWorks = () => {
  return (
    <UserLayout>
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-3xl">⚙️</span>
          <h1 className="text-2xl font-bold text-gray-800">
            Cirmatch: How It Works
          </h1>
        </div>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed mb-6">
          Cirmatch is a B2B marketplace built to help businesses in the recycling
          and circular economy connect and trade recyclable plastic materials
          with ease. Whether you’re a waste collector, recycler, or manufacturer,
          getting started is simple.
        </p>

        {/* Steps */}
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              1. Create Your Free Account
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Sign up with your business name, contact information, and a brief
              description of what you buy or sell. Once your profile is set up,
              you’re ready to join the community.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              2. Post or Browse Listings
            </h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Sellers can post listings to sell recyclable materials by providing
              product details such as material type, quantity, price, and
              location. Adding a photo helps your listing stand out.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Buyers can browse listings filtered by material type, quality, or
              region to find exactly what they need.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              3. Connect and Communicate
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our secure chat system allows buyers and sellers to message
              directly, negotiate pricing, delivery, and certifications with
              transparency and ease.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              4. Make the Deal
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Once you agree on terms, finalize the deal off-platform. Arrange
              shipping, payment, and documentation directly with your trading
              partner.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              5. Build Trust and Reputation
            </h2>
            <p className="text-gray-700 leading-relaxed">
              After the transaction, leave reviews for your partners to help
              build a trusted and reliable trading community within Cirmatch.
            </p>
          </div>
        </div>

        {/* Outro */}
        <p className="mt-8 text-gray-700 leading-relaxed font-medium">
          Cirmatch provides the tools to connect the right businesses —
          efficiently, safely, and with a focus on sustainability.
        </p>
      </div>
    </div>
    </UserLayout>
  );
};

export default HowItWorks;
