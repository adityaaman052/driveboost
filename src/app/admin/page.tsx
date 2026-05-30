import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import AnalyticsChart from "@/components/admin/AnalyticsChart";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.role !== "ADMIN") {
    redirect("/sales");
  }

  const sales =
    await prisma.salesEntry.findMany({
      include: {
        carModel: true,
      },
    });

  const totalCarsSold = sales.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  const totalRevenue = sales.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  const chartData = sales.map((sale) => ({
    name: sale.carModel.modelName,
    quantity: sale.quantity,
  }));

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-0 bg-linear-to-br from-white to-gray-100 p-6 shadow-md transition hover:scale-[1.02] hover:shadow-xl">
          <h2 className="text-lg font-semibold">
            Total Cars Sold
          </h2>

          <p className="mt-4 text-3xl font-bold">
            {totalCarsSold}
          </p>
          
        </Card>

        <Card className="border-0 bg-linear-to-br from-white to-gray-100 p-6 shadow-md transition hover:scale-[1.02] hover:shadow-xl">
          <h2 className="text-lg font-semibold">
            Sales Entries
          </h2>

          <p className="mt-4 text-3xl font-bold">
            {sales.length}
          </p>
        </Card>

        <Card className="border-0 bg-linear-to-br from-white to-gray-100 p-6 shadow-md transition hover:scale-[1.02] hover:shadow-xl">
          <h2 className="text-lg font-semibold">
            Estimated Incentives
          </h2>

          <p className="mt-4 text-3xl font-bold">
            ₹{totalRevenue}
          </p>
        </Card>
      </div>

      <div className="mt-10">
        <AnalyticsChart data={chartData} />
      </div>
    </div>
  );
}