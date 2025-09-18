// components/Navbar/Logo.jsx
import Link from 'next/link';

const Logo = ({ colorClass = 'text-teal-500' }) => (
  <Link
    href="/"
    className={`text-3xl font-semibold font-inter flex items-center gap-2 capitalize ${colorClass}`}
    aria-label="Homepage"
  >
    cirmatch
  </Link>
);

export default Logo;
