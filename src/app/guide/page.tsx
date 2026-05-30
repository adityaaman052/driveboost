import Link from "next/link";
import Navbar from "@/components/Navbat";
import {
  Settings,
  UserCircle,
  Sparkles,
  Lock,
  ShieldCheck,
  CalendarDays,
  Zap,
  BarChart2,
  Database,
  Link2,
  Smartphone,
} from "lucide-react";

const featureIcons: Record<string, React.ReactNode> = {
  "Clerk Authentication": <Lock size={16} />,
  "Role-Based Access Control (RBAC)": <ShieldCheck size={16} />,
  "Monthly Sales Tracking": <CalendarDays size={16} />,
  "Incentive Calculation Engine": <Zap size={16} />,
  "Admin Analytics & Reports": <BarChart2 size={16} />,
  "Persistent Database Storage with PostgreSQL": <Database size={16} />,
  "Prisma ORM": <Link2 size={16} />,
  "Responsive Dashboard UI": <Smartphone size={16} />,
};

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-linear-to-r from-gray-900 via-gray-500 to-gray-900" />

      {/* Nav */}
      <Navbar showGuide={false} />

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-6 py-12 pb-24">

        {/* Header */}
        <div className="mb-12">
          <span className="mb-3 inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Documentation
          </span>
          <h1 className="text-5xl font-black tracking-tight text-gray-900">
            User Guide
          </h1>
          <p className="mt-3 text-base text-gray-500">
            Toyota Sales Incentive Management System — DriveBoost
          </p>
        </div>

        <div className="space-y-8">

          {/* Admin Workflow */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
                <Settings size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Admin Workflow</h2>
                <p className="text-xs text-gray-400 mt-0.5">For platform administrators</p>
              </div>
            </div>
            <ol className="space-y-3">
              {[
                "Login and select the Admin role.",
                "Access the Admin Dashboard for sales analytics and reports.",
                "Add or manage Toyota car models.",
                "Configure incentive slabs based on sales ranges.",
                "View monthly sales reports submitted by Sales Officers.",
                "Analyze total sales performance using charts and dashboard metrics.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-600 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Sales Officer Workflow */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
                <UserCircle size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Sales Officer Workflow</h2>
                <p className="text-xs text-gray-400 mt-0.5">For field sales representatives</p>
              </div>
            </div>
            <ol className="space-y-3">
              {[
                "Login and select the Sales Officer role.",
                "Select a month and year for your sales entry.",
                "Enter quantities sold for different Toyota models.",
                "View automatic incentive calculations based on configured slabs.",
                "Save monthly sales data securely.",
                "Access previous sales history anytime.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-600 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Key Features */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
                <Sparkles size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Key Features</h2>
                <p className="text-xs text-gray-400 mt-0.5">Platform capabilities at a glance</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Clerk Authentication",
                "Role-Based Access Control (RBAC)",
                "Monthly Sales Tracking",
                "Incentive Calculation Engine",
                "Admin Analytics & Reports",
                "Persistent Database Storage with PostgreSQL",
                "Prisma ORM",
                "Responsive Dashboard UI",
              ].map((label, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
                >
                  <span className="text-gray-600">{featureIcons[label]}</span>
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} DriveBoost.{" "}
          <span className="font-medium text-gray-500">Developed by Aditya Aman.</span>
        </p>
      </footer>
    </div>
  );
}