"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", total: 120 },
  { name: "Feb", total: 180 },
  { name: "Mar", total: 240 },
  { name: "Apr", total: 280 },
  { name: "May", total: 320 },
  { name: "Jun", total: 400 },
  { name: "Jul", total: 450 },
  { name: "Aug", total: 520 },
  { name: "Sep", total: 580 },
  { name: "Oct", total: 620 },
  { name: "Nov", total: 680 },
  { name: "Dec", total: 750 },
];

export function DashboardChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="name"
            className="text-xs text-muted-foreground"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            className="text-xs text-muted-foreground"
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
