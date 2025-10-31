"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface EscalationRule {
  id: string
  name: string
  condition: string
  level: number
  action: string
  notification: boolean
}

const MOCK_RULES: EscalationRule[] = [
  {
    id: "R-001",
    name: "Escalamiento Nivel 1",
    condition: "Ticket crítico sin respuesta en 15 minutos",
    level: 1,
    action: "Notificar a Supervisor",
    notification: true,
  },
  {
    id: "R-002",
    name: "Escalamiento Nivel 2",
    condition: "Ticket crítico sin respuesta en 30 minutos",
    level: 2,
    action: "Asignar a Técnico Senior",
    notification: true,
  },
  {
    id: "R-003",
    name: "Escalamiento Nivel 3",
    condition: "Ticket crítico sin respuesta en 1 hora",
    level: 3,
    action: "Notificar a Gerente",
    notification: true,
  },
]

export default function EscalationRules() {
  const [rules] = useState<EscalationRule[]>(MOCK_RULES)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Reglas de Escalamiento</h2>
        <Button>Nueva Regla</Button>
      </div>

      {/* Visual Flow */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Flujo de Escalamiento Visual</h3>
        <div className="flex items-center justify-between">
          {rules.map((rule, idx) => (
            <div key={rule.id} className="flex-1">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-primary">L{rule.level}</span>
                </div>
                <p className="text-sm font-medium text-foreground text-center mb-2">{rule.name}</p>
                <p className="text-xs text-gray-dark text-center mb-3">{rule.condition}</p>
                <p className="text-xs text-primary font-medium text-center">{rule.action}</p>
              </div>
              {idx < rules.length - 1 && <div className="flex-1 h-1 bg-border mx-2 mt-8" />}
            </div>
          ))}
        </div>
      </Card>

      {/* Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <Card key={rule.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-foreground">{rule.name}</h4>
                <p className="text-sm text-gray-dark">{rule.id}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-primary hover:text-primary-light">Editar</button>
                <button className="px-3 py-1 text-sm text-error hover:text-error/80">Eliminar</button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-dark mb-1">Condición</p>
                <p className="text-foreground">{rule.condition}</p>
              </div>
              <div>
                <p className="text-xs text-gray-dark mb-1">Acción</p>
                <p className="text-foreground">{rule.action}</p>
              </div>
              <div>
                <p className="text-xs text-gray-dark mb-1">Notificación</p>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${rule.notification ? "bg-success/10 text-success" : "bg-gray-medium/10 text-gray-dark"}`}
                >
                  {rule.notification ? "Habilitada" : "Deshabilitada"}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
