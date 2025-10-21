import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      role="search"
      className="col-span-1 max-w-lg w-full relative mx-auto"
      animate={{
        scale: isFocused ? 1.02 : 1,
        boxShadow: isFocused
          ? '0px 4px 16px rgba(0, 0, 0, 0.1)'
          : '0px 2px 4px rgba(0, 0, 0, 0.05)',
      }}
      transition={{ duration: 0.3 }}
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
    </motion.form>
  );
};

export default SearchBar;