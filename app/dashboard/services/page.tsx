"use client"

import { useState } from "react"
import ServiceCatalog from "@/components/services/service-catalog"
import ServiceRequestForm from "@/components/services/service-request-form"

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<"catalog" | "request">("catalog")

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Catálogo de Servicios</h1>
        <p className="text-gray-dark">Solicita servicios corporativos con SLA garantizado</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-border">
        {[
          { id: "catalog", label: "Catálogo" },
          { id: "request", label: "Nueva Solicitud" },
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
        {activeTab === "catalog" && <ServiceCatalog />}
        {activeTab === "request" && <ServiceRequestForm />}
      </div>
    </div>
  )
}
