"use client"

import { Search } from "lucide-react"

interface KBSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function KBSearch({ searchQuery, onSearchChange }: KBSearchProps) {
  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Busca artículos, soluciones, preguntas frecuentes..."
          className="w-full px-6 py-4 text-lg border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-dark hover:text-foreground">
          <Search size={20} />
        </button>
      </div>

      {/* Search Suggestions */}
      {searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg p-4 z-10">
          <p className="text-sm text-gray-dark mb-3">Búsquedas populares:</p>
          <div className="space-y-2">
            <button className="block w-full text-left px-3 py-2 hover:bg-muted rounded text-sm text-foreground">
              Cómo restablecer contraseña
            </button>
            <button className="block w-full text-left px-3 py-2 hover:bg-muted rounded text-sm text-foreground">
              Problemas de conexión VPN
            </button>
            <button className="block w-full text-left px-3 py-2 hover:bg-muted rounded text-sm text-foreground">
              Configurar correo corporativo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
