import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { categories } from "../../Constants/navLinks";
import Link from "next/link";

const CategoriesDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center cursor-pointer gap-2 text-gray-700 font-medium capitalize hover:text-teal-500"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <FaBars /> all categories
      </button>

      {open && (
        <ul
          className="absolute mt-2 w-40 bg-white border border-gray-200 rounded shadow-md py-2 z-20"
          role="menu"
          onMouseLeave={() => setOpen(false)}
        >
          {categories.map((cat) => (
            <li key={cat}>
              <Link
                href={`/search?q=${cat}`}
                className="block px-4 py-2 w-full text-left hover:bg-teal-500 hover:text-white capitalize"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesDropdown;
