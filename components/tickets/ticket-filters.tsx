"use client"

interface TicketFiltersProps {
  filters: {
    priority: string
    status: string
    slaStatus: string
  }
  onFiltersChange: (filters: any) => void
}

export default function TicketFilters({ filters, onFiltersChange }: TicketFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  return (
    <div className="card mb-8">
      <h3 className="text-lg font-bold text-foreground mb-4">Filtros</h3>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Prioridad</label>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todas</option>
            <option value="critical">Crítica</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Estado</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todos</option>
            <option value="open">Abierto</option>
            <option value="in-progress">En Progreso</option>
            <option value="pending">Pendiente</option>
            <option value="resolved">Resuelto</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Estado SLA</label>
          <select
            value={filters.slaStatus}
            onChange={(e) => handleFilterChange("slaStatus", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todos</option>
            <option value="ok">OK</option>
            <option value="warning">Advertencia</option>
            <option value="critical">Crítico</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Búsqueda</label>
          <input
            type="text"
            placeholder="ID o título..."
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}
