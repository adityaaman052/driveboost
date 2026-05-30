import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import AddSlabForm from "@/components/admin/AddSlabForm";
import { Plus, Zap } from "lucide-react";

export default async function SlabsPage() {
  const slabs = await prisma.incentiveSlab.findMany({
    orderBy: { minRange: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <div className="mb-8">
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-gray-400">
          Admin · Incentive Management
        </span>
        <h1 className="text-4xl font-black tracking-tight text-gray-900">
          Incentive Slabs
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Configure sales range slabs and their corresponding incentive amounts per car.
        </p>
      </div>

      {/* Add Slab Form */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
            <Plus size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Add New Slab</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Define a sales range and the incentive rewarded per car
            </p>
          </div>
        </div>
        <AddSlabForm />
      </div>

      {/* Slabs List */}
      <Card className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
            <Zap size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Configured Slabs</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {slabs.length} slab{slabs.length !== 1 ? "s" : ""} configured · sorted by range
            </p>
          </div>
        </div>

        {slabs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 py-10 text-center">
            <p className="text-sm text-gray-400">No incentive slabs configured yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {slabs.map((slab, index) => (
              <div
                key={slab.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 hover:border-gray-300 hover:bg-white transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-xs font-black text-white">
                    S{index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">
                      {slab.minRange} – {slab.maxRange ?? "∞"} Cars
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      ₹{slab.incentivePerCar.toLocaleString()} per car
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-bold text-gray-700">
                    ₹{slab.incentivePerCar.toLocaleString()} / car
                  </span>
                  <form action={`/api/slabs/${slab.id}`} method="POST">
                    <button
                      type="submit"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}