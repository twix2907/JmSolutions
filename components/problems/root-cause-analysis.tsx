"use client"

import { Card } from "@/components/ui/card"

interface RootCauseAnalysis {
  id: string
  problemId: string
  title: string
  fishboneDiagram: {
    people: string[]
    process: string[]
    technology: string[]
    environment: string[]
  }
  rootCause: string
  preventionSteps: string[]
  changeManagementLink?: string
}

const MOCK_ANALYSIS: RootCauseAnalysis = {
  id: "RCA-001",
  problemId: "P-001",
  title: "Análisis de Causa Raíz - Caída del Servicio de Correo",
  fishboneDiagram: {
    people: ["Falta de monitoreo nocturno", "Respuesta lenta del equipo"],
    process: ["Procedimiento de escalamiento ineficiente", "Falta de plan de contingencia"],
    technology: ["Servidor sin redundancia", "Falta de alertas automáticas"],
    environment: ["Ataque DDoS externo", "Sobrecarga de tráfico"],
  },
  rootCause: "Combinación de ataque DDoS externo y falta de redundancia en el servidor de correo",
  preventionSteps: [
    "Implementar servidor de correo redundante",
    "Configurar alertas automáticas de carga",
    "Establecer plan de respuesta a DDoS",
    "Aumentar capacidad de ancho de banda",
  ],
  changeManagementLink: "CHG-2025-001",
}

export default function RootCauseAnalysis() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Análisis de Causa Raíz</h2>

      {/* Main Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{MOCK_ANALYSIS.title}</h3>

        {/* Fishbone Diagram */}
        <div className="mb-8">
          <h4 className="font-medium text-foreground mb-4">Diagrama de Espina de Pescado</h4>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Personas", items: MOCK_ANALYSIS.fishboneDiagram.people },
              { label: "Procesos", items: MOCK_ANALYSIS.fishboneDiagram.process },
              { label: "Tecnología", items: MOCK_ANALYSIS.fishboneDiagram.technology },
              { label: "Ambiente", items: MOCK_ANALYSIS.fishboneDiagram.environment },
            ].map((category) => (
              <div key={category.label} className="bg-muted p-4 rounded-lg">
                <p className="font-medium text-foreground mb-3">{category.label}</p>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Root Cause */}
        <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-error mb-2">Causa Raíz Identificada</p>
          <p className="text-foreground">{MOCK_ANALYSIS.rootCause}</p>
        </div>

        {/* Prevention Steps */}
        <div>
          <h4 className="font-medium text-foreground mb-4">Pasos para Prevención Futura</h4>
          <ol className="space-y-3">
            {MOCK_ANALYSIS.preventionSteps.map((step, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-success/10 text-success rounded-full flex items-center justify-center text-sm font-medium">
                  {idx + 1}
                </span>
                <span className="text-foreground pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Change Management Link */}
        {MOCK_ANALYSIS.changeManagementLink && (
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-gray-dark mb-2">Vinculado con Gestión de Cambios</p>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light text-sm">
              Ver Cambio {MOCK_ANALYSIS.changeManagementLink}
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}
