import Link from "next/link";
import Navbar from "@/components/Navbat";
import { Zap, TrendingUp, BarChart2 } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-linear-to-r from-gray-900 via-gray-500 to-gray-900" />

      {/* Nav */}
      <Navbar showGuide={true} />

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-20 pb-28 text-center">
        <span className="mb-5 inline-block rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Toyota Sales Incentive Platform
        </span>

        <h1 className="text-6xl font-black tracking-tight text-gray-900 leading-[1.05] md:text-7xl">
          Drive<span className="text-gray-400">Boost</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-gray-500 leading-relaxed">
          Smart incentive management for vehicle sales teams —
          track performance, configure slabs, and unlock earnings in real time.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/sign-up"
            className="rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-bold text-white shadow-md hover:bg-gray-700 hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            Get Started — It&apos;s Free
          </Link>
          <Link
            href="/sign-in"
            className="rounded-xl border border-gray-300 px-7 py-3.5 text-sm font-bold text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
          >
            Login to Dashboard →
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-24 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
            <Zap size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Dynamic Slabs</h2>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Configure incentive rules dynamically without touching a single line of code.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
            <TrendingUp size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Real-Time Tracking</h2>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Monitor vehicle sales and incentive progress as it happens, instantly.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
            <BarChart2 size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Gain deep insights through reports, charts, and monthly performance analytics.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} DriveBoost.{" "}
          <span className="font-medium text-gray-500">Developed by Aditya Aman.</span>
        </p>
      </footer>
    </main>
  );
}