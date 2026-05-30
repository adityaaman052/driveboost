"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

interface Car {
    id: string;
    modelName: string;
    variant: string;
}

interface Slab {
    id: string;
    minRange: number;
    maxRange: number | null;
    incentivePerCar: number;
}

export default function SalesCalculator({
    cars,
    slabs,
}: {
    cars: Car[];
    slabs: Slab[];
}) {
    const [quantities, setQuantities] =
        useState<Record<string, number>>({});

    const [loading, setLoading] =
        useState(false);

    const totalCars = useMemo(() => {
        return Object.values(quantities).reduce(
            (acc, curr) => acc + curr,
            0
        );
    }, [quantities]);

    const activeSlab = useMemo(() => {
        return slabs.find((slab) => {
            const withinMin =
                totalCars >= slab.minRange;

            const withinMax =
                slab.maxRange === null ||
                totalCars <= slab.maxRange;

            return withinMin && withinMax;
        });
    }, [totalCars, slabs]);

    const totalIncentive = activeSlab
        ? totalCars *
        activeSlab.incentivePerCar
        : 0;
        const nextSlab = useMemo(() => {
  return slabs.find(
    (slab) => slab.minRange > totalCars
  );
}, [slabs, totalCars]);

const carsNeeded = nextSlab
  ? nextSlab.minRange - totalCars
  : 0;

    async function saveSales() {
        try {
            setLoading(true);

            const salesData = Object.entries(
                quantities
            ).map(([carModelId, quantity]) => ({
                carModelId,
                quantity,
            }));

            await fetch("/api/sales", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    salesData,
                    totalCars,
                    totalIncentive,
                }),
            });

            toast.success("Sales saved successfully!");
        } catch (error) {
            console.log(error);

            toast.error("Failed to save sales.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="rounded-xl border bg-white p-6">
                <h2 className="mb-4 text-xl font-bold">
                    Enter Sales
                </h2>

                <div className="space-y-4">
                    {cars.map((car) => (
                        <div
                            key={car.id}
                            className="flex items-center justify-between"
                        >
                            <div>
                                <p className="font-semibold">
                                    {car.modelName}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {car.variant}
                                </p>
                            </div>

                            <input
                                type="number"
                                min="0"
                                value={
                                    quantities[car.id] || ""
                                }
                                onChange={(e) =>
                                    setQuantities({
                                        ...quantities,
                                        [car.id]:
                                            Number(e.target.value),
                                    })
                                }
                                className="w-24 rounded-lg border p-2"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl border bg-white p-6">
                <h2 className="mb-4 text-xl font-bold">
                    Incentive Breakdown
                </h2>

               <div className="space-y-2">
  <p>
    Total Cars Sold:{" "}
    <strong>{totalCars}</strong>
  </p>

  <p>
    Incentive Slab:{" "}
    <strong>
      {activeSlab
        ? `${activeSlab.minRange} - ${
            activeSlab.maxRange || "∞"
          }`
        : "No Slab"}
    </strong>
  </p>

  <p>
    Incentive Per Car:{" "}
    <strong>
      ₹
      {activeSlab?.incentivePerCar || 0}
    </strong>
  </p>

  <p className="text-2xl font-bold">
    Total Incentive: ₹
    {totalIncentive}
  </p>

  {nextSlab && carsNeeded > 0 && (
    <div className="mt-4 rounded-lg bg-yellow-100 p-4">
      <p className="font-medium">
        Sell{" "}
        <strong>{carsNeeded}</strong>{" "}
        more car
        {carsNeeded > 1 ? "s" : ""} to
        unlock ₹
        {nextSlab.incentivePerCar} per
        car slab.
      </p>
    </div>
  )}

  <button
    onClick={saveSales}
    disabled={loading}
    className="mt-4 rounded-lg bg-black px-4 py-2 text-white"
  >
    {loading
      ? "Saving..."
      : "Save Monthly Sales"}
  </button>
</div>
            </div>
        </div>
    );
}