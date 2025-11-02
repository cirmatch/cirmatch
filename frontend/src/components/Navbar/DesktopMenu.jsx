import Link from "next/link";
import { navLinks } from "../../Constants/navLinks";
import CategoriesDropdown from "./CategoriesDropdown";
import ButtonLink from "../Button/button";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { logoutUser } from "@/config/redux/action/authAction";
import { useEffect } from "react";

const DesktopMenu = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/");
  };

  useEffect(() => {
    // Check if user exists AND user object is fully loaded (isVerified !== undefined)
    if (user && typeof user.isVerified !== "undefined" && !user.isVerified) {
      handleLogout();
    }
  }, [user]);

  const filteredLinks = navLinks.filter((link) => {
    if (link.adminOnly && (!user || user.role !== "admin")) {
      return false;
    }
    return true;
  });

  return (
    <div className="hidden md:flex items-center justify-center h-[75px] border-t border-gray-200 bg-white">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Categories Dropdown */}
        <CategoriesDropdown />

        {/* Navigation Links */}
        <nav className="flex items-center gap-8">
          {filteredLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-medium text-sm capitalize hover:border-b-2 hover:border-b-teal-500 ${
                currentPath === href
                  ? "text-teal-500 font-semibold"
                  : "text-gray-700 hover:text-teal-500"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Login / Signup or Logout Button */}
        {loggedIn && user !== null ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 cursor-pointer"
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
              rememberRedirect={true}
            >
              Log In
            </ButtonLink>

            <ButtonLink
              href="/auth"
              bgColor="white"
              textColor="#009688"
              border="1px solid #009688"
              hoverText="white"
              rememberRedirect={true}
            >
              Register
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopMenu;
