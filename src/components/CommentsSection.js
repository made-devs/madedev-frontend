'use client';

import { useState, useEffect } from 'react';
import { fetchComments, addComment } from '@/utils/api';

export default function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState(''); // 🔹 Input untuk nama pengguna
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ Fetch comments dari API
  useEffect(() => {
    async function loadComments() {
      const data = await fetchComments(postId);
      setComments(data);
      setLoading(false);
    }
    loadComments();
  }, [postId]);

  // ✅ Tambah komentar baru
  const handleAddComment = async () => {
    if (!name.trim() || !commentText.trim())
      return alert('Name and comment are required');

    const newComment = await addComment(postId, name, commentText);

    if (newComment) {
      setComments((prevComments) => [...prevComments, newComment]); // ✅ Update state dengan data dari backend
      setName('');
      setCommentText('');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-secondary mb-4">Comments</h3>

      {/* 🔹 Form Tambah Komentar */}
      <div className="flex flex-col space-y-3">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md bg-dark text-white"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md bg-dark text-white"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <button
          className="bg-primary text-dark px-4 py-2 rounded-md font-semibold"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>

      {/* 🔹 Daftar Komentar */}
      {loading ? (
        <p className="text-gray-400 mt-4">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-400 mt-4">No comments yet. Be the first!</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {comments.map((comment, index) => (
            <li key={index} className="border-b border-gray-700 pb-2">
              <p className="text-sm text-secondary">{comment.content}</p>
              <span className="text-xs text-white">
                — {comment.name || 'Anonymous'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
