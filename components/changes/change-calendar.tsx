"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface ScheduledChange {
  id: string
  title: string
  date: string
  type: "standard" | "emergency" | "maintenance"
  impact: "low" | "medium" | "high"
  affectedServices: string[]
}

const MOCK_CHANGES: ScheduledChange[] = [
  {
    id: "CHG-001",
    title: "Actualización de servidor de correo",
    date: "2025-11-01",
    type: "standard",
    impact: "high",
    affectedServices: ["Email", "Calendario"],
  },
  {
    id: "CHG-002",
    title: "Mantenimiento de VPN",
    date: "2025-11-05",
    type: "maintenance",
    impact: "medium",
    affectedServices: ["VPN"],
  },
  {
    id: "CHG-003",
    title: "Parche de seguridad crítico",
    date: "2025-11-03",
    type: "emergency",
    impact: "high",
    affectedServices: ["Todos"],
  },
]

export default function ChangeCalendar() {
  const [changes] = useState<ScheduledChange[]>(MOCK_CHANGES)

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      standard: "bg-info/10 text-info",
      emergency: "bg-error/10 text-error",
      maintenance: "bg-warning/10 text-warning",
    }
    return colors[type] || "bg-gray-medium/10"
  }

  const getImpactColor = (impact: string) => {
    const colors: Record<string, string> = {
      low: "bg-success/10 text-success",
      medium: "bg-warning/10 text-warning",
      high: "bg-error/10 text-error",
    }
    return colors[impact] || "bg-gray-medium/10"
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Calendario de Cambios</h2>

      {/* Calendar View */}
      <Card className="p-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
            <div key={day} className="text-center font-semibold text-foreground text-sm py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, idx) => {
            const day = idx - 2 + 1
            const isCurrentMonth = day > 0 && day <= 30
            const dateStr = `2025-11-${String(day).padStart(2, "0")}`
            const dayChanges = changes.filter((c) => c.date === dateStr)

            return (
              <div
                key={idx}
                className={`min-h-24 p-2 rounded-lg border ${
                  isCurrentMonth ? "border-border bg-white" : "border-transparent bg-muted"
                }`}
              >
                {isCurrentMonth && (
                  <>
                    <p className="text-sm font-medium text-foreground mb-1">{day}</p>
                    <div className="space-y-1">
                      {dayChanges.map((change) => (
                        <div
                          key={change.id}
                          className={`text-xs px-2 py-1 rounded truncate ${getTypeColor(change.type)}`}
                          title={change.title}
                        >
                          {change.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Scheduled Changes List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Cambios Programados</h3>
        <div className="space-y-3">
          {changes.map((change) => (
            <div key={change.id} className="flex items-start justify-between p-4 bg-muted rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">{change.title}</p>
                <p className="text-sm text-gray-dark">{change.date}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(change.type)}`}>
                    {change.type === "standard" && "Estándar"}
                    {change.type === "emergency" && "Emergencia"}
                    {change.type === "maintenance" && "Mantenimiento"}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(change.impact)}`}>
                    Impacto: {change.impact}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 text-primary hover:text-primary-light text-sm font-medium">
                Ver Detalles
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
