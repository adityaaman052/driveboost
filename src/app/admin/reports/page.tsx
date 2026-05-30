import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{
    month?: string;
    year?: string;
  }>;
}) {
  const params = await searchParams;

  const selectedMonth = params.month
    ? Number(params.month)
    : undefined;

  const selectedYear = params.year
    ? Number(params.year)
    : undefined;

  const reports = await prisma.salesEntry.findMany({
    where: {
      ...(selectedMonth && {
        month: selectedMonth,
      }),

      ...(selectedYear && {
        year: selectedYear,
      }),
    },

    include: {
      user: true,
      carModel: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Sales Reports
      </h1>

      <Card className="mb-6 p-6">
        <form className="flex gap-4">
          <input
            type="number"
            name="month"
            placeholder="Month"
            className="rounded-lg border p-3"
          />

          <input
            type="number"
            name="year"
            placeholder="Year"
            className="rounded-lg border p-3"
          />

          <button
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Filter
          </button>
        </form>
      </Card>

      <Card className="overflow-x-auto p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">
                Sales Officer
              </th>

              <th className="p-3">
                Car Model
              </th>

              <th className="p-3">
                Variant
              </th>

              <th className="p-3">
                Quantity
              </th>

              <th className="p-3">
                Month
              </th>

              <th className="p-3">
                Year
              </th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-b"
              >
                <td className="p-3">
                  {report.user.name}
                </td>

                <td className="p-3">
                  {
                    report.carModel
                      .modelName
                  }
                </td>

                <td className="p-3">
                  {report.carModel.variant}
                </td>

                <td className="p-3">
                  {report.quantity}
                </td>

                <td className="p-3">
                  {report.month}
                </td>

                <td className="p-3">
                  {report.year}
                </td>
              </tr>
            ))}

            {reports.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500"
                >
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}