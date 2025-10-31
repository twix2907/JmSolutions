import type React from "react"
import { Roboto } from "next/font/google"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "JM Solutions",
  description: "Sistema de gestión corporativa JM Solutions",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={roboto.variable}>
      <body className="bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
