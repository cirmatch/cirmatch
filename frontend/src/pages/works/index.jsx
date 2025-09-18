import React from "react";
import UserLayout from "@/layout/clienLayout/UserLayout";

const HowItWorks = () => {
  return (
    <UserLayout>
      <main className="max-w-4xl mx-auto p-6 prose prose-teal prose-lg">
        <h1>Cirmatch: How It Works</h1>
        <p>
          Cirmatch is a B2B marketplace built to help businesses in the recycling and circular economy
          connect and trade recyclable plastic materials with ease. Whether you’re a waste collector,
          recycler, or manufacturer, getting started is simple.
        </p>

        <h2>1. Create Your Free Account</h2>
        <p>
          Sign up with your business name, contact information, and a brief description of what you buy or sell. Once your profile is set up, you’re ready to join the community.
        </p>

        <h2>2. Post or Browse Listings</h2>
        <p>
          Sellers can post listings to sell recyclable materials by providing product details such as material type, quantity, price, and location. Adding a photo helps your listing stand out.
        </p>
        <p>
          Buyers can browse listings filtered by material type, quality, or region to find exactly what they need.
        </p>

        <h2>3. Connect and Communicate</h2>
        <p>
          Our secure chat system allows buyers and sellers to message directly, negotiate pricing, delivery, and certifications with transparency and ease.
        </p>

        <h2>4. Make the Deal</h2>
        <p>
          Once you agree on terms, finalize the deal off-platform. Arrange shipping, payment, and documentation directly with your trading partner.
        </p>

        <h2>5. Build Trust and Reputation</h2>
        <p>
          After the transaction, leave reviews for your partners to help build a trusted and reliable trading community within Cirmatch.
        </p>

        <p>
          <strong>Cirmatch provides the tools to connect the right businesses — efficiently, safely, and with a focus on sustainability.</strong>
        </p>
      </main>
    </UserLayout>
  );
};

export default HowItWorks;
