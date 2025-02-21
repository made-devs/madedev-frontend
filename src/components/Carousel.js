'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper/modules';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchAllPosts } from '../utils/api';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const API_URL = 'http://localhost:5000/api/posts'; // Ganti dengan URL backend lo

export default function Carousel() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchAllPosts();
      setPosts(data);
      setLoading(false);
    };
    getPosts();
  }, []);

  if (loading)
    return <p className="text-center text-primary">Loading latest posts...</p>;

  return (
    <div className="w-full max-w-md font-lexend mx-auto mt-4 px-4">
      <p className="text-center text-primary mb-3">Latest Post</p>
      <Swiper
        modules={[Pagination, EffectFade]}
        effect="fade"
        speed={600}
        slidesPerView={1}
        pagination={{ clickable: true }}
        fadeEffect={{ crossFade: true }}
        className="rounded-lg"
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <SwiperSlide key={post._id} className="relative">
              <Link href={`/post/${post._id}`}>
                <div className="relative w-full h-[45vh]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-t-lg object-cover"
                    priority
                  />
                  {/* Overlay Tags */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-primary text-dark text-xs px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
              <div className="px-4 py-4 bg-primary rounded-b-lg h-[11rem]">
                <h3 className="text-base font-bold mb-1 text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm">{post.summary}</p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-primary">No posts available</p>
        )}
      </Swiper>
    </div>
  );
}
