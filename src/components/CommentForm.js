'use client';

import { useState } from 'react';

export default function CommentForm({ postId, onCommentAdded }) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      `http://localhost:5000/api/posts/${postId}/comments`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      onCommentAdded(data.post.comments); // 🔹 Update komentar setelah submit
      setName('');
      setContent('');
    } else {
      alert('Failed to add comment');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-gray-100 p-4 rounded">
      <h3 className="text-lg font-semibold mb-3">Leave a Comment</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-3"
        required
      />
      <textarea
        placeholder="Your Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-3"
        required
      />
      <button
        type="submit"
        className="w-full bg-primary text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Comment'}
      </button>
    </form>
  );
}
