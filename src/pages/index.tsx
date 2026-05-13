import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
        {/* Left Content */}
        <div>
          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm border border-blue-500/30 mb-6">
            Find Trusted Nearby Services Instantly
          </span>

          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Discover the Best
            <span className="text-blue-400"> Local Services </span>
            Around You
          </h2>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Search plumbers, electricians, salons, mechanics, tutors, and more.
            Connect with verified professionals near your location in seconds.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/services/"
              className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl text-lg font-semibold transition shadow-2xl shadow-blue-500/30"
            >
              Explore Services
            </Link>

            <Link
              href="/auth/register"
              className="border border-white/20 hover:border-blue-400 hover:text-blue-400 px-8 py-4 rounded-xl text-lg font-semibold transition"
            >
              Get Started
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <h3 className="text-3xl font-bold text-blue-400">10K+</h3>
              <p className="text-gray-400 text-sm mt-2">Active Users</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <h3 className="text-3xl font-bold text-blue-400">500+</h3>
              <p className="text-gray-400 text-sm mt-2">Verified Providers</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <h3 className="text-3xl font-bold text-blue-400">24/7</h3>
              <p className="text-gray-400 text-sm mt-2">Support</p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>

          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop"
              alt="Nearby Services"
              className="rounded-2xl object-cover w-full h-[420px]"
            />
            <div className="absolute bottom-12 left-12 bg-slate-900/80 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
              <p className="text-sm text-gray-300">Trusted Professionals</p>
              <h4 className="text-2xl font-bold text-blue-400">
                Near Your Area
              </h4>
            </div>
          </div>
        </div>
      </section>
      

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Why Choose Nearby Services Finder?
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Fast, reliable, and user-friendly platform for finding local
            experts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Verified Providers",
              desc: "All service providers are verified for quality and trust.",
              icon: "✔️",
            },
            {
              title: "Quick Search",
              desc: "Find nearby services instantly with smart location search.",
              icon: "⚡",
            },
            {
              title: "Easy Management",
              desc: "Providers can manage services from their dashboard easily.",
              icon: "📊",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-500/40 hover:-translate-y-2 transition duration-300"
            >
              <div className="text-5xl mb-5">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-14 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Ready to Find Nearby Services?
          </h2>

          <p className="mt-5 text-lg text-blue-100">
            Join today and connect with trusted professionals around you.
          </p>

          <div className="mt-10 flex justify-center gap-5 flex-wrap">
            <Link
              href="/auth/register"
              className="bg-white text-blue-700 hover:bg-slate-100 px-8 py-4 rounded-xl font-bold transition"
            >
              Create Account
            </Link>

            <Link
              href="/services/"
              className="border border-white/30 hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </section>

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