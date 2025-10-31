"use client"
import { useState } from "react"
import UserManagement from "@/components/admin/user-management"
import SystemSettings from "@/components/admin/system-settings"
import CategoryManagement from "@/components/admin/category-management"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Panel de Administración</h1>
        <p className="text-gray-dark">Gestión del sistema y configuración</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-border">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === "overview"
              ? "border-primary text-primary"
              : "border-transparent text-gray-dark hover:text-foreground"
          }`}
        >
          Resumen
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === "users"
              ? "border-primary text-primary"
              : "border-transparent text-gray-dark hover:text-foreground"
          }`}
        >
          Usuarios
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === "categories"
              ? "border-primary text-primary"
              : "border-transparent text-gray-dark hover:text-foreground"
          }`}
        >
          Categorías
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === "settings"
              ? "border-primary text-primary"
              : "border-transparent text-gray-dark hover:text-foreground"
          }`}
        >
          Configuración
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-4 gap-4">
          <div className="card">
            <p className="text-gray-dark text-sm mb-1">Usuarios Activos</p>
            <p className="text-3xl font-bold text-primary">248</p>
            <p className="text-xs text-gray-dark mt-2">+12 esta semana</p>
          </div>
          <div className="card">
            <p className="text-gray-dark text-sm mb-1">Tickets Totales</p>
            <p className="text-3xl font-bold text-info">5,847</p>
            <p className="text-xs text-gray-dark mt-2">+342 esta semana</p>
          </div>
          <div className="card">
            <p className="text-gray-dark text-sm mb-1">Técnicos</p>
            <p className="text-3xl font-bold text-accent-1">24</p>
            <p className="text-xs text-gray-dark mt-2">Activos</p>
          </div>
          <div className="card">
            <p className="text-gray-dark text-sm mb-1">Uptime Sistema</p>
            <p className="text-3xl font-bold text-success">99.9%</p>
            <p className="text-xs text-gray-dark mt-2">Últimos 30 días</p>
          </div>
        </div>
      )}

      {activeTab === "users" && <UserManagement />}
      {activeTab === "categories" && <CategoryManagement />}
      {activeTab === "settings" && <SystemSettings />}
    </div>
  )
}
