import { prisma } from "@/lib/prisma";

import SalesCalculator from "@/components/sales/SalesCalculator";

import { getCurrentUser } from "@/lib/getCurrentUser";

import { redirect } from "next/navigation";

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

  const selectedMonth =
    params.month
      ? Number(params.month)
      : currentDate.getMonth() + 1;

  const selectedYear =
    params.year
      ? Number(params.year)
      : currentDate.getFullYear();

  const cars =
    await prisma.carModel.findMany();

  const slabs =
    await prisma.incentiveSlab.findMany({
      orderBy: {
        minRange: "asc",
      },
    });

  const existingSales =
    await prisma.salesEntry.findMany({
      where: {
        userId: user.id,
        month: selectedMonth,
        year: selectedYear,
      },
    });

  const initialQuantities =
    existingSales.reduce(
      (acc, sale) => {
        acc[sale.carModelId] =
          sale.quantity;

        return acc;
      },
      {} as Record<string, number>
    );

  const salesHistory =
    await prisma.salesEntry.findMany({
      where: {
        userId: user.id,
      },

      include: {
        carModel: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div className="p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Sales Dashboard
          </h1>

          <p className="text-gray-500">
            Welcome, {user.name}
          </p>
        </div>
      </div>

      <div className="mb-6 rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          Select Month
        </h2>

        <form className="flex gap-4">
          <select
            name="month"
            defaultValue={selectedMonth}
            className="rounded-lg border p-3"
          >
            {Array.from(
              { length: 12 },
              (_, i) => (
                <option
                  key={i + 1}
                  value={i + 1}
                >
                  Month {i + 1}
                </option>
              )
            )}
          </select>

          <input
            type="number"
            name="year"
            defaultValue={selectedYear}
            className="rounded-lg border p-3"
          />

          <button className="rounded-lg bg-black px-4 py-2 text-white">
            Load
          </button>
        </form>
      </div>

      <SalesCalculator
        cars={cars}
        slabs={slabs}
        initialQuantities={
          initialQuantities
        }
      />

      <div className="mt-10 rounded-xl border bg-white p-6">
        <h2 className="mb-6 text-2xl font-bold">
          Sales History
        </h2>

        <div className="space-y-4">
          {salesHistory.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-semibold">
                  {
                    sale.carModel
                      .modelName
                  }
                </p>

                <p className="text-sm text-gray-500">
                  {
                    sale.carModel
                      .variant
                  }
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  {sale.month}/
                  {sale.year}
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold">
                  {sale.quantity} Cars
                </p>
              </div>
            </div>
          ))}

          {salesHistory.length ===
            0 && (
            <p className="text-gray-500">
              No sales history found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}