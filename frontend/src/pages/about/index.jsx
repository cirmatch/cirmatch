import UserLayout from '@/layout/clienLayout/UserLayout';
import Link from 'next/link';
import React from 'react';

export default function About() {
  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-teal-600 mb-6 text-center">
          About Us
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          <Link
            href="https://cirmatch.com/"
            className="text-teal-600 hover:underline font-medium"
            target="_blank"
          >
            Cirmatch.com
          </Link>{' '}
          is a <strong>B2B circular economy marketplace</strong> that connects buyers and sellers of recycled plastic and the waste management industry. It simplifies their trading by helping find the right sourcing and providing efficient logistics services.
        </p>

        <p className="text-lg text-gray-700 mt-6 leading-relaxed">
          Cirmatch is also committed to building a <strong>data-driven formal infrastructure</strong> for the waste management and recycling industry. Our goal is to enable a circular economy and contribute to a more <span className="text-teal-600 font-semibold">sustainable planet</span>.
        </p>
      </div>
    </UserLayout>
  );
}
