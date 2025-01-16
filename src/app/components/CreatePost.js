import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function CreatePost({ communityId }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("posts").insert([
      {
        content,
        community_id: communityId,
        user_id: user.id,
      },
    ]);

    if (error) setError(error.message);
    else {
      setContent("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          rows="4"
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Post
        </button>
      </form>
    </div>
  );
}
