"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MaintenanceTask {
  id: string
  name: string
  frequency: "daily" | "weekly" | "monthly" | "quarterly"
  nextScheduled: string
  duration: string
  affectedServices: string[]
  template: boolean
}

const MOCK_MAINTENANCE: MaintenanceTask[] = [
  {
    id: "M-001",
    name: "Backup de Servidores",
    frequency: "daily",
    nextScheduled: "2025-11-01 02:00",
    duration: "2 horas",
    affectedServices: ["Todos"],
    template: true,
  },
  {
    id: "M-002",
    name: "Actualización de Antivirus",
    frequency: "weekly",
    nextScheduled: "2025-11-03 22:00",
    duration: "1 hora",
    affectedServices: ["Estaciones de Trabajo"],
    template: true,
  },
  {
    id: "M-003",
    name: "Limpieza de Logs",
    frequency: "monthly",
    nextScheduled: "2025-11-15 03:00",
    duration: "30 minutos",
    affectedServices: ["Servidores"],
    template: true,
  },
]

export default function MaintenanceScheduler() {
  const [maintenance] = useState<MaintenanceTask[]>(MOCK_MAINTENANCE)

  const getFrequencyLabel = (freq: string) => {
    const labels: Record<string, string> = {
      daily: "Diariamente",
      weekly: "Semanalmente",
      monthly: "Mensualmente",
      quarterly: "Trimestralmente",
    }
    return labels[freq] || freq
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Mantenimiento Preventivo</h2>
        <Button>Nueva Tarea</Button>
      </div>

      {/* Maintenance Tasks */}
      <div className="space-y-4">
        {maintenance.map((task) => (
          <Card key={task.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{task.name}</h3>
                <p className="text-sm text-gray-dark">{task.id}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-primary hover:text-primary-light">Editar</button>
                <button className="px-3 py-1 text-sm text-gray-dark hover:text-foreground">Más</button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-dark mb-1">Frecuencia</p>
                <p className="font-medium text-foreground">{getFrequencyLabel(task.frequency)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-dark mb-1">Próximo Programado</p>
                <p className="font-medium text-foreground">{task.nextScheduled}</p>
              </div>
              <div>
                <p className="text-xs text-gray-dark mb-1">Duración</p>
                <p className="font-medium text-foreground">{task.duration}</p>
              </div>
              <div>
                <p className="text-xs text-gray-dark mb-1">Servicios Afectados</p>
                <p className="font-medium text-foreground">{task.affectedServices.join(", ")}</p>
              </div>
            </div>

            {task.template && (
              <div className="text-xs text-success bg-success/10 px-3 py-1 rounded w-fit">Plantilla Predefinida</div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
