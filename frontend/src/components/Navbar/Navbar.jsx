import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CartUserSection from "./CartUserSection";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full shadow-sm sticky top-0 bg-white z-50">
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
      <div className="hidden md:block">
        <DesktopMenu />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <MobileMenu />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
