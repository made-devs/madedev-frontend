'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import CreatePostForm from '@/components/CreatePostForm';

export default function CreatePostPage() {
  const { user, loading } = useAuth(); // ✅ Ambil loading state juga
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // ✅ Hanya redirect jika sudah pasti user tidak ada
      console.warn('❌ Unauthorized, redirecting...');
      router.push('/'); // Redirect ke home jika belum login
    }
  }, [user, loading, router]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>; // ✅ Hindari flicker
  }

  if (!user) {
    return (
      <p className="text-center text-red-500 mt-10">Unauthorized Access</p>
    );
  }

  return <CreatePostForm />;
}
