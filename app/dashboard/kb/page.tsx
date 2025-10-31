"use client"
import { useState } from "react"
import KBSearch from "@/components/kb/kb-search"
import KBArticleList from "@/components/kb/kb-article-list"
import KBCategories from "@/components/kb/kb-categories"

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Base de Conocimiento</h1>
        <p className="text-gray-dark">Encuentra respuestas a preguntas frecuentes y soluciones</p>
      </div>

      {/* Search */}
      <KBSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Categories and Articles */}
      <div className="grid grid-cols-4 gap-8 mt-8">
        <aside className="col-span-1">
          <KBCategories selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        </aside>

        <main className="col-span-3">
          <KBArticleList searchQuery={searchQuery} selectedCategory={selectedCategory} />
        </main>
      </div>
    </div>
  )
}
