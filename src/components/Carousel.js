'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Carousel({ posts }) {
  return (
    <div className="w-full max-w-md font-lexend mx-auto mt-4 px-4">
      <p className="text-center text-primary sm:text-xl mb-3">Latest Post</p>
      <Swiper
        modules={[Pagination, EffectFade]}
        effect="fade"
        speed={600}
        slidesPerView={1}
        pagination={{ clickable: true }}
        fadeEffect={{ crossFade: true }}
        className="rounded-lg"
      >
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <SwiperSlide key={post._id} className="relative">
              <Link href={`/post/${post._id}`}>
                <div className="relative w-full h-[40vh]">
                  {/* Gambar */}
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="rounded-t-lg object-cover"
                    priority
                  />

                  {/* Overlay Judul */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/100 to-transparent px-4 pb-4 pt-8">
                    <h3 className="text-white text-lg font-bold">
                      {post.title}
                    </h3>
                  </div>

                  {/* Overlay Tags */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-primary text-dark text-[10px] sm:text-sm px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>

              {/* Summary Tetap Ada di Bawah */}
              <div className="px-4 py-4 bg-primary rounded-b-lg h-[8rem]">
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
