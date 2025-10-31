"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface Problem {
  id: string
  title: string
  status: "active" | "resolved"
  severity: "critical" | "high" | "medium"
  affectedUsers: number
  affectedServices: string[]
  incidentCount: number
  createdAt: string
  resolvedAt?: string
}

const MOCK_PROBLEMS: Problem[] = [
  {
    id: "P-001",
    title: "Caída del servicio de correo",
    status: "resolved",
    severity: "critical",
    affectedUsers: 450,
    affectedServices: ["Email", "Calendario"],
    incidentCount: 23,
    createdAt: "2025-10-20",
    resolvedAt: "2025-10-21",
  },
  {
    id: "P-002",
    title: "Lentitud en VPN",
    status: "active",
    severity: "high",
    affectedUsers: 120,
    affectedServices: ["VPN", "Acceso Remoto"],
    incidentCount: 45,
    createdAt: "2025-10-24",
  },
  {
    id: "P-003",
    title: "Problemas de impresión en piso 3",
    status: "active",
    severity: "medium",
    affectedUsers: 25,
    affectedServices: ["Impresoras"],
    incidentCount: 8,
    createdAt: "2025-10-25",
  },
]

const TIMELINE_DATA = [
  { date: "Oct 20", incidents: 23, resolved: 20 },
  { date: "Oct 21", incidents: 15, resolved: 15 },
  { date: "Oct 22", incidents: 8, resolved: 6 },
  { date: "Oct 23", incidents: 12, resolved: 10 },
  { date: "Oct 24", incidents: 45, resolved: 30 },
  { date: "Oct 25", incidents: 8, resolved: 2 },
]

export default function ProblemDashboard() {
  const [problems] = useState<Problem[]>(MOCK_PROBLEMS)
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(problems[0])

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      critical: "bg-error/10 text-error",
      high: "bg-warning/10 text-warning",
      medium: "bg-info/10 text-info",
    }
    return colors[severity] || "bg-gray-medium/10"
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Dashboard de Problemas</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light">Nuevo Problema</button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-dark mb-2">Problemas Activos</p>
          <p className="text-3xl font-bold text-error">2</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-dark mb-2">Incidentes Totales</p>
          <p className="text-3xl font-bold text-primary">76</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-dark mb-2">Usuarios Afectados</p>
          <p className="text-3xl font-bold text-warning">595</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-dark mb-2">Tiempo Promedio Resolución</p>
          <p className="text-3xl font-bold text-success">18h</p>
        </Card>
      </div>

      {/* Timeline Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Línea de Tiempo de Incidentes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={TIMELINE_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="incidents" stroke="#e74c3c" name="Incidentes Reportados" />
            <Line type="monotone" dataKey="resolved" stroke="#2ecc71" name="Resueltos" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Problems List and Details */}
      <div className="grid grid-cols-3 gap-6">
        {/* Problems List */}
        <Card className="p-4 col-span-1">
          <h3 className="text-lg font-semibold text-foreground mb-4">Problemas</h3>
          <div className="space-y-2">
            {problems.map((problem) => (
              <button
                key={problem.id}
                onClick={() => setSelectedProblem(problem)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedProblem?.id === problem.id ? "bg-primary/10 border-primary" : "border-border hover:bg-muted"
                }`}
              >
                <p className="font-medium text-foreground text-sm">{problem.title}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(problem.severity)}`}>
                    {problem.severity}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(problem.status)}`}>
                    {problem.status === "active" ? "Activo" : "Resuelto"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Problem Details */}
        {selectedProblem && (
          <Card className="p-6 col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">{selectedProblem.title}</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-dark mb-1">Severidad</p>
                <span className={`px-3 py-1 rounded text-sm font-medium ${getSeverityColor(selectedProblem.severity)}`}>
                  {selectedProblem.severity}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-dark mb-1">Estado</p>
                <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(selectedProblem.status)}`}>
                  {selectedProblem.status === "active" ? "Activo" : "Resuelto"}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-dark mb-1">Usuarios Afectados</p>
                <p className="font-bold text-foreground">{selectedProblem.affectedUsers}</p>
              </div>
              <div>
                <p className="text-xs text-gray-dark mb-1">Incidentes Relacionados</p>
                <p className="font-bold text-foreground">{selectedProblem.incidentCount}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-2">Servicios Afectados</p>
              <div className="flex flex-wrap gap-2">
                {selectedProblem.affectedServices.map((service) => (
                  <span key={service} className="px-3 py-1 bg-muted rounded-full text-sm text-foreground">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-sm font-medium text-foreground mb-2">Análisis de Causa Raíz</p>
              <p className="text-foreground text-sm mb-4">
                Se identificó que el problema fue causado por una sobrecarga en el servidor de correo debido a un ataque
                de spam masivo. Se implementaron filtros adicionales y se aumentó la capacidad del servidor.
              </p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light text-sm">
                Ver Análisis Completo
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
