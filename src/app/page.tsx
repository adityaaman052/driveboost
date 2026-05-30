import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-white to-gray-100">
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-6xl font-extrabold tracking-tight">
          DriveBoost
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-gray-600">
          Smart Incentive Management
          Platform for Vehicle Sales
          Teams.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/sign-in"
            className="rounded-xl bg-black px-6 py-3 text-white shadow-lg transition hover:scale-105"
          >
            Login
          </Link>

          <Link
            href="/sign-up"
            className="rounded-xl border border-black px-6 py-3 transition hover:bg-black hover:text-white"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold">
            Dynamic Slabs
          </h2>

          <p className="mt-3 text-gray-600">
            Configure incentive rules
            dynamically without changing
            code.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold">
            Real-Time Tracking
          </h2>

          <p className="mt-3 text-gray-600">
            Monitor vehicle sales and
            incentive progress instantly.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold">
            Analytics Dashboard
          </h2>

          <p className="mt-3 text-gray-600">
            Gain insights using reports,
            charts, and monthly analytics.
          </p>
        </div>
      </section>
    </main>
  );
}