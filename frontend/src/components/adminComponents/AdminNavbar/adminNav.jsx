import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiHome, FiBox, FiUsers, FiInbox, FiArrowRight, FiMessageCircle } from 'react-icons/fi';
import Logo from '../../Navbar/Logo';


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: <FiHome />, href: '/adminDashboard' },
    { name: 'Users', icon: <FiUsers />, href: '/adminDashboard/user' },
    { name: 'Products', icon: <FiBox />, href: '/adminDashboard/products' },
    { name: 'Orders', icon: <FiInbox />, href: '/adminDashboard/orders' },
    { name: 'Contacts', icon: <FiMessageCircle  />, href: '/adminDashboard/contacts' },
    { name: 'Main Page', icon: <FiArrowRight />, href: '/' },
  ];

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`
    fixed top-0 left-0 min-h-screen h-full bg-teal-600 text-white z-50
    flex flex-col pt-4
    transition-all duration-300 ease-in-out
    ${isOpen ? 'w-64 px-4' : 'w-16 px-2'} 
    md:w-64 md:px-6
        `}
      >
        {/* Logo */}
        <div className="w-full flex items-center justify-between mb-6">
          <h1 className={`text-xl font-bold ${!isOpen && 'hidden'} md:block`}>
            <Logo colorClass="text-white" />
          </h1>
        </div>

        {/* ☰ Toggle icon as menu item */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-sm font-medium p-2 rounded-md hover:bg-teal-500 transition mb-4 md:hidden"
        >
          <span className="text-xl">{isOpen ? <FiX /> : <FiMenu />}</span>
          <span className={`ml-4 ${!isOpen && 'hidden'}`}>Menu</span>
        </button>

        {/* Nav Items */}
        <nav className="flex flex-col space-y-4 w-full">
          {navItems.map((item, idx) => (
            <Link href={item.href} key={idx}>
              <div
                className="flex items-center text-sm font-medium p-2 rounded-md hover:bg-teal-500 transition w-full cursor-pointer"
              >
                <span className="text-xl">{item.icon}</span>
                <span className={`ml-4 ${!isOpen && 'hidden'} md:inline`}>
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
