"use client";
import Header from "../components/Header";
import CreateCommunity from "../components/CreateCommunity";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function CreateCommunityPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth");
    }
    setUser(user);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen ">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <CreateCommunity />
      </main>
    </div>
  );
}
