"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface ApprovalStep {
  id: string
  role: string
  status: "pending" | "approved" | "rejected"
  approver?: string
  approvedAt?: string
  comments?: string
}

interface ChangeRequest {
  id: string
  title: string
  status: "draft" | "pending" | "approved" | "rejected" | "implemented"
  approvalSteps: ApprovalStep[]
  submittedAt: string
  submittedBy: string
}

const MOCK_CHANGE: ChangeRequest = {
  id: "CHG-2025-001",
  title: "Actualización de servidor de correo",
  status: "pending",
  submittedAt: "2025-10-25",
  submittedBy: "Juan García",
  approvalSteps: [
    {
      id: "step-1",
      role: "Técnico Líder",
      status: "approved",
      approver: "Carlos Rodríguez",
      approvedAt: "2025-10-25",
      comments: "Cambio bien documentado",
    },
    {
      id: "step-2",
      role: "Supervisor",
      status: "pending",
    },
    {
      id: "step-3",
      role: "Comité de Cambios",
      status: "pending",
    },
  ],
}

export default function ChangeApprovalWorkflow() {
  const [change] = useState<ChangeRequest>(MOCK_CHANGE)

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      approved: "bg-success/10 text-success",
      rejected: "bg-error/10 text-error",
      pending: "bg-warning/10 text-warning",
    }
    return colors[status] || "bg-gray-medium/10"
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Flujo de Aprobación</h2>

      {/* Change Summary */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{change.title}</h3>
            <p className="text-sm text-gray-dark">{change.id}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(change.status)}`}>
            {change.status === "pending" && "Pendiente"}
            {change.status === "approved" && "Aprobado"}
            {change.status === "rejected" && "Rechazado"}
          </span>
        </div>
        <p className="text-sm text-gray-dark">
          Enviado por {change.submittedBy} el {change.submittedAt}
        </p>
      </Card>

      {/* Approval Steps */}
      <div className="space-y-4">
        {change.approvalSteps.map((step, index) => (
          <Card key={step.id} className="p-6">
            <div className="flex items-start gap-4">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    step.status === "approved" ? "bg-success" : step.status === "rejected" ? "bg-error" : "bg-warning"
                  }`}
                >
                  {step.status === "approved" && "✓"}
                  {step.status === "rejected" && "✗"}
                  {step.status === "pending" && index + 1}
                </div>
              </div>

              {/* Step Details */}
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">{step.role}</h4>
                {step.status === "pending" && <p className="text-sm text-gray-dark mb-4">Esperando aprobación...</p>}
                {step.approver && (
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">Aprobador:</span> {step.approver}
                    </p>
                    {step.approvedAt && (
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Fecha:</span> {step.approvedAt}
                      </p>
                    )}
                    {step.comments && (
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Comentarios:</span> {step.comments}
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                {step.status === "pending" && (
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 text-sm">
                      Aprobar
                    </button>
                    <button className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 text-sm">
                      Rechazar
                    </button>
                    <button className="px-4 py-2 bg-warning text-white rounded-lg hover:bg-warning/90 text-sm">
                      Solicitar Cambios
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Voting Summary */}
      <Card className="p-6">
        <h4 className="font-semibold text-foreground mb-4">Resumen de Votación</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-success">1</p>
            <p className="text-sm text-gray-dark">Aprobaciones</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-warning">2</p>
            <p className="text-sm text-gray-dark">Pendientes</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-error">0</p>
            <p className="text-sm text-gray-dark">Rechazos</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
