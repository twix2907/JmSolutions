"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react"

interface SidebarItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
}

interface SidebarProps {
  items: SidebarItem[]
  userRole: string
  user: { email: string; name: string }
}

export default function Sidebar({ items, userRole, user }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <aside
      className={`bg-primary text-white transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"} min-h-screen flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-primary-light flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <img src="/placeholder-logo.jpg" alt="JM Solutions Logo" className="w-8 h-8 object-contain rounded" />
            <span className="font-bold">JM Solutions</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-primary-light rounded transition-colors"
          title={isCollapsed ? "Expandir" : "Contraer"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              pathname === item.href ? "bg-accent text-primary" : "hover:bg-primary-light"
            }`}
            title={isCollapsed ? item.label : ""}
          >
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-white">{item.icon}</span>
            {!isCollapsed && (
              <>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Link>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-primary-light space-y-3">
        {!isCollapsed && (
          <div className="text-sm">
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-accent text-xs truncate">{userRole}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 bg-error hover:bg-error-dark rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
          title={isCollapsed ? "Cerrar sesión" : ""}
        >
          <LogOut size={18} />
          {!isCollapsed && "Cerrar sesión"}
        </button>
      </div>
    </aside>
  )
}
