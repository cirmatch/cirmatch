import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`col-span-1 max-w-lg w-full relative mx-auto ${
        isFocused ? "shadow-lg scale-[1.02]" : "shadow-md scale-100"
      } transition-all duration-300`}
    >
      <input
        type="search"
        placeholder="Search Pet, Hdpe, Ldpe.....etc"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full h-11 rounded-lg pl-4 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#029fae]"
        aria-label="Search products"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 hover:text-[#029fae]"
        aria-label="Search"
      >
        <FaSearch size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
