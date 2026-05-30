"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Car as CarIcon, IndianRupee, Target } from "lucide-react";

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
  initialQuantities,
}: {
  cars: Car[];
  slabs: Slab[];
  initialQuantities: Record<string, number>;
}) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    initialQuantities
  );
  const [loading, setLoading] = useState(false);

  const totalCars = useMemo(() => {
    return Object.values(quantities).reduce((acc, curr) => acc + curr, 0);
  }, [quantities]);

  const activeSlab = useMemo(() => {
    return slabs.find((slab) => {
      const withinMin = totalCars >= slab.minRange;
      const withinMax = slab.maxRange === null || totalCars <= slab.maxRange;
      return withinMin && withinMax;
    });
  }, [totalCars, slabs]);

  const totalIncentive = activeSlab ? totalCars * activeSlab.incentivePerCar : 0;

  const nextSlab = useMemo(() => {
    return slabs.find((slab) => slab.minRange > totalCars);
  }, [slabs, totalCars]);

  const carsNeeded = nextSlab ? nextSlab.minRange - totalCars : 0;

  async function saveSales() {
    try {
      setLoading(true);
      const salesData = Object.entries(quantities).map(([carModelId, quantity]) => ({
        carModelId,
        quantity,
      }));
      await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salesData, totalCars, totalIncentive }),
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

      {/* Enter Sales */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
            <CarIcon size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Enter Sales</h2>
            <p className="text-xs text-gray-400 mt-0.5">Set quantities for each model</p>
          </div>
        </div>

        <div className="space-y-3">
          {cars.map((car) => (
            <div
              key={car.id}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-5 py-3"
            >
              {/* Car Info */}
              <div>
                <p className="font-semibold text-sm text-gray-900">{car.modelName}</p>
                <p className="text-xs text-gray-500">{car.variant}</p>
              </div>

              {/* Stepper */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setQuantities({
                      ...quantities,
                      [car.id]: Math.max(0, (quantities[car.id] || 0) - 1),
                    })
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 font-bold text-lg hover:bg-gray-100 hover:border-gray-400 transition-colors"
                >
                  −
                </button>

                <input
                  type="number"
                  min="0"
                  value={quantities[car.id] || ""}
                  onChange={(e) =>
                    setQuantities({
                      ...quantities,
                      [car.id]: Number(e.target.value),
                    })
                  }
                  className="w-14 rounded-lg border border-gray-200 bg-white py-1.5 text-center text-sm font-bold text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors"
                />

                <button
                  type="button"
                  onClick={() =>
                    setQuantities({
                      ...quantities,
                      [car.id]: (quantities[car.id] || 0) + 1,
                    })
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white font-bold text-lg hover:bg-gray-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incentive Breakdown */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
            <IndianRupee size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Incentive Breakdown</h2>
            <p className="text-xs text-gray-400 mt-0.5">Auto-calculated from your entries</p>
          </div>
        </div>

        <div className="space-y-3">

          {/* Stats row */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Total Cars</p>
              <p className="mt-1 text-2xl font-black text-gray-900">{totalCars}</p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Slab Range</p>
              <p className="mt-1 text-lg font-black text-gray-900">
                {activeSlab
                  ? `${activeSlab.minRange}–${activeSlab.maxRange || "∞"}`
                  : "—"}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Per Car</p>
              <p className="mt-1 text-lg font-black text-gray-900">
                ₹{activeSlab?.incentivePerCar || 0}
              </p>
            </div>
          </div>

          {/* Total Incentive */}
          <div className="rounded-xl border border-gray-900 bg-gray-900 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Total Incentive
            </p>
            <p className="mt-1 text-3xl font-black text-white">₹{totalIncentive}</p>
          </div>

          {/* Next slab nudge */}
          {nextSlab && carsNeeded > 0 && (
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-5 py-4">
              <p className="text-sm font-medium text-yellow-800 flex items-center gap-2">
                <Target size={16} className="text-yellow-600 shrink-0" />
                Sell{" "}
                <strong>{carsNeeded}</strong> more car{carsNeeded > 1 ? "s" : ""} to
                unlock{" "}
                <strong>₹{nextSlab.incentivePerCar}/car</strong> slab!
              </p>
            </div>
          )}

          {/* Save button */}
          <button
            onClick={saveSales}
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Saving..." : "Save Monthly Sales →"}
          </button>
        </div>
      </div>
    </div>
  );
}