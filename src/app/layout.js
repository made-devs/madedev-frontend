import './globals.css'; // Pastikan Tailwind tetap di-import
import { Righteous } from 'next/font/google';
import { Lexend } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';

const righteous = Righteous({
  subsets: ['latin'],
  weight: '400', // Bisa disesuaikan kalau ada variasi weight
  variable: '--font-righteous', // Variabel CSS untuk Tailwind
  display: 'swap',
});

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-lexend',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en" className={`${righteous.variable} ${lexend.variable}`}>
        <body className="font-sans">{children}</body>
      </html>
    </AuthProvider>
  );
}

