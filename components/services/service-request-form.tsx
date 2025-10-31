"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ServiceRequestFormProps {
  serviceId?: string
  serviceName?: string
  onSubmit?: (data: any) => void
  onCancel?: () => void
}

export default function ServiceRequestForm({ serviceId, serviceName, onSubmit, onCancel }: ServiceRequestFormProps) {
  const [formData, setFormData] = useState({
    service: serviceName || "",
    description: "",
    priority: "normal",
    requiredApprovals: [] as string[],
    estimatedDelivery: "",
    cost: "",
  })

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Solicitud de Servicio</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Enviar Solicitud</Button>
        </div>
      </div>

      {/* Service Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Detalles del Servicio</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Servicio</label>
            <input
              type="text"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              placeholder="Selecciona un servicio"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe tu solicitud en detalle"
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Prioridad</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Baja</option>
              <option value="normal">Normal</option>
              <option value="high">Alta</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Approvals */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Aprobaciones Requeridas</h3>
        <div className="space-y-2">
          {["Gerente Directo", "Departamento IT", "Finanzas"].map((approval) => (
            <label key={approval} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.requiredApprovals.includes(approval)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData({
                      ...formData,
                      requiredApprovals: [...formData.requiredApprovals, approval],
                    })
                  } else {
                    setFormData({
                      ...formData,
                      requiredApprovals: formData.requiredApprovals.filter((a) => a !== approval),
                    })
                  }
                }}
                className="rounded"
              />
              <span className="text-sm text-foreground">{approval}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Delivery Info */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Información de Entrega</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Entrega Estimada</label>
            <input
              type="date"
              value={formData.estimatedDelivery}
              onChange={(e) => setFormData({ ...formData, estimatedDelivery: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Costo Asociado</label>
            <input
              type="text"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              placeholder="$0.00"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
