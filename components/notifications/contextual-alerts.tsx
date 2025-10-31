"use client"

interface ContextualAlert {
  id: string
  severity: "info" | "warning" | "error"
  title: string
  message: string
  action?: string
  dismissible: boolean
}

const MOCK_ALERTS: ContextualAlert[] = [
  {
    id: "A-001",
    severity: "error",
    title: "Ticket crítico sin asignar",
    message: "Hay un ticket crítico que requiere atención inmediata",
    action: "Ver Ticket",
    dismissible: false,
  },
  {
    id: "A-002",
    severity: "warning",
    title: "SLA próximo a vencer",
    message: "El ticket TK-2025-001 vencerá en 30 minutos",
    action: "Actualizar",
    dismissible: true,
  },
  {
    id: "A-003",
    severity: "info",
    title: "Mantenimiento programado",
    message: "Mantenimiento de VPN el 5 de noviembre de 2:00 AM a 4:00 AM",
    dismissible: true,
  },
]

export default function ContextualAlerts() {
  const getSeverityStyles = (severity: string) => {
    const styles: Record<string, string> = {
      error: "bg-error/10 border-error/20 text-error",
      warning: "bg-warning/10 border-warning/20 text-warning",
      info: "bg-info/10 border-info/20 text-info",
    }
    return styles[severity] || "bg-muted"
  }

  const getSeverityIcon = (severity: string) => {
    const icons: Record<string, string> = {
      error: "!",
      warning: "⚠",
      info: "i",
    }
    return icons[severity] || "•"
  }

  return (
    <div className="space-y-3">
      {MOCK_ALERTS.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-start gap-4 p-4 rounded-lg border-l-4 ${getSeverityStyles(alert.severity)}`}
        >
          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">
            {getSeverityIcon(alert.severity)}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">{alert.title}</h4>
            <p className="text-sm mb-3">{alert.message}</p>
            {alert.action && <button className="text-sm font-medium hover:underline">{alert.action}</button>}
          </div>
          {alert.dismissible && <button className="flex-shrink-0 text-lg hover:opacity-70">×</button>}
        </div>
      ))}
    </div>
  )
}
