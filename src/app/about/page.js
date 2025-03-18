'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-gradient-sky text-white font-lexend overflow-hidden">
      {/* Navbar tetap di atas */}
      <Navbar />

      {/* Bungkus konten utama dengan motion.div untuk animasi opacity */}
      <motion.div
        className="h-screen overflow-y-auto container mx-auto py-10 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        {/* Foto Profil */}
        <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-secondary shadow-lg">
          <Image
            src="/images/me.jpg"
            alt="Madedev Profile"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-bold text-secondary mb-4">
          Mindscape - More Than Just a Blog
        </h1>

        {/* About the Blog */}
        <p className="text-lg font-light leading-relaxed text-justify mb-6">
          This blog is a mix of my life journey, random musings, favorite
          games,anime, and anything else that excites me. It’s also a place
          where I keep my portfolio, documenting what I’ve built and learned
          along the way. No specific rules, no fixed topics—just a collection of
          things that matter to me. If you enjoy stories, insights, or simply
          geeking out over the same interests, then you’re in the right place.
          Feel free to explore, and welcome to my mindscape.
        </p>

        {/* About the Author */}
        <h2 className="text-xl font-semibold text-secondary mb-3">
          About the Author
        </h2>
        <p className="text-lg font-light leading-relaxed text-justify mb-6">
          Hey there! I’m Madedev—a passionate web developer with an interest in
          frontend, backend, and everything in between. I love experimenting
          with new technologies, refining my craft, and sharing my findings
          along the way. Beyond coding, I’m also into gaming, anime, and design.
          This blog is my way of blending my love for technology and creativity.
        </p>

        {/* Tech Stack */}
        <h2 className="text-xl font-semibold text-secondary mb-3">
          Tech Stack
        </h2>
        <ul className="list-disc list-inside font-light text-lg mb-6 text-left">
          <li>
            🚀 <strong>Frontend:</strong> Next.js, Tailwind CSS, Swiper.js
          </li>
          <li>
            💾 <strong>Backend:</strong> Node.js, Express.js, MongoDB
          </li>
          <li>
            🌎 <strong>Deployment:</strong> Vercel (frontend), Render (backend)
          </li>
        </ul>

        {/* Contact */}
        <h2 className="text-xl font-semibold text-secondary mb-3">
          Connect with Me
        </h2>
        <p className="text-lg font-light mb-4">
          Want to connect? Feel free to reach out through:
        </p>
        <ul className="list-disc list-inside text-lg mb-6 text-left">
          <li>
            💻{' '}
            <a
              href="https://github.com/made-devs"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            🔗{' '}
            <a
              href="https://linkedin.com/in/madedev"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>
          </li>
          <li>
            📩{' '}
            <a
              href="mailto:nmaderama@gmail.com"
              className="text-primary hover:underline"
            >
              Email
            </a>
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
