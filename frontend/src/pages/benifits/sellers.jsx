import React from "react";
import UserLayout from "@/layout/clienLayout/UserLayout";

export default function BenefitOfSeller() {
  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto p-10 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-teal-700 mb-6 text-center">
          Benefit of Seller
        </h1>
        <div className="space-y-4 text-gray-800 text-lg leading-relaxed">
          <p>
            Sell easily. Sell on cirmatch.com
          </p>
          <p>
            Take the benefits of thousands of buyers in one place. It's just that simple like a Facebook post.
          </p>
          <p>
            Cirmatch.com has the largest buyers' list of the plastic waste management and recycling industry in Bangladesh. Once Cirmatch finds the right buyer for your product or materials, it starts dealing with the rest to make it a successful transaction.
          </p>
          <p>
            From finding the 'Best Deal' for your product to delivering it to the buyer's factory or place, it's always our responsibility to make sure every step is fine.
          </p>
          <p>
            We also provide transportation facilities in a way that helps to cut down sellers' costs significantly.
          </p>
          <p>
            Cirmatch also ensures hassle-free payments to establish transparency.
          </p>
        </div>
      </div>
    </UserLayout>
  );
}
