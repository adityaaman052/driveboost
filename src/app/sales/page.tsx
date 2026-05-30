import { prisma } from "@/lib/prisma";
import SalesCalculator from "@/components/sales/SalesCalculator";

export default async function SalesPage() {
  const cars = await prisma.carModel.findMany();

  const slabs =
    await prisma.incentiveSlab.findMany({
      orderBy: {
        minRange: "asc",
      },
    });

  return (
    <div className="p-10">
      <h1 className="mb-6 text-3xl font-bold">
        Sales Dashboard
      </h1>

      <SalesCalculator
        cars={cars}
        slabs={slabs}
      />
    </div>
  );
}