import React from "react";
import UserLayout from "@/layout/clienLayout/UserLayout";

const BenefitsOfBuyers = () => {
  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-600 mb-6 text-center">
          Benefits of Buyers
        </h1>

        <div className="space-y-6 text-dark text-lg leading-relaxed">
          {[
            "Plastic is a very complex industry and recycling plastics is way more fragmented! Each category has different types of sub-categories and then you have to find the right conditions of products that meet your needs for hassle-free production!",
            "So, as per the requirements, getting the exact materials or products is hard. It's even harder to deal with different kinds of sellers each time and every time.",
            "So is that process easy and makes business lean?",
            "The buyers and owners don't say so! They want a solution that helps them to focus on their production line.",
            "To solve all these existing problems (+ non-existing too), here comes the cirmatch.com",
            "Cirmatch provides buyers a seamless experience by finding the right product and getting the right product delivered at the right time.",
            "And we have the largest database of the plastic waste management and recycling industry in Bangladesh and here we leverage our database to find the right product under the exact conditions.",
            "After the order confirmation, the rest is covered!",
            "Before loading products on trucks for transportation, we ensure the exact quality of the product that was ordered from the marketplace.",
            "We fight back against any kind of fraud and scams to keep you safe.",
            "It's our job to make it reach products at your production's doorstep.",
            "Cirmatch does everything to make sure buyers can focus on the other part of the business without worrying about materials, sourcing, Transportation, or quality!",
          ].map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default BenefitsOfBuyers;
