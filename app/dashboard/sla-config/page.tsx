"use client"

import { useState } from "react"
import SLADefinition from "@/components/sla/sla-definition"
import EscalationRules from "@/components/sla/escalation-rules"
import SLAMonitoring from "@/components/sla/sla-monitoring"

export default function SLAConfigPage() {
  const [activeTab, setActiveTab] = useState<"definition" | "escalation" | "monitoring">("definition")

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Configuración SLA Avanzada</h1>
        <p className="text-gray-dark">
          Define acuerdos de nivel de servicio, reglas de escalamiento y monitorea cumplimiento
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-border">
        {[
          { id: "definition", label: "Definición de Acuerdos" },
          { id: "escalation", label: "Reglas de Escalamiento" },
          { id: "monitoring", label: "Monitoreo" },
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
        {activeTab === "definition" && <SLADefinition />}
        {activeTab === "escalation" && <EscalationRules />}
        {activeTab === "monitoring" && <SLAMonitoring />}
      </div>
    </div>
  )
}
