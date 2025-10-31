"use client"

import { useState } from "react"

interface Setting {
  id: string
  label: string
  description: string
  value: string | boolean
  type: "text" | "number" | "toggle" | "select"
  options?: string[]
}

const MOCK_SETTINGS: Setting[] = [
  {
    id: "S-001",
    label: "Nombre de la Empresa",
    description: "Nombre que aparece en el sistema",
    value: "Tech Support Corp",
    type: "text",
  },
  {
    id: "S-002",
    label: "Email de Soporte",
    description: "Email para notificaciones del sistema",
    value: "support@empresa.com",
    type: "text",
  },
  {
    id: "S-003",
    label: "SLA Crítica (minutos)",
    description: "Tiempo máximo para resolver tickets críticos",
    value: "60",
    type: "number",
  },
  {
    id: "S-004",
    label: "SLA Alta (minutos)",
    description: "Tiempo máximo para resolver tickets de alta prioridad",
    value: "240",
    type: "number",
  },
  {
    id: "S-005",
    label: "Notificaciones por Email",
    description: "Enviar notificaciones por correo electrónico",
    value: true,
    type: "toggle",
  },
  {
    id: "S-006",
    label: "Modo Mantenimiento",
    description: "Activar modo de mantenimiento del sistema",
    value: false,
    type: "toggle",
  },
]

export default function SystemSettings() {
  const [settings, setSettings] = useState<Setting[]>(MOCK_SETTINGS)
  const [isSaving, setIsSaving] = useState(false)

  const handleSettingChange = (id: string, newValue: string | boolean) => {
    setSettings(settings.map((s) => (s.id === id ? { ...s, value: newValue } : s)))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert("Configuración guardada exitosamente")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Configuración del Sistema</h2>

      <div className="card space-y-6">
        {settings.map((setting) => (
          <div key={setting.id} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
            <label className="block text-sm font-medium text-foreground mb-2">{setting.label}</label>
            <p className="text-xs text-gray-dark mb-3">{setting.description}</p>

            {setting.type === "text" && (
              <input
                type="text"
                value={setting.value as string}
                onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            )}

            {setting.type === "number" && (
              <input
                type="number"
                value={setting.value as string}
                onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            )}

            {setting.type === "toggle" && (
              <button
                onClick={() => handleSettingChange(setting.id, !(setting.value as boolean))}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  (setting.value as boolean) ? "bg-success text-white" : "bg-gray-medium text-foreground"
                }`}
              >
                {(setting.value as boolean) ? "Activado" : "Desactivado"}
              </button>
            )}
          </div>
        ))}

        <div className="pt-6 border-t border-border flex gap-3 justify-end">
          <button className="px-6 py-2 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50"
          >
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  )
}
