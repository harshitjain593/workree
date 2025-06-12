import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { ReduxProvider } from "@/redux/provider"
import FloatingChat from "@/components/ui/floating-chat"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JobConnect Pro - Connect, Grow, and Advance Your Career",
  description: "Find your dream job or the perfect candidate with JobConnect Pro",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col dark-gradient-bg`}>
        <ReduxProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingChat />
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  )
}
