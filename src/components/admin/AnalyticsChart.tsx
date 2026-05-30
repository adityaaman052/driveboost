"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsChart({
  data,
}: {
  data: {
    name: string;
    quantity: number;
  }[];
}) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-2xl font-bold">
        Sales Analytics
      </h2>

      <div className="h-100">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="quantity" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}