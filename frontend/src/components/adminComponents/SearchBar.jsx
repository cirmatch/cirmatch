import React from "react";
import { FiMail } from "react-icons/fi";

const SearchBar = ({ search, setSearch, placeholder = "Search..." }) => (
  <div className="mb-6">
    <div className="flex w-full items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-12">
      <div className="px-3 text-gray-500">
        <FiMail size={22} />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-white px-3 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  </div>
);

export default SearchBar;
