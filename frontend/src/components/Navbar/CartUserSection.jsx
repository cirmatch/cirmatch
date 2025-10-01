import { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';


const CartUserSection = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { loggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart );

  const handleLogout = () => {
    localStorage.clear();
    dispatch(reset());
    setUserMenuOpen(false);
  };

  return (
    <div className="hidden md:flex items-center justify-end gap-4">

      {/* Cart */}
      <Link
        href={loggedIn ? '/cart' : '/auth'}
        aria-label="Cart"
        className="relative flex items-center gap-1 text-gray-700 hover:text-teal-500 cursor-pointer"
      >
        <FaShoppingCart size={20} />
        <span>Order</span>
        {cart && (
          <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-teal-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">{cart.items.length}</span>
        )}
      </Link>

      {/* Empty space in place of heart icon */}
      <div className="w-5 h-5" />

      {/* User */}
      <div className="relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          aria-haspopup="true"
          aria-expanded={userMenuOpen}
          className="text-gray-700 hover:text-teal-500 cursor-pointer"
        >
          <FaUser size={20} />
        </button>

        {userMenuOpen && (
          <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md py-2" role="menu">
            <li>
              <Link
                href={loggedIn ? '/account' : '/auth'}
                className="block px-4 py-2 hover:bg-teal-500 hover:text-white"
                onClick={() => setUserMenuOpen(false)}
              >
                Account
              </Link>
            </li>
            {loggedIn && user !== null && (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-teal-500 hover:text-white"
                >
                  Log Out
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartUserSection;
