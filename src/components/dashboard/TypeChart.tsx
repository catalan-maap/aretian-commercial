"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ORG_TYPE_LABELS, OrganizationType } from "@/types";
import { TYPE_MAP_COLORS } from "@/lib/utils";

interface Props {
  data: { type: string; count: number }[];
}

export function TypeChart({ data }: Props) {
  const mapped = data.map((d) => ({
    name: ORG_TYPE_LABELS[d.type as OrganizationType] ?? d.type,
    value: d.count,
    color: TYPE_MAP_COLORS[d.type as OrganizationType] ?? "#94a3b8",
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={mapped}
          cx="50%"
          cy="45%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {mapped.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }}
          formatter={(v, n) => [v, n]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(v) => <span style={{ fontSize: 10, color: "#64748b" }}>{v}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
