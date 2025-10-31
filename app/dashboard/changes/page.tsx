"use client"

import { useState } from "react"
import ChangeRequestForm from "@/components/changes/change-request-form"
import ChangeApprovalWorkflow from "@/components/changes/change-approval-workflow"
import ChangeCalendar from "@/components/changes/change-calendar"

export default function ChangesPage() {
  const [activeTab, setActiveTab] = useState<"new" | "approval" | "calendar">("calendar")

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestión de Cambios</h1>
        <p className="text-gray-dark">Solicita, aprueba e implementa cambios de forma controlada</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-border">
        {[
          { id: "calendar", label: "Calendario de Cambios" },
          { id: "approval", label: "Flujo de Aprobación" },
          { id: "new", label: "Nueva Solicitud" },
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
        {activeTab === "new" && <ChangeRequestForm />}
        {activeTab === "approval" && <ChangeApprovalWorkflow />}
        {activeTab === "calendar" && <ChangeCalendar />}
      </div>
    </div>
  )
}
