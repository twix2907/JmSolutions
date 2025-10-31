"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SLAMatrix {
  priority: string
  responseTime: string
  resolutionTime: string
  escalationTime: string
}

const MOCK_SLA_MATRIX: SLAMatrix[] = [
  {
    priority: "Crítico",
    responseTime: "15 minutos",
    resolutionTime: "4 horas",
    escalationTime: "1 hora",
  },
  {
    priority: "Alto",
    responseTime: "1 hora",
    resolutionTime: "8 horas",
    escalationTime: "4 horas",
  },
  {
    priority: "Medio",
    responseTime: "4 horas",
    resolutionTime: "24 horas",
    escalationTime: "8 horas",
  },
  {
    priority: "Bajo",
    responseTime: "8 horas",
    resolutionTime: "48 horas",
    escalationTime: "24 horas",
  },
]

export default function SLADefinition() {
  const [slaMatrix, setSlaMatrix] = useState<SLAMatrix[]>(MOCK_SLA_MATRIX)
  const [businessHours, setBusinessHours] = useState({
    startTime: "09:00",
    endTime: "18:00",
    timezone: "America/Mexico_City",
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Definición de Acuerdos SLA</h2>
        <Button>Guardar Cambios</Button>
      </div>

      {/* Business Hours */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Horario Laboral</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Hora de Inicio</label>
            <input
              type="time"
              value={businessHours.startTime}
              onChange={(e) => setBusinessHours({ ...businessHours, startTime: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Hora de Fin</label>
            <input
              type="time"
              value={businessHours.endTime}
              onChange={(e) => setBusinessHours({ ...businessHours, endTime: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Zona Horaria</label>
            <select
              value={businessHours.timezone}
              onChange={(e) => setBusinessHours({ ...businessHours, timezone: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg"
            >
              <option>America/Mexico_City</option>
              <option>America/New_York</option>
              <option>Europe/Madrid</option>
            </select>
          </div>
        </div>
      </Card>

      {/* SLA Matrix */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Matriz de Tiempos SLA</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Prioridad</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tiempo de Respuesta</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tiempo de Resolución</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tiempo de Escalamiento</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {slaMatrix.map((row, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium text-foreground">{row.priority}</td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={row.responseTime}
                      onChange={(e) => {
                        const updated = [...slaMatrix]
                        updated[idx].responseTime = e.target.value
                        setSlaMatrix(updated)
                      }}
                      className="px-3 py-1 border border-border rounded text-sm"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={row.resolutionTime}
                      onChange={(e) => {
                        const updated = [...slaMatrix]
                        updated[idx].resolutionTime = e.target.value
                        setSlaMatrix(updated)
                      }}
                      className="px-3 py-1 border border-border rounded text-sm"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={row.escalationTime}
                      onChange={(e) => {
                        const updated = [...slaMatrix]
                        updated[idx].escalationTime = e.target.value
                        setSlaMatrix(updated)
                      }}
                      className="px-3 py-1 border border-border rounded text-sm"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-primary hover:text-primary-light">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Holiday Exceptions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Excepciones por Días Festivos</h3>
        <div className="space-y-3">
          {["Año Nuevo", "Día de Muertos", "Navidad"].map((holiday) => (
            <div key={holiday} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-foreground">{holiday}</span>
              <button className="text-sm text-error hover:text-error/80">Eliminar</button>
            </div>
          ))}
        </div>
        <button className="mt-4 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted">
          Agregar Día Festivo
        </button>
      </Card>
    </div>
  )
}
