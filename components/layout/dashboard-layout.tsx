"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import Sidebar from "./sidebar"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { navigationByRole } from "@/lib/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const sidebarItems = navigationByRole[user.role]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar items={sidebarItems} userRole={user.role} user={user} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
