"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Article {
  id: string
  title: string
  status: "draft" | "review" | "published"
  author: string
  category: string
  views: number
  effectiveness: number
  updatedAt: string
}

const MOCK_ARTICLES: Article[] = [
  {
    id: "A-001",
    title: "Cómo restablecer tu contraseña",
    status: "published",
    author: "Juan García",
    category: "access",
    views: 1245,
    effectiveness: 92,
    updatedAt: "2025-10-20",
  },
  {
    id: "A-002",
    title: "Configurar correo en Outlook",
    status: "review",
    author: "María López",
    category: "email",
    views: 2341,
    effectiveness: 88,
    updatedAt: "2025-10-15",
  },
  {
    id: "A-003",
    title: "Solucionar problemas de VPN",
    status: "draft",
    author: "Carlos Rodríguez",
    category: "network",
    views: 1876,
    effectiveness: 85,
    updatedAt: "2025-10-18",
  },
]

export default function KBArticleManagement() {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("updated")

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: "bg-gray-medium/10 text-gray-dark",
      review: "bg-warning/10 text-warning",
      published: "bg-success/10 text-success",
    }
    return colors[status] || "bg-gray-medium/10"
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      draft: "Borrador",
      review: "En Revisión",
      published: "Publicado",
    }
    return labels[status] || status
  }

  const filteredArticles = articles.filter((article) => filterStatus === "all" || article.status === filterStatus)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Gestión de Artículos</h2>
        <Button>Nuevo Artículo</Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mr-2">Estado:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1 border border-border rounded-lg text-sm"
            >
              <option value="all">Todos</option>
              <option value="draft">Borrador</option>
              <option value="review">En Revisión</option>
              <option value="published">Publicado</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mr-2">Ordenar por:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-border rounded-lg text-sm"
            >
              <option value="updated">Más Recientes</option>
              <option value="views">Más Vistos</option>
              <option value="effectiveness">Más Efectivos</option>
              <option value="author">Autor</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Articles Table */}
      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Título</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Estado</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Autor</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Vistas</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Efectividad</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article) => (
              <tr key={article.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">{article.title}</p>
                  <p className="text-xs text-gray-dark">{article.category}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                    {getStatusLabel(article.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{article.author}</td>
                <td className="px-6 py-4 text-sm text-foreground">{article.views}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-success" style={{ width: `${article.effectiveness}%` }} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{article.effectiveness}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-xs px-2 py-1 hover:bg-muted rounded text-primary hover:text-primary-light">
                      Editar
                    </button>
                    {article.status === "draft" && (
                      <button className="text-xs px-2 py-1 hover:bg-muted rounded text-warning">Enviar</button>
                    )}
                    {article.status === "review" && (
                      <>
                        <button className="text-xs px-2 py-1 hover:bg-muted rounded text-success">Aprobar</button>
                        <button className="text-xs px-2 py-1 hover:bg-muted rounded text-error">Rechazar</button>
                      </>
                    )}
                    <button className="text-xs px-2 py-1 hover:bg-muted rounded text-gray-dark">Archivar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
