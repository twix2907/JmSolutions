"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Paperclip } from "lucide-react"
import {
  getPriorityColor,
  getStatusColor,
  getSLAColor,
  getStatusLabel,
  getSLALabel,
} from "@/lib/ticket-helpers"
import type { Ticket, Comment } from "@/lib/types"

interface TicketDetailsProps {
  ticketId: string
  onClose: () => void
}

const MOCK_TICKET: Ticket = {
  id: "TKT-2025-001",
  title: "No puedo acceder a mi correo corporativo",
  description:
    "Desde esta mañana no puedo acceder a mi cuenta de correo. Intento con mi contraseña pero me dice que es incorrecta.",
  status: "open",
  priority: "high",
  category: "Email",
  requester: "Juan García",
  createdAt: "2025-10-28 09:30",
  updatedAt: "2025-10-28 14:15",
  assignedTo: "María López",
  slaStatus: "at-risk",
  attachments: ["screenshot.png", "error-log.txt"],
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: "C-001",
    author: "Juan García",
    role: "Usuario",
    content: "He intentado restablecer la contraseña pero sigue sin funcionar. El error dice 'Credenciales inválidas'.",
    timestamp: "2025-10-28 09:35",
  },
  {
    id: "C-002",
    author: "María López",
    role: "Técnico",
    content:
      "Hola Juan, he revisado tu cuenta. Parece que hay un problema de sincronización. Voy a reiniciar tu sesión en el servidor.",
    timestamp: "2025-10-28 10:15",
  },
  {
    id: "C-003",
    author: "Juan García",
    role: "Usuario",
    content: "Gracias María, ya funciona. Pude acceder sin problemas.",
    timestamp: "2025-10-28 10:45",
  },
]

export default function TicketDetails({ ticketId, onClose }: TicketDetailsProps) {
  const [status, setStatus] = useState(MOCK_TICKET.status)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS)
  const firstInputRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    }
    // Focus trap básico
    if (e.key === "Tab" && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: `C-${comments.length + 1}`,
        author: "Técnico Actual",
        role: "Técnico",
        content: newComment,
        timestamp: new Date().toLocaleString("es-ES"),
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  const handleResolveTicket = () => {
    setStatus("resolved")
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-details-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto outline-none"
        ref={modalRef}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border p-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 id="ticket-details-title" className="text-2xl font-bold text-foreground">{MOCK_TICKET.id}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                {getStatusLabel(status)}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">{MOCK_TICKET.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-dark hover:text-foreground text-2xl font-bold"
            aria-label="Cerrar"
            ref={firstInputRef}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Ticket Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-gray-dark mb-1">Prioridad</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(MOCK_TICKET.priority)}`}
              >
                {MOCK_TICKET.priority.charAt(0).toUpperCase() + MOCK_TICKET.priority.slice(1)}
              </span>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-gray-dark mb-1">Categoría</p>
              <p className="font-medium text-foreground">{MOCK_TICKET.category}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-gray-dark mb-1">Asignado a</p>
              <p className="font-medium text-foreground">{MOCK_TICKET.assignedTo}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-gray-dark mb-1">Estado SLA</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getSLAColor(MOCK_TICKET.slaStatus || "ok")}`}
              >
                {getSLALabel(MOCK_TICKET.slaStatus || "ok")}
              </span>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-gray-dark mb-1">Solicitante</p>
              <p className="font-medium text-foreground">{MOCK_TICKET.requester}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-gray-dark mb-1">Creado</p>
              <p className="font-medium text-foreground">{MOCK_TICKET.createdAt}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Descripción</h4>
            <p className="text-gray-dark bg-muted p-4 rounded-lg">{MOCK_TICKET.description}</p>
          </div>

          {/* Attachments */}
          {MOCK_TICKET.attachments && MOCK_TICKET.attachments.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-3">Archivos Adjuntos</h4>
              <div className="space-y-2">
                {MOCK_TICKET.attachments.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer"
                  >
                    <Paperclip size={20} className="text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{file}</span>
                    <span className="text-xs text-gray-dark ml-auto">Descargar</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Conversación</h4>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{comment.author}</p>
                      <p className="text-xs text-gray-dark">{comment.role}</p>
                    </div>
                    <p className="text-xs text-gray-dark">{comment.timestamp}</p>
                  </div>
                  <p className="text-foreground">{comment.content}</p>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={3}
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors"
              >
                Agregar Comentario
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Ticket["status"])}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="open">Abierto</option>
              <option value="in-progress">En Progreso</option>
              <option value="resolved">Resuelto</option>
              <option value="closed">Cerrado</option>
            </select>
            <button
              onClick={handleResolveTicket}
              className="px-6 py-2 bg-success text-white font-medium rounded-lg hover:bg-success/90 transition-colors"
            >
              Marcar como Resuelto
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-medium text-white font-medium rounded-lg hover:bg-gray-dark transition-colors ml-auto"
              aria-label="Cerrar"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}