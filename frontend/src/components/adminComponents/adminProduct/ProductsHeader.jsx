import React from 'react';
import Link from 'next/link';
import { FiSearch, FiPlus } from 'react-icons/fi';

export default function ProductsHeader({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
      <Link
        href="/addNew"
        className="flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
      >
        <FiPlus />
        Add New Listing
      </Link>

      <div className="relative w-full sm:w-64">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
