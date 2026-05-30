"use client";

import { useState } from "react";

export default function AddCarForm() {
  const [modelName, setModelName] = useState("");
  const [variant, setVariant] = useState("");
  const [baseSuffix, setBaseSuffix] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await fetch("/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        modelName,
        variant,
        baseSuffix,
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
        placeholder="Model Name"
        value={modelName}
        onChange={(e) =>
          setModelName(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      />

      <input
        placeholder="Variant"
        value={variant}
        onChange={(e) =>
          setVariant(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      />

      <input
        placeholder="Base Suffix"
        value={baseSuffix}
        onChange={(e) =>
          setBaseSuffix(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      />

      <button
        className="rounded-lg bg-black px-4 py-2 text-white"
      >
        Add Car
      </button>
    </form>
  );
}