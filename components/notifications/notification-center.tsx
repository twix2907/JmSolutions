"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface Notification {
  id: string
  type: "info" | "warning" | "urgent" | "task"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "N-001",
    type: "urgent",
    title: "Ticket crítico asignado",
    message: "Se te ha asignado un ticket crítico: Caída del servicio de correo",
    timestamp: "2025-10-25 14:30",
    read: false,
    actionUrl: "/dashboard/technician",
  },
  {
    id: "N-002",
    type: "warning",
    title: "SLA en riesgo",
    message: "El ticket #TK-2025-001 está próximo a incumplir el SLA",
    timestamp: "2025-10-25 14:15",
    read: false,
  },
  {
    id: "N-003",
    type: "task",
    title: "Revisión de artículo pendiente",
    message: "Hay 2 artículos de KB esperando tu revisión",
    timestamp: "2025-10-25 13:45",
    read: true,
  },
  {
    id: "N-004",
    type: "info",
    title: "Cambio programado",
    message: "Mantenimiento de VPN programado para el 5 de noviembre",
    timestamp: "2025-10-25 10:00",
    read: true,
  },
]

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const [filterType, setFilterType] = useState<string>("all")
  const liveRegionRef = useRef<HTMLDivElement>(null)

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      urgent: "bg-error/10 text-error border-error/20",
      warning: "bg-warning/10 text-warning border-warning/20",
      task: "bg-info/10 text-info border-info/20",
      info: "bg-muted text-foreground border-border",
    }
    return colors[type] || "bg-muted"
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      urgent: "Urgente",
      warning: "Advertencia",
      task: "Tarea",
      info: "Información",
    }
    return labels[type] || type
  }

  const filteredNotifications = notifications.filter(
    (n) => filterType === "all" || n.type === filterType || (filterType === "unread" && !n.read),
  )

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  // Anunciar cambios de filtro y cantidad de no leídas
  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent =
        filterType === "unread"
          ? `Mostrando solo no leídas. Total: ${filteredNotifications.length}`
          : `Filtro: ${filterType}. Total: ${filteredNotifications.length}`
    }
  }, [filterType, filteredNotifications.length])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground" id="notification-center-title">
          Centro de Notificaciones
        </h2>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-primary hover:text-primary-light font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Marcar todo como leído"
          >
            Marcar todo como leído
          </button>
        )}
      </div>

      {/* Live region para lectores de pantalla */}
      <div ref={liveRegionRef} aria-live="polite" className="sr-only" />

      {/* Filters */}
      <Card className="p-4" role="region" aria-label="Filtros de notificaciones">
        <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Filtros">
          {[
            { id: "all", label: "Todas" },
            { id: "unread", label: `No leídas (${unreadCount})` },
            { id: "urgent", label: "Urgentes" },
            { id: "warning", label: "Advertencias" },
            { id: "task", label: "Tareas" },
            { id: "info", label: "Información" },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterType(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                filterType === filter.id ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-border"
              }`}
              role="tab"
              aria-selected={filterType === filter.id}
              tabIndex={0}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3" role="list" aria-labelledby="notification-center-title">
        {filteredNotifications.length === 0 ? (
          <Card className="p-8 text-center" role="listitem">
            <p className="text-gray-dark">No hay notificaciones</p>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 border-l-4 cursor-pointer transition-colors hover:bg-muted/50 focus-within:ring-2 focus-within:ring-primary ${getTypeColor(
                notification.type,
              )} ${!notification.read ? "bg-opacity-50" : ""}`}
              onClick={() => markAsRead(notification.id)}
              role="listitem"
              tabIndex={0}
              aria-label={notification.title + (notification.read ? '' : ' (no leída)')}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  markAsRead(notification.id)
                }
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{notification.title}</h4>
                    {!notification.read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-foreground mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-dark">{notification.timestamp}</p>
                </div>
                {notification.actionUrl && (
                  <button
                    className="ml-4 px-3 py-1 text-sm font-medium text-primary hover:text-primary-light flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary"
                    tabIndex={0}
                    aria-label={`Ver detalle de ${notification.title}`}
                  >
                    Ver
                  </button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}