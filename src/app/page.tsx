"use client";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Header from "./components/Header";
import Link from "next/link";

export default function Home() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    const { data, error } = await supabase
      .from("communities")
      .select(
        `
        id,
        name,
        description,
        created_at,
        profiles (username),
        community_members (count)
      `
      )
      .order("created_at", { ascending: false });

    if (!error) setCommunities(data);
    setLoading(false);
  };

  return (
    <div className="bg-white">
      <div className="z-20">
        <Header />
      </div>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Gradient Background Effect - Top */}
        {/* <div
          aria-hidden="true"
          className="absolute select-none inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] select-none"
          />
        </div> */}

        <div className="mx-auto max-w-5xl py-32 lg:py-24">
          {/* Announcement Banner */}
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Join our growing community of creators{" "}
              <a href="#" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Get started today <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Find Your People, Build Your Community
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              Connect with like-minded individuals, share your passions, and
              create meaningful connections. Join thousands of communities or
              start your own today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/create-community"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Community
              </Link>
              {/* <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Explore Communities <span aria-hidden="true">→</span>
              </a> */}
            </div>
          </div>
        </div>

        {/* Gradient Background Effect - Bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      {/* Featured Communities Section */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Featured Communities
        </h2>
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Loading communities...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <div
                key={community.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold mb-2">{community.name}</h3>
                <p className="text-gray-600 mb-4">{community.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Created by {community.profiles.username}</span>
                  <span>{community.community_members.count} members</span>
                </div>
                <Link
                  href={`/communities/${community.id}`}
                  className="mt-4 block text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  Join Community
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
