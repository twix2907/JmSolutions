"use client"

import { useState, useEffect } from "react"
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
  const [weeklyData, setWeeklyData] = useState<any[]>([])
  const [priorityData, setPriorityData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    // Simula fetch
    const timer = setTimeout(() => {
      // Simula error: setError("Error al cargar analíticas")
      setWeeklyData(WEEKLY_DATA)
      setPriorityData(PRIORITY_DATA)
      setLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [dateRange])

  return (
    <div className="grid grid-cols-2 gap-8 mb-8">
      {/* Tickets Over Time */}
      <div className="card">
        <h3 className="text-lg font-bold text-foreground mb-4">Tickets por Día</h3>
        {error && (
          <div className="bg-error/10 text-error px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        {loading ? (
          <div className="w-full h-[300px] flex items-center justify-center animate-pulse">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : !error ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
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
        ) : null}
      </div>

      {/* Priority Distribution */}
      <div className="card">
        <h3 className="text-lg font-bold text-foreground mb-4">Distribución por Prioridad</h3>
        {error && (
          <div className="bg-error/10 text-error px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        {loading ? (
          <div className="w-full h-[300px] flex items-center justify-center animate-pulse">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : !error ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
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
        ) : null}
      </div>
    </div>
  )
}