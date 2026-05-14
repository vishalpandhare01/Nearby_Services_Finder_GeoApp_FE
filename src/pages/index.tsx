import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ServiceMap = dynamic(() => import("../components/services/main"), {
  ssr: false,
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white`}
    >
      {/* Navbar */}
      <header className="border-b border-white/10 backdrop-blur-md sticky top-0 z-50 bg-black/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/40">
              NS
            </div>
            <h1 className="text-2xl font-bold tracking-wide">
              Nearby Services Finder
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/services/"
              className="hover:text-blue-400 transition"
            >
              Services
            </Link>

            <Link
              href="/dashboard/manage_services/"
              className="hover:text-blue-400 transition"
            >
              Manage Services
            </Link>

            <Link
              href="/auth/login"
              className="hover:text-blue-400 transition"
            >
              Login
            </Link>

            <Link
              href="/auth/register"
              className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-full transition shadow-lg shadow-blue-500/30"
            >
              Register
            </Link>
          </div>
        </nav>
      </header>

      <ServiceMap />

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-400">
        <p>
          © {new Date().getFullYear()} Nearby Services Finder. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}