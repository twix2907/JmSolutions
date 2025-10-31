"use client"

import { useState } from "react"
import ProblemDashboard from "@/components/problems/problem-dashboard"
import RootCauseAnalysis from "@/components/problems/root-cause-analysis"

export default function ProblemsPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "analysis">("dashboard")

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestión de Problemas</h1>
        <p className="text-gray-dark">Monitorea problemas, incidentes relacionados y análisis de causa raíz</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-border">
        {[
          { id: "dashboard", label: "Dashboard" },
          { id: "analysis", label: "Análisis de Causa Raíz" },
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
        {activeTab === "dashboard" && <ProblemDashboard />}
        {activeTab === "analysis" && <RootCauseAnalysis />}
      </div>
    </div>
  )
}
