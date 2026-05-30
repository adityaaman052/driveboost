import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import AnalyticsChart from "@/components/admin/AnalyticsChart";
import { Car, ClipboardList, IndianRupee, BarChart2 } from "lucide-react";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.role !== "ADMIN") {
    redirect("/sales");
  }

  const sales = await prisma.salesEntry.findMany({
    include: { carModel: true },
  });

  const totalCarsSold = sales.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalRevenue = sales.reduce((acc, curr) => acc + curr.quantity, 0);

  const chartData = sales.map((sale) => ({
    name: sale.carModel.modelName,
    quantity: sale.quantity,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-linear-to-r from-gray-900 via-gray-500 to-gray-900" />

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              DriveBoost
            </p>
            <h1 className="text-lg font-black tracking-tight text-gray-900">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Admin
            </span>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm font-semibold text-gray-700">
                {user.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Stats Cards */}
        <div className="grid gap-5 md:grid-cols-3">

          <Card className="group border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all rounded-2xl">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
              <Car size={20} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Total Cars Sold
            </p>
            <p className="mt-2 text-4xl font-black text-gray-900">
              {totalCarsSold}
            </p>
          </Card>

          <Card className="group border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all rounded-2xl">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
              <ClipboardList size={20} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Sales Entries
            </p>
            <p className="mt-2 text-4xl font-black text-gray-900">
              {sales.length}
            </p>
          </Card>

          <Card className="group border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all rounded-2xl">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
              <IndianRupee size={20} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Estimated Incentives
            </p>
            <p className="mt-2 text-4xl font-black text-gray-900">
              ₹{totalRevenue}
            </p>
          </Card>

        </div>

        {/* Chart */}
        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
              <BarChart2 size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Sales Analytics</h2>
              <p className="text-xs text-gray-400 mt-0.5">Car-wise sales breakdown</p>
            </div>
          </div>
          <AnalyticsChart data={chartData} />
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