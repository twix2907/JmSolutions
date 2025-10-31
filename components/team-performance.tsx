"use client"

import { useState, useEffect } from "react"

interface TeamMember {
  name: string
  ticketsResolved: number
  avgResolutionTime: string
  satisfaction: number
  slaCompliance: number
}

const TEAM_DATA: TeamMember[] = [
  {
    name: "Juan Pérez",
    ticketsResolved: 156,
    avgResolutionTime: "2.1h",
    satisfaction: 4.8,
    slaCompliance: 98,
  },
  {
    name: "María García",
    ticketsResolved: 142,
    avgResolutionTime: "2.4h",
    satisfaction: 4.6,
    slaCompliance: 96,
  },
  {
    name: "Carlos Rodríguez",
    ticketsResolved: 138,
    avgResolutionTime: "2.6h",
    satisfaction: 4.5,
    slaCompliance: 94,
  },
  {
    name: "Ana Martínez",
    ticketsResolved: 151,
    avgResolutionTime: "2.2h",
    satisfaction: 4.7,
    slaCompliance: 97,
  },
]

export default function TeamPerformance() {
  const [data, setData] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    // Simula fetch
    const timer = setTimeout(() => {
      // Simula error: setError("Error al cargar desempeño del equipo")
      setData(TEAM_DATA)
      setLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-foreground mb-4">Desempeño del Equipo</h3>

      {error && (
        <div className="bg-error/10 text-error px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-gray-dark">Técnico</th>
              <th className="text-left py-3 px-4 font-medium text-gray-dark">Resueltos</th>
              <th className="text-left py-3 px-4 font-medium text-gray-dark">Tiempo Prom.</th>
              <th className="text-left py-3 px-4 font-medium text-gray-dark">Satisfacción</th>
              <th className="text-left py-3 px-4 font-medium text-gray-dark">SLA</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-b border-border animate-pulse">
                    <td className="py-3 px-4">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-4 w-12 bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-4 w-16 bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-4 w-12 bg-gray-200 rounded" />
                    </td>
                  </tr>
                ))
              : !error &&
                data.map((member) => (
                  <tr key={member.name} className="border-b border-border hover:bg-muted transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{member.name}</td>
                    <td className="py-3 px-4 text-primary font-bold">{member.ticketsResolved}</td>
                    <td className="py-3 px-4 text-gray-dark">{member.avgResolutionTime}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-info font-medium">{member.satisfaction}</span>
                        <div className="w-16 h-2 bg-gray-medium rounded-full overflow-hidden">
                          <div className="h-full bg-success" style={{ width: `${(member.satisfaction / 5) * 100}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          member.slaCompliance >= 96
                            ? "bg-success/10 text-success"
                            : member.slaCompliance >= 94
                            ? "bg-warning/10 text-warning"
                            : "bg-error/10 text-error"
                        }`}
                      >
                        {member.slaCompliance}%
                      </span>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}