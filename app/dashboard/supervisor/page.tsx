"use client"
import { useState } from "react"
import AnalyticsCharts from "@/components/analytics/analytics-charts"
import TeamPerformance from "@/components/analytics/team-performance"
import SLAMetrics from "@/components/analytics/sla-metrics"

export default function SupervisorDashboard() {
  const [dateRange, setDateRange] = useState("week")

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard de Supervisor</h1>
          <p className="text-gray-dark">Análisis y métricas del equipo de soporte</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="week">Esta Semana</option>
          <option value="month">Este Mes</option>
          <option value="quarter">Este Trimestre</option>
          <option value="year">Este Año</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="card">
          <p className="text-gray-dark text-sm mb-1">Tickets Totales</p>
          <p className="text-3xl font-bold text-primary">1,247</p>
          <p className="text-xs text-success mt-2">↑ 12% vs período anterior</p>
        </div>
        <div className="card">
          <p className="text-gray-dark text-sm mb-1">Tiempo Promedio Resolución</p>
          <p className="text-3xl font-bold text-info">2.5h</p>
          <p className="text-xs text-success mt-2">↓ 8% vs período anterior</p>
        </div>
        <div className="card">
          <p className="text-gray-dark text-sm mb-1">Satisfacción Promedio</p>
          <p className="text-3xl font-bold text-accent-1">4.6/5</p>
          <p className="text-xs text-warning mt-2">↓ 2% vs período anterior</p>
        </div>
        <div className="card">
          <p className="text-gray-dark text-sm mb-1">Cumplimiento SLA</p>
          <p className="text-3xl font-bold text-success">96%</p>
          <p className="text-xs text-success mt-2">↑ 3% vs período anterior</p>
        </div>
      </div>

      {/* Charts */}
      <AnalyticsCharts dateRange={dateRange} />

      {/* Team Performance and SLA Metrics */}
      <div className="grid grid-cols-2 gap-8 mt-8">
        <TeamPerformance />
        <SLAMetrics />
      </div>
    </div>
  )
}
