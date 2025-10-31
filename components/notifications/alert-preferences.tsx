"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AlertPreference {
  type: string
  email: boolean
  inApp: boolean
  sms: boolean
  schedule: string
}

export default function AlertPreferences() {
  const [preferences, setPreferences] = useState<AlertPreference[]>([
    {
      type: "Tickets Críticos",
      email: true,
      inApp: true,
      sms: true,
      schedule: "24/7",
    },
    {
      type: "SLA en Riesgo",
      email: true,
      inApp: true,
      sms: false,
      schedule: "Horario laboral",
    },
    {
      type: "Cambios Programados",
      email: true,
      inApp: true,
      sms: false,
      schedule: "24/7",
    },
    {
      type: "Artículos para Revisar",
      email: false,
      inApp: true,
      sms: false,
      schedule: "Horario laboral",
    },
    {
      type: "Reportes Diarios",
      email: true,
      inApp: false,
      sms: false,
      schedule: "Diariamente 9:00 AM",
    },
  ])

  const handleToggle = (index: number, channel: "email" | "inApp" | "sms") => {
    const updated = [...preferences]
    updated[index][channel] = !updated[index][channel]
    setPreferences(updated)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Preferencias de Alertas</h2>

      {/* Notification Types */}
      <div className="space-y-4">
        {preferences.map((pref, idx) => (
          <Card key={idx} className="p-6">
            <h3 className="font-semibold text-foreground mb-4">{pref.type}</h3>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pref.email}
                    onChange={() => handleToggle(idx, "email")}
                    className="rounded"
                  />
                  <span className="text-sm text-foreground">Correo</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pref.inApp}
                    onChange={() => handleToggle(idx, "inApp")}
                    className="rounded"
                  />
                  <span className="text-sm text-foreground">En la App</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pref.sms}
                    onChange={() => handleToggle(idx, "sms")}
                    className="rounded"
                  />
                  <span className="text-sm text-foreground">SMS</span>
                </label>
              </div>
              <div>
                <label className="text-sm text-foreground">
                  <span className="block text-xs text-gray-dark mb-1">Horario</span>
                  <select className="px-2 py-1 border border-border rounded text-sm">
                    <option>24/7</option>
                    <option>Horario laboral</option>
                    <option>Personalizado</option>
                  </select>
                </label>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Global Settings */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Configuración Global</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-foreground">Habilitar todas las notificaciones</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-foreground">Sonido de notificación</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-foreground">Modo silencioso (no molestar)</span>
          </label>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex gap-2">
        <Button>Guardar Cambios</Button>
        <Button variant="outline">Cancelar</Button>
      </div>
    </div>
  )
}
