"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface CalendarEvent {
  id: string
  technician: string
  date: string
  tickets: number
  workload: "low" | "medium" | "high" | "overload"
  tasks: string[]
}

const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: "E-001",
    technician: "Carlos Rodríguez",
    date: "2025-11-01",
    tickets: 3,
    workload: "low",
    tasks: ["Ticket TK-001", "Ticket TK-002"],
  },
  {
    id: "E-002",
    technician: "María López",
    date: "2025-11-01",
    tickets: 8,
    workload: "high",
    tasks: ["Ticket TK-003", "Ticket TK-004", "Ticket TK-005"],
  },
  {
    id: "E-003",
    technician: "Juan García",
    date: "2025-11-02",
    tickets: 12,
    workload: "overload",
    tasks: ["Ticket TK-006", "Ticket TK-007", "Mantenimiento"],
  },
]

export default function WorkloadCalendar() {
  const [events] = useState<CalendarEvent[]>(MOCK_EVENTS)
  const [selectedTechnician, setSelectedTechnician] = useState<string>("all")

  const getWorkloadColor = (workload: string) => {
    const colors: Record<string, string> = {
      low: "bg-success/10 text-success",
      medium: "bg-info/10 text-info",
      high: "bg-warning/10 text-warning",
      overload: "bg-error/10 text-error",
    }
    return colors[workload] || "bg-gray-medium/10"
  }

  const technicians = ["all", ...new Set(events.map((e) => e.technician))]

  const filteredEvents = events.filter((e) => selectedTechnician === "all" || e.technician === selectedTechnician)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Calendario de Carga de Trabajo</h2>

      {/* Technician Filter */}
      <div className="flex gap-2 flex-wrap">
        {technicians.map((tech) => (
          <button
            key={tech}
            onClick={() => setSelectedTechnician(tech)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTechnician === tech ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-border"
            }`}
          >
            {tech === "all" ? "Todos" : tech}
          </button>
        ))}
      </div>

      {/* Calendar Grid */}
      <Card className="p-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
            <div key={day} className="text-center font-semibold text-foreground text-sm py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, idx) => {
            const day = idx - 2 + 1
            const isCurrentMonth = day > 0 && day <= 30
            const dateStr = `2025-11-${String(day).padStart(2, "0")}`
            const dayEvents = filteredEvents.filter((e) => e.date === dateStr)

            return (
              <div
                key={idx}
                className={`min-h-28 p-2 rounded-lg border ${
                  isCurrentMonth ? "border-border bg-white" : "border-transparent bg-muted"
                }`}
              >
                {isCurrentMonth && (
                  <>
                    <p className="text-sm font-medium text-foreground mb-1">{day}</p>
                    <div className="space-y-1">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs px-2 py-1 rounded truncate ${getWorkloadColor(event.workload)}`}
                          title={`${event.technician}: ${event.tickets} tickets`}
                        >
                          {event.technician.split(" ")[0]}: {event.tickets}
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

      {/* Workload Legend */}
      <Card className="p-4">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Bajo", workload: "low" },
            { label: "Medio", workload: "medium" },
            { label: "Alto", workload: "high" },
            { label: "Sobrecarga", workload: "overload" },
          ].map((item) => (
            <div key={item.workload} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${getWorkloadColor(item.workload).split(" ")[0]}`} />
              <span className="text-sm text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
