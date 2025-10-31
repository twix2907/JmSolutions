"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface Absence {
  id: string
  technician: string
  startDate: string
  endDate: string
  type: "vacation" | "sick" | "training" | "other"
  status: "approved" | "pending" | "rejected"
}

const MOCK_ABSENCES: Absence[] = [
  {
    id: "A-001",
    technician: "Carlos Rodríguez",
    startDate: "2025-11-10",
    endDate: "2025-11-17",
    type: "vacation",
    status: "approved",
  },
  {
    id: "A-002",
    technician: "María López",
    startDate: "2025-11-05",
    endDate: "2025-11-06",
    type: "sick",
    status: "approved",
  },
  {
    id: "A-003",
    technician: "Juan García",
    startDate: "2025-11-20",
    endDate: "2025-11-22",
    type: "training",
    status: "pending",
  },
]

export default function AvailabilityManagement() {
  const [absences] = useState<Absence[]>(MOCK_ABSENCES)

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      vacation: "bg-info/10 text-info",
      sick: "bg-warning/10 text-warning",
      training: "bg-success/10 text-success",
      other: "bg-gray-medium/10 text-gray-dark",
    }
    return colors[type] || "bg-gray-medium/10"
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      vacation: "Vacaciones",
      sick: "Enfermedad",
      training: "Capacitación",
      other: "Otro",
    }
    return labels[type] || type
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      approved: "bg-success/10 text-success",
      pending: "bg-warning/10 text-warning",
      rejected: "bg-error/10 text-error",
    }
    return colors[status] || "bg-gray-medium/10"
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Gestión de Disponibilidad</h2>

      {/* Absences List */}
      <div className="space-y-4">
        {absences.map((absence) => (
          <Card key={absence.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">{absence.technician}</h3>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-dark mb-1">Tipo</p>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getTypeColor(absence.type)}`}>
                      {getTypeLabel(absence.type)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-dark mb-1">Período</p>
                    <p className="font-medium text-foreground">
                      {absence.startDate} a {absence.endDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-dark mb-1">Estado</p>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(absence.status)}`}>
                      {absence.status === "approved" && "Aprobado"}
                      {absence.status === "pending" && "Pendiente"}
                      {absence.status === "rejected" && "Rechazado"}
                    </span>
                  </div>
                </div>
              </div>
              {absence.status === "pending" && (
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm text-success hover:bg-success/10 rounded">Aprobar</button>
                  <button className="px-3 py-1 text-sm text-error hover:bg-error/10 rounded">Rechazar</button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Peak Hours Heatmap */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Horas Pico de Incidentes</h3>
        <div className="grid grid-cols-7 gap-2">
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
            <div key={day}>
              <p className="text-center text-sm font-medium text-foreground mb-2">{day}</p>
              <div className="space-y-1">
                {Array.from({ length: 24 }).map((_, hour) => {
                  const intensity = Math.random()
                  const bgColor = intensity > 0.7 ? "bg-error" : intensity > 0.4 ? "bg-warning" : "bg-success"
                  return <div key={hour} className={`h-2 rounded ${bgColor}`} />
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Capacity Planning */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Previsión de Carga</h3>
        <div className="grid grid-cols-4 gap-4">
          {["Semana 1", "Semana 2", "Semana 3", "Semana 4"].map((week) => (
            <div key={week} className="text-center">
              <p className="text-sm text-gray-dark mb-2">{week}</p>
              <div className="w-full h-24 bg-muted rounded-lg flex items-end justify-center gap-1 p-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="flex-1 bg-primary rounded" style={{ height: `${Math.random() * 100}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
