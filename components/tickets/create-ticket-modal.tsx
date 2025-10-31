"use client"

import type React from "react"

import { useState } from "react"

interface CreateTicketModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateTicketModal({ isOpen, onClose }: CreateTicketModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "general",
    priority: "medium",
    attachments: [] as File[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle ticket creation
    console.log("Creating ticket:", formData)
    onClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Crear Nuevo Ticket</h2>
          <button
            onClick={onClose}
            className="text-gray-dark hover:text-foreground text-2xl leading-none"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              Título del Ticket *
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Describe brevemente tu problema"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
              Descripción Detallada *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Proporciona todos los detalles relevantes para ayudarnos a resolver tu problema"
              rows={5}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                Categoría *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="general">General</option>
                <option value="email">Email</option>
                <option value="software">Software</option>
                <option value="hardware">Hardware</option>
                <option value="network">Red</option>
                <option value="access">Acceso</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-foreground mb-2">
                Prioridad *
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="critical">Crítica</option>
              </select>
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label htmlFor="attachments" className="block text-sm font-medium text-foreground mb-2">
              Adjuntos (Opcional)
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <input
                id="attachments"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    setFormData((prev) => ({ ...prev, attachments: Array.from(e.target.files!) }))
                  }
                }}
              />
              <label htmlFor="attachments" className="cursor-pointer">
                <p className="text-gray-dark">Arrastra archivos aquí o haz clic para seleccionar</p>
                <p className="text-xs text-gray-dark mt-1">Máximo 5 archivos, 10MB cada uno</p>
              </label>
            </div>
            {formData.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-muted p-2 rounded">
                    <span className="text-sm text-foreground">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          attachments: prev.attachments.filter((_, i) => i !== idx),
                        }))
                      }}
                      className="text-error hover:text-error/80 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors"
            >
              Crear Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
