import { fetchAllPosts } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AnimatedContent from '@/components/AnimatedContent';

export default async function BlogPage() {
  const posts = await fetchAllPosts(); // Fetch semua post dari backend

  return (
    <section className="bg-gradient-sky font-lexend min-h-screen text-white">
      <Navbar />

      <AnimatedContent>
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            All Blog Posts
          </h1>

          {posts.length === 0 ? (
            <p className="text-center text-gray-300">No posts available.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/post/${post._id}`}
                  className="block bg-primary p-4 rounded-lg shadow-md hover:scale-105 transition"
                >
                  {/* Gambar */}
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Tag di atas Judul */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-dark text-white text-xs px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Judul & Summary */}
                  <h2 className="mt-2 text-xl font-semibold text-dark">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-700 mt-1">{post.summary}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </AnimatedContent>
    </section>
  );
}
