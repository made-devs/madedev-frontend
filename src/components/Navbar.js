'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="p-4 font-lexend rounded-b-lg relative z-50 ">
      <div className="w-full flex justify-between items-center">
        {/* Logo / Home Link */}
        <Link
          href="/"
          className="text-xl font-righteous text-white font-medium"
        >
          madedev
        </Link>

        {/* Desktop Navigation (hidden on mobile) */}
        <ul className="hidden md:flex space-x-14 pr-3">
          <li>
            <Link
              href="/"
              className="text-base font-normal text-white hover:text-secondary"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-base font-normal text-white hover:text-secondary"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-base font-normal text-white hover:text-secondary"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/portfolio"
              className="text-base font-normal text-white hover:text-secondary"
            >
              Portfolio
            </Link>
          </li>
          {user && (
            <li>
              <button
                onClick={handleLogout}
                className="text-dark text-sm font-semibold hover:text-secondary"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Hamburger Button (visible only on mobile) */}
        <button
          className="text-white text-2xl md:hidden z-40 focus:outline-none ml-4"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`absolute left-0 top-full w-full bg-primary rounded-b-lg text-dark text-center py-4 shadow-md transition-transform duration-700 z-20 md:hidden ${
          menuOpen ? '-translate-y-[4rem]' : '-translate-y-[150%]'
        }`}
      >
        <ul className="flex flex-col space-y-3">
          <li>
            <Link
              href="/"
              className="text-lg font-semibold hover:text-secondary"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-lg font-semibold hover:text-secondary"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-lg font-semibold hover:text-secondary"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/portfolio"
              className="text-lg font-semibold hover:text-secondary"
            >
              Portfolio
            </Link>
          </li>
          {user && (
            <li>
              <button
                onClick={handleLogout}
                className="text-dark text-sm font-semibold hover:text-secondary"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
