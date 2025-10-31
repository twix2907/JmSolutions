"use client"

import type React from "react"

import { BookOpen, Mail, Code, Monitor, Globe, Lock } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: React.ReactNode
  count: number
}

const CATEGORIES: Category[] = [
  { id: "all", name: "Todos", icon: <BookOpen size={20} />, count: 156 },
  { id: "email", name: "Email", icon: <Mail size={20} />, count: 34 },
  { id: "software", name: "Software", icon: <Code size={20} />, count: 42 },
  { id: "hardware", name: "Hardware", icon: <Monitor size={20} />, count: 28 },
  { id: "network", name: "Red", icon: <Globe size={20} />, count: 31 },
  { id: "access", name: "Acceso", icon: <Lock size={20} />, count: 21 },
]

interface KBCategoriesProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function KBCategories({ selectedCategory, onCategoryChange }: KBCategoriesProps) {
  return (
    <div className="card sticky top-8">
      <h3 className="text-lg font-bold text-foreground mb-4">Categorías</h3>

      <div className="space-y-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              selectedCategory === category.id ? "bg-primary text-white" : "hover:bg-muted text-foreground"
            }`}
          >
            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{category.icon}</span>
            <div className="flex-1 text-left">
              <p className="font-medium">{category.name}</p>
              <p className={`text-xs ${selectedCategory === category.id ? "text-white/70" : "text-gray-dark"}`}>
                {category.count} artículos
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
