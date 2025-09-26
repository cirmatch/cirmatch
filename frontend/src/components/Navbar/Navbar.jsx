import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import SearchBar from './SearchBar';
import CartUserSection from './CartUserSection';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import { navbarVariants, mobileMenuVariants } from '@/utils/motion';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      className="w-full shadow-sm sticky top-0 bg-white z-50"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Section */}
      <div className="bg-[#f0f2f3] py-3 px-4 md:px-0">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Top Row for Small Screen */}
          <div className="w-full flex items-center justify-between md:w-auto">
            <Logo />

            {/* Toggle Button */}
            <button
              aria-label="Toggle menu"
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Search bar */}
          <div className="w-full md:flex-1">
            <SearchBar />
          </div>

          {/* Cart/User section - visible only on md+ */}
          <div className="hidden md:flex">
            <CartUserSection />
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <motion.div
        className="hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <DesktopMenu />
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <MobileMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
