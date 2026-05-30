import { prisma } from "@/lib/prisma";
import SalesCalculator from "@/components/sales/SalesCalculator";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { ClipboardList } from "lucide-react";

export default async function SalesPage({
  searchParams,
}: {
  searchParams: Promise<{
    month?: string;
    year?: string;
  }>;
}) {
  const params = await searchParams;
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const currentDate = new Date();

  const selectedMonth = params.month
    ? Number(params.month)
    : currentDate.getMonth() + 1;

  const selectedYear = params.year
    ? Number(params.year)
    : currentDate.getFullYear();

  const cars = await prisma.carModel.findMany();

  const slabs = await prisma.incentiveSlab.findMany({
    orderBy: { minRange: "asc" },
  });

  const existingSales = await prisma.salesEntry.findMany({
    where: {
      userId: user.id,
      month: selectedMonth,
      year: selectedYear,
    },
  });

  const initialQuantities = existingSales.reduce(
    (acc, sale) => {
      acc[sale.carModelId] = sale.quantity;
      return acc;
    },
    {} as Record<string, number>
  );

  const salesHistory = await prisma.salesEntry.findMany({
    where: { userId: user.id },
    include: { carModel: true },
    orderBy: { createdAt: "desc" },
  });

  const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-linear-to-r from-gray-900 via-gray-500 to-gray-900" />

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              DriveBoost
            </p>
            <h1 className="text-lg font-black tracking-tight text-gray-900">
              Sales Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Sales Officer
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
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* Month Selector */}
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-bold text-gray-900">
            Select Period
          </h2>

          <form className="flex flex-wrap gap-3">
            <select
              name="month"
              defaultValue={selectedMonth}
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {monthNames[i]}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="year"
              defaultValue={selectedYear}
              className="w-28 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors"
            />

            <button
              type="submit"
              className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-gray-700 transition-colors"
            >
              Load →
            </button>
          </form>
        </div>

        {/* Sales Calculator */}
        <SalesCalculator
          cars={cars}
          slabs={slabs}
          initialQuantities={initialQuantities}
        />

        {/* Sales History */}
        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
              <ClipboardList size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Sales History</h2>
              <p className="text-xs text-gray-400 mt-0.5">All your past submissions</p>
            </div>
          </div>

          {salesHistory.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 py-10 text-center">
              <p className="text-sm text-gray-400">No sales history found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {salesHistory.map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 hover:border-gray-300 hover:bg-white transition-all"
                >
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {sale.carModel.modelName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {sale.carModel.variant}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {monthNames[sale.month - 1]} {sale.year}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-black text-gray-900">
                      {sale.quantity}
                    </p>
                    <p className="text-xs text-gray-400">Cars Sold</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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