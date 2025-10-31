"use client"

import { useState } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "supervisor" | "technician" | "user"
  status: "active" | "inactive"
  joinDate: string
}

const MOCK_USERS: User[] = [
  {
    id: "U-001",
    name: "Juan Pérez",
    email: "juan.perez@empresa.com",
    role: "technician",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: "U-002",
    name: "María García",
    email: "maria.garcia@empresa.com",
    role: "technician",
    status: "active",
    joinDate: "2024-02-20",
  },
  {
    id: "U-003",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@empresa.com",
    role: "supervisor",
    status: "active",
    joinDate: "2023-11-10",
  },
  {
    id: "U-004",
    name: "Ana Martínez",
    email: "ana.martinez@empresa.com",
    role: "admin",
    status: "active",
    joinDate: "2023-06-05",
  },
]

const getRoleLabel = (role: string) => {
  const labels: Record<string, string> = {
    admin: "Administrador",
    supervisor: "Supervisor",
    technician: "Técnico",
    user: "Usuario",
  }
  return labels[role] || role
}

const getRoleColor = (role: string) => {
  const colors: Record<string, string> = {
    admin: "bg-error/10 text-error",
    supervisor: "bg-warning/10 text-warning",
    technician: "bg-info/10 text-info",
    user: "bg-gray-medium/10 text-gray-dark",
  }
  return colors[role] || "bg-gray-medium"
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [showAddModal, setShowAddModal] = useState(false)

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Gestión de Usuarios</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors"
        >
          + Nuevo Usuario
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-gray-dark">Nombre</th>
                <th className="text-left py-3 px-4 font-medium text-gray-dark">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-dark">Rol</th>
                <th className="text-left py-3 px-4 font-medium text-gray-dark">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-gray-dark">Fecha Ingreso</th>
                <th className="text-left py-3 px-4 font-medium text-gray-dark">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{user.name}</td>
                  <td className="py-3 px-4 text-gray-dark">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.status === "active" ? "bg-success/10 text-success" : "bg-gray-medium/10 text-gray-dark"
                      }`}
                    >
                      {user.status === "active" ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-dark text-xs">{user.joinDate}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button className="text-primary hover:text-primary-light font-medium text-xs">Editar</button>
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className="text-warning hover:text-warning/80 font-medium text-xs"
                    >
                      {user.status === "active" ? "Desactivar" : "Activar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
