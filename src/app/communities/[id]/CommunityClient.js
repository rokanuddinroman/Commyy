"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Header from "../../components/Header";
import CreatePost from "../../components/CreatePost";

export default function CommunityClient({ id }) {
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchCommunityData();
  }, [id]);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      const { data } = await supabase
        .from("community_members")
        .select("*")
        .eq("community_id", id)
        .eq("user_id", user.id)
        .single();
      setIsMember(!!data);
    }
  };

  const fetchCommunityData = async () => {
    try {
      // Fetch community data
      const { data: communityData, error: communityError } = await supabase
        .from("communities")
        .select(
          `
          *,
          profiles:created_by (username)
        `
        )
        .eq("id", id)
        .single();

      if (communityError) throw communityError;

      // Fetch posts with profiles
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select(
          `
          *,
          profiles:user_id (username)
        `
        )
        .eq("community_id", id)
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;

      setCommunity(communityData);
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!user) {
      router.push("/auth");
      return;
    }

    const { error } = await supabase.from("community_members").insert([
      {
        community_id: id,
        user_id: user.id,
      },
    ]);

    if (!error) {
      setIsMember(true);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          Loading...
        </main>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">{community?.name}</h1>
          <p className="text-gray-600 mb-4">{community?.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            Created by {community?.profiles?.username || "Unknown"}
          </p>
          {/* {!isMember && (
            <button
              onClick={handleJoin}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Join Community
            </button>
          )} */}
        </div>

        {isMember && <CreatePost communityId={id} />}

        <div className="mt-8 space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold">
                  {post.profiles?.username || "Unknown User"}
                </span>
                <span className="text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
