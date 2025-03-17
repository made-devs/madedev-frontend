'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // 🔹 Ambil user & logout dari AuthContext

  const handleLogout = async () => {
    await logout(); // 🔹 Logout user
  };

  return (
    <nav className=" p-4  font-lexend rounded-b-lg relative z-50 ">
      <div className="w-full flex justify-between items-center">
        {/* Link ke Home */}
        <Link
          href="/"
          className="text-xl font-righteous text-white font-medium"
        >
          madedev
        </Link>

        {/* 🔹 Hanya tampilkan tombol Logout jika user sudah login */}
        {user && (
          <button
            onClick={handleLogout}
            className="text-dark text-sm font-semibold hover:text-secondary"
          >
            Logout
          </button>
        )}

        {/* Hamburger Button */}
        <button
          className="text-white text-2xl z-40 focus:outline-none ml-4"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* 🔹 Menu Navigasi (Tetap dalam Hamburger) */}
      <div
        className={`absolute left-0 top-full w-full bg-primary rounded-b-lg text-dark text-center py-4 shadow-md transition-transform duration-700 z-20 ${
          menuOpen ? '-translate-y-[4rem]' : '-translate-y-[150%]'
        } `}
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
        </ul>
      </div>
    </nav>
  );
}
