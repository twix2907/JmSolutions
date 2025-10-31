"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ChangeRequestFormProps {
  onSubmit?: (data: any) => void
  onCancel?: () => void
}

export default function ChangeRequestForm({ onSubmit, onCancel }: ChangeRequestFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    justification: "",
    impact: "",
    affectedServices: [] as string[],
    implementationDate: "",
    rollbackPlan: "",
    requiredResources: "",
    riskLevel: "medium",
  })

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Nueva Solicitud de Cambio</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Enviar Solicitud</Button>
        </div>
      </div>

      {/* Basic Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Información Básica</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Título del Cambio</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Descripción breve del cambio"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Descripción Detallada</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe en detalle qué cambio se realizará"
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Justificación</label>
            <textarea
              value={formData.justification}
              onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
              placeholder="¿Por qué es necesario este cambio?"
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </Card>

      {/* Impact Assessment */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Evaluación de Impacto</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Servicios Afectados</label>
            <div className="space-y-2">
              {["Email", "VPN", "Impresoras", "Software", "Hardware"].map((service) => (
                <label key={service} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.affectedServices.includes(service)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          affectedServices: [...formData.affectedServices, service],
                        })
                      } else {
                        setFormData({
                          ...formData,
                          affectedServices: formData.affectedServices.filter((s) => s !== service),
                        })
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm text-foreground">{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Descripción del Impacto</label>
            <textarea
              value={formData.impact}
              onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
              placeholder="Describe el impacto esperado en usuarios y servicios"
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Nivel de Riesgo</label>
            <select
              value={formData.riskLevel}
              onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Bajo</option>
              <option value="medium">Medio</option>
              <option value="high">Alto</option>
              <option value="critical">Crítico</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Implementation Plan */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Plan de Implementación</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Fecha de Implementación</label>
            <input
              type="date"
              value={formData.implementationDate}
              onChange={(e) => setFormData({ ...formData, implementationDate: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Plan de Reversión (Rollback)</label>
            <textarea
              value={formData.rollbackPlan}
              onChange={(e) => setFormData({ ...formData, rollbackPlan: e.target.value })}
              placeholder="Describe los pasos para revertir el cambio si es necesario"
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Recursos Requeridos</label>
            <textarea
              value={formData.requiredResources}
              onChange={(e) => setFormData({ ...formData, requiredResources: e.target.value })}
              placeholder="Personal, herramientas, tiempo estimado, etc."
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
