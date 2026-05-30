"use client";

import { useState } from "react";

export default function AddSlabForm() {
  const [minRange, setMinRange] = useState("");
  const [maxRange, setMaxRange] = useState("");
  const [incentivePerCar, setIncentivePerCar] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await fetch("/api/slabs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        minRange: Number(minRange),
        maxRange: maxRange
          ? Number(maxRange)
          : null,
        incentivePerCar:
          Number(incentivePerCar),
      }),
    });

    window.location.reload();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 space-y-4"
    >
      <input
        placeholder="Min Range"
        value={minRange}
        onChange={(e) =>
          setMinRange(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      />

      <input
        placeholder="Max Range (optional)"
        value={maxRange}
        onChange={(e) =>
          setMaxRange(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      />

      <input
        placeholder="Incentive Per Car"
        value={incentivePerCar}
        onChange={(e) =>
          setIncentivePerCar(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      />

      <button
        className="rounded-lg bg-black px-4 py-2 text-white"
      >
        Add Slab
      </button>
    </form>
  );
}