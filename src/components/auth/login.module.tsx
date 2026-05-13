"use client";

import Link from "next/link";
import { useState } from "react";
import { loginApi } from "@/api/auth_api";
import { useRouter } from "next/dist/client/components/navigation";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginApi({ email, password });
      window.alert("Login successful");
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4">
      {error && (
        <div className="fixed top-4 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 rounded-3xl bg-red-600/95 px-4 py-3 text-sm text-white shadow-2xl">
          {error}
        </div>
      )}

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl text-white">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/30">
            NS
          </div>

          <h1 className="text-3xl font-bold mt-5">Login</h1>

          <p className="text-gray-400 mt-2">Access your Nearby Services Finder account</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm text-gray-300">Email</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 transition py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-blue-400 hover:text-blue-300">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}