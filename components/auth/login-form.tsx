"use client"

import type React from "react"

import { useState } from "react"

interface LoginFormProps {
  onSubmit: (email: string, password: string, rememberMe: boolean) => void
  isLoading: boolean
  error: string
}

export default function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email, password, rememberMe)
  }

  const fillDemoCredentials = () => {
    setEmail("demo@helpdesk.com")
    setPassword("demo123")
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <img src="/placeholder-logo.jpg" alt="JM Solutions Logo" className="w-16 h-16 object-contain rounded" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">JM Solutions</h1>
          <p className="text-gray-dark text-sm mt-1">Sistema de Gestión de Tickets</p>
        </div>

        {/* Error Message */}
        {error && <div className="mb-4 p-3 bg-error/10 border border-error rounded text-error text-sm">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
              Usuario o Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@empresa.com"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-dark">
              Recordar usuario
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* Demo Helper */}
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="w-full mt-4 py-2 bg-accent/20 text-accent font-medium rounded-lg hover:bg-accent/30 transition-colors text-sm"
        >
          Usar credenciales de demostración
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-gray-dark mt-6">
          © 2025 JM Solutions. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}
