"use client"

import { useState, useEffect } from "react"

interface SLAMetric {
  priority: string
  target: number
  actual: number
  status: "ok" | "warning" | "critical"
}

const SLA_DATA: SLAMetric[] = [
  { priority: "Crítica", target: 99, actual: 98, status: "warning" },
  { priority: "Alta", target: 95, actual: 96, status: "ok" },
  { priority: "Media", target: 90, actual: 94, status: "ok" },
  { priority: "Baja", target: 85, actual: 89, status: "ok" },
]

export default function SLAMetrics() {
  const [data, setData] = useState<SLAMetric[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    // Simula fetch
    const timer = setTimeout(() => {
      // Simula error: setError("Error al cargar métricas SLA")
      setData(SLA_DATA)
      setLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-foreground mb-4">Métricas SLA</h3>

      {error && (
        <div className="bg-error/10 text-error px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="mb-4 animate-pulse">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="flex gap-4">
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                    <div className="h-4 w-10 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full" />
              </div>
            ))
          : !error &&
            data.map((metric) => (
              <div key={metric.priority}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{metric.priority}</span>
                  <div className="flex gap-4">
                    <span className="text-sm text-gray-dark">Meta: {metric.target}%</span>
                    <span
                      className={`text-sm font-bold ${
                        metric.status === "ok"
                          ? "text-success"
                          : metric.status === "warning"
                          ? "text-warning"
                          : "text-error"
                      }`}
                    >
                      {metric.actual}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-medium rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      metric.status === "ok"
                        ? "bg-success"
                        : metric.status === "warning"
                        ? "bg-warning"
                        : "bg-error"
                    }`}
                    style={{ width: `${metric.actual}%` }}
                  />
                </div>
              </div>
            ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        {loading ? (
          <div className="grid grid-cols-2 gap-4 animate-pulse">
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-6 w-20 bg-gray-200 rounded" />
            </div>
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-6 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        ) : !error ? (
          <>
            <p className="text-sm text-gray-dark mb-3">Resumen General</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-dark mb-1">Cumplimiento Promedio</p>
                <p className="text-2xl font-bold text-success">94.25%</p>
              </div>
              <div>
                <p className="text-xs text-gray-dark mb-1">Tickets en Riesgo</p>
                <p className="text-2xl font-bold text-warning">23</p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}