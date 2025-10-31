"use client"

import React, { useState, useEffect, useMemo } from "react"
import TicketDetails from "./ticket-details"
import {
  getPriorityColor,
  getSLAColor,
  getStatusLabel,
} from "@/lib/ticket-helpers"
import type { Ticket } from "@/lib/types"

interface TicketQueueProps {
  filters?: {
    priority: string
    status: string
    slaStatus: string
  }
}

const MOCK_TICKETS: Ticket[] = [
  {
    id: "TK-001",
    title: "Sistema de correo no funciona",
    requester: "Juan García",
    priority: "critical",
    status: "open",
    slaRemaining: 15,
    slaStatus: "critical",
    category: "Email",
  },
  {
    id: "TK-002",
    title: "Acceso a red compartida",
    requester: "María López",
    priority: "high",
    status: "in-progress",
    slaRemaining: 45,
    slaStatus: "warning",
    category: "Network",
    assignedTo: "Carlos Rodríguez",
  },
  {
    id: "TK-003",
    title: "Instalación de software",
    requester: "Carlos Rodríguez",
    priority: "medium",
    status: "open",
    slaRemaining: 120,
    slaStatus: "ok",
    category: "Software",
  },
  {
    id: "TK-004",
    title: "Problema con impresora",
    requester: "Ana Martínez",
    priority: "high",
    status: "pending",
    slaRemaining: 30,
    slaStatus: "critical",
    category: "Hardware",
    assignedTo: "Juan Pérez",
  },
  {
    id: "TK-005",
    title: "Solicitud de acceso VPN",
    requester: "Roberto Silva",
    priority: "medium",
    status: "open",
    slaRemaining: 180,
    slaStatus: "ok",
    category: "Access",
  },
]

type TicketRowProps = {
  ticket: Ticket
  loading: boolean
  onView: (id: string) => void
  onAssign: () => void
  onStatusChange: (id: string, status: string) => void
}

const TicketRow = React.memo(function TicketRow(props: TicketRowProps) {
  const { ticket, loading, onView, onAssign, onStatusChange } = props
  return (
    <tr className="border-b border-border hover:bg-muted transition-colors">
      <td className="py-3 px-4 font-medium text-primary cursor-pointer hover:underline">{ticket.id}</td>
      <td className="py-3 px-4">{ticket.title}</td>
      <td className="py-3 px-4 text-gray-dark">{ticket.requester}</td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
        </span>
      </td>
      <td className="py-3 px-4">
        <select
          value={ticket.status}
          onChange={(e) => onStatusChange(ticket.id, e.target.value)}
          className="px-2 py-1 rounded text-xs font-medium bg-info/10 text-info border border-info/20 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={loading}
        >
          <option value="open">{getStatusLabel("open")}</option>
          <option value="in-progress">{getStatusLabel("in-progress")}</option>
          <option value="pending">{getStatusLabel("pending")}</option>
          <option value="resolved">{getStatusLabel("resolved")}</option>
        </select>
      </td>
      <td className="py-3 px-4 text-gray-dark">{ticket.assignedTo || "-"}</td>
      <td className={`py-3 px-4 font-medium ${getSLAColor(ticket.slaStatus || "ok")}`}>
        {ticket.slaRemaining} min
      </td>
      <td className="py-3 px-4 space-x-2">
        <button
          onClick={() => onView(ticket.id)}
          className="text-primary hover:text-primary-light font-medium text-xs"
          disabled={loading}
        >
          Ver
        </button>
        <button
          onClick={onAssign}
          className="text-accent-1 hover:text-accent-2 font-medium text-xs"
          disabled={loading}
        >
          Asignar
        </button>
      </td>
    </tr>
  )
})

export default function TicketQueue({ filters }: TicketQueueProps) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    // Simula fetch
    const timer = setTimeout(() => {
      // Simula error: setError("Error al cargar tickets")
      setTickets(MOCK_TICKETS)
      setLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const safeFilters = {
    priority: filters?.priority ?? "all",
    status: filters?.status ?? "all",
    slaStatus: filters?.slaStatus ?? "all",
  }

  // Memoiza el filtrado para evitar cálculos innecesarios
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      if (safeFilters.priority !== "all" && ticket.priority !== safeFilters.priority) return false
      if (safeFilters.status !== "all" && ticket.status !== safeFilters.status) return false
      if (safeFilters.slaStatus !== "all" && ticket.slaStatus !== safeFilters.slaStatus) return false
      return true
    })
  }, [tickets, safeFilters.priority, safeFilters.status, safeFilters.slaStatus])

  // Paginación simple
  const [page, setPage] = useState(1)
  const pageSize = 10
  const totalPages = Math.ceil(filteredTickets.length / pageSize) || 1
  const paginatedTickets = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredTickets.slice(start, start + pageSize)
  }, [filteredTickets, page, pageSize])

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets(tickets.map((t) => (t.id === ticketId ? { ...t, status: newStatus as Ticket["status"] } : t)))
  }

  const handleAssign = (ticketId: string, technician: string) => {
    setTickets(tickets.map((t) => (t.id === ticketId ? { ...t, assignedTo: technician } : t)))
    setShowAssignModal(false)
  }

  const handleViewTicket = (ticketId: string) => {
    setSelectedTicket(ticketId)
    setShowDetailsModal(true)
  }

  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Cola de Tickets</h2>
          <span className="text-sm text-gray-dark">
            {loading ? "Cargando..." : error ? "-" : `${filteredTickets.length} tickets`}
          </span>
        </div>

        {error && (
          <div className="bg-error/10 text-error px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-gray-dark">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-dark">Título</th>
                <th className="text-left py-3 px-4 font-medium text-gray-dark">Solicitante</th>
                <th className="text-left py-3 px-4 font-medium text-gray-dark">Prioridad</th>
                <th className="text-left py-3 px-4 font-medium text-gray-dark">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-gray-dark">Asignado a</th>
                <th className="text-left py-3 px-4 font-medium text-gray-dark">SLA</th>
                <th className="text-left py-3 px-4 font-medium text-gray-dark">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-border animate-pulse">
                      <td className="py-3 px-4">
                        <div className="h-4 w-16 bg-gray-200 rounded" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 w-14 bg-gray-200 rounded" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 w-12 bg-gray-200 rounded" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 w-16 bg-gray-200 rounded" />
                      </td>
                    </tr>
                  ))
                : !error &&
                  paginatedTickets.map((ticket) => (
                    <TicketRow
                      key={ticket.id}
                      ticket={ticket}
                      loading={loading}
                      onView={handleViewTicket}
                      onAssign={() => {
                        setSelectedTicket(ticket.id)
                        setShowAssignModal(true)
                      }}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-end items-center gap-2 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border border-border text-sm font-medium bg-muted hover:bg-border disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-xs text-gray-dark">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border border-border text-sm font-medium bg-muted hover:bg-border disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        )}

        {showAssignModal && selectedTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
              <h3 className="text-lg font-bold text-foreground mb-4">Asignar Ticket</h3>
              <div className="space-y-3 mb-6">
                {["Juan Pérez", "María García", "Carlos Rodríguez", "Ana Martínez"].map((tech) => (
                  <button
                    key={tech}
                    onClick={() => handleAssign(selectedTicket, tech)}
                    className="w-full text-left px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                    disabled={loading}
                  >
                    {tech}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowAssignModal(false)}
                className="w-full px-4 py-2 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {showDetailsModal && selectedTicket && (
        <TicketDetails ticketId={selectedTicket} onClose={() => setShowDetailsModal(false)} />
      )}
    </>
  )
}