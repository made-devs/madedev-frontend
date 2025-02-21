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
    <nav className="bg-primary p-4 shadow-md font-lexend rounded-b-lg relative z-50 ">
      <div className="w-full flex justify-between items-center">
        {/* Link ke Home */}
        <Link
          href="/"
          className="text-xl font-righteous text-dark font-semibold"
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
          className="text-dark text-2xl focus:outline-none ml-4"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* 🔹 Menu Navigasi (Tetap dalam Hamburger) */}
      <div
        className={`absolute left-0 top-full w-full bg-primary rounded-b-lg text-dark text-center py-4 shadow-md transition-transform duration-700 z-40 ${
          menuOpen ? '-translate-y-3' : '-translate-y-[150%]'
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
