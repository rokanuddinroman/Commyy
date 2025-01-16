"use client";
import Header from "../components/Header";
import AuthForm from "../components/AuthForm";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <AuthForm />
      </main>
    </div>
  );
}
