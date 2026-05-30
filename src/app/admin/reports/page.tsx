import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Search, ClipboardList } from "lucide-react";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{
    month?: string;
    year?: string;
  }>;
}) {
  const params = await searchParams;

  const selectedMonth = params.month ? Number(params.month) : undefined;
  const selectedYear = params.year ? Number(params.year) : undefined;

  const reports = await prisma.salesEntry.findMany({
    where: {
      ...(selectedMonth && { month: selectedMonth }),
      ...(selectedYear && { year: selectedYear }),
    },
    include: {
      user: true,
      carModel: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <div className="mb-8">
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-gray-400">
          Admin · Reports
        </span>
        <h1 className="text-4xl font-black tracking-tight text-gray-900">
          Sales Reports
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Filter and review monthly sales submissions across all officers.
        </p>
      </div>

      {/* Filter Card */}
      <Card className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
            <Search size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Filter Reports</h2>
            <p className="text-xs text-gray-400 mt-0.5">Leave blank to view all entries</p>
          </div>
        </div>

        <form className="flex flex-wrap gap-3">
          <input
            type="number"
            name="month"
            placeholder="Month"
            className="w-36 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors"
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            className="w-28 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors"
          />
          <button
            type="submit"
            className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-gray-700 transition-colors"
          >
            Filter →
          </button>
        </form>
      </Card>

      {/* Reports Table */}
      <Card className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
            <ClipboardList size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">All Entries</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {reports.length} record{reports.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-gray-400">
                  Sales Officer
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-gray-400">
                  Car Model
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-gray-400">
                  Variant
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-gray-400">
                  Qty
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-gray-400">
                  Month
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-gray-400">
                  Year
                </th>
              </tr>
            </thead>

            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <p className="text-sm text-gray-400">No reports found.</p>
                  </td>
                </tr>
              ) : (
                reports.map((report, index) => (
                  <tr
                    key={report.id}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                          {(report.user.name ?? "U").charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900">
                          {report.user.name ?? "Unknown User"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {report.carModel.modelName}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {report.carModel.variant}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center justify-center rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-bold text-white">
                        {report.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {monthNames[report.month - 1]}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {report.year}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}