"use client";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    const { data, error } = await supabase
      .from("communities")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setCommunities(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen ">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Communities</h1>
        {loading ? (
          <div>Loading communities...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <div
                key={community.name}
                className="overflow-hidden rounded-lg bg-white shadow"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-xl font-bold mb-2">{community.name}</h2>
                  <p className="text-gray-600 mb-4">{community.description}</p>
                  <Link
                    href={`/communities/${community.id}`}
                    className="block text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    View Community
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
