const API_URL = 'https://madedev-backend-production.up.railway.app';

// Fetch Semua Post
export const fetchAllPosts = async () => {
  try {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return await res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Fetch Single Post by ID
export const fetchPostById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/posts/${id}`);
    if (!res.ok) {
      throw new Error('Post not found');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

export async function fetchComments(postId) {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`);
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}

export async function addComment(postId, name, content) {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, content }),
  });

  if (!res.ok) throw new Error('Failed to add comment');
  return res.json();
}
