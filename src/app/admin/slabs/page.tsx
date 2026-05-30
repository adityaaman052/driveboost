import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import AddSlabForm from "@/components/admin/AddSlabForm";

export default async function SlabsPage() {
  const slabs = await prisma.incentiveSlab.findMany({
    orderBy: {
      minRange: "asc",
    },
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Incentive Slabs
      </h1>

      <AddSlabForm />

      <Card className="p-6">
        <div className="space-y-4">
          {slabs.map((slab) => (
            <div
              key={slab.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-semibold">
                  {slab.minRange} -{" "}
                  {slab.maxRange || "∞"} Cars
                </p>

                <p className="text-sm text-gray-500">
                  ₹{slab.incentivePerCar} per car
                </p>
              </div>

              <form
                action={`/api/slabs/${slab.id}`}
                method="POST"
              >
                <button
                  className="rounded-lg bg-red-500 px-3 py-1 text-white"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}

          {slabs.length === 0 && (
            <p>No slabs configured yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
}