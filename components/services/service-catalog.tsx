"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Mail, Globe, Code, Printer, User } from "lucide-react"

interface Service {
  id: string
  name: string
  category: string
  description: string
  sla: string
  icon: React.ReactNode
  requestsThisMonth: number
}

const MOCK_SERVICES: Service[] = [
  {
    id: "S-001",
    name: "Restablecer Contraseña",
    category: "Acceso",
    description: "Restablece tu contraseña corporativa",
    sla: "2 horas",
    icon: <Lock size={40} className="text-primary" />,
    requestsThisMonth: 145,
  },
  {
    id: "S-002",
    name: "Configurar Correo",
    category: "Email",
    description: "Configura tu cuenta de correo corporativo",
    sla: "4 horas",
    icon: <Mail size={40} className="text-primary" />,
    requestsThisMonth: 89,
  },
  {
    id: "S-003",
    name: "Acceso VPN",
    category: "Red",
    description: "Solicita acceso a la VPN corporativa",
    sla: "1 día",
    icon: <Globe size={40} className="text-primary" />,
    requestsThisMonth: 56,
  },
  {
    id: "S-004",
    name: "Instalación de Software",
    category: "Software",
    description: "Solicita la instalación de software autorizado",
    sla: "1 día",
    icon: <Code size={40} className="text-primary" />,
    requestsThisMonth: 34,
  },
  {
    id: "S-005",
    name: "Conectar Impresora",
    category: "Hardware",
    description: "Conecta una impresora de red",
    sla: "4 horas",
    icon: <Printer size={40} className="text-primary" />,
    requestsThisMonth: 23,
  },
  {
    id: "S-006",
    name: "Crear Cuenta de Usuario",
    category: "Acceso",
    description: "Crea una nueva cuenta de usuario",
    sla: "1 día",
    icon: <User size={40} className="text-primary" />,
    requestsThisMonth: 12,
  },
]

export default function ServiceCatalog() {
  const [services] = useState<Service[]>(MOCK_SERVICES)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["all", ...new Set(services.map((s) => s.category))]

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Catálogo de Servicios</h2>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Busca servicios..."
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-border"
            }`}
          >
            {category === "all" ? "Todos" : category}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{service.name}</h3>
            <p className="text-sm text-gray-dark mb-4">{service.description}</p>

            <div className="space-y-2 mb-4 pb-4 border-b border-border">
              <div className="flex justify-between text-sm">
                <span className="text-gray-dark">SLA:</span>
                <span className="font-medium text-foreground">{service.sla}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-dark">Solicitudes este mes:</span>
                <span className="font-medium text-foreground">{service.requestsThisMonth}</span>
              </div>
            </div>

            <Button className="w-full">Solicitar Servicio</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
