'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Carousel from '@/components/Carousel';
import Image from 'next/image';

const API_URL = 'https://madedev-backend-production.up.railway.app';

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts saat halaman dimuat
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/posts`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();

    // Tampilkan konten utama setelah 2.5 detik
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-sky relative pb-8 font-lexend text-white">
      {/* Navbar tetap selalu di atas */}
      <Navbar />

      {/* Animasi Cloud dengan Framer Motion */}
      <motion.div
        className="absolute inset-0"
        initial={{ y: 100, x: 10, opacity: 1 }}
        animate={{ x: 500, opacity: 0 }}
        transition={{
          type: 'tween',
          duration: 3,
          delay: 1.5,
        }}
      >
        <Image
          src="/cloud1.webp"
          alt="Cloud"
          height={10}
          width={400}
          priority
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        initial={{ y: 200, x: 10, opacity: 1 }}
        animate={{ x: -500, opacity: 0 }}
        transition={{
          type: 'tween',
          duration: 3,
          delay: 1.5,
        }}
      >
        <Image
          src="/cloud2.webp"
          alt="Cloud"
          height={10}
          width={400}
          priority
        />
      </motion.div>

      {/* Grass Background yang selalu berada di tengah dengan efek zoom saat hover */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center ">
        <div className="relative w-full h-[100px] md:h-[150px] lg:h-[200px] overflow-hidden">
          <Image
            src="/grassbotfull.webp"
            alt="Grass Background"
            fill
            className="object-cover object-center "
            priority
          />
        </div>
      </div>

      {/* Main Content (muncul setelah animasi selesai) */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="container mx-auto pb-4 px-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <h2 className=" py-2 text-center text-xs font-light">
              Welcome to the <br />
              <span className="text-secondary text-4xl font-semibold">
                &quot;Mindscape&quot;
              </span>
            </h2>
            <p className="text-white mt-1 px-3 text-center text-[12px] font-light leading-relaxed">
              A space where ideas, creativity, and perspectives converge.
              Sometimes it’s about web development, but most of the time, it’s
              just a journey of thinking, questioning, and evolving. Enjoy!
            </p>
            {/* Pass data posts ke Carousel */}
            <Carousel posts={posts} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

