"use client"
import { useState } from "react"
import UserTicketList from "@/components/tickets/user-ticket-list"
import CreateTicketModal from "@/components/tickets/create-ticket-modal"

export default function UserDashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mi Dashboard</h1>
          <p className="text-gray-dark">Gestiona tus solicitudes de soporte</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors"
        >
          + Nuevo Ticket
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card">
          <p className="text-gray-dark text-sm mb-1">Tickets Abiertos</p>
          <p className="text-3xl font-bold text-primary">3</p>
          <p className="text-xs text-gray-dark mt-2">Esperando respuesta</p>
        </div>
        <div className="card">
          <p className="text-gray-dark text-sm mb-1">Resueltos</p>
          <p className="text-3xl font-bold text-success">12</p>
          <p className="text-xs text-gray-dark mt-2">Este mes</p>
        </div>
        <div className="card">
          <p className="text-gray-dark text-sm mb-1">Satisfacción</p>
          <p className="text-3xl font-bold text-info">4.7/5</p>
          <p className="text-xs text-gray-dark mt-2">Promedio general</p>
        </div>
      </div>

      {/* User Tickets */}
      <UserTicketList />

      {/* Create Ticket Modal */}
      <CreateTicketModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  )
}
