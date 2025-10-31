"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ReviewItem {
  id: string
  title: string
  author: string
  submittedAt: string
  changes: string
}

const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: "R-001",
    title: "Configurar correo en Outlook",
    author: "María López",
    submittedAt: "2025-10-25",
    changes: "Actualización de pasos para versión 2025",
  },
  {
    id: "R-002",
    title: "Solucionar problemas de VPN",
    author: "Carlos Rodríguez",
    submittedAt: "2025-10-24",
    changes: "Nuevas soluciones para conexiones inestables",
  },
]

export default function KBReviewPanel() {
  const [reviews, setReviews] = useState<ReviewItem[]>(MOCK_REVIEWS)
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(reviews[0] || null)
  const [comments, setComments] = useState<string>("")

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Review Queue */}
      <div className="col-span-1">
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Cola de Revisión</h3>
          <div className="space-y-2">
            {reviews.map((review) => (
              <button
                key={review.id}
                onClick={() => setSelectedReview(review)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedReview?.id === review.id ? "bg-primary/10 border-primary" : "border-border hover:bg-muted"
                }`}
              >
                <p className="font-medium text-foreground text-sm">{review.title}</p>
                <p className="text-xs text-gray-dark">{review.author}</p>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Review Details */}
      <div className="col-span-2 space-y-4">
        {selectedReview && (
          <>
            {/* Article Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">{selectedReview.title}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-dark">Autor</p>
                  <p className="font-medium text-foreground">{selectedReview.author}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-dark">Enviado</p>
                  <p className="font-medium text-foreground">{selectedReview.submittedAt}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-dark mb-2">Cambios Realizados</p>
                <p className="text-foreground">{selectedReview.changes}</p>
              </div>
            </Card>

            {/* Comparison View */}
            <Card className="p-6">
              <h4 className="font-semibold text-foreground mb-4">Vista Comparativa</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-error/5 p-4 rounded-lg border border-error/20">
                  <p className="text-xs font-medium text-error mb-2">Versión Anterior</p>
                  <p className="text-sm text-foreground">Contenido anterior...</p>
                </div>
                <div className="bg-success/5 p-4 rounded-lg border border-success/20">
                  <p className="text-xs font-medium text-success mb-2">Nueva Versión</p>
                  <p className="text-sm text-foreground">Contenido nuevo...</p>
                </div>
              </div>
            </Card>

            {/* Comments */}
            <Card className="p-6">
              <h4 className="font-semibold text-foreground mb-4">Comentarios</h4>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Añade comentarios o solicita cambios..."
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              />
              <div className="flex gap-2">
                <Button variant="outline">Solicitar Cambios</Button>
                <Button className="bg-success hover:bg-success/90">Aprobar</Button>
                <Button variant="outline" className="text-error bg-transparent">
                  Rechazar
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
