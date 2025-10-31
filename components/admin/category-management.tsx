"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Code, Monitor, Globe, MoreVertical } from "lucide-react"

interface Category {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  ticketCount: number
  avgResolutionTime: string
}

const MOCK_CATEGORIES: Category[] = [
  {
    id: "C-001",
    name: "Email",
    description: "Problemas relacionados con correo corporativo",
    icon: <Mail size={32} className="text-primary" />,
    ticketCount: 342,
    avgResolutionTime: "1.5h",
  },
  {
    id: "C-002",
    name: "Software",
    description: "Instalación y soporte de software",
    icon: <Code size={32} className="text-primary" />,
    ticketCount: 287,
    avgResolutionTime: "3.2h",
  },
  {
    id: "C-003",
    name: "Hardware",
    description: "Problemas de hardware y equipos",
    icon: <Monitor size={32} className="text-primary" />,
    ticketCount: 156,
    avgResolutionTime: "4.1h",
  },
  {
    id: "C-004",
    name: "Red",
    description: "Conectividad y problemas de red",
    icon: <Globe size={32} className="text-primary" />,
    ticketCount: 198,
    avgResolutionTime: "2.3h",
  },
]

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES)
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Gestión de Categorías</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors"
        >
          + Nueva Categoría
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {category.icon}
                <div>
                  <h3 className="font-bold text-foreground">{category.name}</h3>
                  <p className="text-xs text-gray-dark">{category.description}</p>
                </div>
              </div>
              <button className="text-gray-dark hover:text-foreground">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-gray-dark mb-1">Tickets</p>
                <p className="text-2xl font-bold text-primary">{category.ticketCount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-dark mb-1">Tiempo Promedio</p>
                <p className="text-2xl font-bold text-info">{category.avgResolutionTime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
