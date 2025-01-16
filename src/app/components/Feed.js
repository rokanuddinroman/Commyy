import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        content,
        created_at,
        communities (name),
        profiles (username)
      `
      )
      .order("created_at", { ascending: false });

    if (!error) setPosts(data);
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-6 mb-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold">{post.profiles.username}</span>
            <span className="text-gray-500">{post.communities.name}</span>
          </div>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
