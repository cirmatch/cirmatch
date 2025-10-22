import Link from 'next/link';
import {  useEffect, useState } from 'react';
import { categories, navLinks } from '../../Constants/navLinks';
import { FaBars, FaShoppingCart, FaUser } from 'react-icons/fa';
import ButtonLink from '../Button/button';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { logoutUser } from '@/config/redux/action/authAction';

const MobileMenu = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser()); 
    router.push("/auth"); 
  };
  
useEffect(() => {
  // Check if user exists AND user object is fully loaded (isVerified !== undefined)
  if (user && typeof user.isVerified !== "undefined" && !user.isVerified) {
    handleLogout();
  }
}, [user]);

    const filteredLinks = navLinks.filter(link => {
    if (link.adminOnly && (!user || user.role !== "admin")) {
      return false;
    }
    return true;
  });
  
  return (
    <div className="md:hidden bg-white border-t border-gray-200 shadow-lg px-4 py-6 h-screen overflow-y-auto">

      {/* Categories Dropdown */}
      
      <div className="mb-6">
        <button
          onClick={() => setCategoriesOpen(!categoriesOpen)}
          className="flex items-center gap-2 font-semibold capitalize text-gray-800"
          aria-expanded={categoriesOpen}
        >
          <FaBars /> All Categories 
        </button>

        {categoriesOpen && (
          <ul className="mt-3 space-y-2 ml-1">
            {categories.map((cat) => (
              <li key={cat}>
                <button className="block w-full text-left px-3 py-2 rounded hover:bg-teal-500 hover:text-white text-gray-700">
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 mb-6">
        {filteredLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`font-medium text-base capitalize ${
              currentPath === href
                ? 'text-teal-500 font-semibold'
                : 'text-gray-700 hover:text-teal-500'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Cart & Account Section */}
      <div className="flex flex-col gap-3 mt-4 mb-6 border-t pt-4">
        <Link
          href="/cart"
          className="flex items-center gap-3 text-gray-700 hover:text-teal-500 text-base"
        >
          <FaShoppingCart />
          <span>Order</span>
        </Link>
        <Link
          href="/account"
          className="flex items-center gap-3 text-gray-700 hover:text-teal-500 text-base"
        >
          <FaUser />
          <span>Account</span>
        </Link>
      </div>

      {/* Login / Signup or Logout */}
      <div className="mt-4 border-t pt-4">
        {loggedIn && user !== null ? (
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
          >
            Log Out
          </button>
        ) : (
          <div className="flex gap-3">
            <ButtonLink
              href="/auth"
              bgColor="white"
              textColor="#009688"
              border="1px solid #009688"
              hoverText="white"
            >
              Log In
            </ButtonLink>

            <ButtonLink
              href="/auth"
              bgColor="white"
              textColor="#009688"
              border="1px solid #009688"
              hoverText="white"
            >
              Register
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
