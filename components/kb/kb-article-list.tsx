"use client"

import { useState } from "react"
import { Eye, Calendar, ThumbsUp, ThumbsDown } from "lucide-react"

interface Article {
  id: string
  title: string
  description: string
  category: string
  views: number
  helpful: number
  unhelpful: number
  updatedAt: string
  difficulty: "easy" | "medium" | "hard"
}

const MOCK_ARTICLES: Article[] = [
  {
    id: "A-001",
    title: "Cómo restablecer tu contraseña",
    description: "Guía paso a paso para restablecer tu contraseña corporativa",
    category: "access",
    views: 1245,
    helpful: 892,
    unhelpful: 45,
    updatedAt: "2025-10-20",
    difficulty: "easy",
  },
  {
    id: "A-002",
    title: "Configurar correo en Outlook",
    description: "Instrucciones para configurar tu cuenta de correo corporativo en Outlook",
    category: "email",
    views: 2341,
    helpful: 1876,
    unhelpful: 89,
    updatedAt: "2025-10-15",
    difficulty: "easy",
  },
  {
    id: "A-003",
    title: "Solucionar problemas de VPN",
    description: "Pasos para resolver problemas comunes de conexión VPN",
    category: "network",
    views: 1876,
    helpful: 1234,
    unhelpful: 156,
    updatedAt: "2025-10-18",
    difficulty: "medium",
  },
  {
    id: "A-004",
    title: "Instalar software corporativo",
    description: "Cómo instalar y configurar software autorizado",
    category: "software",
    views: 945,
    helpful: 678,
    unhelpful: 34,
    updatedAt: "2025-10-22",
    difficulty: "medium",
  },
  {
    id: "A-005",
    title: "Conectar impresora de red",
    description: "Guía para conectar y configurar impresoras de red",
    category: "hardware",
    views: 1123,
    helpful: 834,
    unhelpful: 67,
    updatedAt: "2025-10-19",
    difficulty: "easy",
  },
  {
    id: "A-006",
    title: "Configuración avanzada de VPN",
    description: "Configuración avanzada para usuarios con requisitos especiales",
    category: "network",
    views: 456,
    helpful: 289,
    unhelpful: 45,
    updatedAt: "2025-10-21",
    difficulty: "hard",
  },
]

interface KBArticleListProps {
  searchQuery: string
  selectedCategory: string
}

const getDifficultyColor = (difficulty: string) => {
  const colors: Record<string, string> = {
    easy: "bg-success/10 text-success",
    medium: "bg-warning/10 text-warning",
    hard: "bg-error/10 text-error",
  }
  return colors[difficulty] || "bg-gray-medium"
}

const getDifficultyLabel = (difficulty: string) => {
  const labels: Record<string, string> = {
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
  }
  return labels[difficulty] || difficulty
}

export default function KBArticleList({ searchQuery, selectedCategory }: KBArticleListProps) {
  const [articles] = useState<Article[]>(MOCK_ARTICLES)
  const [helpfulArticles, setHelpfulArticles] = useState<Set<string>>(new Set())

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleHelpful = (articleId: string) => {
    const newSet = new Set(helpfulArticles)
    if (newSet.has(articleId)) {
      newSet.delete(articleId)
    } else {
      newSet.add(articleId)
    }
    setHelpfulArticles(newSet)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{filteredArticles.length} artículos encontrados</h2>
        <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
          <option>Más relevantes</option>
          <option>Más vistos</option>
          <option>Más recientes</option>
          <option>Más útiles</option>
        </select>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="card text-center py-12">
          <div className="flex justify-center mb-4">
            <Eye size={48} className="text-gray-dark opacity-50" />
          </div>
          <p className="text-foreground font-medium mb-2">No se encontraron artículos</p>
          <p className="text-gray-dark">Intenta con otros términos de búsqueda</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div key={article.id} className="card hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-primary hover:text-primary-light mb-2">{article.title}</h3>
                  <p className="text-gray-dark text-sm mb-3">{article.description}</p>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                      {getDifficultyLabel(article.difficulty)}
                    </span>
                    <span className="text-xs text-gray-dark flex items-center gap-1">
                      <Eye size={14} />
                      {article.views} vistas
                    </span>
                    <span className="text-xs text-gray-dark flex items-center gap-1">
                      <Calendar size={14} />
                      {article.updatedAt}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-dark">¿Fue útil?</span>
                  <button
                    onClick={() => toggleHelpful(article.id)}
                    className={`text-xs font-medium px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                      helpfulArticles.has(article.id) ? "bg-success/10 text-success" : "hover:bg-muted text-gray-dark"
                    }`}
                  >
                    <ThumbsUp size={14} />
                    Sí ({article.helpful})
                  </button>
                  <button className="text-xs font-medium px-2 py-1 rounded hover:bg-muted text-gray-dark transition-colors flex items-center gap-1">
                    <ThumbsDown size={14} />
                    No ({article.unhelpful})
                  </button>
                </div>
                <button className="text-primary hover:text-primary-light font-medium text-sm">Leer más →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
