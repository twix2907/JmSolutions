"use client"

import { useState } from "react"
import WorkloadCalendar from "@/components/calendar/workload-calendar"
import MaintenanceScheduler from "@/components/calendar/maintenance-scheduler"
import AvailabilityManagement from "@/components/calendar/availability-management"

export default function CalendarPage() {
  const [activeTab, setActiveTab] = useState<"workload" | "maintenance" | "availability">("workload")

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Calendario y Planificación</h1>
        <p className="text-gray-dark">Gestiona carga de trabajo, mantenimiento y disponibilidad del equipo</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-border">
        {[
          { id: "workload", label: "Carga de Trabajo" },
          { id: "maintenance", label: "Mantenimiento" },
          { id: "availability", label: "Disponibilidad" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-gray-dark hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === "workload" && <WorkloadCalendar />}
        {activeTab === "maintenance" && <MaintenanceScheduler />}
        {activeTab === "availability" && <AvailabilityManagement />}
      </div>
    </div>
  )
}
