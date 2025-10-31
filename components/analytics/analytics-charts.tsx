"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface AnalyticsChartsProps {
  dateRange: string
}

const WEEKLY_DATA = [
  { day: "Lun", tickets: 145, resolved: 120, satisfaction: 4.5 },
  { day: "Mar", tickets: 168, resolved: 142, satisfaction: 4.6 },
  { day: "Mié", tickets: 152, resolved: 135, satisfaction: 4.4 },
  { day: "Jue", tickets: 178, resolved: 155, satisfaction: 4.7 },
  { day: "Vie", tickets: 195, resolved: 168, satisfaction: 4.8 },
  { day: "Sab", tickets: 89, resolved: 78, satisfaction: 4.6 },
  { day: "Dom", tickets: 72, resolved: 65, satisfaction: 4.5 },
]

const PRIORITY_DATA = [
  { name: "Crítica", value: 45, fill: "#e74c3c" },
  { name: "Alta", value: 128, fill: "#f1c40f" },
  { name: "Media", value: 456, fill: "#3498db" },
  { name: "Baja", value: 618, fill: "#7f8c8d" },
]

export default function AnalyticsCharts({ dateRange }: AnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-2 gap-8 mb-8">
      {/* Tickets Over Time */}
      <div className="card">
        <h3 className="text-lg font-bold text-foreground mb-4">Tickets por Día</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={WEEKLY_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="day" stroke="var(--color-gray-dark)" />
            <YAxis stroke="var(--color-gray-dark)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-white)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="tickets" stroke="var(--color-primary)" strokeWidth={2} name="Tickets" />
            <Line type="monotone" dataKey="resolved" stroke="var(--color-success)" strokeWidth={2} name="Resueltos" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Priority Distribution */}
      <div className="card">
        <h3 className="text-lg font-bold text-foreground mb-4">Distribución por Prioridad</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={PRIORITY_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-gray-dark)" />
            <YAxis stroke="var(--color-gray-dark)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-white)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" fill="var(--color-primary)" name="Cantidad" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
