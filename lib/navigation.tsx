import type React from "react"
import { Home, Ticket, BookOpen, BarChart3, Users, Settings, User, Wrench } from "lucide-react"

export type UserRole = "user" | "technician" | "supervisor" | "admin"

export const navigationByRole: Record<UserRole, Array<{ label: string; href: string; icon: React.ReactNode }>> = {
  user: [
    { label: "Inicio", href: "/dashboard/user", icon: <Home size={20} /> },
    { label: "Mis Tickets", href: "/dashboard/user", icon: <Ticket size={20} /> },
    { label: "Base de Conocimiento", href: "/dashboard/kb", icon: <BookOpen size={20} /> },
  ],
  technician: [
    { label: "Inicio", href: "/dashboard/technician", icon: <Home size={20} /> },
    { label: "Cola de Tickets", href: "/dashboard/technician", icon: <Ticket size={20} /> },
    { label: "Base de Conocimiento", href: "/dashboard/kb", icon: <BookOpen size={20} /> },
  ],
  supervisor: [
    { label: "Inicio", href: "/dashboard/supervisor", icon: <Home size={20} /> },
    { label: "Análisis", href: "/dashboard/supervisor", icon: <BarChart3 size={20} /> },
    { label: "Equipo", href: "/dashboard/supervisor", icon: <Users size={20} /> },
    { label: "Base de Conocimiento", href: "/dashboard/kb", icon: <BookOpen size={20} /> },
  ],
  admin: [
    { label: "Inicio", href: "/dashboard/admin", icon: <Home size={20} /> },
    { label: "Administración", href: "/dashboard/admin", icon: <Settings size={20} /> },
    { label: "Usuarios", href: "/dashboard/admin", icon: <User size={20} /> },
    { label: "Configuración", href: "/dashboard/admin", icon: <Wrench size={20} /> },
    { label: "Base de Conocimiento", href: "/dashboard/kb", icon: <BookOpen size={20} /> },
  ],
}

export const roleLabels: Record<UserRole, string> = {
  user: "Usuario Final",
  technician: "Técnico de Soporte",
  supervisor: "Supervisor",
  admin: "Administrador",
}
