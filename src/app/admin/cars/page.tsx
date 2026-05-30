import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import AddCarForm from "@/components/admin/AddCarForm";
import { Plus, Car } from "lucide-react";

export default async function CarsPage() {
  const cars = await prisma.carModel.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <div className="mb-8">
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-gray-400">
          Admin · Car Management
        </span>
        <h1 className="text-4xl font-black tracking-tight text-gray-900">
          Car Models
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Add and manage Toyota vehicle models available for sales entry.
        </p>
      </div>

      {/* Add Car Form */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
            <Plus size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Add New Model</h2>
            <p className="text-xs text-gray-400 mt-0.5">Fill in the details to register a new car model</p>
          </div>
        </div>
        <AddCarForm />
      </div>

      {/* Cars List */}
      <Card className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
            <Car size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Registered Models</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {cars.length} model{cars.length !== 1 ? "s" : ""} registered
            </p>
          </div>
        </div>

        {cars.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 py-10 text-center">
            <p className="text-sm text-gray-400">No car models added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cars.map((car) => (
              <div
                key={car.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 hover:border-gray-300 hover:bg-white transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 text-sm font-black text-gray-600">
                    {car.modelName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">
                      {car.modelName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {car.variant}
                    </p>
                  </div>
                </div>

                <form action={`/api/cars/${car.id}`} method="POST">
                  <button
                    type="submit"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                  >
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}