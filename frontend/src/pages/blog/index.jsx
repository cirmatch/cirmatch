import UserLayout from "@/layout/clienLayout/UserLayout";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const BlogPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 🧠 Add more dropdowns easily by adding to this array
  const sections = [
    {
      title: "♻️ Bangladesh’s Plastic Waste Crisis: Can a Digital Marketplace Fix the Supply Chain?",
      content: (
        <>
          <section className="space-y-4">
            <p>
              Bangladesh is growing — rapidly. But with economic growth, urbanization, and industrial development comes a dark side: plastic pollution. Despite having a robust network of recyclers and waste collectors, Bangladesh’s plastic waste management sector is informal, fragmented, and inefficient.
            </p>
            <p>
              So how do we turn this crisis into an opportunity? Let’s dive into the numbers, the challenges, and how digital technology — including platforms like{" "}
              <a
                href="https://cirmatch.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 font-semibold underline hover:text-teal-600 transition-colors"
              >
                Cirmatch.com
              </a>{" "}
              — can reshape the entire supply chain.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-500 mb-3">
              📊 The Scale of the Plastic Waste Problem in Bangladesh
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Bangladesh generates over 800,000 tons of plastic waste annually.</li>
              <li>In Dhaka city alone, more than 646 tons of plastic waste is produced every single day.</li>
              <li>Only 36% of total plastic waste is recycled — and most of that is done informally.</li>
              <li>Around 70% of plastic waste in Bangladesh is mismanaged, ending up in landfills, drains, or rivers.</li>
              <li>The problem is worsening: per capita plastic consumption rose from 3 kg in 2005 to 9 kg in 2020, especially in urban areas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-500 mb-3">
              🛠️ Why the Recycling Supply Chain is Broken
            </h2>
            <ol className="list-decimal pl-6 space-y-6">
              <li>
                <strong>Highly Informal & Unregulated</strong>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>About 90% of plastic recycling is by informal players.</li>
                  <li>Most waste pickers operate without licenses or registration.</li>
                  <li>No proper pricing, quality control, or documentation exists.</li>
                </ul>
              </li>
              <li>
                <strong>Inefficient Communication</strong>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Trade happens mostly by phone calls, brokers, or in-person visits.</li>
                  <li>No centralized platform to know who’s selling or buying what, and where.</li>
                </ul>
              </li>
              <li>
                <strong>Lack of Trust & Transparency</strong>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Buyers struggle to verify quality and quantity.</li>
                  <li>Sellers often face delayed payments or unreliable buyers.</li>
                  <li>No rating, review, or tracking system; everything depends on informal connections.</li>
                </ul>
              </li>
              <li>
                <strong>Logistics Chaos</strong>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>No organized transportation system exists.</li>
                  <li>Materials are moved inefficiently, increasing cost and carbon footprint.</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-500 mb-3">
              💡 The Missed Potential: Circular Economy in Action
            </h2>
            <p>Proper management could unlock huge value from waste:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Recycled plastic replacing virgin plastic in manufacturing at lower cost.</li>
              <li>Creating hundreds of thousands of formal jobs in the supply chain.</li>
              <li>Reducing environmental damage and gaining recognition for sustainability.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-500 mb-3">
              🌐 The Digital Fix: How Cirmatch Can Reshape This Sector
            </h2>
            <p>This is where technology — and Cirmatch.com — comes in.</p>

            <div className="mt-4 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-teal-500 mb-2">🛒 A Digital B2B Marketplace</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sellers list recyclable plastic materials.</li>
                  <li>Buyers browse, filter, and request quotes easily.</li>
                  <li>Verified businesses get badges to build trust.</li>
                  <li>Messaging, negotiation, and deal-making happens all in one place.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-teal-500 mb-2">📍 Transparency & Traceability</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Material listings tagged with location, quality, and certification.</li>
                  <li>Buyers and sellers rate each other to build reputation-based trust.</li>
                  <li>Batch tracking and documentation for higher-value deals.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-teal-500 mb-2">🚚 Logistics & Efficiency</h3>
                <p>Cirmatch connects users with logistics partners to streamline transport and reduce costs.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-teal-500 mb-2">📈 Data-Driven Insights</h3>
                <p>Data on market demand, pricing trends, and material flow help recyclers, manufacturers, and policymakers make informed decisions.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-500 mb-3">
              🚀 A New Future for Plastic Waste in Bangladesh
            </h2>
            <p>
              The future doesn’t lie in more landfills or informal work — it lies in digitization, collaboration, and a circular economy mindset. By connecting buyers and sellers, making pricing transparent, and adding accountability, platforms like Cirmatch can:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Reduce plastic leakage</li>
              <li>Boost recycling rates</li>
              <li>Create dignified jobs</li>
              <li>Make recycling profitable for everyone</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-500 mb-3">✅ Final Thought</h2>
            <p>
              Bangladesh is at a turning point. The challenge is not the lack of recyclers or collectors but the lack of organization, visibility, and connection.{" "}
              <a
                href="https://cirmatch.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 font-semibold underline hover:text-teal-600 transition-colors"
              >
                Cirmatch.com
              </a>{" "}
              offers a revolutionary solution: a platform where the entire industry — from waste pickers to industrial buyers — can connect, collaborate, and thrive.
            </p>
            <p>
              With the right technology, Bangladesh can shift from plastic pollution to plastic prosperity. Let’s make the circular economy real — one match at a time.
            </p>
          </section>
        </>
      ),
    },
  ];

  return (
    <UserLayout>
      <main className="max-w-4xl mx-auto px-3 py-8 m-5 text-gray-800 leading-relaxed border-2 border-gray-400 rounded">
        {sections.map((section, index) => (
          <div key={index} className="mb-10">
            {/* Dropdown Header */}
            <div
              className="text-center cursor-pointer mb-6"
              onClick={() => toggleDropdown(index)}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-teal-500 flex items-center justify-center gap-2">
                {section.title}
                {openIndex === index ? (
                  <FaChevronUp size={22} />
                ) : (
                  <FaChevronDown size={22} />
                )}
              </h1>
              <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full mt-2"></div>
            </div>

            {/* Dropdown Content */}
            {openIndex === index && (
              <article className="space-y-10 transition-all duration-500">
                {section.content}
              </article>
            )}
          </div>
        ))}
      </main>
    </UserLayout>
  );
};

export default BlogPage;
