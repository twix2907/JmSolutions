"use client"

import { useState } from "react"
import TicketDetails from "@/components/tickets/ticket-details"

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const [showDetails, setShowDetails] = useState(true)

  if (!showDetails) {
    return null
  }

  return <TicketDetails ticketId={params.id} onClose={() => setShowDetails(false)} />
}
