"use client"

import { Card } from "@/components/ui/card"
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

const COMPLIANCE_DATA = [
  { month: "Ago", compliance: 98, breaches: 2 },
  { month: "Sep", compliance: 96, breaches: 4 },
  { month: "Oct", compliance: 99, breaches: 1 },
  { month: "Nov", compliance: 97, breaches: 3 },
  { month: "Dic", compliance: 98, breaches: 2 },
]

const RISK_DATA = [
  { priority: "Crítico", atRisk: 2, compliant: 18 },
  { priority: "Alto", atRisk: 5, compliant: 35 },
  { priority: "Medio", atRisk: 8, compliant: 52 },
  { priority: "Bajo", atRisk: 3, compliant: 47 },
]

export default function SLAMonitoring() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Monitoreo de Cumplimiento SLA</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-dark mb-2">Cumplimiento General</p>
          <p className="text-3xl font-bold text-success">98%</p>
          <p className="text-xs text-success mt-2">+1% vs mes anterior</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-dark mb-2">Incumplimientos Este Mes</p>
          <p className="text-3xl font-bold text-error">2</p>
          <p className="text-xs text-success mt-2">-50% vs mes anterior</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-dark mb-2">Tickets en Riesgo</p>
          <p className="text-3xl font-bold text-warning">18</p>
          <p className="text-xs text-gray-dark mt-2">Requieren atención</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-dark mb-2">Tiempo Promedio Resolución</p>
          <p className="text-3xl font-bold text-primary">6.2h</p>
          <p className="text-xs text-success mt-2">Dentro de SLA</p>
        </Card>
      </div>

      {/* Compliance Trend */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Tendencia de Cumplimiento</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={COMPLIANCE_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" domain={[0, 100]} />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="compliance" stroke="#2ecc71" name="Cumplimiento %" />
            <Line yAxisId="right" type="monotone" dataKey="breaches" stroke="#e74c3c" name="Incumplimientos" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Risk Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Análisis de Riesgo por Prioridad</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={RISK_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="priority" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="atRisk" fill="#e74c3c" name="En Riesgo" />
            <Bar dataKey="compliant" fill="#2ecc71" name="Cumpliendo" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Proactive Alerts */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Alertas Proactivas</h3>
        <div className="space-y-3">
          {[
            { ticket: "TK-2025-001", priority: "Crítico", timeLeft: "45 minutos", status: "warning" },
            { ticket: "TK-2025-002", priority: "Alto", timeLeft: "2 horas", status: "warning" },
            { ticket: "TK-2025-003", priority: "Medio", timeLeft: "8 horas", status: "info" },
          ].map((alert) => (
            <div key={alert.ticket} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-foreground">{alert.ticket}</p>
                <p className="text-sm text-gray-dark">{alert.priority}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{alert.timeLeft}</p>
                <p className="text-xs text-gray-dark">Tiempo restante</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
