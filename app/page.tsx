"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import LoginForm from "@/components/auth/login-form"
import type { UserRole } from "@/lib/auth-context"

export default function Home() {
  const router = useRouter()
  const { login, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>("user")

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    setIsLoading(true)
    setError("")

    try {
      if (email && password) {
        await login(email, password, selectedRole)
        router.push(`/dashboard/${selectedRole}`)
      } else {
        setError("Por favor ingrese usuario y contraseña")
      }
    } catch (err) {
      setError("Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary to-primary-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />

        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <p className="text-white text-sm font-medium mb-3">Selecciona un rol para demostración:</p>
          <div className="grid grid-cols-2 gap-2">
            {(["user", "technician", "supervisor", "admin"] as const).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  selectedRole === role ? "bg-accent text-primary" : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {role === "user" && "Usuario"}
                {role === "technician" && "Técnico"}
                {role === "supervisor" && "Supervisor"}
                {role === "admin" && "Admin"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
