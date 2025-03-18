import { notFound } from 'next/navigation';
import { fetchPostById } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CommentsSection from '@/components/CommentsSection'; // 🔹 Import Komponen Komentar
import AnimatedContent from '../../../components/AnimatedContent';

export default async function PostPage({ params }) {
  const { id } = await params;
  const post = await fetchPostById(id);

  if (!post) {
    return notFound(); // ✅ Redirect ke halaman 404 jika post tidak ditemukan
  }

  return (
    <section className="bg-gradient-sky font-lexend min-h-screen">
      <Navbar />
      <AnimatedContent>
        <div className="max-w-3xl mx-auto pt-3 pb-6  px-6 text-gray-900 rounded-b-lg shadow-lg">
          {/* Header */}
          <h1 className="text-3xl font-extrabold text-secondary mb-4">
            {post.title}
          </h1>

          {/* Image */}
          <div className="relative w-full h-[50vh] rounded-lg overflow-hidden mb-6">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Overlay Tags */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {Array.isArray(post.tags) &&
                post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-dark text-xs px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg text-white font-normal leading-relaxed text-left">
            {Array.isArray(post.content)
              ? post.content.map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))
              : post.content
                  .split('\n\n') // ✅ Pastikan ini hanya terjadi jika `content` adalah string
                  .map((paragraph, index) => (
                    <p key={index} className="mb-6 indent-8">
                      {paragraph}
                    </p>
                  ))}
          </div>

          {/* 🔹 Tambahkan Komponen Komentar */}
          <CommentsSection postId={id} />

          {/* Back Button */}
          <div className="mt-6">
            <Link
              href="/"
              className="text-primary font-semibold hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </AnimatedContent>
    </section>
  );
}
