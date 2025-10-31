"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bold, Italic, Underline, List, Grid3x3, ImageIcon } from "lucide-react"

interface ArticleEditorProps {
  articleId?: string
  onSave?: (article: any) => void
  onCancel?: () => void
}

export default function KBArticleEditor({ articleId, onSave, onCancel }: ArticleEditorProps) {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [audience, setAudience] = useState<string[]>(["users"])
  const [keywords, setKeywords] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      if (onSave) {
        onSave({
          title,
          summary,
          content,
          category,
          audience,
          keywords: keywords.split(",").map((k) => k.trim()),
        })
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{articleId ? "Editar Artículo" : "Nuevo Artículo"}</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>

      {/* Metadata Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Información del Artículo</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título del artículo"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Resumen</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Resumen breve del artículo"
              rows={2}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecciona una categoría</option>
                <option value="email">Email</option>
                <option value="software">Software</option>
                <option value="hardware">Hardware</option>
                <option value="network">Red</option>
                <option value="access">Acceso</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Palabras Clave</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Separadas por comas"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Audiencia</label>
            <div className="flex gap-4">
              {["users", "technicians", "both"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={audience.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAudience([...audience, option])
                      } else {
                        setAudience(audience.filter((a) => a !== option))
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm text-foreground">
                    {option === "users" && "Usuarios"}
                    {option === "technicians" && "Técnicos"}
                    {option === "both" && "Ambos"}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Content Editor */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Contenido</h3>
        <div className="space-y-2">
          {/* Toolbar */}
          <div className="flex gap-2 p-2 bg-muted rounded-lg border border-border mb-2">
            <button className="p-2 hover:bg-border rounded text-sm font-medium" title="Negrita">
              <Bold size={18} />
            </button>
            <button className="p-2 hover:bg-border rounded text-sm font-medium" title="Cursiva">
              <Italic size={18} />
            </button>
            <button className="p-2 hover:bg-border rounded text-sm font-medium" title="Subrayado">
              <Underline size={18} />
            </button>
            <div className="w-px bg-border mx-1" />
            <button className="p-2 hover:bg-border rounded text-sm flex items-center gap-1" title="Lista">
              <List size={18} />
              Lista
            </button>
            <button className="p-2 hover:bg-border rounded text-sm flex items-center gap-1" title="Tabla">
              <Grid3x3 size={18} />
              Tabla
            </button>
            <button className="p-2 hover:bg-border rounded text-sm flex items-center gap-1" title="Imagen">
              <ImageIcon size={18} />
              Imagen
            </button>
          </div>

          {/* Editor */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe el contenido del artículo aquí..."
            rows={12}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
          />
        </div>
      </Card>

      {/* Preview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Vista Previa</h3>
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="text-lg font-bold text-foreground mb-2">{title || "Título del artículo"}</h4>
          <p className="text-sm text-gray-dark mb-4">{summary || "Resumen del artículo"}</p>
          <div className="text-foreground whitespace-pre-wrap text-sm">
            {content || "El contenido aparecerá aquí..."}
          </div>
        </div>
      </Card>
    </div>
  )
}
