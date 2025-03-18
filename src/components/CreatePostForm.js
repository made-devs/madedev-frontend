'use client';

import { useState } from 'react';

export default function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(''); // 🔹 Tambahkan input tags (pisah dengan koma)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Ubah content menjadi array berdasarkan enter (`\n`)
    const formattedContent = content
      .split('\n')
      .filter((line) => line.trim() !== '');

    // 🔹 Ubah tags menjadi array (pisahkan berdasarkan koma `,`)
    const formattedTags = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const newPost = {
      title,
      summary,
      content: formattedContent, // ✅ Simpan content dalam bentuk array
      image,
      tags: formattedTags, // ✅ Simpan tags sebagai array
    };

    console.log('📤 Sending Data:', newPost); // ✅ Debug data yang dikirim ke backend

    try {
      const res = await fetch(
        'https://madedev-backend-production.up.railway.app/api/posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPost),
        }
      );

      const responseData = await res.json();
      console.log('📥 Response from Server:', responseData); // ✅ Debug response dari backend

      if (res.ok) {
        alert('✅ Post berhasil ditambahkan!');
        setTitle('');
        setSummary('');
        setContent('');
        setImage('');
        setTags('');
      } else {
        alert(`❌ Gagal menambahkan post: ${responseData.error}`);
      }
    } catch (error) {
      console.error('❌ Error saat mengirim data:', error);
      alert('Terjadi kesalahan saat menghubungi server.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Tags (Pisahkan dengan koma, contoh: Tech, AI, Web)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Content (Gunakan Enter untuk paragraf baru)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          rows="6"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
}
