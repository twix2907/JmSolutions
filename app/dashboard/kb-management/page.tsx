"use client"

import { useState } from "react"
import KBArticleManagement from "@/components/kb/kb-article-management"
import KBReviewPanel from "@/components/kb/kb-review-panel"
import KBStatistics from "@/components/kb/kb-statistics"

export default function KBManagementPage() {
  const [activeTab, setActiveTab] = useState<"articles" | "review" | "stats">("articles")

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestión de Base de Conocimiento</h1>
        <p className="text-gray-dark">Administra artículos, revisiones y estadísticas</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-border">
        {[
          { id: "articles", label: "Artículos" },
          { id: "review", label: "Panel de Revisión" },
          { id: "stats", label: "Estadísticas" },
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
        {activeTab === "articles" && <KBArticleManagement />}
        {activeTab === "review" && <KBReviewPanel />}
        {activeTab === "stats" && <KBStatistics />}
      </div>
    </div>
  )
}
