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

const VIEWS_DATA = [
  { month: "Ago", views: 1200, reduction: 15 },
  { month: "Sep", views: 1900, reduction: 22 },
  { month: "Oct", views: 1600, reduction: 18 },
  { month: "Nov", views: 2400, reduction: 28 },
  { month: "Dic", views: 2210, reduction: 32 },
]

const RATINGS_DATA = [
  { category: "Email", rating: 4.2 },
  { category: "Software", rating: 3.8 },
  { category: "Hardware", rating: 4.5 },
  { category: "Red", rating: 3.9 },
  { category: "Acceso", rating: 4.3 },
]

export default function KBStatistics() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Estadísticas de Artículos</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-dark mb-2">Total de Artículos</p>
          <p className="text-3xl font-bold text-primary">156</p>
          <p className="text-xs text-success mt-2">+12 este mes</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-dark mb-2">Consultas Totales</p>
          <p className="text-3xl font-bold text-primary">45.2K</p>
          <p className="text-xs text-success mt-2">+18% vs mes anterior</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-dark mb-2">Reducción de Tickets</p>
          <p className="text-3xl font-bold text-primary">28%</p>
          <p className="text-xs text-success mt-2">Promedio de efectividad</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-dark mb-2">Calificación Promedio</p>
          <p className="text-3xl font-bold text-primary">4.1</p>
          <p className="text-xs text-success mt-2">De 5 estrellas</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Views and Ticket Reduction */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Consultas y Reducción de Tickets</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={VIEWS_DATA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="views" stroke="#024494" name="Consultas" />
              <Line yAxisId="right" type="monotone" dataKey="reduction" stroke="#2ecc71" name="Reducción %" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Ratings by Category */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Calificación por Categoría</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={RATINGS_DATA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="rating" fill="#026dbe" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Métricas Detalladas</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-dark mb-2">Tiempo Promedio de Lectura</p>
            <p className="text-2xl font-bold text-foreground">4.2 min</p>
          </div>
          <div>
            <p className="text-sm text-gray-dark mb-2">Tasa de Utilidad</p>
            <p className="text-2xl font-bold text-foreground">87%</p>
          </div>
          <div>
            <p className="text-sm text-gray-dark mb-2">Artículos Más Consultados</p>
            <p className="text-2xl font-bold text-foreground">12</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
