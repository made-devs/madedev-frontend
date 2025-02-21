'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const API_URL = 'https://madedev-backend-production.up.railway.app';

// 🔹 Buat Context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Ambil user yang login saat pertama kali load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          credentials: 'include', // 🔹 Kirim cookies untuk autentikasi
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔹 Fungsi Login
  const login = async (username, password) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 🔹 Simpan token di cookie
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        await fetchUser(); // 🔹 Refresh user setelah login
        return { success: true };
      } else {
        const errorData = await res.json();
        return { success: false, error: errorData.error };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  // 🔹 Fungsi Logout
  const logout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setUser(null); // ✅ Pastikan ini ada
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 🔹 Hook untuk mengakses AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
