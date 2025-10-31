"use client"

import { useState } from "react"
import NotificationCenter from "@/components/notifications/notification-center"
import AlertPreferences from "@/components/notifications/alert-preferences"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"center" | "preferences">("center")

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Notificaciones y Alertas</h1>
        <p className="text-gray-dark">Gestiona tus notificaciones y preferencias de alertas</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-border">
        {[
          { id: "center", label: "Centro de Notificaciones" },
          { id: "preferences", label: "Preferencias" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-gray-dark hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === "center" && <NotificationCenter />}
        {activeTab === "preferences" && <AlertPreferences />}
      </div>
    </div>
  )
}
