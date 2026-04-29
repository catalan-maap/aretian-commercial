"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { OPP_STATUS_LABELS } from "@/types";

const COLORS = [
  "#94a3b8",
  "#60a5fa",
  "#38bdf8",
  "#818cf8",
  "#a78bfa",
  "#f59e0b",
  "#10b981",
];

interface Props {
  data: { status: string; count: number }[];
}

export function PipelineChart({ data }: Props) {
  const mapped = data.map((d) => ({
    ...d,
    label: OPP_STATUS_LABELS[d.status as keyof typeof OPP_STATUS_LABELS] ?? d.status,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={mapped} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="label"
          tick={{ fontSize: 10, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
          cursor={{ fill: "#f8fafc" }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {mapped.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
