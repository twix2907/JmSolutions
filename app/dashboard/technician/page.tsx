"use client"
import { useState } from "react"
import TicketQueue from "@/components/tickets/ticket-queue"
import TicketFilters from "@/components/tickets/ticket-filters"

export default function TechnicianDashboard() {
  const [filters, setFilters] = useState({
    priority: "all",
    status: "all",
    slaStatus: "all",
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Técnico</h1>
        <p className="text-gray-dark">Bienvenido al sistema de gestión de tickets</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="card">
          <p className="text-gray-dark text-sm mb-1">Tickets Asignados</p>
          <p className="text-3xl font-bold text-primary">12</p>
          <p className="text-xs text-gray-dark mt-2">5 en riesgo de SLA</p>
        </div>
        <div className="card">
          <p className="text-gray-dark text-sm mb-1">Resueltos Hoy</p>
          <p className="text-3xl font-bold text-success">8</p>
          <p className="text-xs text-gray-dark mt-2">Tiempo promedio: 45 min</p>
        </div>
        <div className="card">
          <p className="text-gray-dark text-sm mb-1">Satisfacción</p>
          <p className="text-3xl font-bold text-info">4.8/5</p>
          <p className="text-xs text-gray-dark mt-2">Basado en 24 encuestas</p>
        </div>
        <div className="card">
          <p className="text-gray-dark text-sm mb-1">Cumplimiento SLA</p>
          <p className="text-3xl font-bold text-warning">94%</p>
          <p className="text-xs text-gray-dark mt-2">Meta: 95%</p>
        </div>
      </div>

      {/* Filters */}
      <TicketFilters filters={filters} onFiltersChange={setFilters} />

      {/* Ticket Queue */}
      <TicketQueue filters={filters} />
    </div>
  )
}
